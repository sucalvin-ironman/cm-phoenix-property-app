// FX rates are stored as "units of currency per 1 unit of USD".
// Conversion: amount_in_target = amount * (rateTo / rateFrom).

export function convert(amount, from, to, fxRates) {
  if (!amount || from === to) return amount || 0
  const rateFrom = fxRates[from]
  const rateTo = fxRates[to]
  if (!rateFrom || !rateTo) return amount
  return (amount / rateFrom) * rateTo
}

export function formatMoney(amount, currency, opts = {}) {
  const { compact = false, signed = false } = opts
  if (amount === null || amount === undefined || isNaN(amount)) return '—'
  const abs = Math.abs(amount)
  const sign = signed && amount > 0 ? '+' : amount < 0 ? '-' : ''
  const fractionDigits = currency === 'JPY' || currency === 'KRW' ? 0 : 2
  let formatted
  if (compact && abs >= 1000) {
    formatted = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(abs)
  } else {
    formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    }).format(abs)
  }
  return `${sign}${currencySymbol(currency)}${formatted}`
}

export function currencySymbol(code) {
  const map = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', HKD: 'HK$', SGD: 'S$', AUD: 'A$', CAD: 'C$' }
  return map[code] || `${code} `
}

export function formatPercent(value, digits = 2) {
  if (value === null || value === undefined || isNaN(value) || !isFinite(value)) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${(value * 100).toFixed(digits)}%`
}
