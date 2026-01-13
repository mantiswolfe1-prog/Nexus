#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add netlify.toml
git commit -m "Fix: Remove build command to deploy pre-built static app directly"
git push origin codespace-friendly-guide-97rrr999p4r42x5g9
echo "✅ Pushed!"
