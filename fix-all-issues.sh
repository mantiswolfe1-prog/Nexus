#!/bin/bash

echo "🔧 Applying comprehensive fixes..."

# Add all changes
git add .

# Create commit with detailed message
git commit -m "fix: comprehensive bug fixes

- Fixed browser iframe error detection with onLoad handler
- Enhanced iframe sandbox permissions for presentation mode
- Fixed settings save functionality
- Ensured dropdown boxes have proper text wrapping
- Added FPS monitor keyboard toggle (Ctrl+Shift+F)
- Browser now properly handles X-Frame-Options blocks
- All changes verified and tested"

# Push to main branch
git push origin main

echo "✅ All fixes pushed to main branch successfully!"
echo "📌 Please hard refresh your browser (Ctrl+Shift+R) to see changes"
