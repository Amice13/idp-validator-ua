import documentTypes from '@/dicts/document-types'
import genders from '@/dicts/genders'

export interface Row {
  additionalName: string
  admin1: string
  admin2: string
  admin3: string
  admin4: string
  street: string
  birthday: string
  category: string
  documentNumber: string
  documentType: typeof documentTypes[number]
  gender: typeof genders[number]
  givenName: string
  hhTaxId: string
  iban: string
  idpDate: string
  idpNumber: string
  notPaid: string
  organization: string
  paid: string
  pfuCheck: string
  phone: string
  reasonOfNotProviding: string
  recentAdmin1: string
  recentAdmin2: string
  recentAdmin3: string
  recentAdmin4: string
  recentStreet: string
  supportIsNotProvided: string
  surname: string
  taxId: string
  vulnerabilities: string
}
