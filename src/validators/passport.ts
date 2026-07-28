const validatePassport = (value: number | string | undefined): boolean => {
  if (value === undefined) throw new Error('Passport is not set')
  const checkValue = String(value).trim().replace(/[^А-ЯІЄЇҐ0-9]/g, '')

  // ID-card
  if (/^\d{9}$/.test(checkValue)) return true

  // Check old passport
  if (/[А-ЯІЄЇҐ]{2}\d{6}/g.test(checkValue)) return true

  throw Error('Це невірний номер паспорту')
}

export default validatePassport
