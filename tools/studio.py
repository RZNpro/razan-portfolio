#!/usr/bin/env python3
"""Razan's editing studio.

Serves the site on http://localhost:5180 and gives the editor (admin.html) two powers:
  * POST /api/publish   — writes content.js (+ uploaded images / files) and pushes to GitHub,
                          so the live site updates by itself about a minute later.
  * POST /api/translate — translates a piece of text Arabic <-> English.

Only listens on this computer (127.0.0.1). Start it by double-clicking "تشغيل المحرر.command" in the project folder.
"""
import base64
import json
import os
import re
import subprocess
import sys
import urllib.parse
import urllib.request
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", "5180"))
# the only places the editor may write to
ALLOWED = re.compile(r"^(assets/js/content\.js|assets/img/uploads/[\w.\-]+|assets/docs/[\w.\-]+)$")


def git(*args):
    r = subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)
    return r.returncode, (r.stdout + r.stderr).strip()


def translate(text, src, dst):
    """Google's public translate endpoint, with MyMemory as a fallback."""
    if not text.strip():
        return ""
    try:
        q = urllib.parse.urlencode({"client": "gtx", "sl": src, "tl": dst, "dt": "t", "q": text})
        req = urllib.request.Request("https://translate.googleapis.com/translate_a/single?" + q,
                                     headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=12) as r:
            data = json.loads(r.read().decode("utf-8"))
        out = "".join(part[0] for part in data[0] if part and part[0])
        if out:
            return out
    except Exception as e:  # fall through to the backup service
        print("translate (google) failed:", e, file=sys.stderr)
    q = urllib.parse.urlencode({"q": text, "langpair": f"{src}|{dst}"})
    with urllib.request.urlopen("https://api.mymemory.translated.net/get?" + q, timeout=12) as r:
        return json.loads(r.read().decode("utf-8"))["responseData"]["translatedText"]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        if "/api/" in (args[0] if args else ""):
            super().log_message(fmt, *args)

    def reply(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/api/ping"):
            return self.reply(200, {"ok": True})
        return super().do_GET()

    def do_POST(self):
        # same-origin only: refuse requests coming from other websites
        origin = self.headers.get("Origin", "")
        if origin and not re.match(r"^http://(localhost|127\.0\.0\.1)(:\d+)?$", origin):
            return self.reply(403, {"ok": False, "error": "forbidden"})
        try:
            n = int(self.headers.get("Content-Length", "0"))
            body = json.loads(self.rfile.read(n).decode("utf-8") or "{}")
        except Exception:
            return self.reply(400, {"ok": False, "error": "bad request"})
        if self.path == "/api/translate":
            try:
                return self.reply(200, {"ok": True, "text": translate(body.get("text", ""), body.get("from", "ar"), body.get("to", "en"))})
            except Exception as e:
                return self.reply(502, {"ok": False, "error": str(e)})
        if self.path == "/api/publish":
            return self.publish(body)
        return self.reply(404, {"ok": False, "error": "not found"})

    def publish(self, body):
        files = dict(body.get("files") or {})
        if body.get("content"):
            files["assets/js/content.js"] = base64.b64encode(body["content"].encode("utf-8")).decode()
        written = []
        for path, b64 in files.items():
            if not ALLOWED.match(path):
                return self.reply(400, {"ok": False, "error": f"not allowed: {path}"})
            full = os.path.join(ROOT, path)
            os.makedirs(os.path.dirname(full), exist_ok=True)
            with open(full, "wb") as f:
                f.write(base64.b64decode(b64))
            written.append(path)
        code, out = git("add", "--", *written)
        if code:
            return self.reply(500, {"ok": False, "error": out})
        code, _ = git("diff", "--cached", "--quiet")
        if code == 0:
            return self.reply(200, {"ok": True, "pushed": False, "message": "no changes"})
        code, out = git("commit", "-m", body.get("message") or "Content update from the editor")
        if code:
            return self.reply(500, {"ok": False, "error": out})
        git("pull", "--rebase", "--autostash", "-q")
        code, out = git("push", "-q")
        if code:
            return self.reply(500, {"ok": False, "error": "saved and committed, but push failed:\n" + out})
        return self.reply(200, {"ok": True, "pushed": True})


if __name__ == "__main__":
    os.chdir(ROOT)
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    url = f"http://localhost:{PORT}/admin.html"
    print(f"Studio running → {url}\n(keep this window open while editing; close it when done)")
    if "--no-open" not in sys.argv:
        webbrowser.open(url)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
