import convertRowsToObjects from '@/utils/convert-rows-to-objects'
import convertRawToTyped from '@/utils/convert-raw-to-typed'
import getDuplicates from '@/utils/find-duplicates'
import validateRecord from '@/utils/validate-record'
import formatIssue from '@/utils/format-issue'

const validateData = (data: unknown[][]) => {
  if (data.length === 0) return
  const objects = convertRowsToObjects(data)
  const records = convertRawToTyped(objects)
  const duplicatedIbans = getDuplicates(records.map(el => el.iban).filter(Boolean)).filter(el => el !== 'WU')
  const duplicatedTaxIds = getDuplicates(records.map(el => el.taxId).filter(Boolean)).filter(el => !['Відсутній', 'відсутній'].includes(el))
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
  return { result, errorNumber, warningNumber }
}

export default validateData
