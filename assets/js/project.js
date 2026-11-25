/* Case-study page: project.html?p=<slug> */
(function () {
  const C = window.CONTENT, A = window.App, t = (o) => A.t(o), ic = A.icon, esc = A.esc;
  const slug = new URLSearchParams(location.search).get("p");
  const list = C.projects; const idx = Math.max(0, list.findIndex((p) => p.slug === slug)); const p = list[idx];

  // links & materials: website, source code, app, deck, document, video, account
  const TYPE_IC = { site: "globe", code: "code", app: "play", deck: "deck", doc: "file", video: "play", social: "sparkle" };
  function linksHtml(p) {
    const host = (u) => { try { return /^https?:/.test(u) ? new URL(u).hostname.replace(/^www\./, "") : (/\.pdf$/i.test(u) ? "PDF" : A.lang === "ar" ? "ملف" : "File"); } catch (e) { return ""; } };
    return `<div class="mats">${p.links.filter((l) => l.url).map((l) => `<a class="mat" href="${esc(l.url)}" target="_blank" rel="noopener">
      <span class="mat-ic">${ic(TYPE_IC[l.type] || "external")}</span>
      <span class="mat-t"><small>${esc(t((C.ui.linkTypes || {})[l.type]) || "")}</small><b>${esc(t(l.label))}</b><em dir="ltr">${esc(host(l.url))}</em></span>
      <span class="mat-go">${ic("external")}</span></a>`).join("")}</div>`;
  }
  // real screens from the project; click to view large
  function galleryHtml(p) {
    const g = p.gallery.filter((x) => x.src);
    return `<div class="gal${g.length === 1 ? " one" : ""}">${g.map((x, i) => `<figure><button class="gal-open" data-i="${i}" aria-label="${esc(t(x.cap) || t(p.title))}"><img src="${esc(x.src)}" alt="${esc(t(x.cap) || "")}" loading="lazy"></button>${t(x.cap) ? `<figcaption>${esc(t(x.cap))}</figcaption>` : ""}</figure>`).join("")}</div>`;
  }
  function lightbox(i) {
    const g = p.gallery.filter((x) => x.src); let k = i;
    const box = document.createElement("div"); box.className = "lb"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
    const paint = () => { box.innerHTML = `<button class="lb-x" aria-label="${A.lang === "ar" ? "إغلاق" : "Close"}">✕</button>
      ${g.length > 1 ? `<button class="lb-nav lb-prev" aria-label="Previous">‹</button><button class="lb-nav lb-next" aria-label="Next">›</button>` : ""}
      <figure><img src="${esc(g[k].src)}" alt="${esc(t(g[k].cap) || "")}">${t(g[k].cap) ? `<figcaption>${esc(t(g[k].cap))}</figcaption>` : ""}</figure>`; };
    const go = (d) => { k = (k + d + g.length) % g.length; paint(); };
    const close = () => { box.remove(); removeEventListener("keydown", key); };
    const key = (e) => { if (e.key === "Escape") close(); if (e.key === "ArrowLeft") go(A.lang === "ar" ? 1 : -1); if (e.key === "ArrowRight") go(A.lang === "ar" ? -1 : 1); };
    box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lb-x")) close(); else if (e.target.closest(".lb-prev")) go(-1); else if (e.target.closest(".lb-next")) go(1); });
    addEventListener("keydown", key); paint(); document.body.appendChild(box); box.querySelector(".lb-x").focus();
  }
  document.addEventListener("click", (e) => { const b = e.target.closest(".gal-open"); if (b) lightbox(+b.dataset.i); });
  function render() {
    const u = C.ui; const next = list[(idx + 1) % list.length];
    document.title = `${t(p.title)} — ${t(C.person.name)}`;
    const md = document.querySelector('meta[name="description"]'); if (md && p.summary) md.content = t(p.summary);
    const meta = [
      [u.myRole, t(p.role)],
      [{ ar: "السنة", en: "Year" }, p.year || "—"],
      [{ ar: "المجال", en: "Category" }, t(C.categories[p.cat])],
      p.award ? [{ ar: "الإنجاز", en: "Recognition" }, t(p.award)] : p.status ? [{ ar: "الحالة", en: "Status" }, t(p.status)] : null
    ].filter(Boolean);
    const secs = [
      ["overview", u.overview, `<p>${esc(t(p.summary))}</p>${p.context ? `<p style="margin-top:12px;color:var(--muted)">${esc(t(p.context))}</p>` : ""}`],
      ["challenge", u.challenge, `<p>${esc(t(p.challenge))}</p>`],
      ["role", u.myRole, `<p>${esc(t(p.role))}</p>`],
      ["approach", u.approach, `<ol class="steps">${t(p.approach).map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`],
      ["solution", u.solution, `<p>${esc(t(p.solution))}</p>`],
      ...(p.gallery && p.gallery.some((g) => g.src) ? [["gallery", u.gallery || { ar: "لقطات من المشروع", en: "Screens & visuals" }, galleryHtml(p)]] : []),
      ["outcome", u.outcome, `<ul class="outs">${t(p.outcome).map((x) => `<li>${ic("star")}<span>${esc(x)}</span></li>`).join("")}</ul>` +
        ""],
      ...(p.links && p.links.some((l) => l.url) ? [["links", u.links, linksHtml(p)]] : []),
      ["tools", u.tools, `<p class="tags">${p.tools.map((x) => `<span>${esc(x)}</span>`).join("")}</p>`]
    ];
    document.getElementById("cs").innerHTML = `
      <section class="cs-hero"><div class="wrap">
        <p class="crumbs rv"><a class="back" href="index.html#projects">${ic("arrow")} ${t(u.back)}</a><span>·</span><a href="world.html#projects">${ic("map")} ${t(u.worldTitle)}</a></p>
        <div class="cs-top">
          <div>
            <p class="eyebrow rv">${ic("sparkle", "gold")}<span>${esc(t(C.categories[p.cat]))}</span></p>
            <h1 class="rv">${esc(t(p.title))}</h1>
            <p class="cs-kick rv">${esc(t(p.kicker))}</p>
            <p class="tags rv" style="margin-top:16px">${p.tags.map((x) => `<span>${esc(x)}</span>`).join("")}</p>
          </div>
          <div class="cs-art rv">${A.visual(p, 1.1)}</div>
        </div>
        <dl class="cs-meta rv">${meta.map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </div></section>
      <div class="wrap"><div class="cs-body">
        <nav class="toc" aria-label="Sections">${secs.map(([id, l]) => `<a href="#${id}">${t(l)}</a>`).join("")}</nav>
        <div>${secs.map(([id, l, html], i) => `<section class="cs-sec rv" id="${id}"><h2><small>${String(i + 1).padStart(2, "0")}</small>${t(l)}</h2>${html}</section>`).join("")}</div>
      </div>
      <nav class="cs-nav">
        <a class="btn btn-ghost lg" href="index.html#projects">${t(u.back)}</a>
        <a class="btn btn-solid lg" href="project.html?p=${next.slug}">${t(u.next)}: ${esc(t(next.title))} ${ic("arrow", "dir")}</a>
      </nav></div>`;
  }
  A.boot(render);
})();
