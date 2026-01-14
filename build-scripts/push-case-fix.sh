#!/bin/bash
cd /workspaces/Nexus-Community-Project
git add -A
git commit -m "Fix: Correct case-sensitivity in all component imports (Components → ../Components)"
git push origin main
