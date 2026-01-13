#!/bin/bash
# Fix import paths and push

cd /workspaces/Nexus-Community-Project

git add -A
git commit -m "Fix: Correct import paths - use ../utils instead of ../../utils for src/ relative imports"
git push origin main

echo "✅ Pushed import fixes to main"
echo ""
echo "Go to Netlify and trigger a new deploy"
