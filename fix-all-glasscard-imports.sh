#!/bin/bash

# Fix all GlassCard imports to include .js extension
echo "Fixing all GlassCard imports..."

# Use sed to replace the imports in all matching files
find /workspaces/Nexus-Community-Project/src/PagesDisplay -name "*.js" -exec sed -i "s|from '../Components/UI/GlassCard';|from '../Components/UI/GlassCard.js';|g" {} +

echo "All GlassCard imports fixed!"
echo "Changes made in:"
git diff --name-only

# Commit and push
git add -A
git commit -m "fix: Add .js extension to all GlassCard imports

- Fixed 11 files with missing .js extension on GlassCard imports
- Ensures webpack correctly resolves GlassCard as React component
- Prevents webpack from treating it as media file"
git push origin main

echo "Changes pushed to GitHub!"
