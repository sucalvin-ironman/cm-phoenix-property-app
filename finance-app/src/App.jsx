import React, { useEffect, useState, useCallback } from 'react'
import { loadState, saveState } from './storage.js'
import Dashboard from './components/Dashboard.jsx'
import Accounts from './components/Accounts.jsx'
import Snapshots from './components/Snapshots.jsx'
import Transactions from './components/Transactions.jsx'
import Settings from './components/Settings.jsx'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'snapshots', label: 'Snapshots' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'settings', label: 'Settings' }
]

export default function App() {
  const [state, setState] = useState(loadState)
  const [tab, setTab] = useState('dashboard')

  useEffect(() => { saveState(state) }, [state])

  const update = useCallback(updater => {
    setState(prev => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  const replace = useCallback(next => setState(next), [])

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">$</span>
          <span>Personal Finance</span>
        </div>
        <nav className="tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={tab === t.id ? 'tab active' : 'tab'}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="muted small">{state.baseCurrency}</div>
      </header>

      <main className="content">
        {tab === 'dashboard' && <Dashboard state={state} />}
        {tab === 'accounts' && <Accounts state={state} update={update} />}
        {tab === 'snapshots' && <Snapshots state={state} update={update} />}
        {tab === 'transactions' && <Transactions state={state} update={update} />}
        {tab === 'settings' && <Settings state={state} update={update} replace={replace} />}
      </main>

      <footer className="footer muted small">
        Data stored locally in your browser. Export from Settings to back up.
      </footer>
    </div>
  )
}
