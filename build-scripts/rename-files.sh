#!/bin/bash
# Rename all extensionless page files to .js

cd /workspaces/Nexus-Community-Project/src/PagesDisplay

for file in AdminDashboard Auth Backgrounds Browser Consent Games Landing Music Privacy RegularDashboard Settings Social StudyTools Utilities Videos; do
  if [ -f "$file" ] && [ ! -f "$file.js" ]; then
    echo "Renaming $file to ${file}.js"
    mv "$file" "${file}.js"
  fi
done

# Do the same for components
cd /workspaces/Nexus-Community-Project/src/Components

for dir in Backgrounds/SoftParticleDrift Browser/BrowserTab Dashboard/DashboardTile Dashboard/QuickActions Games/GameCard Games/GameFilters Music/MusicPlayer Performance/FPSMonitor Performance/PerformanceManager Settings/DeviceProfileManager Settings/SettingControl Settings/SettingsSection Storage/clientStorage Study/AIChat Study/AIHelper Study/Dictionary Study/FlashcardDeck Study/FormulaSheet Study/NotesPanel Study/PomodoroTimer Study/ScientificCalculator UI/AnimatedBackground UI/GlassCard UI/NeonButton UI/button UI/input UI/textarea Utilities/Calculator Utilities/UnitConverter Utilities/Whiteboard Videos/ServiceCard Widgets/SpotifyWidget Widgets/WidgetContainer Widgets/YouTubeWidget; do
  if [ -d "$dir" ]; then
    # It's a folder - rename the folder to have .js
    parent=$(dirname "$dir")
    base=$(basename "$dir")
    if [ ! -f "$dir.js" ]; then
      echo "Renaming folder $dir to ${base}.js"
      mv "$dir" "${parent}/${base}.js"
    fi
  elif [ -f "$dir" ] && [ ! -f "$dir.js" ]; then
    echo "Renaming $dir to ${dir}.js"
    mv "$dir" "${dir}.js"
  fi
done

echo "✅ Renamed all files to .js extension"
