#!/bin/bash
# Complete fix: Rename files and update App.js imports

set -e

cd /workspaces/Nexus-Community-Project

echo "================================"
echo "Fixing React import extensions"
echo "================================"

# Rename PagesDisplay files
echo "Renaming PagesDisplay files..."
cd src/PagesDisplay
for file in AdminDashboard Auth Backgrounds Browser Consent Games Landing Music Privacy RegularDashboard Settings Social StudyTools Utilities Videos; do
  if [ -f "$file" ] && [ ! -f "$file.js" ]; then
    mv "$file" "$file.js"
    echo "  ✓ $file → $file.js"
  fi
done
cd ../..

# Update App.js imports to include .js
echo ""
echo "Updating App.js import paths..."
sed -i "s|from './PagesDisplay/Landing'|from './PagesDisplay/Landing.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Consent'|from './PagesDisplay/Consent.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Auth'|from './PagesDisplay/Auth.js'|g" src/App.js
sed -i "s|from './PagesDisplay/RegularDashboard'|from './PagesDisplay/RegularDashboard.js'|g" src/App.js
sed -i "s|from './PagesDisplay/AdminDashboard'|from './PagesDisplay/AdminDashboard.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Settings'|from './PagesDisplay/Settings.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Games'|from './PagesDisplay/Games.js'|g" src/App.js
sed -i "s|from './PagesDisplay/StudyTools'|from './PagesDisplay/StudyTools.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Music'|from './PagesDisplay/Music.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Videos'|from './PagesDisplay/Videos.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Browser'|from './PagesDisplay/Browser.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Social'|from './PagesDisplay/Social.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Utilities'|from './PagesDisplay/Utilities.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Backgrounds'|from './PagesDisplay/Backgrounds.js'|g" src/App.js
sed -i "s|from './PagesDisplay/Privacy'|from './PagesDisplay/Privacy.js'|g" src/App.js

echo "  ✓ All imports updated"

echo ""
echo "Committing changes to git..."
git add -A
git commit -m "Fix: Add .js extensions to all page files for webpack module resolution"
git push origin codespace-friendly-guide-97rrr999p4r42x5g9

echo ""
echo "✅ Done! Files fixed and pushed to GitHub"
echo ""
echo "Next step: Go to Netlify and trigger a new deploy"
