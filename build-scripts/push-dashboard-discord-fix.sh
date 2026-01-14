#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add src/Components/Dashboard/DashboardTile.js src/PagesDisplay/RegularDashboard.js src/PagesDisplay/Social.js
git commit -m "Fix: Add DashboardTile.js with proper imports and add Nexus Discord server link"
git push origin main
