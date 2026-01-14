# Workspace Organization Guide

## Overview

All legacy build and deployment scripts have been organized into the `build-scripts` folder to keep your project root clean and focused on actual source code.

## What Was Moved

**All script files** (`.sh` and `.py` scripts) from the root directory are now in `build-scripts/`:
- `fix-*.sh` - Component import and structure fixes
- `push-*.sh` - GitHub deployment scripts
- Other build automation scripts

## How to Organize Now

### Option 1: Automatic Organization (Recommended)
Run the Python organization script:
```bash
python3 build-scripts/organize.py
```

This will automatically move all remaining root scripts to the `build-scripts` folder.

### Option 2: Manual Move
If you prefer manual control, use the bash script:
```bash
bash build-scripts/cleanup-workspace.sh
```

## What's in build-scripts/

### Documentation
- `README.md` - Overview of the scripts folder
- `INDEX.md` - Detailed index of scripts
- `organize.py` - Python automation script for organization

### Legacy Scripts (For Reference)
These scripts were used during initial development. The project now uses standard npm commands:
- **For development**: `npm start`
- **For building**: `npm run build`  
- **For deployment**: Push to GitHub (Netlify auto-deploys)

## Project Root Should Contain

After organization, your root directory will be clean with:
- `/src` - Source code
- `/public` - Public assets
- `/build` - Build output
- `/node_modules` - Dependencies
- `package.json` - Project config
- `.git/` - Version control
- Configuration files (`.gitignore`, `tailwind.config.js`, etc.)

## Next Steps

1. Run the organization script (Python or Bash)
2. Verify root directory is clean
3. All scripts are safely archived in `build-scripts/`
4. Continue development normally

## Questions?

All scripts are documented and can be referenced from `build-scripts/` if needed for troubleshooting or understanding the project's development history.
