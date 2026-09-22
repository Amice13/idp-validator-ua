import { downloadXlsx } from 'xlsx-template-browser'
import documentTypesDict from '@/dicts/document-translations'
import addressDict from '@/dicts/address-translations'
import allRegions from '@/dicts/all-regions'
import extractKatottg from '@/utils/extract-katottg'
import translit from '@/utils/translit'
import getAddress from '@/utils/address-parser'

const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)

const downloadRais = async (results: unknown[]) => {
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

export default downloadRais
