const validatePatronymic = (name: string) => {
  if (!/(огли|к[иі]з[иі]|[оі]вна|ічна|ович|лліч)$/) throw new Error('По батькові містить помилки')
  return true
}

export default validatePatronymic
