# Deployment Guide

## Required Environment Variables

The following environment variables are required for production deployment:

### Supabase Configuration

- **`NEXT_PUBLIC_SUPABASE_URL`**: Your Supabase project URL
  - Example: `https://xxxxxxxxxxxxx.supabase.co`
  - Where to find: Supabase Dashboard → Project Settings → API → Project URL

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Your Supabase anonymous/public API key
  - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Where to find: Supabase Dashboard → Project Settings → API → Project API keys → `anon` `public`

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

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add each required environment variable with its value
4. Redeploy your application

## Build-time Validation

The project includes a pre-build check (`scripts/check-env.js`) that validates all required environment variables are present before building. If any variables are missing, the build will fail with a clear error message indicating which variables need to be set.

## Security Notes

- Never commit `.env.local` or any file containing actual credentials to version control
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- Use Vercel's environment variable interface for production deployments
- The `NEXT_PUBLIC_` prefix makes these variables available in the browser, so never use this prefix for secret keys
