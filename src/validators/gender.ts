import genders from '@/dicts/genders'

const validateGender = (string: string): boolean => {
  if (genders.includes(string)) throw new Error('Невірне значення')
  return true
}

export default validateGender
