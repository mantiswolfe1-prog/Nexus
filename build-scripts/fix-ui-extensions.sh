#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "🔧 Fixing ALL missing .js extensions in Component imports..."

# Fix all Component files to add .js extensions to UI imports
find src/Components -name "*.js" -type f -exec sed -i \
  -e "s|from '../UI/GlassCard';|from '../UI/GlassCard.js';|g" \
  -e "s|from '../UI/NeonButton';|from '../UI/NeonButton.js';|g" \
  -e "s|from '../UI/input';|from '../UI/input.js';|g" \
  -e "s|from '../UI/select';|from '../UI/select.js';|g" \
  -e "s|from '../UI/slider';|from '../UI/slider.js';|g" \
  -e "s|from '../UI/label';|from '../UI/label.js';|g" \
  -e "s|from '../UI/switch';|from '../UI/switch.js';|g" \
  -e "s|from '../UI/button';|from '../UI/button.js';|g" \
  -e "s|from '../UI/textarea';|from '../UI/textarea.js';|g" \
  {} +

echo "✓ All UI imports fixed"

echo ""
echo "Committing and pushing..."
git add -A
git commit -m "fix: Add .js extensions to all UI component imports

- Created switch.js and select.js UI components
- Fixed all Component files to add .js to UI imports
- Resolves 'Module not found' for switch, select, etc."

git push origin main

echo ""
echo "✅ Fix complete!"
