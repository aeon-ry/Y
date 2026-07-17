import os
import json
import subprocess
from pathlib import Path

API_KEY = os.environ.get('ANTHROPIC_API_KEY')
HTML_FILES = list(Path('.').glob('*.html'))

for html_file in HTML_FILES:
    print(f"🔍 Analyzing {html_file}...")
    
    with open(html_file, 'r') as f:
        content = f.read()
    
    response = subprocess.run([
        'curl', '-s', 'https://api.anthropic.com/v1/messages',
        '-H', f'api-key: {API_KEY}',
        '-H', 'Content-Type: application/json',
        '-d', json.dumps({
            "model": "claude-opus-4-6",
            "max_tokens": 4096,
            "messages": [{
                "role": "user",
                "content": f"Fix this HTML for semantics, accessibility, mobile responsiveness. Return ONLY corrected HTML:\n\n{content[:6000]}"
            }]
        })
    ], capture_output=True, text=True)
    
    try:
        data = json.loads(response.stdout)
        fixed_html = data['content'][0]['text']
        with open(html_file, 'w') as f:
            f.write(fixed_html)
        print(f"✅ Fixed {html_file}")
    except Exception as e:
        print(f"⚠️ Error on {html_file}: {e}")
