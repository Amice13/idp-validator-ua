const hasSpaces = (name: string) => {
  if (/^ | $/.test(name)) throw new Error('Це поле не має містити пробіли на початку або в кінці')
  if (/ {2,}/.test(name)) throw new Error('Це поле не має містити два та більше пробіли поруч')
  return true
}

export default hasSpaces
