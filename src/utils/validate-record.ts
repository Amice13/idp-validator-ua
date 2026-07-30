import type { Issue } from '@/types/issue'
import type { Row } from '@/types/row'
import hasSpaces from '@/validators/has-spaces'
import hasLatin from '@/validators/has-latin' 
import validatePatronymic from '@/validators/patronymic'
import hasKatottg from '@/validators/has-katottg'
import checkVulnerabilities from '@/validators/vulnerabilities'
import validateTaxId from '@/validators/tax-id'
import validateGender from '@/validators/gender'
import validateBirthday from '@/validators/birthday'
import validatePhone from '@/validators/phone'
import validateDocumentType from '@/validators/document-type'
import validateDocumentNumber from '@/validators/document-number'
import validateOrganization from '@/validators/edrpou'
import validateIBAN from '@/validators/iban'
import checkIdpDate from '@/validators/idp-date'
import validateIdpNumber from '@/validators/idp-number'
import getGenderFromAdditionalName from './get-gender-from-additional-name'
import getDataFromTaxId from './get-data-from-tax-id'

const validateRecord = (record: Row) => {
  const errors: Issue[] = []

  const isHH = typeof record.hhTaxId === 'string' &&  record.taxId === record.hhTaxId

  // Surname
  if (record.surname === undefined) {
    errors.push({
      field: 'surname',
      type: 'error',
      description: 'Це обов\'зякове поле'
    })
  } else {
    try {
      hasSpaces(record.surname)
    } catch (err) {
      errors.push({
        field: 'surname',
        type: 'warning',
        description: err instanceof Error ? err.message : String(err)
      })
    }
    try {
      hasLatin(record.surname)
    } catch (err) {
      errors.push({
        field: 'givenName',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  // Given name
  if (record.givenName === undefined) {
    errors.push({
      field: 'givenName',
      type: 'error',
      description: 'Це обов\'зякове поле'
    })
  } else {
    try {
      hasSpaces(record.givenName)
    } catch (err) {
      errors.push({
        field: 'givenName',
        type: 'warning',
        description: err instanceof Error ? err.message : String(err)
      })
    }
    try {
      hasLatin(record.givenName)
    } catch (err) {
      errors.push({
        field: 'givenName',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  // Additional name
  if (record.additionalName === undefined) {
    errors.push({
      field: 'additionalName',
      type: 'warning',
      description: 'Поле є пустим'
    })
  } else {
    try {
      hasSpaces(record.additionalName)
    } catch (err) {
      errors.push({
        field: 'additionalName',
        type: 'warning',
        description: err instanceof Error ? err.message : String(err)
      })
    }
    try {
      hasLatin(record.additionalName)
    } catch (err) {
      errors.push({
        field: 'additionalName',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
    try {
      validatePatronymic(record.additionalName)
    } catch (err) {
      errors.push({
        field: 'additionalName',
        type: 'warning',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  // Admins
  try {
    hasKatottg(record.admin1, 1)
  } catch (err) {
    errors.push({
      field: 'admin1',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  try {
    hasKatottg(record.admin2, 2)
  } catch (err) {
    errors.push({
      field: 'admin2',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  try {
    hasKatottg(record.admin3, 3)
  } catch (err) {
    errors.push({
      field: 'admin3',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  try {
    hasKatottg(record.admin4, 4)
  } catch (err) {
    errors.push({
      field: 'admin4',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }

  // Recent admins
  try {
    hasKatottg(record.recentAdmin1, 1)
  } catch (err) {
    errors.push({
      field: 'recentAdmin1',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  try {
    hasKatottg(record.recentAdmin2, 2)
  } catch (err) {
    errors.push({
      field: 'recentAdmin2',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  try {
    hasKatottg(record.recentAdmin3, 3)
  } catch (err) {
    errors.push({
      field: 'recentAdmin3',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  try {
    hasKatottg(record.recentAdmin4, 4)
  } catch (err) {
    errors.push({
      field: 'recentAdmin4',
      type: 'warning',
      description: err instanceof Error ? err.message : String(err)
    })
  }

  // Vulnerabilities
  if (record.vulnerabilities !== undefined) {
    try {
      checkVulnerabilities(record.vulnerabilities)
    } catch (err) {
      errors.push({
        field: 'vulnerabilities',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  // HH Tax ID
  try {
    validateTaxId(record.hhTaxId)
  } catch (err) {
    errors.push({
      field: 'hhTaxId',
      type: 'error',
      description: err instanceof Error ? err.message : String(err)
    })
  }

  // Tax ID
  if (record.taxId !== undefined) {
    const { birthday, gender } = getDataFromTaxId(record.taxId)
    if (record.birthday !== undefined) {
      if (record.birthday !== birthday) {
        errors.push({
          field: 'gender',
          type: 'warning',
          description: 'Стать не збігається із значенням закодованим в коді ЄДРПОУ'
        })
      }
      if (record.gender !== gender) {
        errors.push({
          field: 'gender',
          type: 'warning',
          description: 'Стать не збігається за іменем по батькові'
        })
      }
    }
    try {
      validateTaxId(record.taxId)
    } catch (err) {
      errors.push({
        field: 'taxId',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  // Gender
  if (record.gender === undefined) {
    errors.push({
      field: 'gender',
      type: 'error',
      description: 'Це обов\'зякове поле'
    })
  } else {
    try {
      validateGender(record.gender)
    } catch (err) {
      // console.log(record)
      errors.push({
        field: 'gender',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }
  
  // Birthday
  if (record.birthday === undefined) {
    errors.push({
      field: 'birthday',
      type: 'error',
      description: 'Це обов\'зякове поле'
    })
  } else {
    try {
      validateBirthday(record.birthday)
    } catch (err) {
      errors.push({
        field: 'birthday',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  // Phone
  if (record.phone !== undefined) {
    try {
      validatePhone(record.phone)
    } catch (err) {
      errors.push({
        field: 'phone',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  } else {
    if (isHH) {
      errors.push({
        field: 'phone',
        type: 'error',
        description: 'Це обов\'зякове поле для голови домогосподарства'
      })
    }
  }

  if (record.category !== undefined) {
    if (!['1', '2'].includes(record.category)) {
      console.log(record.category)
      errors.push({
        field: 'category',
        type: 'error',
        description: 'Категорія зазначена невірно'
      })
    }
  }

  // Document type
  try {
    validateDocumentType(record.documentType)
  } catch (err) {
    errors.push({
      field: 'documentType',
      type: 'error',
      description: err instanceof Error ? err.message : String(err)
    })
  }

  if (record.documentType !== undefined) {
    if (record.documentNumber === undefined) {
      errors.push({
        field: 'documentNumber',
        type: 'error',
        description: 'Номер документа є обов\'язковим'
      })
    } else {
      try {
        validateDocumentNumber(record.documentNumber, record.documentType)
      } catch (err) {
        errors.push({
          field: 'documentNumber',
          type: 'error',
          description: err instanceof Error ? err.message : String(err)
        })
      }
    }
  }
  try {
    validateOrganization(record.organization)    
  } catch (err) {
    errors.push({
      field: 'organization',
      type: 'error',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  if (isHH && record.iban === undefined) {
    errors.push({
      field: 'iban',
      type: 'error',
      description: 'Зазначення номеру IBAN є обов\'язковим для голови домогосподарства'
    })
  }

  if (record.iban !== undefined) {
    try {
      validateIBAN(record.iban)
    } catch (err) {
      errors.push({
        field: 'organization',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  if (record.idpDate !== undefined) {
    try {
      checkIdpDate(record.idpDate)
    } catch (err) {
      errors.push({
        field: 'idpDate',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }

  if (record.idpNumber !== undefined) {
    try {
      validateIdpNumber(record.idpNumber)
    } catch (err) {
      errors.push({
        field: 'idpNumber',
        type: 'warning',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }
  // street: string
  // recentStreet: string
  return errors
}

export default validateRecord
