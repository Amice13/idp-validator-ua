const regex = /^\d{4}-\d{10}$/

const validateIdpNumber = (string: string) => {
  if (!regex.test(string)) throw new Error('Номер свідоцтва ВПО не відповідає шаблону')
  return true
}

export default validateIdpNumber
