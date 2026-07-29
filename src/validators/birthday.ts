const validateBirthday = (date: string | Date): boolean => {
  let birthday: Date

  if (typeof date === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

    if (match === null) throw new Error('Невідповідний формат дати')

    const [, yearStr, monthStr, dayStr] = match

    const year = Number(yearStr)
    const month = Number(monthStr)
    const day = Number(dayStr)

    birthday = new Date(year, month - 1, day)

    // Verify it is a real date
    if (
      birthday.getFullYear() !== year ||
      birthday.getMonth() !== month - 1 ||
      birthday.getDate() !== day
    ) {
      throw new Error('Невідповідний формат дати')
    }
  } else {
    birthday = date
    if (Number.isNaN(birthday.getTime())) {
      throw new Error('Невідповідний формат дати')
    }
  }

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
