#!/usr/bin/env python3
"""
SPPP Survey Data Extraction and Analysis Script
This script helps extract survey responses from various file formats and analyze them
"""

import os
import sys
import json
import csv
from pathlib import Path

def extract_numbers_file(file_path):
    """
    Attempt to extract data from Apple Numbers file
    Note: This is a basic extraction - Numbers files are complex
    """
    print(f"Attempting to extract data from: {file_path}")
    
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return None
    
    # Try to extract as zip (Numbers files are often zip archives)
    try:
        import zipfile
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            # List contents
            print("📁 Contents of Numbers file:")
            for file_info in zip_ref.filelist:
                print(f"  - {file_info.filename}")
            
            # Try to find any text-based content
            text_files = []
            for file_info in zip_ref.filelist:
                if file_info.filename.endswith('.xml') or file_info.filename.endswith('.txt'):
                    text_files.append(file_info.filename)
            
            if text_files:
                print(f"📄 Found potential text files: {text_files}")
                # Extract and read text files
                for text_file in text_files:
                    try:
                        content = zip_ref.read(text_file).decode('utf-8', errors='ignore')
                        print(f"\n📝 Content from {text_file}:")
                        print(content[:500] + "..." if len(content) > 500 else content)
                    except Exception as e:
                        print(f"❌ Error reading {text_file}: {e}")
            else:
                print("❌ No text files found in Numbers archive")
                
    except Exception as e:
        print(f"❌ Error extracting Numbers file: {e}")
        return None

def create_survey_template():
    """
    Create a template for manual survey data entry
    """
    template = {
        "survey_metadata": {
            "title": "SPPP Website Survey Responses",
            "date": "2024",
            "total_responses": 0,
            "departments": []
        },
        "response_categories": {
            "frequency_of_use": [],
            "reasons_for_use": [],
            "positive_aspects": [],
            "pain_points": [],
            "desired_features": [],
            "reference_sites": [],
            "design_preferences": [],
            "additional_ideas": []
        },
        "responses": []
    }
    
    return template

def analyze_survey_data(data):
    """
    Analyze survey data and generate insights
    """
    if not data or "responses" not in data:
        print("❌ No survey data to analyze")
        return
    
    print("\n🔍 SURVEY DATA ANALYSIS")
    print("=" * 50)
    
    total_responses = len(data["responses"])
    print(f"📊 Total Responses: {total_responses}")
    
    if total_responses == 0:
        print("❌ No responses found in data")
        return
    
    # Analyze frequency of use
    if "frequency_of_use" in data["response_categories"]:
        print(f"\n📅 Frequency of Use Analysis:")
        for freq in data["response_categories"]["frequency_of_use"]:
            count = sum(1 for r in data["responses"] if r.get("frequency_of_use") == freq)
            percentage = (count / total_responses) * 100
            print(f"  {freq}: {count} responses ({percentage:.1f}%)")
    
    # Analyze pain points
    if "pain_points" in data["response_categories"]:
        print(f"\n😤 Pain Points Analysis:")
        for pain_point in data["response_categories"]["pain_points"]:
            count = sum(1 for r in data["responses"] if pain_point in str(r.get("pain_points", [])))
            percentage = (count / total_responses) * 100
            print(f"  {pain_point}: {count} responses ({percentage:.1f}%)")
    
    # Analyze desired features
    if "desired_features" in data["response_categories"]:
        print(f"\n🚀 Desired Features Analysis:")
        for feature in data["response_categories"]["desired_features"]:
            count = sum(1 for r in data["responses"] if feature in str(r.get("desired_features", [])))
            percentage = (count / total_responses) * 100
            print(f"  {feature}: {count} responses ({percentage:.1f}%)")

def create_manual_entry_guide():
    """
    Create a guide for manual survey data entry
    """
    guide = """
📋 MANUAL SURVEY DATA ENTRY GUIDE
================================

Since the Numbers file cannot be directly read, here are alternative approaches:

1. EXPORT FROM NUMBERS:
   - Open the Numbers file in Numbers app
   - File → Export To → CSV or Excel
   - Save as .csv or .xlsx file

2. MANUAL DATA ENTRY:
   - Copy responses from Numbers file
   - Paste into a text file or spreadsheet
   - Use the template structure below

3. SURVEY RESPONSE TEMPLATE:
   {
     "respondent_id": "R001",
     "department": "IT",
     "role": "Manager",
     "frequency_of_use": "Daily",
     "reasons_for_use": ["Information", "Task Completion"],
     "positive_aspects": ["Easy navigation", "Clear layout"],
     "pain_points": ["Slow loading", "No search"],
     "desired_features": ["Advanced search", "Mobile app"],
     "reference_sites": ["Google", "Amazon"],
     "design_preferences": ["Clean", "Professional"],
     "additional_ideas": ["Dashboard", "Notifications"]
   }

4. KEY QUESTIONS TO ANALYZE:
   - How often do they use the website?
   - What frustrates them most?
   - What features do they want?
   - What other sites do they like?
   - What design elements do they prefer?

5. PRIORITY CATEGORIES:
   - Critical (Must-have)
   - Important (Should-have)
   - Desirable (Nice-to-have)
   - Future consideration

6. ANALYSIS FOCUS:
   - Common pain points
   - Most requested features
   - Design preferences
   - User workflow needs
   - Mobile usage patterns
"""
    return guide

def main():
    """
    Main function to run the survey data extraction
    """
    print("🔍 SPPP Survey Data Extraction and Analysis")
    print("=" * 50)
    
    # Check for Numbers file
    numbers_file = "../SPPP/Survey Responses - SPPP.numbers"
    
    if os.path.exists(numbers_file):
        print(f"📁 Found Numbers file: {numbers_file}")
        extract_numbers_file(numbers_file)
    else:
        print(f"❌ Numbers file not found: {numbers_file}")
    
    print("\n" + "=" * 50)
    print("📋 MANUAL DATA ENTRY OPTIONS")
    print("=" * 50)
    
    # Create template
    template = create_survey_template()
    template_file = "survey_template.json"
    
    with open(template_file, 'w') as f:
        json.dump(template, f, indent=2)
    
    print(f"✅ Created survey template: {template_file}")
    
    # Create manual entry guide
    guide = create_manual_entry_guide()
    guide_file = "manual_entry_guide.txt"
    
    with open(guide_file, 'w') as f:
        f.write(guide)
    
    print(f"✅ Created manual entry guide: {guide_file}")
    
    print("\n🎯 NEXT STEPS:")
    print("1. Export Numbers file to CSV/Excel format")
    print("2. Use the survey template for data structure")
    print("3. Follow the manual entry guide")
    print("4. Run analysis on the extracted data")
    
    print("\n💡 TIP: The most effective approach is to:")
    print("   - Export Numbers file to CSV format")
    print("   - Use spreadsheet software to clean data")
    print("   - Import into analysis tools")

if __name__ == "__main__":
    main()



