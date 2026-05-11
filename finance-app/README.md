# Personal Finance Tracker

A self-hosted, browser-only app to track assets, income/expenses, and growth rate.
Built with Vite + React. Data lives in `localStorage` (no backend, no signup).

## Features

- **Accounts** — cash, investment, crypto, property, retirement, or other; each in any currency
- **Monthly snapshots** — record period-end balances per account; "pre-fill from latest" makes monthly updates fast
- **Transactions** — log income/expense with category, multi-currency, monthly filter
- **Dashboard** — net worth (in base currency), MoM / YoY / CAGR growth, asset allocation, this-month cash flow, top expense categories
- **Multi-currency** — set a base currency; everything converts via editable FX rates (units per 1 USD)
- **Backup** — export/import all data as JSON

## Quick start

```bash
cd finance-app
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Add New… → Project", import the repo, and set the **Root Directory** to `finance-app`.
3. Framework preset auto-detects as Vite. Click Deploy.

No environment variables are required — the app is fully client-side.

## How growth is calculated

- A monthly net-worth series is built from the most recent snapshot of each account at each month-end, all converted to the base currency.
- **MoM / YoY** — % change vs. one and twelve months ago.
- **CAGR** — `(current / first)^(1/years) - 1` over the snapshot range.

## Data layout

`localStorage` key: `finance-app-v1`

```jsonc
{
  "baseCurrency": "USD",
  "fxRates": { "USD": 1, "JPY": 156, ... },     // units per 1 USD
  "accounts":   [{ "id", "name", "type", "currency", "notes" }],
  "snapshots":  [{ "id", "accountId", "date" /* YYYY-MM-DD */, "balance" }],
  "transactions": [{ "id", "date", "type" /* income|expense */, "category", "amount", "currency", "notes" }]
}
```

Export from **Settings → Export JSON** anytime to back up.
