export function formatDateToUk(dateString: string): string {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
