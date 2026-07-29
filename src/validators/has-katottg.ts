import admin1 from '@/dicts/admin1'
import admin2 from '@/dicts/admin2'
import admin3 from '@/dicts/admin3'
import admin4 from '@/dicts/admin4'

const regex = /UA\d{17}/

const hasKatottg = (admin: string | undefined, level?: number): boolean => {
  if (admin === undefined) throw new Error('Поле не містить значення')
  const match = admin.match(regex)
  if (match === null) throw new Error('Поле не містить КАТОТТГ')
  const katottg = match[0]
  if (katottg === undefined) throw new Error('Поле не містить КАТОТТГ')
  if (level === 1) {
    if (!admin1.includes(katottg)) throw new Error('Поле містить невалідний КАТОТТГ')
  }
  if (level === 2) {
    if (!admin2.includes(katottg)) throw new Error('Поле містить невалідний КАТОТТГ')
  }
  if (level === 3) {
    if (!admin3.includes(katottg)) throw new Error('Поле містить невалідний КАТОТТГ')
  }
  if (level === 4) {
    if (!admin4.includes(katottg)) throw new Error('Поле містить невалідний КАТОТТГ')
  }
  return true
}

export default hasKatottg
