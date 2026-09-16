type DocumentType = 'Паспорт (у формі книжечки)' | 'ID-картка' | 'РНОКПП' | null

const taxIdRegex = /^\d{10}$/
const passportRegex = /^[А-ЯЄІЇ]{2}\d{6}$/
const idCardRegex = /^\d{9}$/

const detectDocumentType = (s?: string): DocumentType => {
  if (s === undefined) return null
  if (taxIdRegex.test(s)) return 'РНОКПП'
  if (passportRegex.test(s)) return 'Паспорт (у формі книжечки)'
  if (idCardRegex.test(s)) return 'ID-картка'
  return null
}

export default detectDocumentType
