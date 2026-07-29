import fields from '@/dicts/fields'
const headerNames = Object.keys(fields)

const convertRowsToObjects = (rows: Array<unknown[]>): Array<Record<string, unknown>> => {
  let headersIndex = -1
  for (const row of rows) {
    headersIndex++
    const number = row.filter((el) => headerNames.includes(el as string)).filter(Boolean).length
    if ((number / row.length) > 0.8) break 
  }
  if (headersIndex === -1) throw new Error('Таблиця не містить заголовків')
  const headers = rows[headersIndex]?.map(name => fields[name as keyof typeof fields])
  if (headers === undefined) throw new Error('Таблиця не містить заголовків')
  const data = rows.slice(headersIndex + 1).map(row => {
    let obj: Record<string, unknown> = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      if (header === undefined) continue
      obj[header] = row[i]
    }
    return obj
  })
  return data
}

export default convertRowsToObjects
