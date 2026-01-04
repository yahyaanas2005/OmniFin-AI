# Environment Variables Setup Guide

## Overview

OmniFin AI requires Supabase for authentication, database, and real-time features. This guide explains how to configure the environment variables for local development and production deployment.

## Required Environment Variables

### NEXT_PUBLIC_SUPABASE_URL
- **Description**: Your Supabase project URL
- **Format**: `https://[PROJECT_ID].supabase.co`
- **Current Value**: `https://kzacbvqfsribzhqwfnfd.supabase.co`
- **Where to find**: Supabase Dashboard → Settings → API → Project URL

### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Description**: Your Supabase anonymous/public API key (safe to use in browser)
- **Format**: JWT token string (starts with `eyJ...`)
- **Where to find**: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`

## Local Development Setup

### Step 1: Create Environment File

Copy the example environment file:
```bash
cp .env.example .env.local
```

### Step 2: Add Your Credentials

Edit `.env.local` and add your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kzacbvqfsribzhqwfnfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6YWNidnFmc3JpYnpocXdmbmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0ODEyNDksImV4cCI6MjA4MzA1NzI0OX0.gqWOg_TNyqGbp1AEp93OV9PpjHWecUYrjkodVtSppcg
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Verify Configuration

Run the environment check:
```bash
npm run prebuild
```

You should see: `✅ All required environment variables are present`

### Step 5: Start Development Server

```bash
npm run dev
```

The server will start at http://localhost:3000

## Production Deployment (Vercel)

### Method 1: Vercel Dashboard (Recommended)

The project includes a `vercel.json` file that defines the required environment variables. Follow these steps:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or import the OmniFin-AI repository)
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://kzacbvqfsribzhqwfnfd.supabase.co`
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Get this from your `.env.local` file or Supabase Dashboard → Settings → API → anon key
   - Environments: ✅ Production ✅ Preview ✅ Development

5. Save and redeploy

### Method 2: Using Vercel CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter: https://kzacbvqfsribzhqwfnfd.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste the anon key from your .env.local file
```

### Method 3: Bulk Import (Advanced)

If you have many environment variables, you can use Vercel's bulk import feature:

1. Create a file with your environment variables (don't commit this!)
2. Go to Vercel Dashboard → Settings → Environment Variables
3. Use the "Paste .env" option to import multiple variables at once

## Supabase Project Information

- **Project ID**: `kzacbvqfsribzhqwfnfd`
- **Project URL**: `https://kzacbvqfsribzhqwfnfd.supabase.co`
- **Dashboard**: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd
- **API Settings**: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd/settings/api

## Verification Steps

### Local Development
1. Start the dev server: `npm run dev`
2. Check the console - you should NOT see any Supabase credential warnings
3. The Next.js output should show: `Environments: .env.local`

### Production Deployment
1. Check Vercel deployment logs for any environment variable errors
2. Visit your deployed site
3. Open browser DevTools → Console
4. Look for Supabase connection errors (there should be none)

## Troubleshooting

### Error: "Supabase credentials are not set"

**Solution**: Make sure your `.env.local` file exists and contains both environment variables.

### Error: "Build failed: Missing required environment variables"

**Solution**: 
- For local development: Create/update `.env.local` file
- For Vercel: Add environment variables in Vercel dashboard

### Environment variables not loading

**Solution**: 
- Restart your dev server after changing `.env.local`
- Clear Next.js cache: `rm -rf .next` then `npm run dev`
- Verify file is named exactly `.env.local` (not `.env.local.txt`)

### Vercel deployment fails

**Solution**:
- Check Vercel dashboard for environment variables
- Ensure variables are enabled for the correct environments (Production/Preview/Development)
- Trigger a new deployment after adding variables

## Security Best Practices

✅ **DO:**
- Use `.env.local` for local development (already in .gitignore)
- Use Vercel's environment variable UI for production
- Keep your `service_role` key private (never use it in the browser)
- The `anon` key is safe to expose in the browser (it has limited permissions)

❌ **DON'T:**
- Commit `.env.local` to version control
- Share your `service_role` secret key publicly
- Use production credentials in development
- Hardcode credentials in your source code

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
