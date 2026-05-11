import React, { useState } from 'react'
import { ACCOUNT_TYPES, newId } from '../storage.js'
import { formatMoney, convert } from '../currency.js'

export default function Accounts({ state, update }) {
  const { accounts, snapshots, fxRates, baseCurrency } = state
  const [form, setForm] = useState({ name: '', type: 'cash', currency: state.baseCurrency, notes: '' })

  const currencies = Object.keys(fxRates)

  function addAccount(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    update(s => ({
      ...s,
      accounts: [...s.accounts, { id: newId(), ...form, name: form.name.trim() }]
    }))
    setForm({ name: '', type: 'cash', currency: state.baseCurrency, notes: '' })
  }

  function removeAccount(id) {
    if (!confirm('Delete this account and all its snapshots?')) return
    update(s => ({
      ...s,
      accounts: s.accounts.filter(a => a.id !== id),
      snapshots: s.snapshots.filter(sn => sn.accountId !== id)
    }))
  }

  function latestBalance(acctId) {
    const s = snapshots
      .filter(x => x.accountId === acctId)
      .sort((a, b) => b.date.localeCompare(a.date))[0]
    return s ? s.balance : null
  }

  return (
    <div>
      <section className="card">
        <h2>Add Account</h2>
        <form className="form-row" onSubmit={addAccount}>
          <input
            placeholder="Account name (e.g. HSBC Checking)"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            {ACCOUNT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="card">
        <h2>Accounts ({accounts.length})</h2>
        {accounts.length === 0 ? (
          <div className="muted">No accounts yet.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Currency</th>
                <th className="num">Latest Balance</th>
                <th className="num">In {baseCurrency}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(a => {
                const bal = latestBalance(a.id)
                return (
                  <tr key={a.id}>
                    <td>
                      <div>{a.name}</div>
                      {a.notes && <div className="muted small">{a.notes}</div>}
                    </td>
                    <td><span className={`tag tag-${a.type}`}>{a.type}</span></td>
                    <td>{a.currency}</td>
                    <td className="num">{bal == null ? '—' : formatMoney(bal, a.currency)}</td>
                    <td className="num">{bal == null ? '—' : formatMoney(convert(bal, a.currency, baseCurrency, fxRates), baseCurrency)}</td>
                    <td><button className="link-btn" onClick={() => removeAccount(a.id)}>Delete</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
