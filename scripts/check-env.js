#!/usr/bin/env node

/**
 * Pre-build environment check script
 * Verifies required Supabase environment variables are present before building
 */

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
  console.error('See docs/DEPLOYMENT.md for more information.\n');
  process.exit(1);
}

console.log('✅ All required environment variables are present');
process.exit(0);
