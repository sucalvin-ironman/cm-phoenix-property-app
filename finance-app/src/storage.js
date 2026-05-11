const STORAGE_KEY = 'finance-app-v1'

export const DEFAULT_STATE = {
  baseCurrency: 'USD',
  fxRates: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 156, CNY: 7.24, HKD: 7.82, SGD: 1.35, AUD: 1.52, CAD: 1.37 },
  accounts: [],
  snapshots: [],
  transactions: []
}

export const ACCOUNT_TYPES = ['cash', 'investment', 'crypto', 'property', 'retirement', 'other']

export const INCOME_CATEGORIES = ['salary', 'bonus', 'dividends', 'interest', 'rental', 'business', 'other']
export const EXPENSE_CATEGORIES = ['housing', 'food', 'transport', 'utilities', 'entertainment', 'health', 'travel', 'tax', 'other']

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function exportState(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `finance-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importState(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        resolve({ ...DEFAULT_STATE, ...data })
      } catch (e) {
        reject(e)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}

export function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
