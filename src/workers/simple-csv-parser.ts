// simple-csv-parser.worker.ts

interface RequestMessage {
  id: number
  text: string
  delimiter?: string
}

type ResponseMessage =
  | { id: number; ok: true; data: string[][] }
  | { id: number; ok: false; error: string }

self.onmessage = (e: MessageEvent<RequestMessage>) => {
  const { id, text, delimiter } = e.data

  try {
    const d = delimiter ?? guessDelimiter(text)
    const data = parseCSV(text, d)

    const res: ResponseMessage = { id, ok: true, data }
    self.postMessage(res)
  } catch (err: any) {
    const res: ResponseMessage = { id, ok: false, error: err.message }
    self.postMessage(res)
  }
}

function guessDelimiter(text: string): string {
  // ponytail: naive heuristic, fails on pathological data;
  // upgrade path: count delimiters in first line
  if (text.includes('\t')) return '\t'
  if (text.includes(';')) return ';'
  return ','
}

function parseCSV(str: string, delimiter = ','): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false

  for (let i = 0; i < str.length; i++) {
    const c = str[i]
    const n = str[i + 1]

    if (c === '"' && quoted && n === '"') {
      field += '"'
      i++
      continue
    }

    if (c === '"' && !quoted && field === '') {
      quoted = true
      continue
    }

    if (c === '"' && quoted) {
      if (n && n !== delimiter && n !== '\n' && n !== '\r') {
        throw new Error('Invalid CSV')
      }
      quoted = false
      continue
    }

    if (!quoted && c === delimiter) {
      row.push(field)
      field = ''
      continue
    }

    if (!quoted && (c === '\n' || c === '\r')) {
      row.push(field)
      rows.push(row)
      row = []
      field = ''

      if (c === '\r' && n === '\n') i++
      continue
    }

    field += c
  }

  if (quoted) throw new Error('Unterminated quoted field')

  if (field.length || row.length) {
    row.push(field)
    rows.push(row)
  }

  return rows
}
