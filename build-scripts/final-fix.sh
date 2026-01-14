#!/bin/bash
# The absolute simplest fix: update netlify.toml and force it to main

cd /workspaces/Nexus-Community-Project

# Ensure we're on main
git checkout main 2>/dev/null || true

# Make sure netlify.toml is correct
cat > netlify.toml << 'EOF'
[build]
  publish = "build"
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

echo "netlify.toml content:"
cat netlify.toml

echo ""
echo "Adding and committing..."
git add netlify.toml
git commit -m "Critical: Remove build command - deploy pre-built app directly" || echo "Already up to date"

echo ""
echo "Pushing to main..."
git push origin main

echo ""
echo "✅ Done! netlify.toml is now on main"
echo ""
echo "Go to Netlify and trigger a new deploy now."
