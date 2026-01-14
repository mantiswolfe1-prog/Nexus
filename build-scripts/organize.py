#!/usr/bin/env python3
"""
Workspace Organization Script
Moves all legacy build scripts to build-scripts folder
"""

import os
import shutil
from pathlib import Path

# List of script files to move
SCRIPTS_TO_MOVE = [
    "cleanup-old-files.sh",
    "create-components-part1.sh",
    "deploy-prebuilt.sh",
    "emergency-create-components.sh",
    "final-fix.sh",
    "fix-all-components.sh",
    "fix-all-glasscard-imports.sh",
    "fix-all-imports-part1.sh",
    "fix-all-imports.sh",
    "fix-and-push.sh",
    "fix-dictionary.sh",
    "fix-extensions.sh",
    "fix-globe-import.sh",
    "fix-imports-push.sh",
    "fix-main.sh",
    "fix-neonbutton-imports.sh",
    "fix-ui-extensions.sh",
    "force-main.sh",
    "merge-to-main.sh",
    "organize-and-run.sh",
    "push-accentcolor-fix.sh",
    "push-all-glasscard-fixes.sh",
    "push-browser-fix.sh",
    "push-case-fix.sh",
    "push-dashboard-discord-fix.sh",
    "push-error-boundary.sh",
    "push-fix.sh",
    "push-glasscard-fix.sh",
    "push-homepage-fix.sh",
    "push-launcher-fix.sh",
    "push-neonbutton-fix.sh",
    "push-performance-fix.sh",
    "push-quickactions-fix.sh",
    "push-storage-fix.sh",
    "push-ui-components.sh",
    "rename-files.sh",
    "resolve-and-push.sh",
]

def organize_workspace():
    """Move all legacy scripts to build-scripts folder"""
    
    root = Path("/workspaces/Nexus-Community-Project")
    build_scripts = root / "build-scripts"
    
    # Ensure build-scripts folder exists
    build_scripts.mkdir(exist_ok=True)
    
    moved_count = 0
    skipped_count = 0
    
    for script in SCRIPTS_TO_MOVE:
        src = root / script
        dst = build_scripts / script
        
        if src.exists() and not dst.exists():
            try:
                shutil.move(str(src), str(dst))
                print(f"✓ Moved {script}")
                moved_count += 1
            except Exception as e:
                print(f"✗ Error moving {script}: {e}")
                skipped_count += 1
        elif dst.exists():
            print(f"→ {script} already in build-scripts")
            skipped_count += 1
        else:
            print(f"- {script} not found")
            skipped_count += 1
    
    print(f"\n✓ Cleanup complete!")
    print(f"  Moved: {moved_count}")
    print(f"  Already organized: {skipped_count}")

if __name__ == "__main__":
    organize_workspace()
