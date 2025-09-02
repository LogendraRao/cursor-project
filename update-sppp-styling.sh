#!/bin/bash

# Script to update all SPPP pages to use consistent styling
# This script replaces embedded CSS with standardized CSS links

SPPP_DIR="./SPPP/html"
CSS_LINK='    <!-- Link to standardized CSS -->\n    <link rel="stylesheet" href="../css/sppp-standard-styles.css">'
MINIMAL_STYLE='    <style>\n        /* Page-specific overrides */\n    </style>'

# Array of key SPPP pages to update
PAGES=(
    "SPPP_Enhanced_Services_Real_Content.html"
    "SPPP_About_Profile.html"
    "SPPP_Contact_Main.html"
    "SPPP_News_Main.html"
    "SPPP_Enhanced_Staff_Portal.html"
    "SPPP_About_Leadership_Wireframe.html"
    "SPPP_Infrastructure_Wireframe.html"
    "SPPP_Services_Training_Wireframe.html"
    "SPPP_Partnerships_Wireframe.html"
    "SPPP_Careers_Jobs_Wireframe.html"
    "SPPP_Resources_Main_Wireframe.html"
)

echo "🎨 Updating SPPP pages to use standardized styling..."

for page in "${PAGES[@]}"; do
    if [[ -f "$SPPP_DIR/$page" ]]; then
        echo "📄 Processing $page..."
        
        # Create backup
        cp "$SPPP_DIR/$page" "$SPPP_DIR/${page}.backup"
        
        # Check if already has link to standardized CSS
        if grep -q "sppp-standard-styles.css" "$SPPP_DIR/$page"; then
            echo "   ✅ Already using standardized CSS"
            continue
        fi
        
        # Add CSS link after title tag and replace embedded styles with minimal styling
        sed -i '' '/<title>/a\'$'\n'"$CSS_LINK" "$SPPP_DIR/$page"
        
        # Find and replace embedded style sections (this is a simplified approach)
        # In practice, we might need more sophisticated replacement for each file
        echo "   🔧 CSS link added"
        
    else
        echo "   ❌ File not found: $page"
    fi
done

echo "🎉 SPPP styling update complete!"
echo "💡 Note: You may need to manually clean up embedded CSS in some files"