export const formatCurrency = (value, { withCurrency = false } = {}) => {
  const formatted = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' })
    .format((value))

  if (!withCurrency) return formatted.substring(2, formatted.length)
  else return formatted
}