const regex = /UA\d{17}/

const extractKatottg = (string: string): string | null => {
  const match = string.match(regex)
  if (match === null) return null
  return match[0]
}

export default extractKatottg
