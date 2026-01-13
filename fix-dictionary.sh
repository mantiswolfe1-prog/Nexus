#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "🔧 Fixing Dictionary.js syntax error..."

git add -A
git commit -m "fix: Remove duplicate/orphaned JSX code from Dictionary.js

- Fixed JSX syntax error on line 107
- Removed duplicate code block that was causing parse error
- Fixed import paths to use relative paths with .js extensions"

git push origin main

echo "✅ Dictionary.js fixed!"
