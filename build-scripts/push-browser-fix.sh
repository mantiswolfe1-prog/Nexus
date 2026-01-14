#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "📦 Committing browser fix and cleanup..."

git add -A
git commit -m "fix: Keep browser tabs on about:blank and prevent external navigation

- Replaced iframe with external link modal for security
- Prevents tabs from navigating away from about:blank
- Opens external sites in new window instead of embedding
- Added back button to return to new tab page"

git push origin main

echo "✅ Browser fix pushed!"
