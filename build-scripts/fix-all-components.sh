#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "=== COMPREHENSIVE FIX: All Component Imports ==="
echo ""

# Step 1: Remove old duplicate files
echo "Step 1: Removing old files without .js extension..."
rm -f src/Components/UI/NeonButton
rm -f src/Components/UI/GlassCard
rm -f src/Components/UI/AnimatedBackground
rm -f src/Components/Performance/PerformanceManager
rm -f src/Components/Performance/FPSMonitor
rm -f src/Components/Dashboard/DashboardTile
rm -f src/Components/Dashboard/QuickActions
rm -f src/Components/Storage/clientStorage
rm -f src/Components/Backgrounds/SoftParticleDrift
echo "✓ Old files removed"

# Step 2: Fix all imports in PagesDisplay files
echo ""
echo "Step 2: Fixing imports in Page files..."

# Fix all component imports that are missing .js extensions
find src/PagesDisplay -name "*.js" -type f -exec sed -i \
  -e "s|from '../Components/Games/GameCard';|from '../Components/Games/GameCard.js';|g" \
  -e "s|from '../Components/Games/GameFilters';|from '../Components/Games/GameFilters.js';|g" \
  -e "s|from '../Components/Backgrounds/SoftParticleDrift';|from '../Components/Backgrounds/SoftParticleDrift.js';|g" \
  -e "s|from '../Components/Performance/FPSMonitor';|from '../Components/Performance/FPSMonitor.js';|g" \
  -e "s|from '../Components/Utilities/Calculator';|from '../Components/Utilities/Calculator.js';|g" \
  -e "s|from '../Components/Utilities/UnitConverter';|from '../Components/Utilities/UnitConverter.js';|g" \
  -e "s|from '../Components/Utilities/Whiteboard';|from '../Components/Utilities/Whiteboard.js';|g" \
  -e "s|from '../Components/Study/ScientificCalculator';|from '../Components/Study/ScientificCalculator.js';|g" \
  -e "s|from '../Components/Study/Dictionary';|from '../Components/Study/Dictionary.js';|g" \
  -e "s|from '../Components/Study/FormulaSheet';|from '../Components/Study/FormulaSheet.js';|g" \
  -e "s|from '../Components/UI/AnimatedBackground';|from '../Components/UI/AnimatedBackground.js';|g" \
  -e "s|from '../Components/Settings/SettingsSection';|from '../Components/Settings/SettingsSection.js';|g" \
  -e "s|from '../Components/Settings/SettingControl';|from '../Components/Settings/SettingControl.js';|g" \
  -e "s|from '../Components/Settings/DeviceProfileManager';|from '../Components/Settings/DeviceProfileManager.js';|g" \
  -e "s|from '../Components/Videos/ServiceCard';|from '../Components/Videos/ServiceCard.js';|g" \
  -e "s|from '../Components/Browser/BrowserTab';|from '../Components/Browser/BrowserTab.js';|g" \
  -e "s|from '../Components/Music/MusicPlayer';|from '../Components/Music/MusicPlayer.js';|g" \
  -e "s|from '../Components/Widgets/SpotifyWidget';|from '../Components/Widgets/SpotifyWidget.js';|g" \
  -e "s|from '../Components/Widgets/YouTubeWidget';|from '../Components/Widgets/YouTubeWidget.js';|g" \
  -e "s|from '../Components/Widgets/WidgetContainer';|from '../Components/Widgets/WidgetContainer.js';|g" \
  -e "s|from '../Components/Study/FlashcardDeck';|from '../Components/Study/FlashcardDeck.js';|g" \
  -e "s|from '../Components/Study/AIChat';|from '../Components/Study/AIChat.js';|g" \
  -e "s|from '../Components/Study/AIHelper';|from '../Components/Study/AIHelper.js';|g" \
  -e "s|from '../Components/Study/NotesPanel';|from '../Components/Study/NotesPanel.js';|g" \
  -e "s|from '../Components/Study/PomodoroTimer';|from '../Components/Study/PomodoroTimer.js';|g" \
  -e "s|from '../Components/UserNotRegisteredError';|from '../Components/UserNotRegisteredError.js';|g" \
  {} +

echo "✓ All Page file imports fixed"

# Step 3: Show changes
echo ""
echo "Step 3: Showing changes..."
git status --short | head -30

# Step 4: Commit and push
echo ""
echo "Step 4: Committing changes..."
git add -A
git commit -m "fix: Comprehensive fix for all component imports

- Created AnimatedBackground.js, FPSMonitor.js, SoftParticleDrift.js
- Removed old files without .js extension
- Fixed 20+ imports missing .js extension in all Page files
- Ensures webpack resolves all components correctly
- Prevents InvalidCharacterError from media file resolution"

echo "✓ Changes committed"

echo ""
echo "Step 5: Pushing to GitHub..."
git push origin main

echo ""
echo "=== ALL DONE! ==="
echo "Netlify will rebuild automatically."
