const validateCategory = (category?: string): boolean => {
  if (typeof category !== 'string') throw new Error('Це обов\'язкове поле для заповнення')
  if (!['1', '2'].includes(category)) throw new Error('Має недопустиме значення, має бути зазначене "1" або "2"')
  return true
}

export default validateCategory
