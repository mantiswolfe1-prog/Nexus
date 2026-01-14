#!/bin/bash
# Clean build and restart development server

echo "🧹 Cleaning build folder..."
rm -rf build/

echo "🧹 Cleaning node_modules cache..."
rm -rf node_modules/.cache/

echo "✅ Clean complete! Now rebuild with: npm start"
