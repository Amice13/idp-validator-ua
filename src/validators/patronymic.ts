const validatePatronymic = (name: string) => {
  if (!/(огли|к[иі]з[иі]|[оії]вна|ічна|ович|лліч)$/.test(name)) throw new Error('По батькові містить помилки')
  return true
}

export default validatePatronymic
