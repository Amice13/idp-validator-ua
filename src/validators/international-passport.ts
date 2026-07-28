const validateInternationalPassport = (value: string): boolean => {
  if (value === undefined) throw new Error('Passport is not set')
  const checkValue = String(value).trim().replace(/[^А-ЯІЄЇҐ0-9]/g, '')

  if (/[A-Z]{2}\s{0,1}\d{6}/g.test(checkValue)) return true

  throw Error('Це невірний номер паспорту для виїзду за кордон')
}

export default validateInternationalPassport
