#!/usr/bin/env python3
"""Make the downloadable CV PDFs (Arabic + English) from cv.html.

Renders the page in macOS's own WebKit (no browser needed) and saves a paginated A4 PDF
with real, selectable text, so job-application systems (ATS) can read it.

    python3 tools/cv_pdf.py            -> assets/docs/razan-alawadh-cv-ar.pdf / -en.pdf

Needs PyObjC:  python3 -m pip install --user --only-binary :all: "pyobjc-core==10.3.1" \
               "pyobjc-framework-Cocoa==10.3.1" "pyobjc-framework-WebKit==10.3.1"
The studio runs this automatically on every publish.
"""
import os
import sys
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import AppKit
import Foundation
import objc
import WebKit

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "docs")
NAMES = {"ar": "razan-alawadh-cv-ar.pdf", "en": "razan-alawadh-cv-en.pdf"}
A4 = (595.28, 841.89)  # points
MARGIN_V, MARGIN_H = 34.0, 31.0  # ~12mm / 11mm, as in cv.css @page


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve():
    srv = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


class NavDelegate(Foundation.NSObject):
    done = False

    def webView_didFinishNavigation_(self, web, nav):
        self.done = True

    def webView_didFailNavigation_withError_(self, web, nav, err):
        print("load failed:", err, file=sys.stderr)
        self.done = True


def spin(until, timeout):
    end = time.time() + timeout
    while not until() and time.time() < end:
        Foundation.NSRunLoop.currentRunLoop().runUntilDate_(Foundation.NSDate.dateWithTimeIntervalSinceNow_(0.05))
    return until()


def render(url, out):
    # lay the page out at desktop width (the two-column CV), then fit it to the A4 page width
    frame = Foundation.NSMakeRect(0, 0, 900, 1200)
    win = AppKit.NSWindow.alloc().initWithContentRect_styleMask_backing_defer_(frame, AppKit.NSWindowStyleMaskBorderless, AppKit.NSBackingStoreBuffered, False)
    web = WebKit.WKWebView.alloc().initWithFrame_configuration_(frame, WebKit.WKWebViewConfiguration.new())
    win.setContentView_(web)
    nav = NavDelegate.new()
    web.setNavigationDelegate_(nav)
    web.loadRequest_(Foundation.NSURLRequest.requestWithURL_(Foundation.NSURL.URLWithString_(url)))
    if not spin(lambda: nav.done, 30):
        raise RuntimeError("page did not load: " + url)
    # let the page build itself and load its fonts
    ready = {"v": False}
    def check():
        web.evaluateJavaScript_completionHandler_(
            "document.fonts.ready.then(()=>1); !!document.querySelector('.cv-sheet') && document.fonts.status==='loaded'",
            lambda r, e: ready.__setitem__("v", bool(r)))
        return ready["v"]
    spin(check, 15)
    spin(lambda: False, 0.8)

    info = AppKit.NSPrintInfo.sharedPrintInfo().copy()
    info.setPaperSize_(Foundation.NSMakeSize(*A4))
    info.setTopMargin_(MARGIN_V); info.setBottomMargin_(MARGIN_V)
    info.setLeftMargin_(MARGIN_H); info.setRightMargin_(MARGIN_H)
    info.setHorizontalPagination_(AppKit.NSPrintingPaginationModeFit)
    info.setVerticalPagination_(AppKit.NSPrintingPaginationModeAutomatic)
    info.setVerticallyCentered_(False)
    if os.path.exists(out):
        os.remove(out)
    d = info.dictionary()
    d[AppKit.NSPrintJobDisposition] = AppKit.NSPrintSaveJob
    d[AppKit.NSPrintJobSavingURL] = Foundation.NSURL.fileURLWithPath_(out)

    op = web.printOperationWithPrintInfo_(info)
    op.setShowsPrintPanel_(False)
    op.setShowsProgressPanel_(False)
    op.view().setFrame_(frame)
    finished = {"v": False}
    op.runOperationModalForWindow_delegate_didRunSelector_contextInfo_(win, None, None, None)
    # the save happens asynchronously; wait until the file is written and stable
    def written():
        if not os.path.exists(out):
            return False
        s1 = os.path.getsize(out); time.sleep(0.2)
        return s1 > 0 and s1 == os.path.getsize(out)
    if not spin(written, 30):
        raise RuntimeError("PDF was not written: " + out)
    win.close()


def main():
    AppKit.NSApplication.sharedApplication().setActivationPolicy_(AppKit.NSApplicationActivationPolicyProhibited)
    srv = serve()
    port = srv.server_address[1]
    os.makedirs(OUT, exist_ok=True)
    made = []
    for lang, name in NAMES.items():
        out = os.path.join(OUT, name)
        render(f"http://127.0.0.1:{port}/cv.html?lang={lang}&pdf=1", out)
        made.append(os.path.relpath(out, ROOT))
        print("made", made[-1], os.path.getsize(out), "bytes")
    srv.shutdown()
    return made


if __name__ == "__main__":
    main()
