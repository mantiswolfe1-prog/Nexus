#!/bin/bash
# This script will force commit and push all necessary files to GitHub

cd /workspaces/Nexus-Community-Project

echo "Step 1: Check git status..."
git status

echo ""
echo "Step 2: Remove files from git cache that shouldn't be there..."
git rm --cached build/ -r 2>/dev/null || true
git rm --cached node_modules/ -r 2>/dev/null || true

echo ""
echo "Step 3: Stage essential files..."
git add -f package.json
git add -f package-lock.json
git add -f src/
git add -f public/
git add -f jsconfig.json
git add -f tailwind.config.js
git add -f netlify.toml
git add -f .gitignore
git add -f README.md

echo ""
echo "Step 4: Verify files are staged..."
git status

echo ""
echo "Step 5: Commit..."
git commit -m "Force add: All source files and package.json for Netlify build"

echo ""
echo "Step 6: Push to GitHub..."
git push origin codespace-friendly-guide-97rrr999p4r42x5g9

echo ""
echo "✅ Done! Go to Netlify and trigger a new deploy."
