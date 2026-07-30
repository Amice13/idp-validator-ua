<template>
  <div>
    <div
      class="import-text flex-grow-1 mt-2"
      style="min-height: 300px;"
    >
      <div
        v-show="!importText"
        class="text-center drag-text cursor-text"
        :class="{ 'drag-over': isDragover }"
        @click="focus"
      >
        <div v-show="!isDragover">
          <div class="text-title-large mb-2">Завантажте ваші дані тут</div>
          <div>
            Для початку оберіть таблицю Excel, яку ви хочете імпортувати, скопіюйте її до буферу обміну та вставте тут,
          </div>
          <div class="mb-4">також ви можете перетягнути файл сюди або натиснути</div>
          <v-btn @click.stop="trigerFileInput" class="text-uppercase" text="Завантажити" color="primary" />
        </div>

        <div v-show="isDragover">
          <v-icon size="x-large" class="mb-2">
            mdi-upload
          </v-icon>
          <div class="text-h5 mb-2">Перетягніть ваш файл сюди</div>
        </div>
      </div>

      <textarea
        v-model="importText"
        ref="textInput"
        class="w-100 h-100 elevation-2 pa-1"
        data-gramm="false"
        spellcheck="false"
        autocapitalize="none"
        autocorrect="off"
        autocomplete="off"
        @drag.prevent.stop
        @dragstart.prevent.stop
        @dragover.prevent.stop="isDragover = true"
        @dragenter.prevent.stop="isDragover = true"
        @dragend.prevent.stop="isDragover = false"
        @dragleave.prevent.stop="isDragover = false"
        @drop.prevent.stop="upload($event.dataTransfer?.files)"
      />

      <input
        ref="fileInput"
        accept=".xlsx,.csv"
        class="d-none box__file"
        type="file"
        @input="upload(($event?.target as HTMLInputElement)?.files)"
      >

    </div>

    <div class="ml-2 mt-2 text-right">
      <v-btn
        v-show="importText"
        class="ml-2 text-uppercase"
        color="primary"
        @click="processClipboard"
      >
        Імпортувати
      </v-btn>
    </div>
  </div>
</template>

<style>
.import-text {
  position: relative;
}

.import-text > div {
  position: absolute;
  z-index: 2;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.import-text textarea {
  position: absolute;
  background: none;
  z-index: 1;
  border: 1px solid #ccc;
}

.drag-over {
  border: 2px dashed #999;
  background: #ddd;
}
</style>

<script setup lang="ts">
import * as XLSX from 'xlsx'
import { parseCSV } from '@/composables/parse-csv.ts'

const readFileToBuffer = (file: File): Promise<ArrayBuffer> => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onerror = () => reject(reader.error)
  reader.onload = () => resolve(reader.result as ArrayBuffer)
  if (file) reader.readAsArrayBuffer(file)
})

const readFileToText = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => resolve(reader.result as string)
    reader.readAsText(file)
})

const textInput = useTemplateRef('textInput')
const fileInput = useTemplateRef('fileInput')

// Props and emits

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'setLoading',
])

const model = defineModel({
  type: Object,
  default: () => []
})

const isDragover = ref(false)
const importText = ref()

const upload = async (files?: FileList | null): Promise<void> => {
  const file = files?.[0]
  if (!file) return
  emit('setLoading', true)
  const name = file.name
  const processFile = name.endsWith('xlsx') ? processXlsx : processCsv
  const data = await processFile(file)
  model.value = data
  emit('setLoading', false)
  isDragover.value = false
}

const processXlsx = async (file: File): Promise<string[][]> => {
  const buffer = await readFileToBuffer(file)
  const workbook = XLSX.read(buffer, {
    cellDates: true,
    cellNF: false,
    cellText: false
  })
  if (workbook?.SheetNames?.[0] === undefined) throw new Error('Робочий лист не знайдено')
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  if (worksheet === undefined) throw new Error('Робочий лист не знайдено')
  return XLSX.utils.sheet_to_json(worksheet, { header: 1 })
}

const processCsv = async (file: File): Promise<string[][]> => {
  const text = await readFileToText(file)
  const data = await parseCSV(text)
  return data
}

const processClipboard = async (): Promise<void> => {
  emit('setLoading', true)
  if (!importText.value?.match(/[\r\n]/)) {
    model.value = [importText.value]
    return
  }
  const data = await parseCSV(importText.value)
  model.value = data
  emit('setLoading', false)
}

const focus = (): void => {
  if (textInput !== null) textInput.value?.focus()
}

const trigerFileInput = (): void => {
  fileInput.value?.click()
}
</script>
