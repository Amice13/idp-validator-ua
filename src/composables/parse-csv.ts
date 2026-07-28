// import csvWorker from '@/workers/simple-csv-parser.ts?worker'


// const worker = new csvWorker()

const worker = new Worker(
  new URL('@/workers/simple-csv-parser.ts', import.meta.url),
  { type: 'module' }
)

let requestId = 0

const pending = new Map<
  number,
  { resolve: (v: string[][]) => void; reject: (e: Error) => void }
>()

worker.onmessage = (e: MessageEvent) => {
  const { id, ok, data, error } = e.data

  const entry = pending.get(id)
  if (!entry) return

  pending.delete(id)

  if (ok) entry.resolve(data)
  else entry.reject(new Error(error))
}

export const parseCSV = (
  text: string,
  delimiter?: string
): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const id = requestId++

    pending.set(id, { resolve, reject })

    worker.postMessage({
      id,
      text,
      delimiter
    })
  })
}
