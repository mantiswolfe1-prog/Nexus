#!/bin/bash
cd /workspaces/Nexus-Community-Project

# Replace all NeonButton imports without .js to include .js
find src/PagesDisplay -name "*.js" -type f -exec sed -i "s|from '../Components/UI/NeonButton'|from '../Components/UI/NeonButton.js'|g" {} +

echo "Updated all NeonButton imports to use .js extension"
