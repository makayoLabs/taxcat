#!/bin/bash

# Deploy to Vercel
# This script builds the static site and deploys it to Vercel

echo "Building static site..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

echo "Build successful. Static files are in 'out/' directory."

# Check if vercel-cli is installed
if ! command -v vercel &> /dev/null; then
  echo "Vercel CLI not found. Installing..."
  npm install -g vercel
fi

echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"