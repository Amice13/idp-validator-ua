import documentTypes from '@/dicts/document-types'

const validateDocumentType = (doc?: string): boolean => {
  if (doc === undefined) throw new Error('Не визначений тип документа')
  if (!documentTypes.includes(doc)) throw new Error('Невірно зазначений тип документа')
  return true
}

export default validateDocumentType
