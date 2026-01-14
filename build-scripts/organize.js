#!/usr/bin/env node
/**
 * Nexus Workspace Organizer
 * Moves all legacy build scripts to build-scripts/ folder
 * 
 * Usage: node build-scripts/organize.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = '/workspaces/Nexus-Community-Project';
const BUILD_SCRIPTS_DIR = path.join(PROJECT_ROOT, 'build-scripts');

const SCRIPTS_TO_ORGANIZE = [
  'cleanup-old-files.sh',
  'create-components-part1.sh',
  'deploy-prebuilt.sh',
  'emergency-create-components.sh',
  'final-fix.sh',
  'fix-all-components.sh',
  'fix-all-glasscard-imports.sh',
  'fix-all-imports-part1.sh',
  'fix-all-imports.sh',
  'fix-and-push.sh',
  'fix-dictionary.sh',
  'fix-extensions.sh',
  'fix-globe-import.sh',
  'fix-imports-push.sh',
  'fix-main.sh',
  'fix-neonbutton-imports.sh',
  'fix-ui-extensions.sh',
  'force-main.sh',
  'merge-to-main.sh',
  'organize-and-run.sh',
  'push-accentcolor-fix.sh',
  'push-all-glasscard-fixes.sh',
  'push-browser-fix.sh',
  'push-case-fix.sh',
  'push-dashboard-discord-fix.sh',
  'push-error-boundary.sh',
  'push-fix.sh',
  'push-homepage-fix.sh',
  'push-launcher-fix.sh',
  'push-neonbutton-fix.sh',
  'push-performance-fix.sh',
  'push-quickactions-fix.sh',
  'push-storage-fix.sh',
  'push-ui-components.sh',
  'rename-files.sh',
  'resolve-and-push.sh',
];

console.log('🧹 Nexus Workspace Organizer\n');
console.log('━'.repeat(50));

// Create build-scripts directory if it doesn't exist
if (!fs.existsSync(BUILD_SCRIPTS_DIR)) {
  fs.mkdirSync(BUILD_SCRIPTS_DIR, { recursive: true });
  console.log('✓ Created build-scripts/ directory\n');
}

let movedCount = 0;
let skippedCount = 0;
let notFoundCount = 0;

// Move each script
SCRIPTS_TO_ORGANIZE.forEach((script) => {
  const srcPath = path.join(PROJECT_ROOT, script);
  const destPath = path.join(BUILD_SCRIPTS_DIR, script);

  // Check if source exists
  if (!fs.existsSync(srcPath)) {
    console.log(`- ${script} (not found)`);
    notFoundCount++;
    return;
  }

  // Check if destination already exists
  if (fs.existsSync(destPath)) {
    console.log(`→ ${script} (already organized)`);
    skippedCount++;
    return;
  }

  // Move the file
  try {
    fs.renameSync(srcPath, destPath);
    console.log(`✓ Moved ${script}`);
    movedCount++;
  } catch (error) {
    console.error(`✗ Error moving ${script}: ${error.message}`);
  }
});

console.log('\n' + '━'.repeat(50));
console.log('\n✅ Workspace Organization Complete!\n');
console.log('📊 Results:');
console.log(`  • Moved: ${movedCount}`);
console.log(`  • Already organized: ${skippedCount}`);
console.log(`  • Not found: ${notFoundCount}`);
console.log(`  • Total: ${SCRIPTS_TO_ORGANIZE.length}\n`);

console.log('📁 All scripts are now in: build-scripts/\n');
console.log('📚 Read these guides:');
console.log('  • QUICK_COMMANDS.md');
console.log('  • WORKSPACE_GUIDE.md');
console.log('  • build-scripts/README.md\n');

console.log('🚀 Start development with:');
console.log('  npm start\n');
