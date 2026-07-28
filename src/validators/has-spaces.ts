const hasSpaces = (name: string) => {
  if (/^ | $/.test(name)) throw new Error('Це поле не має містити пробіли на початку або в кінці')
  return true
}

export default hasSpaces
