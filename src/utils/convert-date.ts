const convertDate = (date?: string | Date): Date | null => {
  if (date === undefined) return null
  if (date instanceof Date) {
    if (Number.isNaN(date.getTime())) {
      throw new Error('Невідповідний формат дати')
    }
    return date
  }

  const convertedString = date.replace(/^(\d{2})\.(\d{2})\.(\d{4})$/, '$3-$2-$1')
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(convertedString)

  if (match === null) throw new Error('Невідповідний формат дати')

  const [, yearStr, monthStr, dayStr] = match

  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)

  const realDate = new Date(year, month - 1, day)

  // Verify it is a real date
  if (
    realDate.getFullYear() !== year ||
    realDate.getMonth() !== month - 1 ||
    realDate.getDate() !== day
  ) {
    throw new Error('Невідповідний формат дати')
  }
  return realDate
}

export default convertDate
