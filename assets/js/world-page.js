/* Explorer World page: painted layered map, zone panels and deep links (world.html#projects). */
(function () {
  const C = window.CONTENT, A = window.App, t = (o) => A.t(o), ic = A.icon, esc = A.esc;
  const host = document.getElementById("world-art");
  const drawer = document.getElementById("drawer");
  let world = null, active = null;
  const bySlug = (s) => C.projects.find((p) => p.slug === s);

  /* ---------- panel content per zone ---------- */
  function panel(id) {
    const u = C.ui; const z = C.zones.find((x) => x.id === id);
    let body = "";
    const row = (href, title, sub, extra = "") => `<li><a href="${href}"><span><b>${esc(title)}</b><small>${esc(sub)}</small></span>${extra || ic("arrow", "dir")}</a></li>`;
    if (id === "about") {
      body = `<p>${esc(t(C.about.lead))}</p><ul class="d-list">${C.about.facts.map((f) => `<li><div><span><small>${esc(t(f.k))}</small><b>${esc(t(f.v))}</b></span></div></li>`).join("")}</ul>`;
    } else if (id === "experience") {
      body = `<ul class="d-list">${C.experience.map((e) => `<li><div><span><b>${esc(t(e.role))}</b><small>${esc(t(e.org))}</small></span><small dir="ltr">${e.date}</small></div></li>`).join("")}</ul>`;
    } else if (id === "projects") {
      body = `<ul class="d-list">${C.projects.map((p) => row(`project.html?p=${p.slug}`, t(p.title), t(p.kicker), p.award ? `<span class="award">${ic("medal")}</span>` : "")).join("")}</ul>`;
    } else if (id === "achievements") {
      body = `<ul class="d-list">${C.achievements.map((a) => a.project ? row(`project.html?p=${a.project}`, t(a.title), t(a.org) + (a.year ? " · " + a.year : "")) : `<li><div><span><b>${esc(t(a.title))}</b><small>${esc(t(a.org))}${a.year ? " · " + a.year : ""}</small></span>${ic("trophy")}</div></li>`).join("")}</ul>`;
    } else if (id === "library") {
      const L = C.library;
      body = `<ul class="d-list">${L.education.map((e) => `<li><div><span><b>${esc(t(e.t))}</b><small>${esc(t(e.o))}</small></span><small>${e.y}</small></div></li>`).join("")}${L.certifications.map((e) => `<li><div><span><b dir="ltr">${esc(t(e.t))}</b><small>${esc(t(e.o))}</small></span>${ic("medal")}</div></li>`).join("")}</ul>`;
    } else if (id === "contact") {
      const p = C.person;
      body = `<p>${esc(t(u.contactSub))}</p><ul class="d-list">
        <li><a href="mailto:${p.email}"><span><b>${t(u.email)}</b><small dir="ltr">${p.email}</small></span>${ic("mail")}</a></li>
        <li><a href="${p.linkedin}" target="_blank" rel="noopener"><span><b>LinkedIn</b><small>Razan Alawadh</small></span>${ic("linkedin")}</a></li>
        <li><a href="${p.github}" target="_blank" rel="noopener"><span><b>GitHub</b><small dir="ltr">RZNpro</small></span>${ic("github")}</a></li>
        <li><a href="${A.cvPdf()}" download="${A.cvName()}"><span><b>${t(u.cv)}</b><small>PDF</small></span>${ic("download")}</a></li></ul>`;
    }
    drawer.innerHTML = `<div class="d-art d-paint" style="${crop(id)}"><button class="d-close" id="d-close" aria-label="${t(u.close)}">${ic("close")}</button></div>
      <div class="d-body"><p class="q">${esc(t(z.section))} · ${esc(t(z.q))}</p><h2>${esc(t(z.place))}</h2>${body}
      <a class="btn btn-solid" href="${z.href}">${t(u.open)} ${ic("arrow", "dir")}</a></div>`;
    document.getElementById("d-close").onclick = close;
  }

  // a window onto the painting, centred on this zone's building
  function crop(id) { const p = window.RWArt.POS[id]; return window.RWArt.paint([p[0], p[1] + 70], 1.15).match(/style="([^"]*)"/)[1]; }
  function mark(id) {
    host.querySelectorAll(".hs").forEach((h) => h.classList.toggle("active", h.dataset.zone === id));
    document.querySelectorAll("#w-list [data-z]").forEach((b) => b.classList.toggle("on", b.dataset.z === id));
  }
  function open(id, fromHash) {
    if (!C.zones.find((x) => x.id === id)) return;
    active = id; panel(id); drawer.classList.add("open"); mark(id);
    const wide = innerWidth > 760; world.focus(id, wide ? (A.lang === "ar" ? -1 : 1) : 0);
    if (!fromHash) history.replaceState(null, "", "#" + id);
  }
  function close() {
    active = null; drawer.classList.remove("open"); mark(null); world.home();
    history.replaceState(null, "", location.pathname);
  }

  function render() {
    const u = C.ui;
    const stage = document.getElementById("stage");
    // green leaves drifting from the left (past the title) to the right
    if (!stage.querySelector(".petals")) {
      const pet = document.createElement("div"); pet.className = "petals"; pet.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("span");
        p.style.setProperty("--y", (48 + Math.random() * 44).toFixed(1) + "%");
        p.style.setProperty("--s", (0.6 + Math.random() * 0.8).toFixed(2));
        p.style.setProperty("--t", (11 + Math.random() * 9).toFixed(1) + "s");
        p.style.setProperty("--delay", (-Math.random() * 20).toFixed(1) + "s");
        p.style.setProperty("--rise", (-60 - Math.random() * 160).toFixed(0) + "px");
        const greens = [["#B5CF8E", "#5E8A4E"], ["#9DBF7E", "#46703F"], ["#C9D99F", "#6F9358"], ["#8FB57A", "#3E6A3B"]][i % 4];
        p.style.setProperty("--l1", greens[0]); p.style.setProperty("--l2", greens[1]);
        p.innerHTML = "<i></i>"; pet.appendChild(p);
      }
      stage.appendChild(pet);
    }
    world = window.RWArt.mount(host, { interactive: true, onView: (k) => stage.classList.toggle("far", k < 1.06) });
    host.querySelectorAll(".hs").forEach((h) => h.addEventListener("click", () => open(h.dataset.zone)));
    document.getElementById("w-card").innerHTML = `<small>RAZAN — BEYOND IDEAS</small><span class="orn">✦ ❦ ✦</span><h1>${t(u.worldTitle)}</h1><p>${t(u.worldHint)}</p>`;
    // small chips (when zoomed in) + big picture cards (when the whole map is in view)
    const P = window.RWArt.POS, short = (z) => esc(t(z.place));
    document.getElementById("w-list").innerHTML =
      `<div class="w-chips">${C.zones.map((z) => `<button data-z="${z.id}">${ic(z.icon)}<span>${short(z)} · ${esc(t(z.section))}</span></button>`).join("")}</div>` +
      `<div class="w-cards"><button class="car-btn prev" aria-label="Previous">${ic("arrow")}</button><div class="car-track">` +
      C.zones.map((z) => `<button class="pc" data-z="${z.id}"><span class="pc-img">${window.RWArt.paint([P[z.id][0], P[z.id][1] + 75], 0.62)}</span>` +
        `<span class="pc-txt"><b>${short(z)}</b><small>${esc(t(z.section))}</small></span><span class="pc-go">${ic("arrow", "dir")}</span></button>`).join("") +
      `</div><button class="car-btn next" aria-label="Next">${ic("arrow")}</button></div>`;
    document.getElementById("w-list").querySelectorAll("[data-z]").forEach((b) => b.onclick = () => open(b.dataset.z));
    const track = document.querySelector(".car-track"), step = () => (track.querySelector(".pc")?.offsetWidth || 220) + (parseFloat(getComputedStyle(track).columnGap) || 14);
    // show only whole cards at their normal size; if the next card is only just short of fitting, shrink a hair so it fits whole
    const fitCards = () => {
      const box = document.getElementById("w-list"); if (!track.offsetParent || !box.offsetWidth) return;
      track.style.removeProperty("--pcw"); track.style.width = ""; track.style.gap = "";
      const gap = 14, avail = box.offsetWidth;
      // big screens: larger cards, about four and a half in view (the half says "there's more")
      if (innerWidth >= 1480 && avail >= 860) { const g = 18; track.style.gap = g + "px"; track.style.setProperty("--pcw", Math.floor((avail - 3 * g) / 3.5) + "px"); track.style.width = (avail + 40) + "px"; return; }
      // smaller screens: only whole cards at their normal size; if the next is only just short of fitting, shrink a hair so it fits
      const cw = track.querySelector(".pc").offsetWidth;
      let n = Math.max(1, Math.floor((avail + gap) / (cw + gap))), w = cw;
      const nextW = (avail - gap * n) / (n + 1); if (n < C.zones.length && nextW >= cw * 0.86) { n += 1; w = Math.floor(nextW); track.style.setProperty("--pcw", w + "px"); }
      n = Math.min(n, C.zones.length); track.style.width = (n * w + (n - 1) * gap + 40) + "px";
    };
    // hide an arrow when there's nothing more on that side
    const ends = () => { const max = track.scrollWidth - track.clientWidth, pos = Math.abs(track.scrollLeft); const box = track.parentElement;
      box.classList.toggle("at-start", pos < 4); box.classList.toggle("at-end", pos > max - 4); };
    track.addEventListener("scroll", ends, { passive: true });
    fitCards(); ends(); new ResizeObserver(() => { fitCards(); ends(); }).observe(document.getElementById("w-list"));
    const dir = A.lang === "ar" ? -1 : 1; // RTL scrolls the other way
    document.querySelector(".car-btn.next").onclick = () => track.scrollBy({ left: step() * dir, behavior: "smooth" });
    document.querySelector(".car-btn.prev").onclick = () => track.scrollBy({ left: -step() * dir, behavior: "smooth" });
    document.getElementById("zin").innerHTML = ic("plus"); document.getElementById("zout").innerHTML = ic("minus"); document.getElementById("zreset").innerHTML = ic("reset");
    if (active) { panel(active); mark(active); }
  }
  document.getElementById("zin").onclick = () => world.zoomIn();
  document.getElementById("zout").onclick = () => world.zoomOut();
  // reset: back to the opening view; pressed again there, it shows the whole island
  document.getElementById("zreset").onclick = () => (active ? close() : world.atHome() ? world.overview() : world.home());
  addEventListener("keydown", (e) => { if (e.key === "Escape" && active) close(); });

  A.boot(render);
  const h = location.hash.slice(1); if (h) setTimeout(() => open(h, true), 600);
})();
