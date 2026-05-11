import React, { useState, useRef } from 'react'
import { exportState, importState, DEFAULT_STATE } from '../storage.js'

export default function Settings({ state, update, replace }) {
  const { fxRates, baseCurrency } = state
  const [newCode, setNewCode] = useState('')
  const [newRate, setNewRate] = useState('')
  const fileRef = useRef(null)

  function setBase(code) {
    update(s => ({ ...s, baseCurrency: code }))
  }

  function setRate(code, rate) {
    const v = parseFloat(rate)
    if (isNaN(v) || v <= 0) return
    update(s => ({ ...s, fxRates: { ...s.fxRates, [code]: v } }))
  }

  function addCurrency() {
    const code = newCode.trim().toUpperCase()
    const rate = parseFloat(newRate)
    if (!code || isNaN(rate) || rate <= 0) {
      alert('Provide a currency code and a positive rate.')
      return
    }
    update(s => ({ ...s, fxRates: { ...s.fxRates, [code]: rate } }))
    setNewCode('')
    setNewRate('')
  }

  function removeCurrency(code) {
    if (code === baseCurrency) { alert('Cannot remove the base currency.'); return }
    if (!confirm(`Remove ${code}? Existing entries in this currency will not convert correctly.`)) return
    update(s => {
      const copy = { ...s.fxRates }
      delete copy[code]
      return { ...s, fxRates: copy }
    })
  }

  async function onImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const next = await importState(file)
      if (!confirm('This will replace all your current data. Continue?')) return
      replace(next)
    } catch {
      alert('Could not read file.')
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function resetAll() {
    if (!confirm('Erase ALL data and start over? This cannot be undone.')) return
    replace({ ...DEFAULT_STATE })
  }

  return (
    <div>
      <section className="card">
        <h2>Base Currency</h2>
        <p className="muted small">All totals and the dashboard use this currency. FX rates are interpreted as units per 1 USD.</p>
        <select value={baseCurrency} onChange={e => setBase(e.target.value)}>
          {Object.keys(fxRates).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </section>

      <section className="card">
        <h2>Currencies &amp; FX Rates</h2>
        <table className="data-table">
          <thead><tr><th>Code</th><th className="num">Rate (per 1 USD)</th><th></th></tr></thead>
          <tbody>
            {Object.entries(fxRates).map(([code, rate]) => (
              <tr key={code}>
                <td><strong>{code}</strong>{code === baseCurrency && <span className="tag tag-pos" style={{ marginLeft: 8 }}>base</span>}</td>
                <td className="num">
                  <input
                    type="number"
                    step="0.0001"
                    defaultValue={rate}
                    onBlur={e => setRate(code, e.target.value)}
                    style={{ width: 140, textAlign: 'right' }}
                  />
                </td>
                <td><button className="link-btn" onClick={() => removeCurrency(code)} disabled={code === baseCurrency}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-row" style={{ marginTop: 12 }}>
          <input
            placeholder="New code (e.g. KRW)"
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
            style={{ width: 160 }}
          />
          <input
            type="number"
            step="0.0001"
            placeholder="Units per 1 USD"
            value={newRate}
            onChange={e => setNewRate(e.target.value)}
            style={{ width: 180 }}
          />
          <button onClick={addCurrency}>Add Currency</button>
        </div>
      </section>

      <section className="card">
        <h2>Backup &amp; Restore</h2>
        <p className="muted small">Your data is saved in this browser only. Export regularly if you want a backup.</p>
        <div className="form-row">
          <button onClick={() => exportState(state)}>Export JSON</button>
          <button onClick={() => fileRef.current?.click()}>Import JSON…</button>
          <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={onImport} />
          <button className="danger" onClick={resetAll}>Reset all data</button>
        </div>
      </section>
    </div>
  )
}
