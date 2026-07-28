const validateBirthCertificate = (value: string | undefined): boolean => {
  if (value === undefined) throw new Error('Номер свідоцтва про народження не зазначений')
  const checkValue = String(value).trim().replace(/[^А-ЯІЄЇҐ0-9I-]/g, '')

  if (/^I-[А-ЯІЄЇҐ]{2}\s{0,1}\d{6}$/g.test(checkValue)) return true

  throw Error('Це невірний номер свідоцтва про народження')
}

export default validateBirthCertificate
