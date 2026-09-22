const getGenderFromAdditionalName = (name: string): string => {
  if (/(к[иі]з[иі]|[оуєії]вна|[іи]чна)$/.test(name)) return 'жіноча'
  return 'чоловіча'
}

export default getGenderFromAdditionalName
