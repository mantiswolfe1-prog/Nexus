#!/bin/bash
# Merge feature branch to main and push

cd /workspaces/Nexus-Community-Project

echo "Switching to main branch..."
git checkout main

echo "Pulling latest main..."
git pull origin main

echo "Merging feature branch..."
git merge codespace-friendly-guide-97rrr999p4r42x5g9

echo "Pushing main..."
git push origin main

echo ""
echo "✅ Merged to main!"
echo ""
echo "Now go to Netlify and trigger a new deploy."
echo "It will clone from main and use the updated netlify.toml"
