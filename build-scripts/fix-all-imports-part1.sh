#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "=== COMPREHENSIVE FIX FOR ALL COMPONENT IMPORTS ==="

# Step 1: Remove old duplicate files (without .js extension that we already created .js versions for)
echo "Step 1: Removing old duplicate files..."
rm -f src/Components/UI/NeonButton 2>/dev/null
rm -f src/Components/UI/GlassCard 2>/dev/null
rm -f src/Components/Performance/PerformanceManager 2>/dev/null
rm -f src/Components/Dashboard/DashboardTile 2>/dev/null
rm -f src/Components/Dashboard/QuickActions 2>/dev/null
rm -f src/Components/Storage/clientStorage 2>/dev/null

# Step 2: Fix all imports in PagesDisplay to add .js extensions
echo "Step 2: Fixing imports in all Page files..."

# Fix imports missing .js extension in all PagesDisplay files
find src/PagesDisplay -name "*.js" -exec sed -i \
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
  {} +

echo "✓ All Page file imports fixed!"

# Step 3: Fix imports in Component files that use @/ or missing extensions
echo "Step 3: Fixing @/ imports in Component files..."

# We'll need to handle these manually since they're more complex
# List the files that need fixing:
echo "Files that need manual fixing (have @/ imports):"
grep -l "from '@/" src/Components/**/* 2>/dev/null | head -20

echo ""
echo "=== Summary of Changes ==="
git status --short

echo ""
echo "Ready to commit and push? This script only did part 1."
echo "Still need to create .js files for components with @/ imports."
