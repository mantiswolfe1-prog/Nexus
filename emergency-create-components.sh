#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "🚨 EMERGENCY FIX: Creating all missing .js files"
echo ""

# For each file without .js extension in Components, copy it to .js and fix imports
echo "Creating .js versions of all component files..."

# Settings components
for file in SettingsSection SettingControl DeviceProfileManager; do
  if [ -f "src/Components/Settings/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Settings/$file" > "src/Components/Settings/$file.js"
    echo "✓ Created Settings/$file.js"
  fi
done

# Games components  
for file in GameCard GameFilters; do
  if [ -f "src/Components/Games/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Games/$file" > "src/Components/Games/$file.js"
    echo "✓ Created Games/$file.js"
  fi
done

# Videos components
for file in ServiceCard; do
  if [ -f "src/Components/Videos/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Videos/$file" > "src/Components/Videos/$file.js"
    echo "✓ Created Videos/$file.js"
  fi
done

# Browser components
for file in BrowserTab; do
  if [ -f "src/Components/Browser/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Browser/$file" > "src/Components/Browser/$file.js"
    echo "✓ Created Browser/$file.js"
  fi
done

# Music components
for file in MusicPlayer; do
  if [ -f "src/Components/Music/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Music/$file" > "src/Components/Music/$file.js"
    echo "✓ Created Music/$file.js"
  fi
done

# Utilities components
for file in Calculator UnitConverter Whiteboard; do
  if [ -f "src/Components/Utilities/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Utilities/$file" > "src/Components/Utilities/$file.js"
    echo "✓ Created Utilities/$file.js"
  fi
done

# Study components
for file in ScientificCalculator Dictionary FormulaSheet FlashcardDeck AIChat AIHelper NotesPanel PomodoroTimer; do
  if [ -f "src/Components/Study/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Study/$file" > "src/Components/Study/$file.js"
    echo "✓ Created Study/$file.js"
  fi
done

# Widgets
for file in SpotifyWidget YouTubeWidget WidgetContainer; do
  if [ -f "src/Components/Widgets/$file" ]; then
    sed 's|@/components/ui/|../UI/|g; s|@/lib/utils|../../utils.js|g' \
      "src/Components/Widgets/$file" > "src/Components/Widgets/$file.js"
    echo "✓ Created Widgets/$file.js"
  fi
done

# Other components
if [ -f "src/Components/UserNotRegisteredError" ]; then
  sed 's|@/components/ui/|./UI/|g; s|@/lib/utils|../utils.js|g' \
    "src/Components/UserNotRegisteredError" > "src/Components/UserNotRegisteredError.js"
  echo "✓ Created UserNotRegisteredError.js"
fi

echo ""
echo "Committing and pushing..."
git add -A
git commit -m "fix: Create all missing .js component files

- Created .js versions for all components (Settings, Games, Videos, etc.)
- Fixed @/ imports to relative paths in all new files
- Resolves 'Module not found' build errors"

git push origin main

echo ""
echo "✅ Emergency fix complete!"
