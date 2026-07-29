const checkIdpDate = (date: string | Date): boolean => {
  let idpDate: Date

  if (typeof date === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

    if (match === null) throw new Error('Невідповідний формат дати')

    const [, yearStr, monthStr, dayStr] = match

    const year = Number(yearStr)
    const month = Number(monthStr)
    const day = Number(dayStr)

    idpDate = new Date(year, month - 1, day)

    // Verify it is a real date
    if (
      idpDate.getFullYear() !== year ||
      idpDate.getMonth() !== month - 1 ||
      idpDate.getDate() !== day
    ) {
      throw new Error('Невідповідний формат дати')
    }
  } else {
    idpDate = date
    if (Number.isNaN(idpDate.getTime())) {
      throw new Error('Невідповідний формат дати')
    }
  }

  const today = new Date()

  today.setHours(0, 0, 0, 0)
  idpDate.setHours(0, 0, 0, 0)

  if (idpDate > today) {
    throw new Error('Дата не може бути більшою ніж сьогоднішній день')
  }

  const oldestAllowed = new Date('2014-01-01')

  if (idpDate < oldestAllowed) throw new Error('Свідоцтво ВПО не може бути видано до 2014 року')
  return true
}

export default checkIdpDate
