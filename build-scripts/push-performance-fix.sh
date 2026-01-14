#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add src/Components/Performance/PerformanceManager.js src/PagesDisplay/RegularDashboard.js
git commit -m "Fix: Add PerformanceManager.js with explicit extension and update import"
git push origin main
