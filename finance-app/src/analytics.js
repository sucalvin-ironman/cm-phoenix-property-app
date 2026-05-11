import { convert } from './currency.js'

// "YYYY-MM" key for grouping by month.
export function monthKey(dateStr) {
  return dateStr.slice(0, 7)
}

export function addMonths(ym, n) {
  const [y, m] = ym.split('-').map(Number)
  const d = new Date(Date.UTC(y, m - 1 + n, 1))
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

export function monthsBetween(startYM, endYM) {
  const [y1, m1] = startYM.split('-').map(Number)
  const [y2, m2] = endYM.split('-').map(Number)
  return (y2 - y1) * 12 + (m2 - m1)
}

// For each account, find the most recent snapshot on or before the given month-end.
export function netWorthAt(ym, accounts, snapshots, fxRates, baseCurrency) {
  let total = 0
  const monthEnd = ym + '-31'
  for (const acct of accounts) {
    const relevant = snapshots
      .filter(s => s.accountId === acct.id && s.date <= monthEnd)
      .sort((a, b) => b.date.localeCompare(a.date))[0]
    if (relevant) {
      total += convert(relevant.balance, acct.currency, baseCurrency, fxRates)
    }
  }
  return total
}

// Build month-by-month net worth series across the snapshot date range.
export function netWorthSeries(accounts, snapshots, fxRates, baseCurrency) {
  if (!snapshots.length || !accounts.length) return []
  const dates = snapshots.map(s => monthKey(s.date)).sort()
  let start = dates[0]
  const today = new Date()
  const end = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  const series = []
  let cursor = start
  // Safety cap to avoid runaway loops on bad data.
  for (let i = 0; i < 600; i++) {
    series.push({ month: cursor, value: netWorthAt(cursor, accounts, snapshots, fxRates, baseCurrency) })
    if (cursor === end) break
    cursor = addMonths(cursor, 1)
  }
  return series
}

export function growthMetrics(series) {
  if (series.length < 2) return { mom: null, qoq: null, yoy: null, cagr: null, current: series[0]?.value ?? 0, first: series[0]?.value ?? 0 }
  const current = series[series.length - 1].value
  const first = series[0].value

  const monthAgo = series[series.length - 2]
  const quarterAgo = series[series.length - 4]
  const yearAgo = series[series.length - 13]

  const pct = (latest, prev) => (prev && prev !== 0 ? (latest - prev) / Math.abs(prev) : null)

  const months = series.length - 1
  const years = months / 12
  const cagr = first > 0 && current > 0 && years > 0 ? Math.pow(current / first, 1 / years) - 1 : null

  return {
    current,
    first,
    mom: pct(current, monthAgo?.value),
    qoq: quarterAgo ? pct(current, quarterAgo.value) : null,
    yoy: yearAgo ? pct(current, yearAgo.value) : null,
    cagr
  }
}

// Sums income and expenses in the base currency for a given month or for all-time.
export function cashFlow(transactions, fxRates, baseCurrency, ym = null) {
  let income = 0
  let expense = 0
  for (const t of transactions) {
    if (ym && monthKey(t.date) !== ym) continue
    const amt = convert(t.amount, t.currency, baseCurrency, fxRates)
    if (t.type === 'income') income += amt
    else expense += amt
  }
  return { income, expense, net: income - expense }
}

export function transactionsByCategory(transactions, fxRates, baseCurrency, type, ym = null) {
  const map = {}
  for (const t of transactions) {
    if (t.type !== type) continue
    if (ym && monthKey(t.date) !== ym) continue
    const amt = convert(t.amount, t.currency, baseCurrency, fxRates)
    map[t.category] = (map[t.category] || 0) + amt
  }
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}
