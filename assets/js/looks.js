/* Enhancement looks on top of the original design. Default = 3 (liquid glass + motion).
   Try others with ?look=0|1|2|3 (remembered), or the switcher shown on your own machine. 0 = original. */
(function () {
  const A = window.App; if (!A) return;
  const qs = new URLSearchParams(location.search).get("look");
  if (qs !== null) { localStorage.setItem("rz-look", qs); const u = new URL(location.href); u.searchParams.delete("look"); history.replaceState(null, "", u.pathname + u.search + u.hash); }
  const DEFAULT = "3"; // liquid glass + motion — chosen look
  let look = localStorage.getItem("rz-look") || DEFAULT;
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setLook = (l) => { look = String(l); localStorage.setItem("rz-look", look); look === "0" ? root.removeAttribute("data-look") : root.setAttribute("data-look", look); enhance(); paintSwitch(); };
  const has = (...ls) => ls.includes(look);

  // persistent decorations
  const prog = Object.assign(document.createElement("div"), { className: "lk-progress" });
  const cur = Object.assign(document.createElement("div"), { className: "lk-cursor" });
  const blobs = Object.assign(document.createElement("div"), { className: "lk-blobs" });
  blobs.innerHTML = [["#A8B99D", 44, -8, 70], ["#E7D3A6", 34, 60, 10], ["#C9DCC4", 30, 20, 55], ["#D9C3C0", 24, 75, 70]]
    .map(([c, s, x, y], i) => `<i style="background:${c};width:${s}vw;height:${s}vw;left:${x}%;top:${y}%;--t:${20 + i * 6}s;--x:${(i % 2 ? -1 : 1) * 7}vw;--y:${(i % 3 - 1) * 6}vw"></i>`).join("");
  document.body.append(prog, cur, blobs);

  // the switcher (only on your machine, so visitors never see it)
  let sw = null;
  function paintSwitch() {
    if (!window.RZ_LOCAL) return;
    if (!sw) { sw = document.createElement("div"); sw.className = "lk-switch"; document.body.appendChild(sw); }
    const L = [["0", "الأصلي"], ["1", "١ زجاج"], ["2", "٢ حركة"], ["3", "٣ الاثنين"]];
    sw.innerHTML = `<span>الشكل:</span>` + L.map(([k, l]) => `<button data-l="${k}" class="${k === look ? "on" : ""}">${l}</button>`).join("");
    sw.querySelectorAll("button").forEach((b) => b.onclick = () => setLook(b.dataset.l));
  }

  /* ---------- per-render enhancements (re-run after every render, e.g. language switch) ---------- */
  function enhance() {
    // glass surfaces
    document.querySelectorAll(".pcard, .facts > div, .tl-card, .acard, .shelf, .sk, .qcard, .cs-meta > div, .steps li, .outs li").forEach((el) => el.classList.add("gl"));
    if (!has("2", "3")) return;
    // headline: split into words that rise in
    const h1 = document.querySelector(".hero-txt h1, .cs-top h1");
    if (h1 && !h1.dataset.split) {
      let i = 0; h1.dataset.split = 1;
      const walk = (node) => [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach((w) => { if (!w.trim()) { f.append(w); return; } const s = document.createElement("span"); s.className = "lw"; s.style.setProperty("--w", i++); s.textContent = w; f.append(s); }); n.replaceWith(f); }
        else if (n.nodeType === 1) walk(n);
      });
      walk(h1);
    }
    // stagger the parts of every section
    document.querySelectorAll(".feat, .pgrid, .tl, .ach, .lib, .skills, .quick, .facts, .about-g, .outs, .steps").forEach((group) => {
      [...group.querySelectorAll(":scope > .rv, :scope > * > .rv, :scope > li")].forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--d", (i % 6) * 80 + "ms"); });
    });
    document.querySelectorAll(".pcard, .acard, .qcard, .tl-card").forEach((el) => el.classList.add("tilt"));
    document.querySelectorAll(".btn").forEach((el) => el.classList.add("magnet"));
    // count-up numbers (the GPA, years in facts) when they appear
    document.querySelectorAll(".facts dd").forEach((dd) => {
      if (dd.dataset.counted) return; const m = dd.textContent.match(/\d+(\.\d+)?/); if (!m) return;
      dd.dataset.counted = 1; const target = parseFloat(m[0]), dec = (m[1] || "").length - 1, html = dd.innerHTML;
      const io = new IntersectionObserver((es) => { if (!es[0].isIntersecting) return; io.disconnect(); if (reduce) return;
        const t0 = performance.now(); const step = (n) => { const k = Math.min(1, (n - t0) / 1400), v = target * (1 - Math.pow(1 - k, 3));
          dd.innerHTML = html.replace(m[0], v.toFixed(Math.max(0, dec))); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); });
      io.observe(dd);
    });
    if (A.reveal) A.reveal();
  }

  /* ---------- global pointer + scroll effects ---------- */
  addEventListener("pointermove", (e) => {
    if (has("2", "3")) cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    if (has("1", "3")) { const g = e.target.closest && e.target.closest(".gl"); if (g) { const r = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - r.left + "px"); g.style.setProperty("--my", e.clientY - r.top + "px"); } }
    if (!has("2", "3") || reduce) return;
    const t = e.target.closest && e.target.closest(".tilt");
    document.querySelectorAll(".tilt").forEach((el) => { if (el !== t) el.style.transform = ""; });
    if (t) { const r = t.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      t.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`; }
    const m = e.target.closest && e.target.closest(".magnet");
    document.querySelectorAll(".magnet").forEach((el) => { if (el !== m) el.style.transform = ""; });
    if (m) { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
      m.style.setProperty("--bx", e.clientX - r.left + "px"); m.style.setProperty("--by", e.clientY - r.top + "px"); }
  }, { passive: true });
  document.addEventListener("pointerleave", () => document.querySelectorAll(".tilt, .magnet").forEach((el) => el.style.transform = ""));

  function onScroll() {
    const h = document.documentElement; prog.style.setProperty("--p", (h.scrollTop / Math.max(1, h.scrollHeight - innerHeight)).toFixed(4));
    if (!has("2", "3")) return;
    const tl = document.querySelector(".tl");
    if (tl) { const r = tl.getBoundingClientRect(); const f = Math.min(1, Math.max(0, (innerHeight * .65 - r.top) / r.height)); tl.style.setProperty("--fill", f.toFixed(3));
      tl.querySelectorAll(":scope > li").forEach((li) => li.classList.toggle("lit", li.getBoundingClientRect().top < innerHeight * .65)); }
    if (!reduce) document.querySelectorAll(".p-art").forEach((p) => { const r = p.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      p.style.setProperty("--py", ((r.top + r.height / 2 - innerHeight / 2) * -0.06).toFixed(1) + "px"); });
  }
  addEventListener("scroll", onScroll, { passive: true });

  // re-apply after every render (language switch re-renders the page)
  const orig = A.render; A.render = function () { orig.apply(this, arguments); requestAnimationFrame(() => { enhance(); onScroll(); }); };
  setLook(look); onScroll();
})();
