#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add package.json
git commit -m "Fix: Remove homepage field that was breaking Netlify deployment"
git push origin main
