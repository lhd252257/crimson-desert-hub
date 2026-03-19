#!/bin/bash
cd /Users/lhd/Documents/code/gta6-hub
echo "🧹 Cleaning cache..."
rm -rf .next out
echo "✓ Cache cleared"
echo "🚀 Starting dev server..."
npm run dev
