/* Shared: icons, language switching (Arabic RTL / English LTR), header and footer. */
window.ICONS = {
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  compass: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M15.5 8.5l-2 5-5 2 2-5z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9.5 17h5v4h-5z",
  book: "M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2zM4 20a2 2 0 0 0 2 1h13v-3",
  gear: "M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  medal: "M7 3l3 6M17 3l-3 6M12 9a6 6 0 1 0 0 12a6 6 0 1 0 0-12M12 12.5l1.2 2.3 2.5.4-1.8 1.7.4 2.5-2.3-1.2-2.3 1.2.4-2.5-1.8-1.7 2.5-.4z",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  linkedin: "M4 9h4v11H4zM6 4a2 2 0 1 0 0 4a2 2 0 1 0 0-4M10 9h4v1.8c.6-1.1 2-2 3.6-2 2.6 0 3.4 1.7 3.4 4.4V20h-4v-6c0-1.4-.4-2.3-1.6-2.3S14 12.7 14 14v6h-4z",
  github: "M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  globe: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  plus: "M12 5v14M5 12h14", minus: "M5 12h14", reset: "M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4", close: "M6 6l12 12M18 6L6 18",
  sparkle: "M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  menu: "M4 7h16M4 12h16M4 17h16",
  play: "M8 5l11 7-11 7z",
  sun: "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16",
  file: "M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h5",
  deck: "M3 4h18v12H3zM8 21h8M12 16v5M7 12l3-3 3 2 4-4"
};

