#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add src/Components/UI/GlassCard.js src/Components/Dashboard/DashboardTile.js
git commit -m "Fix: Add GlassCard.js and update DashboardTile import to use .js extension"
git push origin main
