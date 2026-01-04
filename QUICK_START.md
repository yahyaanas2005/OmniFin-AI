# 🚀 Quick Reference - OmniFin AI Environment Setup

## For Developers

### First Time Setup
```bash
# 1. Clone the repository
git clone https://github.com/yahyaanas2005/OmniFin-AI.git
cd OmniFin-AI

# 2. Copy environment template
cp .env.example .env.local

# 3. Edit .env.local and add your Supabase credentials
# Get them from: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd/settings/api

# 4. Install dependencies
npm install

# 5. Verify setup
npm run prebuild

# 6. Start development server
npm run dev
```

### Environment Variables Needed
```bash
NEXT_PUBLIC_SUPABASE_URL=https://kzacbvqfsribzhqwfnfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get-from-supabase-dashboard>
```

## For Deployment

### Vercel Deployment
```bash
# 1. Import repository to Vercel

# 2. Add environment variables in Vercel Dashboard:
#    Settings → Environment Variables → Add:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Deploy!
```

## Useful Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd
- **API Keys**: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd/settings/api
- **Full Setup Guide**: [docs/ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)
- **Deployment Guide**: [docs/DEPLOYMENT.md](DEPLOYMENT.md)

## Troubleshooting

### "Missing environment variables"
→ Make sure `.env.local` exists and contains both variables

### "Supabase connection error"
→ Verify your anon key is correct in `.env.local`

### Build fails
→ Run `npm run prebuild` to check which variables are missing

## Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run prebuild   # Check environment variables
npm run lint       # Run linter
```

## Security Notes

✅ **Safe to commit**: `.env.example`, `vercel.json`  
❌ **Never commit**: `.env.local`, any file with actual credentials

---

**Need help?** Check the full documentation in the `docs/` folder.
