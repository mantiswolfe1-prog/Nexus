#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "✅ Fixing Globe import error..."

git add -A
git commit -m "fix: Add missing Globe import to Browser.js

- Added Globe icon to lucide-react imports
- Fixes ReferenceError: Globe is not defined"

git push origin main

echo "✅ Fix pushed!"
echo ""
echo "Next features to implement:"
echo "  1. User account system (create/login)"
echo "  2. Settings persistence to localStorage"
echo "  3. Username and password management"
echo "  4. Profile customization"
