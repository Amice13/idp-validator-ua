import documentTypes from '@/dicts/document-types'
import genders from '@/dicts/genders'

import { type Row } from '@/types/row'

const convertRawToTyped = (data: Array<Record<string, unknown>>): Row[] => {
  const rows: Row[] = []
  for (const d of data) {
    let obj: Partial<Row> = {}
    obj.additionalName = d.additionalName as string | undefined
    obj.admin1 = d.admin1 as string | undefined
    obj.admin2 = d.admin2 as string | undefined
    obj.admin3 = d.admin3 as string | undefined
    obj.admin4 = d.admin4 as string | undefined
    obj.street = d.street as string | undefined
    if (d.birthday !== undefined) {
      if (typeof d.birthday === 'string') {
        obj.birthday = d.birthday.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')
      }
      if (d.birthday instanceof Date) {
        obj.birthday = d.birthday.toLocaleDateString('sv')
      }
    }
    obj.category = d.category as string | undefined
    obj.documentNumber = d.documentNumber === undefined ? undefined : String(d.documentNumber)
    obj.documentType = d.documentType as typeof documentTypes[number] | undefined
    obj.gender = d.gender as typeof genders[number] | undefined
    obj.givenName = d.givenName as string | undefined
    obj.hhTaxId = d.hhTaxId === undefined ? undefined : String(d.hhTaxId).padStart(10, '0')
    obj.iban = d.iban as string | undefined
    if (d.idpDate !== undefined) {
      if (typeof d.idpDate === 'string') {
        obj.idpDate = d.idpDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')
      }
      if (d.idpDate instanceof Date) {
        obj.idpDate = d.idpDate.toLocaleDateString('sv')
      }
    }
    obj.idpNumber = d.idpNumber === undefined ? undefined : String(d.idpNumber)
    obj.organization = d.organization as string | undefined
    obj.phone = d.phone as string | undefined
    obj.recentAdmin1 = d.recentAdmin1 as string | undefined
    obj.recentAdmin2 = d.recentAdmin2 as string | undefined
    obj.recentAdmin3 = d.recentAdmin3 as string | undefined
    obj.recentAdmin4 = d.recentAdmin4 as string | undefined
    obj.recentStreet = d.recentStreet as string | undefined
    obj.surname = d.surname as string | undefined
    obj.taxId = d.taxId === undefined ? undefined : String(d.taxId).padStart(10, '0')
    obj.vulnerabilities = d.vulnerabilities === undefined ? d.vulnerabilities : String(d.vulnerabilities)
    rows.push(obj as Row)
  }
  return rows  
}

export default convertRawToTyped