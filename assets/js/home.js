/* Professional View — renders every section of index.html from CONTENT. */
(function () {
  const C = window.CONTENT, A = window.App;
  let filter = "all";
  const t = (o) => A.t(o), ic = A.icon, esc = A.esc;
  const bySlug = (s) => C.projects.find((p) => p.slug === s);
  const head = (eyebrow, title, sub, id) => `<header class="sec-h rv"><p class="eyebrow">${ic("sparkle", "gold")}<span>${eyebrow}</span></p><h2 id="${id}-t">${title}</h2>${sub ? `<p class="sec-sub">${sub}</p>` : ""}</header>`;

  function hero() {
    const p = C.person, u = C.ui;
    document.getElementById("hero").innerHTML = `
      <div class="hero-in">
        <div class="hero-txt">
          <p class="kick rv"><span></span>${esc(t(p.name))}<span></span></p>
          <h1 class="rv">${t(p.headline)}</h1>
          <p class="role rv">${esc(t(p.title))}</p>
          <p class="focus rv">${t(p.focus).map((f) => `<span>${esc(f)}</span>`).join("")}</p>
          <p class="intro rv">${esc(t(p.intro))}</p>
          <div class="cta rv">
            <a class="btn btn-solid lg" href="world.html">${ic("sparkle")}<span>${t(u.explore)}</span>${ic("arrow", "dir")}</a>
            <a class="btn btn-ghost lg" href="#projects"><span>${t(u.viewWork)}</span></a>
          </div>
        </div>
        <a class="hero-world art-wrap rv" href="world.html" aria-label="${esc(t(u.explore))}">
          <div id="hero-art" role="img" aria-label="${esc(t(u.worldTitle))}"></div>
          <span class="hw-cap">${ic("map")}${t(u.worldHint).split(".")[0]}</span>
        </a>
      </div>
      <div class="quick">
        ${[["about", [718, 385], u.aboutT], ["projects", [905, 255], u.sel], ["achievements", [1308, 175], u.achT], ["library", [1432, 335], u.libT]].map(([id, em, title], i) => `
          <a class="qcard rv" href="#${id}" style="--d:${i * 70}ms">
            <span class="qart">${window.RWArt.paint(em, 0.55)}</span>
            <span class="qtxt"><b>${t(title)}</b><em>${ic("arrow", "dir")}</em></span>
          </a>`).join("")}
      </div>`;
    window.RWArt.mount(document.getElementById("hero-art"), { fit: "cover", labels: true });
  }

  function about() {
    const a = C.about, u = C.ui;
    document.getElementById("about").innerHTML = `<div class="wrap">
      ${head(t(u.nav.about), t(u.aboutT), "", "about")}
      <div class="about-g">
        <div class="about-txt rv">
          <p class="lead">${esc(t(a.lead))}</p>
          <p>${esc(t(a.body))}</p>
          ${a.now ? `<p class="ab-now"><span class="ab-dot"></span>${esc(t(a.now))}</p>` : ""}
          ${a.approach ? `<h3 class="mini">${esc(t(a.approachTitle))}</h3><ol class="ab-steps">${t(a.approach).map((x) => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
          ${a.seeking ? `<h3 class="mini">${esc(t(a.seekingTitle))}</h3><p class="ab-seek">${esc(t(a.seeking))}</p>` : ""}
          <h3 class="mini">${t(u.interests)}</h3>
          <p class="chips">${t(a.interests).map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</p>
        </div>
        <dl class="facts rv">
          ${a.facts.map((f) => `<div><dt>${esc(t(f.k))}</dt><dd>${esc(t(f.v))}</dd></div>`).join("")}
        </dl>
      </div>
      <div class="words" id="words"></div></div>`;
    words();
  }

  /* ---------- words from people who know her: read from the Google Form's published sheet, approved rows only ---------- */
  let wordsRows = null; // cached across re-renders (language switch)
  function parseCSV(txt) {
    const rows = []; let row = [], f = "", q = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (q) { if (c === '"') { if (txt[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && txt[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
      else f += c;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  function words() {
    const W = C.words, box = document.getElementById("words"); if (!W || !box) return;
    const invite = `<a class="btn btn-solid words-cta" href="${esc(W.form)}" target="_blank" rel="noopener">${ic("sparkle")}<span>${esc(t(W.cta))}</span></a>`;
    const paint = (rows) => {
      if (!rows.length) {   // nothing approved yet: just a quiet invitation
        box.className = "words empty rv in";
        box.innerHTML = `<p class="words-invite">${esc(t(W.invite))}</p>${invite}`; return;
      }
      // small glass "tweets" drifting right-to-left at random heights and speeds over the map's sky
      const lanes = [6, 30, 54, 76, 18, 64, 42];
      const cut = (x) => x.length > 120 ? x.slice(0, 117).replace(/\s+\S*$/, "") + "…" : x;
      const tw = (r, i) => { const dur = 26 + Math.random() * 18;
        return `<div class="tw" tabindex="0" dir="auto" style="--y:${lanes[i % lanes.length] + Math.random() * 5}%;--s:${(0.92 + Math.random() * 0.14).toFixed(2)};--dur:${dur.toFixed(1)}s;--delay:${(-(i / rows.length) * dur - Math.random() * 4).toFixed(1)}s">
          <div class="who"><b>${esc(r.name)}</b>${r.role ? `<span>${esc(r.role)}</span>` : ""}</div>
          <p class="short">${esc(cut(r.text))}</p>${r.text.length > 120 ? `<p class="full">${esc(r.text)}</p>` : ""}</div>`; };
      box.className = "words rv in";
      box.innerHTML = `<header class="words-h"><div><h3>${esc(t(W.title))}</h3><p>${esc(t(W.lead))}</p></div>${invite}</header>
        <div class="wsky" aria-label="${esc(t(W.title))}">${rows.slice(0, 12).map(tw).join("")}</div>`;
      box.querySelectorAll(".tw").forEach((el) => el.addEventListener("click", () => el.classList.toggle("open")));
    };
    if (wordsRows) return paint(wordsRows);
    paint([]);
    if (!W.csv) return;
    fetch(W.csv, { cache: "no-store" }).then((r) => r.ok ? r.text() : "").then((txt) => {
      const rows = parseCSV(txt || ""); if (rows.length < 2) { wordsRows = []; return paint([]); }
      const h = rows[0].map((x) => x.trim());
      const col = (re) => h.findIndex((x) => re.test(x));
      const iN = col(/الاسم|name/i), iR = col(/الصفة|العلاقة|role|relation/i), iT = col(/التعليق|comment|word/i), iA = col(/الاعتماد|approv/i);
      wordsRows = rows.slice(1).filter((r) => iA >= 0 && /^\s*(نعم|yes|✓)\s*$/i.test(r[iA] || ""))
        .map((r) => ({ name: (r[iN] || "").trim().slice(0, 60), role: (r[iR] || "").trim().slice(0, 80), text: (r[iT] || "").trim().slice(0, 420) }))
        .filter((r) => r.name && r.text).reverse();   // newest first
      paint(wordsRows);
    }).catch(() => { wordsRows = []; paint([]); });
  }

  function projCard(p, big) {
    const u = C.ui; const href = `project.html?p=${p.slug}`;
    const award = p.award ? `<span class="award">${ic("medal")}${esc(t(p.award))}</span>` : p.status ? `<span class="status">${esc(t(p.status))}</span>` : "";
    return `<article class="pcard ${big ? "big" : ""} rv">
      <a class="p-art" href="${href}" tabindex="-1" aria-hidden="true">${A.visual(p, big ? 1 : 0.9)}</a>
      <div class="p-body">
        <p class="p-meta">${esc(t(C.categories[p.cat]))}${p.year ? ` · ${p.year}` : ""}</p>
        <h3><a href="${href}">${esc(t(p.title))}</a></h3>
        <p class="p-kick">${esc(t(p.kicker))}</p>
        ${big ? `<p class="p-sum">${esc(t(p.summary))}</p><p class="p-role">${ic("compass")}<span>${esc(t(p.role))}</span></p>` : ""}
        <p class="tags">${p.tags.slice(0, big ? 4 : 3).map((x) => `<span>${esc(x)}</span>`).join("")}</p>
        <div class="p-foot">${award}<a class="more" href="${href}">${t(u.caseStudy)} ${ic("arrow", "dir")}</a></div>
      </div>
    </article>`;
  }

  function projects() {
    const u = C.ui; const feat = C.projects.filter((p) => p.featured); const rest = C.projects.filter((p) => !p.featured);
    const shown = rest.filter((p) => filter === "all" || p.cat === filter);
    document.getElementById("projects").innerHTML = `<div class="wrap">
      ${head(t(u.nav.projects), t(u.sel), t(u.selSub), "projects")}
      <div class="feat">${feat.map((p) => projCard(p, true)).join("")}</div>
      <div class="all-h rv"><h3>${t(u.allProjects)}</h3>
        <div class="filters" role="tablist">${Object.keys(C.categories).map((k) => `<button role="tab" aria-selected="${k === filter}" data-f="${k}">${esc(t(C.categories[k]))}</button>`).join("")}</div>
      </div>
      <div class="pgrid">${shown.map((p) => projCard(p, false)).join("")}</div>
    </div>`;
    document.querySelectorAll(".filters button").forEach((b) => b.onclick = () => { filter = b.dataset.f; projects(); A.reveal(); });
  }

  function experience() {
    const u = C.ui;
    document.getElementById("experience").innerHTML = `<div class="wrap">
      ${head(t(u.nav.experience), t(u.expT), "", "experience")}
      <ol class="tl">${C.experience.map((e) => `<li class="rv">
        <span class="tl-dot"></span>
        <div class="tl-card"><p class="tl-date">${e.date}</p><h3>${esc(t(e.role))}</h3><p class="tl-org">${esc(t(e.org))}</p>
        <ul>${t(e.points).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></li>`).join("")}</ol>
    </div>`;
  }

  function achievements() {
    const u = C.ui;
    document.getElementById("achievements").innerHTML = `<div class="wrap">
      ${head(t(u.nav.achievements), t(u.achT), "", "achievements")}
      <div class="ach">${C.achievements.map((a, i) => {
        const p = a.project && bySlug(a.project);
        return `<article class="acard rv ${i === 0 ? "top" : ""}"><span class="a-ic">${ic(a.icon)}</span>
          <div><h3>${esc(t(a.title))}</h3><p>${esc(t(a.org))}</p>
          <p class="a-meta">${a.year ? `<span>${a.year}</span>` : ""}${p ? `<a href="project.html?p=${p.slug}">${esc(t(p.title))} ${ic("arrow", "dir")}</a>` : ""}</p></div></article>`;
      }).join("")}</div>
    </div>`;
  }

  function library() {
    const u = C.ui, L = C.library;
    document.getElementById("library").innerHTML = `<div class="wrap">
      ${head(t(u.nav.library), t(u.libT), t(u.libSub), "library")}
      <div class="lib">
        <section class="shelf rv"><h3>${ic("cap")}${t(u.edu)}</h3>
          ${L.education.map((e) => `<div class="li"><p class="li-t">${esc(t(e.t))}</p><p class="li-o">${esc(t(e.o))}</p><span class="yr">${e.y}</span></div>`).join("")}
          <h3 class="mt">${ic("medal")}${t(u.certs)}</h3>
          ${L.certifications.map((e) => `<div class="li"><p class="li-t" dir="ltr">${esc(t(e.t))}</p><p class="li-o">${esc(t(e.o))}</p></div>`).join("")}
        </section>
        <section class="shelf rv"><h3>${ic("book")}${t(u.courses)}</h3>
          ${L.courses.map((e) => `<div class="li sm"><p class="li-t">${esc(t(e.t))}</p><p class="li-o">${esc(t(e.o))}</p></div>`).join("")}
          <h3 class="mt">${ic("globe")}${t(u.langs)}</h3>
          <div class="langs">${L.languages.map((l) => `<div><span>${esc(t(l.l))}</span><i class="dots" aria-label="${esc(t(l.v))}">${[1, 2, 3, 4, 5].map((n) => `<b class="${n <= l.n ? "on" : ""}"></b>`).join("")}</i><em>${esc(t(l.v))}</em></div>`).join("")}</div>
        </section>
      </div>
      <div class="skills">${L.skills.map((s) => `<section class="sk rv"><h3>${esc(t(s.g))}</h3><p class="chips">${t(s.items).map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</p></section>`).join("")}</div>
    </div>`;
  }

  function contact() {
    const u = C.ui, p = C.person;
    document.getElementById("contact").innerHTML = `<div class="wrap"><div class="contact rv">
      <div class="c-art">${window.RWArt.paint([1412, 520], 0.95)}</div>
      <div class="c-txt">
        <p class="eyebrow light">${ic("sparkle", "gold")}<span>${t(u.nav.contact)}</span></p>
        <h2 id="contact-t">${t(u.contactT)}</h2>
        <p>${t(u.contactSub)}</p>
        <div class="c-btns">
          <a class="btn btn-ivory lg" href="mailto:${p.email}">${ic("mail")}<span dir="ltr">${p.email}</span></a>
          <a class="btn btn-line lg" href="${p.linkedin}" target="_blank" rel="noopener">${ic("linkedin")}<span>LinkedIn</span></a>
          <a class="btn btn-line lg" href="${p.github}" target="_blank" rel="noopener">${ic("github")}<span>GitHub</span></a>
          <a class="btn btn-line lg" href="cv.html">${ic("download")}<span>${t(u.cv)}</span></a>
        </div>
      </div>
    </div></div>`;
  }

  function render() { hero(); about(); projects(); experience(); achievements(); library(); contact(); }
  A.boot(render);

  // highlight current section in nav
  const secs = ["about", "projects", "experience", "achievements", "library", "contact"];
  const spy = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("on", a.dataset.sec === e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach((s) => spy.observe(document.getElementById(s)));
})();
