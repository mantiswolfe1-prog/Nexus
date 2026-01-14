#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add src/PagesDisplay/RegularDashboard.js
git commit -m "Fix: Replace undefined accentColor variable with settings?.theme?.accent"
git push origin main
