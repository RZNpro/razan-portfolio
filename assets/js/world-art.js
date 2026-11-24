/* Painted Explorer World: stacks the Canva-separated art layers (1680×944 scene space),
   adds depth parallax, light ambient animation and clickable building hotspots. */
(function () {
  const W = 1680, H = 944, BASE = "assets/img/art/";
  let MAXS = 1.3; // max screen px per art px before the painting turns soft (raised when hi-res art loads)
  // layer: file, x, y, width (scene px), parallax depth, extra class
  const LAYERS = [
    ["sky", 0, 0, 1680, 4, "l-sky"],
    ["islets", 1478, 98, 181, 10, "l-islets"],
    ["balloon", 703, 122, 51, 14, "l-balloon"],
    ["island", 467, 39, 1182, 18, "l-island"]
  ];
  const FG = ["foreground", 0, 56, 1680, 34, "l-fg"];
  // where each zone's building sits in the painting (scene px)
  // where each zone's building sits in the painting (scene px) — edited in content.js (zones[].pos)
  const POS = {};
  (window.CONTENT?.zones || []).forEach((z) => { if (z.pos) POS[z.id] = z.pos; });

  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function place(e, x, y, w) { e.style.left = x + "px"; e.style.top = y + "px"; if (w) e.style.width = w + "px"; return e; }
  function layer(file, x, y, w, d, cls, hi) {
    const l = place(el("div", "ly " + cls), x, y, w); l.style.setProperty("--d", d);
    const img = new Image(); img.src = BASE + file + ".webp"; img.alt = ""; img.decoding = "async"; img.draggable = false;
    l.appendChild(img);
    // progressive: show the light 1x art at once, then swap in the sharp 2x (AI-upscaled) version
    if (hi) {
      const big = new Image(); big.decoding = "async";
      // decode first, then swap, then ask the camera to repaint (some browsers otherwise keep a blank layer until you touch the map)
      big.onload = () => { (big.decode ? big.decode() : Promise.resolve()).catch(() => {}).then(() => { img.src = big.src; if (file === "island") MAXS = 2.4; requestAnimationFrame(() => dispatchEvent(new Event("rw-art-swap"))); }); };
      const go = () => { big.src = BASE + "2x/" + file + ".webp"; };
      document.readyState === "complete" ? setTimeout(go, 150) : addEventListener("load", () => setTimeout(go, 150), { once: true });
    }
    return l;
  }

  function mount(host, opts = {}) {
    const A = window.App, C = window.CONTENT, t = (o) => A.t(o);
    host.classList.add("art-host");
    host.innerHTML = "";
    // nature beyond the painting: a soft, blurred continuation of its own sky and trees, so zooming out never shows an edge
    const aura = el("div", "art-aura"); if (opts.interactive) host.appendChild(aura);
    const cam = el("div", "art-cam"); const scene = el("div", "art-scene"); cam.appendChild(scene); host.appendChild(cam);

    const hi = !!opts.interactive;
    LAYERS.forEach((L) => scene.appendChild(layer(...L, hi)));

    // ambient effects that ride with the island
    const fx = el("div", "ly fx"); fx.style.setProperty("--d", 18); place(fx, 0, 0, W);
    [[930, 590, 30, 85], [1290, 640, 30, 100], [1585, 560, 18, 60]].forEach(([x, y, w, h], i) => {
      const f = place(el("span", "fall"), x, y, w); f.style.height = h + "px"; f.style.animationDelay = (i * 0.4) + "s"; fx.appendChild(f);
    });
    const portal = place(el("span", "portal-glow"), 1372, 500, 84); fx.appendChild(portal);
    [[1090, 365], [905, 240], [1305, 60]].forEach(([x, y], i) => { const g = place(el("span", "beam"), x, y, 6); g.style.animationDelay = i * 0.9 + "s"; fx.appendChild(g); });
    for (let i = 0; i < 22; i++) {
      const s = place(el("span", "spk"), 480 + Math.random() * 1150, 40 + Math.random() * 600, 0);
      s.style.animationDelay = (Math.random() * 5).toFixed(2) + "s"; s.style.setProperty("--s", (0.5 + Math.random()).toFixed(2)); fx.appendChild(s);
    }
    scene.appendChild(fx);

    // the river itself flows: moving light streaks masked to the river's shape in the painting
    const river = place(el("div", "ly river"), 467, 39, 1182); river.style.setProperty("--d", 18); river.style.height = "755px";
    river.innerHTML = `<span class="flow-a"></span><span class="flow-b"></span>`;
    scene.appendChild(river);

    // fish that leap out of the river now and then (scene px, on the water)
    const fishLayer = el("div", "ly fishes"); fishLayer.style.setProperty("--d", 18); place(fishLayer, 0, 0, W);
    const FISH = `<svg viewBox="0 0 40 20" aria-hidden="true"><defs><linearGradient id="fishG" x1="0" x2="1"><stop offset="0" stop-color="#F7B267"/><stop offset=".6" stop-color="#F08A4B"/><stop offset="1" stop-color="#E9D7B4"/></linearGradient></defs>
      <path d="M4 10 C10 2 24 2 31 10 C24 18 10 18 4 10Z" fill="url(#fishG)"/><path d="M30 10 L39 3 L37 10 L39 17Z" fill="#E9874A"/><circle cx="10" cy="8.6" r="1.4" fill="#2b2b2b"/><path d="M15 5 Q19 2 22 5" fill="none" stroke="#fff" stroke-width="1.2" opacity=".6"/></svg>`;
    [[1187, 370, 0, 9.5, 1], [1277, 443, 3.4, 11, -1], [1119, 636, 6.8, 12.5, 1]].forEach(([x, y, delay, dur, dir]) => {
      const f = place(el("span", "fish"), x, y); f.style.setProperty("--delay", delay + "s"); f.style.setProperty("--dur", dur + "s"); f.style.setProperty("--dir", dir);
      f.innerHTML = `<i class="fish-arc"><i class="fish-body">${FISH}</i></i><b class="splash s1"></b><b class="splash s2"></b>`;
      fishLayer.appendChild(f);
    });
    scene.appendChild(fishLayer);

    // drifting mist between island and foreground
    const mist = el("div", "ly mist"); mist.style.setProperty("--d", 26); place(mist, 0, 0, W);
    [[200, 640, 520], [900, 760, 640], [1300, 600, 420], [-100, 420, 460]].forEach(([x, y, w], i) => { const m = place(el("span", "wisp"), x, y, w); m.style.animationDelay = -(i * 9) + "s"; mist.appendChild(m); });
    scene.appendChild(mist);

    // hotspots (ride with the island)
    let hs = null;
    if (opts.interactive || opts.labels) {
      hs = el("div", "ly hotspots"); hs.style.setProperty("--d", 18); place(hs, 0, 0, W);
      C.zones.forEach((z) => {
        const p = POS[z.id]; if (!p) return;
        const b = el(opts.interactive ? "button" : "span", "hs", `<span class="hs-ring"></span><span class="hs-lab"><b>${A.esc(t(z.place))}</b><small>${A.esc(t(z.section))}</small></span>`);
        b.dataset.zone = z.id; place(b, p[0], p[1]);
        if (opts.interactive) { b.type = "button"; b.setAttribute("aria-label", t(z.place) + " — " + t(z.section)); }
        hs.appendChild(b);
      });
      scene.appendChild(hs);
    }
    // the foreground trees (by the title) live on their own sheet: crisp, never fogged, and they stay put when you zoom out
    const fgCam = el("div", "art-cam art-fgcam"); const fgScene = el("div", "art-scene"); fgCam.appendChild(fgScene); host.appendChild(fgCam);
    fgScene.appendChild(layer(...FG, hi));

    /* ---------- camera ---------- */
    const cover = opts.fit !== "contain";
    let cs = { s: 1, x: 0, y: 0 }, base = 1, minS = 1, anim = 0, homeView = { s: 1, x: 0, y: 0 };
    const size = () => [host.clientWidth, host.clientHeight];
    function clamp(c) {
      const [w, h] = size(); const sw = W * c.s, sh = H * c.s;
      c.x = sw >= w ? Math.min(0, Math.max(w - sw, c.x)) : (w - sw) / 2;
      c.y = sh >= h ? Math.min(0, Math.max(h - sh, c.y)) : (h - sh) / 2;
      return c;
    }
    function apply(c) { cs = clamp({ ...c }); cam.style.transform = `translate(${cs.x}px, ${cs.y}px) scale(${cs.s})`;
      const fs = cs.s >= base ? cs : homeView; fgCam.style.transform = `translate(${fs.x}px, ${fs.y}px) scale(${fs.s})`;
      aura.style.transform = `translate(${cs.x + W / 2 * cs.s}px, ${cs.y + H / 2 * cs.s}px) scale(${cs.s * 1.9}) translate(${-W / 2}px, ${-H / 2}px)`;
      // edges melt into the nature around them only as you zoom out past the opening view (the opening view stays crisp)
      const k = base > minS ? Math.max(0, Math.min(1, (base - cs.s) / ((base - minS) * 0.6))) : 0;
      cam.style.setProperty("--fx", (7 * k).toFixed(2) + "%"); cam.style.setProperty("--fy", (13 * k).toFixed(2) + "%"); if (opts.onView) opts.onView(cs.s / (base || 1)); }
    function home() {
      const [w, h] = size(); base = cover ? Math.max(w / W, h / H) : Math.min(w / W, h / H);
      minS = Math.min(base, Math.min(w / W, h / H)); // zoom out past the opening view, but only until the whole painting shows (its paper edges)
      const s = base; const cx = cover ? 1060 : W / 2, cy = cover ? 430 : H / 2;
      homeView = clamp({ s, x: w / 2 - cx * s, y: h / 2 - cy * s });
      return { ...homeView };
    }
    function fly(to, ms = 900) {
      cancelAnimationFrame(anim); moved = true;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return apply(to);
      const from = { ...cs }, t0 = performance.now();
      const step = (n) => { const k = Math.min(1, (n - t0) / ms), e = 1 - Math.pow(1 - k, 3);
        apply({ s: from.s + (to.s - from.s) * e, x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e });
        if (k < 1) anim = requestAnimationFrame(step); };
      anim = requestAnimationFrame(step);
    }
    function focus(id, side) {
      const p = POS[id]; if (!p) return; const [w, h] = size();
      const s = Math.max(base, Math.min(MAXS, Math.max(base * 1.45, Math.min(w / 900, h / 560)))); const off = side ? side * Math.min(200, w * 0.18) : 0;
      fly({ s, x: w / 2 - off - p[0] * s, y: h / 2 - (p[1] + 60) * s });
    }
    function zoomBy(f, px, py) {
      const [w, h] = size(); px = px ?? w / 2; py = py ?? h / 2;
      const s = Math.min(Math.max(cs.s * f, minS), Math.max(base, MAXS));
      return { s, x: px - (px - cs.x) * (s / cs.s), y: py - (py - cs.y) * (s / cs.s) };
    }
    let lastW = 0, lastH = 0, moved = false;
    addEventListener("rw-art-swap", () => { cam.style.transform += " translateZ(0)"; fgCam.style.transform += " translateZ(0)"; requestAnimationFrame(() => apply(cs)); });
    apply(home());
    // re-fit only when the box really changes size; keep a focused view otherwise
    new ResizeObserver(() => { const [w, h] = size(); if (w === lastW && h === lastH) return; lastW = w; lastH = h; moved ? apply(cs) : apply(home()); }).observe(host);

    // parallax from pointer position
    host.addEventListener("pointermove", (e) => {
      const r = host.getBoundingClientRect();
      host.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      host.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    host.addEventListener("pointerleave", () => { host.style.setProperty("--px", 0); host.style.setProperty("--py", 0); });

    // drag to pan + wheel zoom (interactive only)
    if (opts.interactive) {
      let drag = null;
      host.addEventListener("pointerdown", (e) => { if (e.target.closest(".hs")) return; drag = { x: e.clientX, y: e.clientY, c: { ...cs }, id: e.pointerId, moved: false }; });
      host.addEventListener("pointermove", (e) => {
        if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) > 4) { drag.moved = true; host.setPointerCapture(drag.id); host.classList.add("dragging"); cancelAnimationFrame(anim); }
        if (drag.moved) apply({ ...drag.c, x: drag.c.x + dx, y: drag.c.y + dy });
      });
      const end = () => { drag = null; host.classList.remove("dragging"); };
      host.addEventListener("pointerup", end); host.addEventListener("pointercancel", end);
      host.addEventListener("wheel", (e) => { e.preventDefault(); cancelAnimationFrame(anim); const r = host.getBoundingClientRect(); apply(zoomBy(e.deltaY > 0 ? 0.9 : 1.1, e.clientX - r.left, e.clientY - r.top)); }, { passive: false });
    }

    // the whole island in view (the reset button's second press)
    const overview = () => { const [w, h] = size(); const sc = minS; return { s: sc, x: (w - W * sc) / 2, y: (h - H * sc) / 2 }; };
    const atHome = () => Math.abs(cs.s - homeView.s) < 0.004 && Math.abs(cs.x - homeView.x) < 3 && Math.abs(cs.y - homeView.y) < 3;
    return { host, hotspots: hs, focus, atHome, overview: () => { fly(overview()); }, home: () => { fly(home()); moved = false; }, zoomIn: () => fly(zoomBy(1.3), 400), zoomOut: () => fly(zoomBy(1 / 1.3), 400) };
  }

  /* A window onto the painting centred on scene point (x, y); z = zoom (1 = native size). */
  function paint(at, z = 1, cls = "") {
    const [x, y] = at;
    const pos = (n, half) => `calc(50% - ${(n * z - half * z).toFixed(1)}px)`;
    const d = z > 0.9 ? "2x/" : "";
    const style = `background-image:url(${BASE}${d}island.webp),url(${BASE}${d}sky.webp);` +
      `background-size:${(1182 * z).toFixed(1)}px auto,${(1680 * z).toFixed(1)}px auto;` +
      `background-position:${pos(x - 467, 591)} ${pos(y - 39, 377.5)},${pos(x, 840)} ${pos(y, 472)}`;
    return `<div class="paint ${cls}" style="${style}" aria-hidden="true"></div>`;
  }

  window.RWArt = { mount, POS, paint };
})();
