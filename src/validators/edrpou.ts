const validateEdrpou = (value: number | string | undefined): boolean => {
  if (value === undefined) throw new Error('ЄДРПОУ не зазначено')
  const edrpou = String(value).padStart(8, '0')
  const isSpecific = parseInt(edrpou) > 30000000 && parseInt(edrpou) < 60000000
  const numbers = edrpou.split('').map(x => parseInt(x))
  let coefficients = isSpecific ? [7, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7]
  let sum = coefficients.reduce((acc, val, i) => acc + val * (numbers?.[i] ?? 0), 0)
  let result = sum % 11
  console.log(result)
  if (result === 10) {
    coefficients = isSpecific ? [9, 3, 4, 5, 6, 7, 8] : [3, 4, 5, 6, 7, 8, 9]
    sum = coefficients.reduce((acc, val, i) => acc + val * (numbers?.[i] ?? 0), 0)
    result = sum % 11 % 10
  }
  if (numbers[7] !== result) throw new Error('Це невірний код ЄДРПОУ')
  return numbers[7] === result
}

const regex = /\d{8}/

const validateOrganization = (organization?: string) => {
  if (organization === undefined) throw new Error('Це обов\'язкове поле для заповнення')
  const match = organization.match(regex)
  if (match === null) throw new Error('Це поле не містить код ЄДРПОУ')
  const edrpou = match[0]
  if (edrpou === undefined) throw new Error('Це поле не містить код ЄДРПОУ')
  return validateEdrpou(edrpou)
}

export default validateOrganization
