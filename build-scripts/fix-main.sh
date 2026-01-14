#!/bin/bash
# Force push correct netlify.toml to main

cd /workspaces/Nexus-Community-Project

echo "Current branch:"
git branch

echo ""
echo "Current status:"
git status

echo ""
echo "Checking main branch netlify.toml:"
git show main:netlify.toml

echo ""
echo "Force pushing current netlify.toml to main..."
git checkout main
git pull origin main
git checkout netlify.toml
git add netlify.toml
git commit -m "Fix netlify.toml: Remove build command to serve pre-built static app" || echo "No changes to commit"
git push origin main --force

echo ""
echo "✅ Pushed to main!"
echo ""
echo "Now trigger a new Netlify deploy"
