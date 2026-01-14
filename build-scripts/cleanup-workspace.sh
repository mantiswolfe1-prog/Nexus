#!/bin/bash
# Cleanup script to organize build scripts
# This script moves all legacy .sh files to build-scripts folder

cd /workspaces/Nexus-Community-Project

# List of files to move
files=(
  "cleanup-old-files.sh"
  "create-components-part1.sh"
  "deploy-prebuilt.sh"
  "emergency-create-components.sh"
  "final-fix.sh"
  "fix-all-components.sh"
  "fix-all-glasscard-imports.sh"
  "fix-all-imports-part1.sh"
  "fix-all-imports.sh"
  "fix-and-push.sh"
  "fix-dictionary.sh"
  "fix-extensions.sh"
  "fix-globe-import.sh"
  "fix-imports-push.sh"
  "fix-main.sh"
  "fix-neonbutton-imports.sh"
  "fix-ui-extensions.sh"
  "force-main.sh"
  "merge-to-main.sh"
  "organize-and-run.sh"
  "push-accentcolor-fix.sh"
  "push-all-glasscard-fixes.sh"
  "push-browser-fix.sh"
  "push-case-fix.sh"
  "push-dashboard-discord-fix.sh"
  "push-error-boundary.sh"
  "push-fix.sh"
  "push-glasscard-fix.sh"
  "push-homepage-fix.sh"
  "push-launcher-fix.sh"
  "push-neonbutton-fix.sh"
  "push-performance-fix.sh"
  "push-quickactions-fix.sh"
  "push-storage-fix.sh"
  "push-to-github.sh"
  "push-ui-components.sh"
  "rename-files.sh"
  "resolve-and-push.sh"
)

# Create build-scripts folder if it doesn't exist
mkdir -p build-scripts

# Move each file
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    mv "$file" "build-scripts/$file"
    echo "✓ Moved $file"
  fi
done

echo ""
echo "✓ Cleanup complete! All build scripts are now in the build-scripts folder"
echo "Total scripts moved: $(ls build-scripts/*.sh 2>/dev/null | wc -l)"
