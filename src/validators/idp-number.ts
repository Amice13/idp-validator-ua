const regex = /^\d{4}-\d{10}$/

const validateIdpNumber = (string: string) => {
  if (!regex.test(string)) {
    throw new Error('Номер свідоцтва ВПО не відповідає шаблону. Очікуються 14 цифр у форматі ХХХХ-ХХХХХХХХХХ. Якщо ви впевнені, що номер дійсно відрізняється від визначеного формату, ви можете пропустити це попередження.')
  }
  return true
}

export default validateIdpNumber
