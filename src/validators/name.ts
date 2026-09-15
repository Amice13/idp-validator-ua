const validateName = (name: string) => {
  if (!/^[а-яєїіг'-]+$/i.test(name)) throw new Error('Це поле містить недозволені символи')
  return true
}

export default validateName
