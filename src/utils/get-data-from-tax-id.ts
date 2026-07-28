const sourceDate = new Date('1899-12-31')

const getDataFromTaxId = (str: string | number): Partial<Person> => {
  const stringToCheck = String(str)
  let daysSinceBirthday = parseInt(stringToCheck.slice(0, 5))
  if (stringToCheck[0] === undefined) throw Error('This is not a valid tax ID')
  if (parseInt(stringToCheck[0]) > 6) daysSinceBirthday = daysSinceBirthday - 63475
  // Get the numeric represntation of 1899-12-31 and add the number of days + 1
  const birthdaySource = new Date(sourceDate).setTime(sourceDate.getTime() + daysSinceBirthday * 24 * 3600 * 1000)
  // Return to ISO 9601
  const birthday = new Date(birthdaySource).toISOString().substring(0, 10)
  const age = new Date(Date.now() - new Date(birthday).getTime()).getUTCFullYear() - 1970
  const gender = parseInt(stringToCheck.slice(8, 9)) % 2 === 0 ? 'Female' : 'Male'
  return { birthday, gender, age }
}

export default getDataFromTaxId