(function () {
  const C = window.CONTENT;
  const App = (window.App = {});
  const qLang = new URLSearchParams(location.search).get("lang"); // ?lang=ar|en (used to render each language's CV PDF)
  App.lang = (/^(ar|en)$/.test(qLang || "") && qLang) || localStorage.getItem("rz-lang") || "ar";
  App.t = (o) => (o == null ? "" : typeof o === "string" ? o : o[App.lang] ?? o.en ?? "");
  App.icon = (n, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${window.ICONS[n] || ""}"/></svg>`;
  App.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  App.page = document.body.dataset.page;
  App.render = () => {};

  function applyDir() {
    document.documentElement.lang = App.lang;
    document.documentElement.dir = App.lang === "ar" ? "rtl" : "ltr";
  }
  App.theme = () => document.documentElement.dataset.theme || "light";
  App.setTheme = (th) => {
    document.documentElement.dataset.theme = th; localStorage.setItem("rz-theme", th);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", th === "dark" ? "#1C2A21" : "#F3EFE3");
    App.header();
  };
  App.setLang = (l) => {
    App.lang = l; localStorage.setItem("rz-lang", l); applyDir();
    App.header(); App.footer(); App.render(); App.reveal();
  };

  App.header = () => {
    const el = document.getElementById("site-header"); if (!el) return;
    const u = C.ui; const onHome = App.page === "home"; const base = onHome ? "" : "index.html";
    const links = ["about", "projects", "experience", "achievements", "library", "contact"];
    const icons = { about: "home", projects: "grid", experience: "compass", achievements: "trophy", library: "book", contact: "mail" };
    const toggle = App.page === "world"
      ? `<a class="btn btn-ghost sm" href="index.html">${App.icon("grid")}<span>${App.t(u.proView)}</span></a>`
      : `<a class="btn btn-ghost sm" href="world.html">${App.icon("map")}<span>${App.t(u.explore)}</span></a>`;
    el.innerHTML = `
      <div class="hdr-in">
        <a class="logo" href="index.html" aria-label="${App.esc(App.t(C.person.name))}"><span class="mark">R<i>✦</i></span><span class="logo-t">RAZAN<small>${App.lang === "ar" ? "ما وراء الأفكار" : "Beyond Ideas"}</small></span></a>
        <nav class="nav" id="main-nav" aria-label="Main">
          ${links.map((k) => `<a href="${base}#${k}" data-sec="${k}">${App.icon(icons[k])}<span>${App.t(u.nav[k])}</span></a>`).join("")}
          <div class="nav-extra">
            ${toggle.replace('class="btn btn-ghost sm"', 'class="nx"')}
            <button class="nx" id="theme-btn-m">${App.icon(App.theme() === "dark" ? "sun" : "moon")}<span>${App.lang === "ar" ? (App.theme() === "dark" ? "الوضع الفاتح" : "الوضع الغامق") : (App.theme() === "dark" ? "Light mode" : "Dark mode")}</span></button>
          </div>
        </nav>
        <div class="hdr-act">
          ${toggle}
          <button class="btn btn-ghost sm theme" id="theme-btn" aria-label="${App.lang === "ar" ? "تبديل الوضع الغامق والفاتح" : "Toggle dark mode"}">${App.icon(App.theme() === "dark" ? "sun" : "moon")}</button>
          <button class="btn btn-ghost sm lang" id="lang-btn" aria-label="Switch language">${App.icon("globe")}<span>${App.lang === "ar" ? "EN" : "عربي"}</span></button>
          <a class="btn btn-solid sm cv" href="cv.html">${App.icon("download")}<span>${App.t(u.cv)}</span></a>
          <button class="btn btn-ghost sm burger" id="burger" aria-label="Menu" aria-expanded="false">${App.icon("menu")}</button>
        </div>
      </div>`;
    document.getElementById("lang-btn").onclick = () => App.setLang(App.lang === "ar" ? "en" : "ar");
    const flipTheme = () => App.setTheme(App.theme() === "dark" ? "light" : "dark");
    document.getElementById("theme-btn").onclick = flipTheme;
    document.getElementById("theme-btn-m").onclick = flipTheme;
    const burger = document.getElementById("burger"), nav = document.getElementById("main-nav");
    burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  };

  App.footer = () => {
    const el = document.getElementById("site-footer"); if (!el) return; const p = C.person;
    el.innerHTML = `<div class="ftr-in">
      <p class="roles">${App.icon("sparkle", "gold")} ${App.t(p.roles)}</p>
      <div class="soc">
        <a href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${App.icon("linkedin")}</a>
        <a href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub">${App.icon("github")}</a>
        <a href="mailto:${p.email}" aria-label="Email">${App.icon("mail")}</a>
      </div>
      <p class="quote">${App.t(p.quote)} ${App.icon("sparkle", "gold")}</p>
    </div>`;
  };

  // a project's picture: uploaded cover image > its logo on its brand colour > a window onto the painting
  // framing set in the editor: imgFit (cover = fill the frame, contain = whole picture), imgZoom (%), imgPos ("x% y%")
  App.frame = (p) => {
    const zf = Math.max(30, Math.min(300, Number(p.imgZoom) || 100)) / 100;
    return `--z:${zf};--fit:${p.imgFit === "contain" ? "contain" : "cover"};--pos:${App.esc(p.imgPos || "50% 50%")};--lbg:${App.esc(p.logoBg || "#F3EFE3")}`;
  };
  // the ready-made CV PDF for the current language (made by tools/cv_pdf.py on every publish) — one click downloads it
  App.cvPdf = () => `assets/docs/razan-alawadh-cv-${App.lang === "en" ? "en" : "ar"}.pdf`;
  App.cvName = () => App.lang === "en" ? "Razan-Al-Awadh-CV.pdf" : "رزان-العوض-السيرة-الذاتية.pdf";
  App.visual = (p, z = 1, cls = "") => {
    if (p.image) return `<div class="pimgw ${cls}" style="${App.frame(p)}"><img class="pimg" src="${App.esc(p.image)}" alt="" loading="lazy"></div>`;
    if (p.logo) return `<div class="plogo ${cls}" style="${App.frame(p)}"><img src="${App.esc(p.logo)}" alt="${App.esc(App.t(p.title))}" loading="lazy"></div>`;
    return window.RWArt ? window.RWArt.paint(p.art, z, cls) : "";
  };
  App.reveal = () => {
    const els = document.querySelectorAll(".rv:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  };

  App.boot = (render) => {
    App.render = render; applyDir(); App.header(); App.footer(); render(); App.reveal();
  };
})();
