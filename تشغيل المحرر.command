#!/bin/bash
# Double-click to open the content editor. Keep the window open while editing.
cd "$(dirname "$0")"
git pull -q --rebase --autostash 2>/dev/null
exec python3 tools/studio.py
