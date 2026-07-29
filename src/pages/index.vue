<template>
  <v-layout full-height class="mt-8">
    <v-row>
      <v-col cols="12">
        Для перевірки даних щодо виплати одноразової грошової допомоги вразливим категоріям населення, які проживають на територіях, на яких ведуться (велися) бойові дії, протягом опалювального сезону 2026/27 року, що здійснюється міжнародними організаціями, ви можете скористатися <a :href="`${appBaseUrl}/Template IDP 2026.xlsx`">шаблоном для внесення даних</a>.Ви можете також перевірити вже зібрані дані, скориставшись полем нижче.
      </v-col>
      <v-col cols="12">
        <import-upload-box v-model="data" />
      </v-col>
      <v-col cols="12">

      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts" setup>
import convertRowsToObjects from '@/utils/convert-rows-to-objects'
import convertRawToTyped from '@/utils/convert-raw-to-typed'
import getDuplicates from '@/utils/find-duplicates'
import validateRecord from '@/utils/validate-record'
import { downloadXlsx } from 'xlsx-template-browser'

const data = ref([])
const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)
const results = ref([])
watch(() => data, async (data) => {
  const objects = convertRowsToObjects(data.value)
  const records = convertRawToTyped(objects)
  const numberOfHH = new Set(records.map(el => el.hhTaxId).filter(Boolean)).size
  const numberOfRecords = records.length
  const duplicatedIbans = getDuplicates(records.map(el => el.iban).filter(Boolean))
  const duplicatedTaxIds = getDuplicates(records.map(el => el.taxId).filter(Boolean))
  const duplicatedPhones = getDuplicates(records.map(el => el.phone?.split(/,/)).flat().filter(Boolean))
  const duplicatedDocs = getDuplicates(records.map(el => el.documentNumber).filter(Boolean))
  const duplicatedIdp = getDuplicates(records.map(el => el.idpNumber).filter(Boolean))
  const result = []
  for (const r of records) {
    const issues = validateRecord(r)
    const issue = issues.map(el => {
      return el.field + ': ' + el.description
    }).join('\n')
    result.push({
      ...r,
      issue
    })
  }
  const file = await fetch(appBaseUrl + 'export.xlsx')
  const buffer = await file.arrayBuffer()
  // console.log(result)
  downloadXlsx(buffer, { data: result })
}, {
  deep: true
})

</script>
