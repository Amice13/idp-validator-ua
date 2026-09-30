const getGenderFromAdditionalName = (name: string): 'жіноча' | 'чоловіча' | null => {
  if (/(к[иі]з[иі]|[оуєії]вна|[іи]чна)$/.test(name)) return 'жіноча'
  if (/(в[иі]ч)$/.test(name)) return 'чоловіча'
  return null
}

export default getGenderFromAdditionalName
