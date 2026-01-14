#!/bin/bash
cd /workspaces/Nexus-Community-Project

git add -A
git commit -m "fix: Add .js extension to all GlassCard imports

- Fixed 11 page files with missing .js extension on GlassCard imports
- Games, RegularDashboard, Utilities, StudyTools, Social, Privacy
- AdminDashboard, Backgrounds, Videos, Browser, Music
- Ensures webpack correctly resolves GlassCard as React component
- Prevents InvalidCharacterError from media file path resolution"
git push origin main

echo "All GlassCard import fixes pushed!"
