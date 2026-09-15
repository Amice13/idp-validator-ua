const validatePatronymic = (name: string) => {
  if (!/([- ]огли|[- ]к[иі]з[иі]|[оії]вна|ічна|ич|іч)$/.test(name)) throw new Error('По батькові містить помилки')
  return true
}

export default validatePatronymic
