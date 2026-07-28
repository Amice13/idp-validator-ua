const hasLatin = (name: string) => {
  if (/[a-z]/i.test(name)) throw new Error('Це поле не має містити латинські літери')
  return true
}

export default hasLatin
