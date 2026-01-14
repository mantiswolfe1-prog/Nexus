#!/bin/bash
# Simple push: Just deploy the pre-built app

cd /workspaces/Nexus-Community-Project

echo "Committing netlify.toml change..."
git add netlify.toml
git commit -m "Deploy pre-built app instead of rebuilding - fixes package.json error"
git push origin codespace-friendly-guide-97rrr999p4r42x5g9

echo ""
echo "✅ Done!"
echo ""
echo "Now go to Netlify and trigger a new deploy."
echo "It will just serve the already-built app from the build/ folder."
