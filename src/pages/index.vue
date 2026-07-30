<template>
  <v-layout full-height class="mt-8">
    <v-row>
      <v-col cols="12">
        Для перевірки даних щодо виплати одноразової грошової допомоги вразливим категоріям населення, які проживають на територіях, на яких ведуться (велися) бойові дії, протягом опалювального сезону 2026/27 року, що здійснюється міжнародними організаціями, ви можете скористатися <a :href="`${appBaseUrl}/Template IDP 2026.xlsx`">шаблоном для внесення даних</a>.Ви можете також перевірити вже зібрані дані, скориставшись полем нижче.
      </v-col>
      <v-col cols="12" v-if="!ready">
        <import-upload-box v-model="data" />
      </v-col>
      <v-col cols="12" v-if="ready">
        <v-card class="mb-4" flat>
          <v-card-title>Результати</v-card-title>
          <v-card-text>
            <p class="mb-6">За результатами первірки визначено наступне:</p>
            <ul class="ml-8 mb-8">
              <li>Кількість проаналізованих записів: {{ processedRecords }}</li>
              <li>Кількість проаналізованих домогосподарств: {{ hh }}</li>
              <li>Кількість помилок: {{ errors }}</li>
              <li>Кількість попереджень: {{ warnings }}</li>
            </ul>
            <v-row>
              <v-col cols="12">
                <v-btn @click="download" class="mr-2"" color="primary" text="Завантажити" />
                <v-btn @click="reset" class="mr-2"" color="error" text="Скинути" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts" setup>
import convertRowsToObjects from '@/utils/convert-rows-to-objects'
import convertRawToTyped from '@/utils/convert-raw-to-typed'
import getDuplicates from '@/utils/find-duplicates'
import validateRecord from '@/utils/validate-record'
import formatIssue from '@/utils/format-issue'
import { downloadXlsx } from 'xlsx-template-browser'

const ready = ref<boolean>(false)
const data = ref([])
const hh = ref<number>(0)
const processedRecords = ref<number>(0)
const warnings = ref<number>(0)
const errors = ref<number>(0)

const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)
let results: unknown[] = []

watch(() => data, async (data) => {
  const objects = convertRowsToObjects(data.value)
  const records = convertRawToTyped(objects)
  hh.value = new Set(records.map(el => el.hhTaxId).filter(Boolean)).size
  processedRecords.value = records.length
  const duplicatedIbans = getDuplicates(records.map(el => el.iban).filter(Boolean))
  const duplicatedTaxIds = getDuplicates(records.map(el => el.taxId).filter(Boolean))
  const duplicatedPhones = getDuplicates(records.map(el => el.phone?.split(/,/)).flat().filter(Boolean))
  const duplicatedDocs = getDuplicates(records.map(el => el.documentNumber).filter(Boolean))
  const duplicatedIdp = getDuplicates(records.map(el => el.idpNumber).filter(Boolean))
  const result = []
  
  let errorNumber = 0
  let warningNumber = 0

  for (const r of records) {
    const issues = validateRecord(r)
    if (duplicatedIbans.includes(r.iban)) {
      issues.push({
        field: 'iban',
        type: 'error',
        description: 'Цей IBAN дублюється'
      })
    }
    if (duplicatedTaxIds.includes(r.taxId)) {
      issues.push({
        field: 'taxId',
        type: 'error',
        description: 'Цей РНОКПП дублюється'
      })
    }
    if (duplicatedDocs.includes(r.documentNumber)) {
      issues.push({
        field: 'documentNumber',
        type: 'error',
        description: 'Цей номер документа, що посвідчує особу не є унікальним'
      })
    }
    if (duplicatedPhones.includes(r.phone)) {
      issues.push({
        field: 'phone',
        type: 'error',
        description: 'Цей номер телефона дублюється'
      })
    }
    if (duplicatedIdp.includes(r.idpNumber)) {
      issues.push({
        field: 'idpNumber',
        type: 'error',
        description: 'Цей номер посвідчення ВПО дублюється'
      })
    }
    warningNumber = warningNumber + issues.filter(el => el.type === 'warning').length 
    errorNumber = errorNumber + issues.filter(el => el.type === 'error').length 
    const issue = formatIssue(issues)
    const obj = {
      ...r,
      ...(r.birthday === undefined ? { birthday: '' } : { birthday: new Date(r.birthday) }),
      ...(r.idpDate === undefined ? { idpDate: '' } : { idpDate: new Date(r.idpDate) }),
      issue
    }
    for (const key of Object.keys(obj)) {
      if (obj[key as keyof typeof obj] === undefined) obj[key as keyof typeof obj] = ''
    }
    result.push(obj)
  }
  warnings.value = warningNumber
  errors.value = errorNumber
  
  results = result
  ready.value = true
}, {
  deep: true
})

const download = async () => {
  const file = await fetch(appBaseUrl + 'export.xlsx')
  const buffer = await file.arrayBuffer()
  downloadXlsx(buffer, { data: results })
}

const reset = () => {
  ready.value = false
}

</script>
