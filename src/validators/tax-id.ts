const mult = [-1, 5, 7, 9, 4, 6, 10, 5, 7]

const validateTaxId = (value: number | string | undefined): boolean => {
  if (value === undefined) throw new Error('Номер РНОКПП не зазначено')
  const checkValue = String(value).trim()
  if (!(/^\d{10}$/.test(checkValue))) throw new Error('Номер РНОКПП має містити 10 цифр')
  const numbers = checkValue.slice(0, 9).split('').map(el => parseInt(el))
  const checkSum = numbers.reduce((acc: number, val: number, i: number) => acc + val * (mult[i] ?? 0), 0) % 11 % 10
  if (parseInt(checkValue.slice(9, 10)) !== checkSum) throw new Error('Цей номер РНОКПП є невірним')
  return true
}

export default validateTaxId
