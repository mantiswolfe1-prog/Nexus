#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add src/PagesDisplay/*.js
git commit -m "Fix: Add .js extension to all NeonButton imports to prevent webpack resolution errors"
git push origin main
