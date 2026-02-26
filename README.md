# C.M. Phoenix — Luxury Property Presentation App

Trilingual (EN/JA/ZH) luxury real estate platform with AI-powered content generation, interactive maps, client presentations, and CRM dashboard.

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Get Your Anthropic API Key
1. Go to https://console.anthropic.com
2. Create an API key (or use an existing one)
3. Copy the key — you'll need it in Step 4

### Step 2: Push to GitHub
```bash
# In this folder:
git init
git add .
git commit -m "Initial deploy"
# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/cm-phoenix-property-app.git
git branch -M main
git push -u origin main
```

### Step 3: Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Framework Preset: **Vite** (should auto-detect)
5. Click "Deploy"

### Step 4: Add Your API Key
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (your key from Step 1)
3. Click Save
4. Go to **Deployments** → click "..." on latest → **Redeploy**

### Step 5: (Optional) Custom Domain
1. In Vercel → **Settings** → **Domains**
2. Add your domain (e.g. `properties.cmphoenix.com`)
3. Update DNS as instructed

## 📁 Project Structure
```
├── api/
│   └── claude.js          # Serverless proxy (keeps API key secure)
├── src/
│   ├── App.jsx            # Main application (all-in-one)
│   └── main.jsx           # React entry point
├── index.html             # HTML shell
├── package.json           # Dependencies
├── vite.config.js         # Vite config
└── vercel.json            # Vercel settings
```

## 🔒 Security
- API key is stored as a Vercel environment variable (never exposed to browser)
- All Anthropic API calls route through `/api/claude` serverless function
- Optional password protection per property

## ✨ Features
- 4 property types: Development, Resale, Whole Building, Rental
- Trilingual: English, Japanese, Traditional Chinese
- AI: Catch copy, selling points, comparable market search
- Interactive map with landmark discovery (Leaflet + CartoDB Voyager)
- Client presentation view with interest registration
- CRM dashboard with analytics
- PDF export (A4 print-ready)
