import React, { useState, useMemo } from 'react'
import { newId, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../storage.js'
import { formatMoney, convert } from '../currency.js'
import { cashFlow } from '../analytics.js'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function Transactions({ state, update }) {
  const { transactions, fxRates, baseCurrency } = state
  const currencies = Object.keys(fxRates)
  const [form, setForm] = useState({
    date: todayISO(),
    type: 'expense',
    category: 'food',
    amount: '',
    currency: baseCurrency,
    notes: ''
  })
  const [filterMonth, setFilterMonth] = useState('')

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function addTransaction(e) {
    e.preventDefault()
    const amt = parseFloat(form.amount)
    if (isNaN(amt) || amt <= 0) {
      alert('Enter a positive amount.')
      return
    }
    update(s => ({
      ...s,
      transactions: [
        ...s.transactions,
        { id: newId(), ...form, amount: amt }
      ]
    }))
    setForm({ ...form, amount: '', notes: '' })
  }

  function removeTransaction(id) {
    update(s => ({ ...s, transactions: s.transactions.filter(t => t.id !== id) }))
  }

  const filtered = useMemo(() => {
    const list = filterMonth
      ? transactions.filter(t => t.date.startsWith(filterMonth))
      : transactions
    return [...list].sort((a, b) => b.date.localeCompare(a.date))
  }, [transactions, filterMonth])

  const totals = useMemo(
    () => cashFlow(filtered, fxRates, baseCurrency),
    [filtered, fxRates, baseCurrency]
  )

  return (
    <div>
      <section className="card">
        <h2>Log Transaction</h2>
        <form className="form-row" onSubmit={addTransaction}>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <select
            value={form.type}
            onChange={e => {
              const t = e.target.value
              const defaults = t === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]
              setForm({ ...form, type: t, category: defaults })
            }}
          >
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />
          <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            placeholder="Notes"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ margin: 0 }}>Transactions ({filtered.length})</h2>
          <label>
            Filter by month{' '}
            <input
              type="month"
              value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
            />
            {filterMonth && (
              <button className="link-btn" style={{ marginLeft: 8 }} onClick={() => setFilterMonth('')}>clear</button>
            )}
          </label>
        </div>

        <div className="totals-row">
          <div>Income: <span className="pos">{formatMoney(totals.income, baseCurrency)}</span></div>
          <div>Expenses: <span className="neg">{formatMoney(totals.expense, baseCurrency)}</span></div>
          <div>Net: <strong>{formatMoney(totals.net, baseCurrency)}</strong></div>
        </div>

        {filtered.length === 0 ? (
          <div className="muted">No transactions in this view.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th className="num">Amount</th>
                <th className="num">In {baseCurrency}</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 300).map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td><span className={`tag ${t.type === 'income' ? 'tag-pos' : 'tag-neg'}`}>{t.type}</span></td>
                  <td>{t.category}</td>
                  <td className={`num ${t.type === 'income' ? 'pos' : 'neg'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount, t.currency)}
                  </td>
                  <td className="num">{formatMoney(convert(t.amount, t.currency, baseCurrency, fxRates), baseCurrency)}</td>
                  <td className="muted small">{t.notes}</td>
                  <td><button className="link-btn" onClick={() => removeTransaction(t.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
