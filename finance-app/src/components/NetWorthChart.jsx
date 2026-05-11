import React from 'react'
import { formatMoney } from '../currency.js'

export default function NetWorthChart({ series, baseCurrency }) {
  if (!series || series.length < 2) {
    return (
      <div className="chart-empty">
        Add at least two months of snapshots to see your net worth trend.
      </div>
    )
  }

  const width = 720
  const height = 240
  const padding = { top: 20, right: 16, bottom: 28, left: 64 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const values = series.map(s => s.value)
  const max = Math.max(...values)
  const min = Math.min(...values, 0)
  const range = max - min || 1

  const x = i => padding.left + (i / (series.length - 1)) * innerW
  const y = v => padding.top + innerH - ((v - min) / range) * innerH

  const path = series.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(' ')
  const area = `${path} L ${x(series.length - 1).toFixed(1)} ${y(min).toFixed(1)} L ${x(0).toFixed(1)} ${y(min).toFixed(1)} Z`

  const tickCount = 4
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => min + (range * i) / tickCount)
  const xTickStep = Math.max(1, Math.ceil(series.length / 6))

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="chart">
        <defs>
          <linearGradient id="nw-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f8cff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4f8cff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padding.left} x2={width - padding.right} y1={y(t)} y2={y(t)} stroke="#262b35" strokeDasharray="2 4" />
            <text x={padding.left - 8} y={y(t) + 4} textAnchor="end" className="chart-label">
              {formatMoney(t, baseCurrency, { compact: true })}
            </text>
          </g>
        ))}

        <path d={area} fill="url(#nw-grad)" />
        <path d={path} fill="none" stroke="#4f8cff" strokeWidth="2" />

        {series.map((p, i) =>
          i % xTickStep === 0 || i === series.length - 1 ? (
            <g key={p.month}>
              <circle cx={x(i)} cy={y(p.value)} r="3" fill="#4f8cff" />
              <text x={x(i)} y={height - 8} textAnchor="middle" className="chart-label">{p.month.slice(2)}</text>
            </g>
          ) : null
        )}
      </svg>
    </div>
  )
}
