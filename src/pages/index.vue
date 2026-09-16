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
                <v-btn @click="download" class="mr-2" color="primary" text="Завантажити" />
                <v-btn @click="downloadRais" class="mr-2" color="green-darken-2" text="Підготувати для RAIS+" />
                <v-btn @click="reset" class="mr-2" color="error" text="Скинути" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts" setup>
import validate from '@/functions/validate'
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
  const validated = validate(data.value)
  if (validated === undefined) return alert('Використано невідповідний шаблон')
  const { result, warningNumber, errorNumber } = validated

  processedRecords.value = result.length
  hh.value = result.map(el => el.category === '1').filter(Boolean).length

  warnings.value = warningNumber
  errors.value = errorNumber
  results = result

  ready.value = true
}, {
  deep: true
})
// Imported from data according to the Resolution 1084 Resolution 1084

const download = async () => {
  const file = await fetch(appBaseUrl + 'export.xlsx')
  const buffer = await file.arrayBuffer()
  downloadXlsx(buffer, { data: results })
}

import documentTypesDict from '@/dicts/'
const downloadRais = () => {
  const households = []
  const assistances = []

${table:data.headOfHouseholdId} ${table:data.documentNumber}  ${table:data.documentType}  ${table:data.familyName}  ${table:data.givenName} ${table:data.additionalName}  ${table:data.birthday}  ${table:data.gender}  ${table:data.phone} ${table:data.comments}  ${table:data.tags}

  let headOfHouseholdId = undefined
  for (const record of (results as Array<Record<string, unknown>>)) {
    const data: Record<string, unknown> = {}

    const taxId = ['Відсутній', 'відсутній'].includes(record.taxId as string) ?
      record.documentNumber : record.taxId
    if (record.category === '1') headOfHouseholdId = taxId
    data.headOfHouseholdId = headOfHouseholdId
    data.documentType = ['Відсутній', 'відсутній'].includes(record.taxId as string) ? 'Tax Identification Number' : 'Test'

  }
}

const reset = () => {
  ready.value = false
}

</script>
