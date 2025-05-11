export function formatDateToUk(isoString: string): string {
  const date = new Date(isoString);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: userTimeZone,
  }).format(date);
}
