#!/bin/bash
cd /workspaces/Nexus-Community-Project

# Fix all extensionless component imports
find src/PagesDisplay -name "*.js" -type f -exec sed -i "s|from '../Components/UI/GlassCard'|from '../Components/UI/GlassCard.js'|g" {} +
find src/PagesDisplay -name "*.js" -type f -exec sed -i "s|from '../Components/UI/AnimatedBackground'|from '../Components/UI/AnimatedBackground.js'|g" {} +
find src/Components -name "*.js" -type f -exec sed -i "s|from '../UI/GlassCard'|from '../UI/GlassCard.js'|g" {} +

echo "Fixed all component imports to use .js extension"
git add src/
git commit -m "Fix: Add .js extension to all GlassCard and AnimatedBackground imports"
git push origin main
