# Deployment Guide

## Required Environment Variables

The following environment variables are required for production deployment:

### Supabase Configuration

- **`NEXT_PUBLIC_SUPABASE_URL`**: Your Supabase project URL
  - Example: `https://xxxxxxxxxxxxx.supabase.co`
  - **Current Value**: `https://kzacbvqfsribzhqwfnfd.supabase.co`
  - Where to find: Supabase Dashboard → Project Settings → API → Project URL

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Your Supabase anonymous/public API key
  - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - **Current Value**: See `.env.local` file (not committed to version control)
  - Where to find: Supabase Dashboard → Project Settings → API → Project API keys → `anon` `public`

### Supabase Project Details

- **Project ID**: `kzacbvqfsribzhqwfnfd`
- **Project URL**: `https://kzacbvqfsribzhqwfnfd.supabase.co`
- **Dashboard**: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd
- **API Keys Page**: https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd/settings/api-keys/legacy

## Local Development

1. Create a `.env.local` file in the project root
2. Add the required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

3. Run the development server:

```bash
npm run dev
```

## Production Deployment (Vercel)

### Deploying to Vercel

The project includes a `vercel.json` configuration file that defines required environment variables. When deploying to Vercel, you'll need to configure these values.

### Setting Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project (or import the OmniFin-AI repository)
3. Navigate to **Settings** → **Environment Variables**
4. Add each required environment variable:

   **Variable 1: NEXT_PUBLIC_SUPABASE_URL**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://kzacbvqfsribzhqwfnfd.supabase.co`
   - **Environments**: ✅ Production ✅ Preview ✅ Development (select all)

   **Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key (see `.env.local` or Supabase Dashboard)
   - **Environments**: ✅ Production ✅ Preview ✅ Development (select all)

5. Click **Save** for each variable
6. Redeploy your application (or push a new commit to trigger automatic deployment)

### Alternative: Using Vercel CLI

You can also set environment variables using the Vercel CLI:

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# When prompted, enter: https://kzacbvqfsribzhqwfnfd.supabase.co
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# When prompted, paste your anon key
# Select: Production, Preview, Development
```

### Verifying Deployment

After deployment, you can verify the environment variables are set correctly by:
1. Check Vercel deployment logs for any errors
2. Visit your deployed site and check browser console for any Supabase connection warnings
3. Test authentication features if implemented

## Build-time Validation

The project includes a pre-build check (`scripts/check-env.js`) that validates all required environment variables are present before building. If any variables are missing, the build will fail with a clear error message indicating which variables need to be set.

## Security Notes

- Never commit `.env.local` or any file containing actual credentials to version control
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- Use Vercel's environment variable interface for production deployments
- The `NEXT_PUBLIC_` prefix makes these variables available in the browser, so never use this prefix for secret keys
