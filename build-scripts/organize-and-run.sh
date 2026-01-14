#!/bin/bash
cd /workspaces/Nexus-Community-Project

# First, run the comprehensive fix
bash scripts/fix-all-components.sh

# Then commit the scripts folder itself
echo ""
echo "📁 Committing scripts folder organization..."
git add scripts/
git commit -m "chore: Organize fix scripts into scripts/ folder

- Created scripts/ directory for better organization
- Consolidated all fixes into scripts/fix-all-components.sh
- Added README.md documenting the fixes and learnings
- Added cleanup script for old root-level scripts"

git push origin main

echo ""
echo "✅ Scripts organized and pushed!"
