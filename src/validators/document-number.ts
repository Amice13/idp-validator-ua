const passportMask = /^[А-ЯЄІЇ]{2}\d{6}$/
const internationalPassportMask = /^[A-Z]{2}\d{6}$/
const idCardMask = /^\d{9}$/
const birthCertificateMask = /^І+-[А-ЯЄІЇ]{2}\d{6}$/
const unzrMask = /^\d{8}-\d{5}$/

const validateDocumentNumber = (doc: string, docType: string): boolean => {
  if (docType === 'Паспорт (у формі книжечки)' && !passportMask.test(doc)) {
    throw new Error('Номер паспорту зазначений невірно')
  }
  if (docType === 'ID-картка' && !idCardMask.test(doc)) {
    throw new Error('Номер ID-картки зазначений невірно')
  }
  if (docType === 'Паспорт для виїзду за кордон' && !internationalPassportMask.test(doc)) {
    throw new Error('Номер паспорту для виїзду за кордон зазначений невірно')
  }
  if (docType === 'УНЗР' && !unzrMask.test(doc)) {
    throw new Error('Номер УНЗР зазначений невірно')
  }
  if (docType === 'Свідоцтво про народження' && !birthCertificateMask.test(doc)) {
    throw new Error('Номер свідоцтва про народження зазначений невірно')
  }
  return true
}

export default validateDocumentNumber
