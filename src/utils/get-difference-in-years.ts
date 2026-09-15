const getDifferenceInYears = (startDate: Date, endDate: Date): number => {
  let years = endDate.getFullYear() - startDate.getFullYear()

  const hasNotHadBirthdayYet =
    endDate.getMonth() < startDate.getMonth() ||
    (endDate.getMonth() === startDate.getMonth() &&
      endDate.getDate() < startDate.getDate())

  if (hasNotHadBirthdayYet) {
    years--
  }

  return years
}

export default getDifferenceInYears
