export function timestampToDate (timestamp = '') {
  const d = new Date(timestamp)
  return d.toString()
}
