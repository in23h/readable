export function timestampToDate (timestamp = '') {
  const d = new Date(timestamp)

  return d.toLocaleString()
}

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}
