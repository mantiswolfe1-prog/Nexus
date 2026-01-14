#!/bin/bash
cd /workspaces/Nexus-Community-Project

echo "Creating comprehensive fix for all component imports..."

# List of files without .js extension that need to be renamed and fixed
declare -A files_to_fix=(
  ["src/Components/Utilities/UnitConverter"]="UnitConverter.js"
  ["src/Components/Utilities/Whiteboard"]="Whiteboard.js"
  ["src/Components/Utilities/Calculator"]="Calculator.js"
  ["src/Components/UI/AnimatedBackground"]="AnimatedBackground.js"
  ["src/Components/UI/NeonButton"]="NeonButton_old"
  ["src/Components/UI/GlassCard"]="GlassCard_old"
  ["src/Components/Games/GameCard"]="GameCard.js"
  ["src/Components/Games/GameFilters"]="GameFilters.js"
  ["src/Components/Videos/ServiceCard"]="ServiceCard.js"
  ["src/Components/Backgrounds/SoftParticleDrift"]="SoftParticleDrift.js"
  ["src/Components/Widgets/SpotifyWidget"]="SpotifyWidget.js"
  ["src/Components/Widgets/WidgetContainer"]="WidgetContainer.js"
  ["src/Components/Widgets/YouTubeWidget"]="YouTubeWidget.js"
  ["src/Components/Browser/BrowserTab"]="BrowserTab.js"
  ["src/Components/UserNotRegisteredError"]="UserNotRegisteredError.js"
  ["src/Components/Music/MusicPlayer"]="MusicPlayer.js"
  ["src/Components/Performance/FPSMonitor"]="FPSMonitor.js"
  ["src/Components/Performance/PerformanceManager"]="PerformanceManager_old"
  ["src/Components/Settings/SettingControl"]="SettingControl.js"
  ["src/Components/Settings/SettingsSection"]="SettingsSection.js"
  ["src/Components/Settings/DeviceProfileManager"]="DeviceProfileManager.js"
  ["src/Components/Dashboard/DashboardTile"]="DashboardTile_old"
  ["src/Components/Dashboard/QuickActions"]="QuickActions_old"
  ["src/Components/Study/AIHelper"]="AIHelper.js"
  ["src/Components/Study/FormulaSheet"]="FormulaSheet.js"
  ["src/Components/Study/NotesPanel"]="NotesPanel.js"
  ["src/Components/Study/AIChat"]="AIChat.js"
  ["src/Components/Study/ScientificCalculator"]="ScientificCalculator.js"
  ["src/Components/Study/FlashcardDeck"]="FlashcardDeck.js"
  ["src/Components/Study/PomodoroTimer"]="PomodoroTimer.js"
  ["src/Components/Study/Dictionary"]="Dictionary.js"
  ["src/Components/Storage/clientStorage"]="clientStorage_old"
)

# Remove old duplicate files (ones we already created .js versions for)
echo "Removing old duplicate files..."
rm -f src/Components/UI/NeonButton
rm -f src/Components/UI/GlassCard
rm -f src/Components/Performance/PerformanceManager
rm -f src/Components/Dashboard/DashboardTile
rm -f src/Components/Dashboard/QuickActions
rm -f src/Components/Storage/clientStorage

echo "Files cleaned up!"
git status
