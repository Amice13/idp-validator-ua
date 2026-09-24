import type { Issue } from '@/types/issue'
import type { Row } from '@/types/row'
import hasSpaces from '@/validators/has-spaces'
import hasLatin from '@/validators/has-latin' 
import validatePatronymic from '@/validators/patronymic'
import checkKatottg from '@/validators/katottg'
import checkVulnerabilities from '@/validators/vulnerabilities'
import validateTaxId from '@/validators/tax-id'
import validateGender from '@/validators/gender'
import validateBirthday from '@/validators/birthday'
import validatePhone from '@/validators/phone'
import validateDocumentType from '@/validators/document-type'
import validateDocumentNumber from '@/validators/document-number'
import validateOrganization from '@/validators/edrpou'
import validateCategory from '@/validators/category'
import validateIBAN from '@/validators/iban'
import checkIdpDate from '@/validators/idp-date'
import validateIdpNumber from '@/validators/idp-number'
import getGenderFromAdditionalName from './get-gender-from-additional-name'
import getDataFromTaxId from './get-data-from-tax-id'
import getDifferenceInYears from './get-difference-in-years'
import convertDate from './convert-date'
import extractKatottg from './extract-katottg'
import validateCyryllicName from '@/validators/cyryllic-name'
import regions from '@/dicts/regions'
import validateMFO from '@/validators/mfo'

