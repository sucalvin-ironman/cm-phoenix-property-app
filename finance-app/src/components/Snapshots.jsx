import React, { useState, useMemo } from 'react'
import { newId } from '../storage.js'
import { formatMoney } from '../currency.js'

function todayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function monthEnd(ym) {
  const [y, m] = ym.split('-').map(Number)
  const d = new Date(Date.UTC(y, m, 0))
  return d.toISOString().slice(0, 10)
}

function currentYM() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export default function Snapshots({ state, update }) {
  const { accounts, snapshots } = state
  const [date, setDate] = useState(todayISO())
  const [draft, setDraft] = useState({})

  const sorted = useMemo(
    () => [...snapshots].sort((a, b) => b.date.localeCompare(a.date)),
    [snapshots]
  )

  function setDraftFor(id, v) {
    setDraft({ ...draft, [id]: v })
  }

  function fillFromLatest() {
    const filled = {}
    for (const a of accounts) {
      const latest = snapshots
        .filter(s => s.accountId === a.id)
        .sort((x, y) => y.date.localeCompare(x.date))[0]
      if (latest) filled[a.id] = String(latest.balance)
    }
    setDraft(filled)
  }

  function saveSnapshots() {
    const additions = []
    for (const a of accounts) {
      const raw = draft[a.id]
      if (raw === undefined || raw === '') continue
      const value = parseFloat(raw)
      if (isNaN(value)) continue
      additions.push({ id: newId(), accountId: a.id, date, balance: value })
    }
    if (!additions.length) {
      alert('Enter at least one balance.')
      return
    }
    update(s => ({ ...s, snapshots: [...s.snapshots, ...additions] }))
    setDraft({})
  }

  function quickSetMonthEnd() {
    setDate(monthEnd(currentYM()))
  }

  function removeSnapshot(id) {
    update(s => ({ ...s, snapshots: s.snapshots.filter(x => x.id !== id) }))
  }

  if (accounts.length === 0) {
    return <div className="card"><div className="muted">Add an account first to record snapshots.</div></div>
  }

  return (
    <div>
      <section className="card">
        <h2>Record Monthly Snapshot</h2>
        <div className="form-row" style={{ marginBottom: 12 }}>
          <label>Date <input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
          <button type="button" onClick={quickSetMonthEnd}>Set to month-end</button>
          <button type="button" onClick={fillFromLatest}>Pre-fill from latest</button>
        </div>
        <table className="data-table">
          <thead><tr><th>Account</th><th>Currency</th><th className="num">Balance</th></tr></thead>
          <tbody>
            {accounts.map(a => (
              <tr key={a.id}>
                <td>{a.name} <span className={`tag tag-${a.type}`}>{a.type}</span></td>
                <td>{a.currency}</td>
                <td className="num">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={draft[a.id] ?? ''}
                    onChange={e => setDraftFor(a.id, e.target.value)}
                    style={{ width: 160, textAlign: 'right' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={saveSnapshots}>Save Snapshots</button>
        </div>
      </section>

      <section className="card">
        <h2>Snapshot History ({sorted.length})</h2>
        {sorted.length === 0 ? (
          <div className="muted">No snapshots recorded.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Date</th><th>Account</th><th className="num">Balance</th><th></th></tr>
            </thead>
            <tbody>
              {sorted.slice(0, 200).map(s => {
                const a = accounts.find(x => x.id === s.accountId)
                if (!a) return null
                return (
                  <tr key={s.id}>
                    <td>{s.date}</td>
                    <td>{a.name}</td>
                    <td className="num">{formatMoney(s.balance, a.currency)}</td>
                    <td><button className="link-btn" onClick={() => removeSnapshot(s.id)}>Delete</button></td>
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
