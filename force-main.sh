#!/bin/bash
# Force netlify.toml without build command to main

cd /workspaces/Nexus-Community-Project

git checkout main
git pull origin main --force
git checkout -- netlify.toml || true

# Ensure correct content
cat > netlify.toml << 'EOF'
[build]
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

echo "=== netlify.toml content ==="
cat netlify.toml
echo ""

git add netlify.toml
git commit -m "Remove build command section entirely to skip build phase" || true
git push origin main --force

echo "✅ Forced to main"
