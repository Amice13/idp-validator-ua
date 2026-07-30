import type { Issue } from '@/types/issue'
import fields from '@/dicts/fields'
import translatedFields from '@/dicts/translate-fields'

const reversedFields = Object.fromEntries(Object.entries(fields).map(el => el.reverse()))

const formatIssue = (issue: Issue) => {
  if (issue?.field === undefined) return
  const fieldIndex = reversedFields[issue?.field]
  const fieldName = translatedFields[fieldIndex as keyof typeof translatedFields]
  if (fieldName === undefined) console.log(issue)
  return {
    fieldName,
    fieldIndex,
    type: issue.type,
    description: issue.description
  }
}

const formatIssues = (issues: Issue[]): string => {
  const processedIssues = issues.map(issue => formatIssue(issue)).filter(el => el !== undefined)
  const errors = processedIssues.filter(issue => issue.type === 'error')
  const warnings = processedIssues.filter(issue => issue.type === 'warning')
  const formattedErrors = errors.map(issue => {
    return `(${issue.fieldIndex}) ${issue.fieldName}: ${issue.description}`
  }).join('\n')
  const formattedWarnings = warnings.map(issue => {
    return `(${issue.fieldIndex}) ${issue.fieldName}: ${issue.description}`
  }).join('\n')

  const text = [
    formattedErrors === '' ? '' : `Помилки\n\n${formattedErrors}`,
    formattedWarnings === '' ? '' : `Попередження\n\n${formattedWarnings}`,
  ].filter(Boolean).join('\n\n')
  return text
}

export default formatIssues
