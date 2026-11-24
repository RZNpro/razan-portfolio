/* The intro (your name with a signature stroke, your roles, your line) and the strip of building cards under it.
   Builds on the hero rendered by home.js. */
(function () {
  const A = window.App, C = window.CONTENT; if (!A) return;
  const t = (o) => A.t(o), esc = A.esc, ic = A.icon, ar = () => A.lang === "ar";
  const ROLES = { ar: ["مديرة مشاريع", "محللة أعمال", "مصممة منتجات رقمية", "مطوّرة حلول ذكاء اصطناعي"], en: ["Project Manager", "Business Analyst", "Digital Product Designer", "AI Solutions Developer"] };
  const ROLE_IC = ["compass", "grid", "sparkle", "gear"];
  const PLACES = ["about", "projects", "experience", "achievements", "library", "contact"];
  const pic = (z, zoom) => window.RWArt.paint([z.pos[0], z.pos[1] + 70], zoom);
  function hero() {
    const box = document.querySelector(".hero-txt"); if (!box) return;
    const p = C.person, u = C.ui;
    box.innerHTML = `
      <h1 class="rv sm-name sm-sign">${esc(t(p.name))}<svg class="sm-stroke" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true"><path d="M8 26 C 140 6, 260 38, 380 18 S 560 10, 592 22"/></svg></h1>
      <ul class="sm-roles" aria-label="${ar() ? "أدواري" : "My roles"}">${ROLES[A.lang].map((r, i) => `<li style="--i:${i}">${ic(ROLE_IC[i])}<span>${esc(r)}</span></li>`).join("")}</ul>
      <blockquote class="sm-quote rv">${t(p.headline)}</blockquote>
      <p class="intro rv">${esc(t(p.intro))}</p>
      <div class="cta rv"><a class="btn btn-solid lg" href="world.html">${ic("sparkle")}<span>${t(u.explore)}</span>${ic("arrow", "dir")}</a><a class="btn btn-ghost lg" href="#projects"><span>${t(u.viewWork)}</span></a></div>`;
    cards();
  }

  /* one arch card per place on the map, in a strip that scrolls sideways (drag, swipe, wheel or the arrows) */
  function cards() {
    const box = document.querySelector(".quick"); if (!box) return;
    const Z = PLACES.map((id) => C.zones.find((z) => z.id === id)).filter(Boolean);
      box.innerHTML = `<button class="qs-btn prev" aria-label="${ar() ? "السابق" : "Previous"}">${ic("arrow")}</button>
        <div class="qs-track" tabindex="0" aria-label="${ar() ? "أقسام الموقع" : "Sections"}">${Z.map((z, i) => `
        <a class="qc3" href="${"#" + z.id}" style="--d:${i * 70}ms"><span class="qc-arch">${pic(z, .9)}</span>
          <span class="qc-txt"><small>${esc(t(z.place))}</small><b>${esc(t(z.section))}</b><em>${esc(t(z.q))}</em></span><i class="qc-go">${ic("arrow", "dir")}</i></a>`).join("")}</div>
        <button class="qs-btn next" aria-label="${ar() ? "التالي" : "Next"}">${ic("arrow")}</button>`;
      const tr = box.querySelector(".qs-track"), step = () => (tr.querySelector(".qc3")?.offsetWidth || 380) + 18, dir = ar() ? -1 : 1;
      box.querySelector(".next").onclick = () => tr.scrollBy({ left: step() * dir, behavior: "smooth" });
      box.querySelector(".prev").onclick = () => tr.scrollBy({ left: -step() * dir, behavior: "smooth" });
      // drag to scroll with the mouse
      let drag = null;
      tr.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; drag = { x: e.clientX, s: tr.scrollLeft, moved: false }; });
      addEventListener("pointermove", (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 5) { drag.moved = true; tr.classList.add("dragging"); } tr.scrollLeft = drag.s - dx; });
      addEventListener("pointerup", () => { if (drag && drag.moved) tr.addEventListener("click", (e) => e.preventDefault(), { once: true, capture: true }); drag = null; tr.classList.remove("dragging"); });
      const ends = () => { const max = tr.scrollWidth - tr.clientWidth, pos = Math.abs(tr.scrollLeft); box.classList.toggle("at-start", pos < 4); box.classList.toggle("at-end", pos > max - 4); };
      tr.addEventListener("scroll", ends, { passive: true }); setTimeout(ends, 50);
        if (A.reveal) A.reveal();
  }

  const orig = A.render; A.render = function () { orig.apply(this, arguments); hero(); };
  hero();
})();
