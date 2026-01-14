#!/bin/bash
# Resolve merge conflict and push

cd /workspaces/Nexus-Community-Project

echo "Adding resolved files..."
git add README.md netlify.toml

echo "Committing..."
git commit -m "Resolve merge conflict and finalize netlify.toml for static deployment"

echo "Pushing to main..."
git push origin main

echo ""
echo "✅ All done! README.md conflict resolved and netlify.toml pushed"
echo ""
echo "Now go to Netlify and trigger a new deploy"
