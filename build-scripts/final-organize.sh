#!/bin/bash
# Final Workspace Organization Script
# Moves all remaining .sh files from root to build-scripts/

PROJECT_ROOT="/workspaces/Nexus-Community-Project"
BUILD_SCRIPTS="$PROJECT_ROOT/build-scripts"

echo "🧹 Organizing Nexus workspace..."
echo ""

# Count files
total_files=0
moved_files=0

# Create build-scripts if it doesn't exist
mkdir -p "$BUILD_SCRIPTS"

# Move all .sh files from root to build-scripts
for file in "$PROJECT_ROOT"/*.sh; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        dest="$BUILD_SCRIPTS/$filename"
        
        if [ ! -f "$dest" ]; then
            mv "$file" "$dest" 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "✓ Moved: $filename"
                ((moved_files++))
            fi
        fi
        ((total_files++))
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Workspace Organization Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Results:"
echo "  • Files moved: $moved_files"
echo "  • Total scripts: $total_files"
echo ""
echo "📁 All build scripts are now in: build-scripts/"
echo ""
echo "📚 Documentation:"
echo "  • Read: WORKSPACE_ORGANIZATION.md"
echo "  • Read: QUICK_COMMANDS.md"
echo "  • Read: ORGANIZATION_COMPLETE.md"
echo ""
echo "🚀 You can now start development with:"
echo "  npm start"
echo ""
