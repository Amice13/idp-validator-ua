import genders from '@/dicts/genders'

const validateGender = (string?: string): boolean => {
  if (typeof string !== 'string') throw new Error('Це обов\'язкове поле для заповнення')
  if (!genders.includes(string)) throw new Error('Невірне значення, має бути зазначене "чоловіча" або "жіноча"')
  return true
}

export default validateGender
