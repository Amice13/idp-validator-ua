import mobileOperators from '@/dicts/mobile-operators'

const validSymbols = /^[+\d, ]+$/
const phoneMask = /^\+\d{12}$/

const validatePhone = (phone: string): boolean => {
  if (!validSymbols.test(phone)) throw new Error('Перелік телефонів містить зайві символи')
  const phones = phone.split(/ *, */g)
  for (const p of phones) {
    if (!phoneMask.test(p)) throw new Error('Номер телефону не повний')
    if (!mobileOperators.includes(p.slice(3,6))) throw new Error('Номер телефону містить неіснючий мобільний оператор')
  }
  return true
}

export default validatePhone
