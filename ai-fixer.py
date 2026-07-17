#!/usr/bin/env python3
"""
AI-powered HTML fixer using Claude API
"""
import anthropic
import os
import glob

def fix_html_files():
    # Initialize the Anthropic client with API key from environment
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    
    # Find all HTML files in current directory
    html_files = glob.glob("*.html")
    
    if not html_files:
        print("❌ No HTML files found!")
        return
    
    for html_file in html_files:
        print(f"🔍 Analyzing {html_file}...")
        
        try:
            # Read the HTML file
            with open(html_file, "r") as f:
                html_content = f.read()
            
            # Call Claude API to fix HTML
            message = client.messages.create(
                model="claude-opus-4-6",
                max_tokens=4096,
                messages=[
                    {
                        "role": "user",
                        "content": f"""Fix any HTML issues in this file. Return only the corrected HTML code, no explanations:

{html_content}"""
                    }
                ]
            )
            
            # Extract the fixed HTML from the response
            fixed_html = message.content[0].text
            
            # Write the fixed HTML back to the file
            with open(html_file, "w") as f:
                f.write(fixed_html)
            
            print(f"✅ Fixed {html_file}")
            
        except KeyError as e:
            print(f"⚠️ Error on {html_file}: Missing key {e}")
        except Exception as e:
            print(f"⚠️ Error on {html_file}: {type(e).__name__}: {e}")

if __name__ == "__main__":
    fix_html_files()
