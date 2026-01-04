#!/usr/bin/env node

/**
 * Pre-build environment check script
 * Verifies required Supabase environment variables are present before building
 * 
 * Note: Next.js automatically loads .env.local during build, so this script
 * primarily validates that variables are set in CI/CD environments or when
 * running manually. For local development, Next.js handles loading .env.local.
 */

const fs = require('fs');
const path = require('path');

// Try to load .env.local for local development verification
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        // Only set if not already in environment (env vars take precedence)
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

let missingVars = [];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
}

if (missingVars.length > 0) {
  console.error('❌ Build failed: Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\nPlease set these environment variables before building.');
  console.error('For local development: Ensure .env.local exists with correct values.');
  console.error('For production: Set environment variables in your deployment platform.');
  console.error('See docs/DEPLOYMENT.md for more information.\n');
  process.exit(1);
}

console.log('✅ All required environment variables are present');
process.exit(0);
