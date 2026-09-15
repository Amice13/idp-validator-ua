 import convertDate from '@/utils/convert-date'

const validateBirthday = (date?: string | Date): boolean => {
  const birthday = convertDate(date)
  if (birthday === null) throw new Error('Це обов\'язкове поле для заповнення')

  const today = new Date()

  today.setHours(0, 0, 0, 0)
  birthday.setHours(0, 0, 0, 0)

  if (birthday > today) {
    throw new Error('Дата не може бути більшою ніж сьогоднішній день')
  }

  const oldestAllowed = new Date(today)
  oldestAllowed.setFullYear(oldestAllowed.getFullYear() - 120)

  if (birthday < oldestAllowed) throw new Error('Особа не має бути старшою за 120 років')
  return true
}

export default validateBirthday
