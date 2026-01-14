#!/bin/bash
cd /workspaces/Nexus-Community-Project

# Remove the old file without extension
rm src/Components/Dashboard/QuickActions

git add -A
git commit -m "fix: Create QuickActions.js with proper imports

- Created QuickActions.js with .js extension
- Fixed NeonButton import from @/components to relative path
- Removed old file without extension
- Fixes InvalidCharacterError for QuickActions media file resolution"
git push origin main

echo "QuickActions fix pushed!"
