const forbiddenLatinRegex = /[A-HJ-UK-NP-RT-WYZa-hj-uk-np-rt-wyz]/
const mixedRegex = /[а-яєіїґ][a-z]|[a-z][а-яєіїґ]/
const russianLettersRegex = /[ъы]/i

const validateCyryllicName = (name: unknown): true => {
  if (typeof name !== 'string') throw new Error('Це обов\'язкове поле для заповнення')
  if (forbiddenLatinRegex.test(name) === true) throw new Error('Містить символи латинкою')
  if (mixedRegex.test(name) === true) throw new Error('Містить символи латинкою')
  if (russianLettersRegex.test(name) === true) throw new Error('Містить літери російської мови')
  return true
}

export default validateCyryllicName
