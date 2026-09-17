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

import documentTypesDict from '@/dicts/document-translations'
import addressDict from '@/dicts/address-translations'
import allRegions from '@/dicts/all-regions'
import extractKatottg from '@/utils/extract-katottg'
import translit from '@/utils/translit'
import getAddress from '@/utils/address-parser'

const downloadRais = async () => {
  const households = []
  const assistances = []

  let headOfHouseholdId = undefined
  for (const record of (results as Array<Record<string, unknown>>)) {
    // Household processing
    const data: Record<string, unknown> = {}
    const taxId = ['Відсутній', 'відсутній'].includes(record.taxId as string) ?
      record.documentNumber : record.taxId
    if (record.category === '1') headOfHouseholdId = taxId
    data.headOfHouseholdId = headOfHouseholdId
    data.documentType = !['Відсутній', 'відсутній'].includes(record.taxId as string) ?
      'Tax Identification Number' :
      documentTypesDict[record.documentType as keyof typeof documentTypesDict]
    data.documentNumber = !['Відсутній', 'відсутній'].includes(record.taxId as string) ? record.taxId : record.documentNumber
    data.familyName = record.surname
    data.givenName = record.givenName
    if (record.additionalName !== undefined) data.additionalName = record.additionalName
    data.gender = record.gender === 'жіноча' ? 'Female' : 'Male'
    data.birthday = record.birthday
    if (record.phone !== undefined) data.phone = record.phone
    data.comments = 'Collected according to the Resolution 1084 of the Cabinet of the Ministers of Ukraine'
    data.tags = 'Resolution 1084, Winter Support'
    households.push(data)

    // Assistance processing
    if (record.category === '1') {
      const assistance: Record<string, unknown> = {}
      assistance.headOfHouseholdId = headOfHouseholdId
      assistance.populationType = record.idpNumber === undefined ? 'Non-displaced' : 'IDPs'
      assistance.country = 'Ukraine (UA)'
      // Get information about the old address
      const pcode = extractKatottg(record.admin4 as string ?? '')
      if (pcode !== null) {
        const pCode4 = pcode.substring(0, 12)
        const pCode3 = pcode.substring(0, 9)
        const pCode2 = pcode.substring(0, 6)
        const pCode1 = pcode.substring(0, 4)
        assistance.originAdmin1 = translit(allRegions[pCode1 as keyof typeof allRegions]) + ` (${pCode1})`
        assistance.originAdmin2 = translit(allRegions[pCode2 as keyof typeof allRegions]) + ` (${pCode2})`
        assistance.originAdmin3 = translit(allRegions[pCode3 as keyof typeof allRegions]) + ` (${pCode3})`
        assistance.originAdmin4 = translit(allRegions[pCode4 as keyof typeof allRegions]) + ` (${pCode4})`
        const street = getAddress(record.street as string ?? '')
        if (street?.houseNumber !== undefined) assistance.originBuilding = street.houseNumber
        if (street?.streetName !== undefined) assistance.originStreet = street.streetName
        if (street?.streetType !== undefined) assistance.originStreetType = addressDict[street.streetType as keyof typeof addressDict]
        if (street?.block !== undefined) assistance.originBlock = street.block
        if (street?.apartment !== undefined) assistance.originApartment = street.apartment
      }
      const recentPcode = extractKatottg(record.recentAdmin4 as string ?? '')
      if (recentPcode !== null) {
        const pCode4 = recentPcode.substring(0, 12)
        const pCode3 = recentPcode.substring(0, 9)
        const pCode2 = recentPcode.substring(0, 6)
        const pCode1 = recentPcode.substring(0, 4)
        assistance.admin1 = translit(allRegions[pCode1 as keyof typeof allRegions]) + ` (${pCode1})`
        assistance.admin2 = translit(allRegions[pCode2 as keyof typeof allRegions]) + ` (${pCode2})`
        assistance.admin3 = translit(allRegions[pCode3 as keyof typeof allRegions]) + ` (${pCode3})`
        assistance.admin4 = translit(allRegions[pCode4 as keyof typeof allRegions]) + ` (${pCode4})`
        const street = getAddress(record.recentStreet as string ?? '')
        if (street?.houseNumber !== undefined) assistance.building = street.houseNumber
        if (street?.streetName !== undefined) assistance.street = street.streetName
        if (street?.streetType !== undefined) assistance.streetType = addressDict[street.streetType as keyof typeof addressDict]
        if (street?.block !== undefined) assistance.block = street.block
        if (street?.apartment !== undefined) assistance.apartment = street.apartment
      } else {
        assistance.admin1 = assistance.originAdmin1
        assistance.admin2 = assistance.originAdmin2
        assistance.admin3 = assistance.originAdmin3
        assistance.admin4 = assistance.originAdmin4
        assistance.building = assistance.originBuilding
        assistance.street = assistance.originStreet
        assistance.streetType = assistance.originStreetType
        assistance.block = assistance.originBlock
        assistance.apartment = assistance.originApartment
      }
      assistance.bankAccountType = 'IBAN'
      assistance.bankAccountNumber = record.iban
      assistance.cash = 19400
      assistance.currency = 'UAH'
      assistance.comments = 'Collected according to the Resolution 1084 of the Cabinet of the Ministers of Ukraine'
      assistance.tags = 'Resolution 1084, Winter Support'
      assistances.push(assistance)      
    }
  }
  const file1 = await fetch(appBaseUrl + 'RAIS - Households.xlsx')
  const buffer1 = await file1.arrayBuffer()
  downloadXlsx(buffer1, { data: households }, 'RAIS - Households.xlsx')
  const file2 = await fetch(appBaseUrl + 'RAIS - Assistance.xlsx')
  const buffer2 = await file2.arrayBuffer()
  downloadXlsx(buffer2, { data: assistances }, 'RAIS - Assistances.xlsx')
}

const reset = () => {
  ready.value = false
}

</script>
