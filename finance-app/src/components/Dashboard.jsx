import React, { useMemo } from 'react'
import { formatMoney, formatPercent, convert } from '../currency.js'
import { netWorthSeries, growthMetrics, cashFlow, transactionsByCategory } from '../analytics.js'
import NetWorthChart from './NetWorthChart.jsx'

export default function Dashboard({ state }) {
  const { accounts, snapshots, transactions, fxRates, baseCurrency } = state

  const series = useMemo(
    () => netWorthSeries(accounts, snapshots, fxRates, baseCurrency),
    [accounts, snapshots, fxRates, baseCurrency]
  )
  const metrics = useMemo(() => growthMetrics(series), [series])

  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthFlow = cashFlow(transactions, fxRates, baseCurrency, currentMonth)
  const allTimeFlow = cashFlow(transactions, fxRates, baseCurrency)

  const breakdown = useMemo(() => {
    const map = {}
    for (const acct of accounts) {
      const latest = snapshots
        .filter(s => s.accountId === acct.id)
        .sort((a, b) => b.date.localeCompare(a.date))[0]
      if (!latest) continue
      const v = convert(latest.balance, acct.currency, baseCurrency, fxRates)
      map[acct.type] = (map[acct.type] || 0) + v
    }
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1])
    const total = entries.reduce((s, [, v]) => s + v, 0) || 1
    return entries.map(([type, value]) => ({ type, value, share: value / total }))
  }, [accounts, snapshots, fxRates, baseCurrency])

  const topExpenses = useMemo(
    () => transactionsByCategory(transactions, fxRates, baseCurrency, 'expense', currentMonth).slice(0, 5),
    [transactions, fxRates, baseCurrency, currentMonth]
  )

  return (
    <div className="dashboard">
      <div className="kpi-grid">
        <Kpi label="Net Worth" value={formatMoney(metrics.current, baseCurrency)} accent />
        <Kpi label="Month-over-Month" value={formatPercent(metrics.mom)} trend={metrics.mom} />
        <Kpi label="Year-over-Year" value={formatPercent(metrics.yoy)} trend={metrics.yoy} />
        <Kpi label="CAGR (since start)" value={formatPercent(metrics.cagr)} trend={metrics.cagr} />
      </div>

      <section className="card">
        <h2>Net Worth Trend</h2>
        <NetWorthChart series={series} baseCurrency={baseCurrency} />
      </section>

      <div className="two-col">
        <section className="card">
          <h2>This Month — Cash Flow ({currentMonth})</h2>
          <FlowRow label="Income" value={monthFlow.income} currency={baseCurrency} color="pos" />
          <FlowRow label="Expense" value={-monthFlow.expense} currency={baseCurrency} color="neg" />
          <FlowRow label="Net" value={monthFlow.net} currency={baseCurrency} bold />
          <div className="muted small" style={{ marginTop: 12 }}>
            All-time net: <strong>{formatMoney(allTimeFlow.net, baseCurrency)}</strong>
          </div>
        </section>

        <section className="card">
          <h2>Asset Allocation</h2>
          {breakdown.length === 0 ? (
            <div className="muted">No snapshots yet.</div>
          ) : (
            <div className="allocation">
              {breakdown.map(b => (
                <div key={b.type} className="alloc-row">
                  <div className="alloc-label">
                    <span className={`dot dot-${b.type}`} /> {b.type}
                  </div>
                  <div className="alloc-bar"><div style={{ width: `${b.share * 100}%` }} /></div>
                  <div className="alloc-value">{formatMoney(b.value, baseCurrency, { compact: true })}</div>
                  <div className="alloc-pct">{(b.share * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="card">
        <h2>Top Expense Categories — {currentMonth}</h2>
        {topExpenses.length === 0 ? (
          <div className="muted">No expenses logged this month.</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Category</th><th className="num">Amount</th></tr></thead>
            <tbody>
              {topExpenses.map(e => (
                <tr key={e.category}>
                  <td>{e.category}</td>
                  <td className="num">{formatMoney(e.amount, baseCurrency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

function Kpi({ label, value, trend, accent }) {
  const cls = accent ? 'kpi accent' : trend == null ? 'kpi' : trend >= 0 ? 'kpi pos' : 'kpi neg'
  return (
    <div className={cls}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
    </div>
  )
}

function FlowRow({ label, value, currency, color, bold }) {
  return (
    <div className={`flow-row ${bold ? 'bold' : ''}`}>
      <span>{label}</span>
      <span className={color}>{formatMoney(value, currency)}</span>
    </div>
  )
}
