const getGenderFromAdditionalName = (name: string): string => {
  if (/(к[иі]з[иі]|[оії]вна|ічна)$/.test(name)) return 'жіноча'
  return 'чоловіча'
}

export default getGenderFromAdditionalName
