const hasRussianLetters = (name: string) => {
  if (/[ъы]/i.test(name)) throw new Error('Це поле не має містити російські літери')
  return true
}

export default hasRussianLetters