const validateRecord = (record: Row) => {
  const errors: Issue[] = []

  const isHH = record.category === '1'

  // Surname
  if (record.surname === undefined) {
    errors.push({
      field: 'surname',
      type: 'error',
      description: 'Це обов\'язкове поле'
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
      description: 'Це обов\'язкове поле'
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
      description: 'Поле є незаповненим'
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
  const katottg3 = extractKatottg(record.admin3 ?? '')
  if (katottg3 === null) {
    errors.push({
      field: 'admin3',
      type: 'error',
      description: 'Не містить код КАТОТТГ'
    })
  } else {
    try {
      checkKatottg(katottg3, 3)
    } catch (err) {
      errors.push({
        field: 'admin3',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }
  const katottg4 = extractKatottg(record.admin4 ?? '')
  if (katottg4 === null) {
    errors.push({
      field: 'admin4',
      type: 'error',
      description: 'Не містить код КАТОТТГ'
    })
  } else {
    try {
      checkKatottg(katottg4, 4)
    } catch (err) {
      errors.push({
        field: 'admin4',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
    if (katottg3 !== null && katottg4.slice(0, 9) !== katottg3.slice(0, 9)) {
      errors.push({
        field: 'admin3',
        type: 'error',
        description: 'КАТОТТГ населеного пункту не відповідає КАТОТТГ громади'
      })
    }

    const pCode1 = katottg4.slice(0, 4)
    const pCode2 = katottg4.slice(0, 6)
    const admin1 = regions[pCode1 as keyof typeof regions]
    const admin1Name = regions[pCode1 + 'name' as keyof typeof regions]
    const admin2 = regions[pCode2 as keyof typeof regions]
    const admin2Name = regions[pCode2 + 'name' as keyof typeof regions]

    if (record.admin1 === undefined) {
      errors.push({
        field: 'admin1',
        type: 'error',
        description: 'Це обов\'язкове поле'
      })
    } else {
      if (admin1 !== record.admin1 && admin1Name !== record.admin1) {
        errors.push({
          field: 'admin1',
          type: 'error',
          description: 'Область не відповідає коду КАТОТТГ, зазначеному у населеному пункті'
        })
      }
    }
    if (record.admin2 === undefined) {
      errors.push({
        field: 'admin2',
        type: 'error',
        description: 'Це обов\'язкове поле'
      })
    } else {
      if (admin2 !== record.admin2 && admin2Name !== record.admin2) {
        errors.push({
          field: 'admin2',
          type: 'error',
          description: 'Район не відповідає коду КАТОТТГ, зазначеному у населеному пункті'
        })
      }
    }
  }
  if (record.street === undefined || record.street === '') {
    errors.push({
      field: 'street',
      type: 'error',
      description: 'Це обов\'язкове поле'
    })
    try {
      validateCyryllicName(record.street)
    } catch (err) {
      errors.push({
        field: 'street',
        type: 'warning',
        description: err instanceof Error ? err.message : String(err)
      })
    }
  }
  // Recent admins
  if (record.recentAdmin4 !== undefined) {
    const recentKatottg3 = extractKatottg(record.recentAdmin3 ?? '')
    if (recentKatottg3 === null) {
      errors.push({
        field: 'recentAdmin3',
        type: 'error',
        description: 'Не містить код КАТОТТГ'
      })
    } else {
      try {
        checkKatottg(recentKatottg3, 3)
      } catch (err) {
        errors.push({
          field: 'recentAdmin3',
          type: 'error',
          description: err instanceof Error ? err.message : String(err)
        })
      }
    }
    const recentKatottg4 = extractKatottg(record.recentAdmin4 ?? '')
    if (recentKatottg4 === null) {
      errors.push({
        field: 'recentAdmin4',
        type: 'error',
        description: 'Не містить код КАТОТТГ'
      })
    } else {
      try {
        checkKatottg(recentKatottg4, 4)
      } catch (err) {
        errors.push({
          field: 'recentAdmin4',
          type: 'error',
          description: err instanceof Error ? err.message : String(err)
        })
      }
      if (recentKatottg3 !== null && recentKatottg4.slice(0, 9) !== recentKatottg3.slice(0, 9)) {
        errors.push({
          field: 'admin3',
          type: 'error',
          description: 'КАТОТТГ населеного пункту не відповідає КАТОТТГ громади'
        })
      }

      const pCode1 = recentKatottg4.slice(0, 4)
      const pCode2 = recentKatottg4.slice(0, 6)
      const admin1 = regions[pCode1 as keyof typeof regions]
      const admin1Name = regions[pCode1 + 'name' as keyof typeof regions]
      const admin2 = regions[pCode2 as keyof typeof regions]
      const admin2Name = regions[pCode2 + 'name' as keyof typeof regions]

      if (record.recentAdmin1 === undefined) {
        errors.push({
          field: 'recentAdmin1',
          type: 'error',
          description: 'Це обов\'язкове поле'
        })
      } else {
        if (admin1 !== record.recentAdmin1 && admin1Name !== record.recentAdmin1) {
          errors.push({
            field: 'recentAdmin1',
            type: 'error',
            description: 'Область не відповідає коду КАТОТТГ, зазначеному у населеному пункті'
          })
        }
      }
      if (record.recentAdmin2 === undefined) {
        errors.push({
          field: 'recentAdmin2',
          type: 'error',
          description: 'Це обов\'язкове поле'
        })
      } else {
        if (admin2 !== record.recentAdmin2 && admin2Name !== record.recentAdmin2) {
          errors.push({
            field: 'recentAdmin2',
            type: 'error',
            description: 'Район не відповідає коду КАТОТТГ, зазначеному у населеному пункті'
          })
        }
      }
    }
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

  // Tax ID
  if (record.taxId === undefined) {
    errors.push({
      field: 'taxId',
      type: 'error',
      description: 'Це обов\'язкове поле. Якщо особа відмовилася від отримання номеру або ще не отримала його, напишіть "Відсутній"'
    })
  } else {
    let documentType = 'undefined'
    try {
      if (!['Відсутній', 'відсутній'].includes(record.taxId)) {
        validateTaxId(record.taxId)
        documentType = 'Tax ID'
      } else {
        documentType = 'Does not exist'
      }
    } catch (err) {
      errors.push({
        field: 'taxId',
        type: 'error',
        description: err instanceof Error ? err.message : String(err)
      })
    }
    if (documentType === 'Tax ID') {
      const { birthday, gender } = getDataFromTaxId(record.taxId)
      if (record.birthday !== undefined) {
        if (record.birthday !== birthday) {
          errors.push({
            field: 'birthday',
            type: 'warning',
            description: 'Дата народження не збігається із значенням закодованим в коді РНОКПП'
          })
        }
        if (record.gender !== gender) {
          errors.push({
            field: 'gender',
            type: 'warning',
            description: 'Стать не збігається із значенням закодованим в коді РНОКПП'
          })
        }
      }
    }
  }

  try {
    validateGender(record.gender)
  } catch (err) {
    errors.push({
      field: 'gender',
      type: 'error',
      description: err instanceof Error ? err.message : String(err)
    })
  }
  if (record.additionalName !== undefined && record.additionalName !== '') {
    const patronmyicGender = getGenderFromAdditionalName(record.additionalName)
    if (record.gender !== patronmyicGender) {
      errors.push({
        field: 'gender',
        type: 'error',
        description: 'По батькові та стать особи не збігаються'
      })
    }
  }
  
  // Birthday
  try {
    validateBirthday(record.birthday)
  } catch (err) {
    errors.push({
      field: 'birthday',
      type: 'error',
      description: err instanceof Error ? err.message : String(err)
    })
  }

  if (record.birthday !== undefined && isHH) {
    try {
      const birthday = convertDate(record.birthday)
      const today = new Date()
      if (birthday !== null) {
        const difference = getDifferenceInYears(birthday, today)
        if (difference < 18) throw new Error('Голова домогосподарства не може бути молодшим за 18 років')
      }
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
        description: 'Це обов\'язкове поле для голови домогосподарства'
      })
    }
  }

  try {
    validateCategory(record.category)
  } catch (err) {
    errors.push({
      field: 'category',
      type: 'error',
      description: err instanceof Error ? err.message : String(err)
    })
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

  if (record.iban !== undefined && record.iban !== 'WU') {
    try {
      validateIBAN(record.iban)
      validateMFO(record.iban)
    } catch (err) {
      errors.push({
        field: 'iban',
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
  return errors
}

export default validateRecord
