const checkVulnerabilities = (vulnerabilitiesString: string) => {
  const vulnerabilities = vulnerabilitiesString.split(/ *, */g)
  const numbers = vulnerabilities.map(el => Number(el))
  if (numbers.some(el => isNan(el))) throw new Error('Перелік вразливих категорій містить помилку')
  const max = Math.max(...numbers)
  if (max > 11) throw new Error('Перелік вразливостей містить недопустимі значення')
  const min = Math.min(...numbers)
  if (min < 1) throw new Error('Перелік вразливостей містить недопустимі значення')
  return true
}

export default checkVulnerabilities
