const validatePatronymic = (name: string) => {
  if (!/([- ]огли|[- ]к[иі]з[иі]|[оуєії]вна|[іи]чна|ич|іч)$/.test(name)) throw new Error('По батькові містить помилки')
  return true
}

export default validatePatronymic
