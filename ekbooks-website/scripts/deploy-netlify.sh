#!/bin/bash

# Deploy to Netlify
# This script builds the static site and deploys it to Netlify

echo "Building static site..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

echo "Build successful. Static files are in 'out/' directory."

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
  echo "Netlify CLI not found. Installing..."
  npm install -g netlify-cli
fi

echo "Deploying to Netlify..."
netlify deploy --dir=out --prod

echo "Deployment complete!"