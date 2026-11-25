/* Auto-generated CV (cv.html). Built entirely from CONTENT, so anything added in the editor
   (experience, project, award, course, skill) shows up here. "Download PDF" uses the browser's print-to-PDF. */
(function () {
  const C = window.CONTENT, A = window.App;
  const t = (o) => A.t(o), esc = A.esc, ic = A.icon;
  const L = (ar, en) => (A.lang === "ar" ? ar : en);

  function render() {
    const p = C.person, lib = C.library;
    document.title = `${t(p.name)} — ${L("السيرة الذاتية", "CV")}`;
    // always the public address (the PDF is made from a local copy)
    const site = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? "https://rznpro.github.io/razan-portfolio/" : location.origin + location.pathname.replace(/cv\.html$/, "");
    const contact = [
      p.location && [ic("map"), esc(t(p.location))],
      p.email && [ic("mail"), `<a href="mailto:${esc(p.email)}" dir="ltr">${esc(p.email)}</a>`],
      p.phone && [ic("sparkle"), `<span dir="ltr">${esc(p.phone)}</span>`],
      p.linkedin && [ic("linkedin"), `<a href="${esc(p.linkedin)}" dir="ltr">LinkedIn</a>`],
      p.github && [ic("github"), `<a href="${esc(p.github)}" dir="ltr">GitHub</a>`],
      [ic("globe"), `<a href="${esc(site)}" dir="ltr">${esc(site.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a>`]
    ].filter(Boolean);
    const sec = (title, body) => body ? `<section class="cv-sec"><h2>${title}</h2>${body}</section>` : "";
    const projects = C.projects.filter((x) => x.cv !== false);

    document.getElementById("cv").innerHTML = `
      <header class="cv-head">
        <div><h1>${esc(t(p.name))}</h1><p class="cv-title">${esc(t(p.title))}</p><p class="cv-focus">${t(p.focus).map(esc).join(" · ")}</p></div>
        <ul class="cv-contact">${contact.map(([i, h]) => `<li>${i}${h}</li>`).join("")}</ul>
      </header>
      <div class="cv-grid">
        <div class="cv-main">
          ${sec(L("النبذة المهنية", "Professional Summary"), `<p>${esc(t(C.about.lead))} ${esc(t(C.about.body))}</p>`)}
          ${sec(L("الخبرات", "Experience"), C.experience.map((e) => `<div class="cv-item"><div class="cv-row"><b>${esc(t(e.role))}</b><span>${esc(e.date)}</span></div><p class="cv-org">${esc(t(e.org))}</p><ul>${t(e.points).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join(""))}
          ${sec(L("المشاريع", "Projects"), projects.map((x) => `<div class="cv-item"><div class="cv-row"><b>${esc(t(x.title))}</b><span>${esc(x.year || "")}</span></div><p class="cv-org">${esc(t(x.role))}${x.award ? ` · <em>${esc(t(x.award))}</em>` : ""}</p><p>${esc(t(x.summary))}</p></div>`).join(""))}
        </div>
        <aside class="cv-side">
          ${sec(L("الإنجازات", "Awards"), C.achievements.map((a) => `<div class="cv-mini"><b>${esc(t(a.title))}</b><span>${esc(t(a.org))}${a.year ? " · " + esc(a.year) : ""}</span></div>`).join(""))}
          ${sec(L("التعليم", "Education"), lib.education.map((e) => `<div class="cv-mini"><b>${esc(t(e.t))}</b><span>${esc(t(e.o))}${e.y ? " · " + esc(e.y) : ""}</span></div>`).join(""))}
          ${sec(L("الشهادات", "Certifications"), lib.certifications.map((e) => `<div class="cv-mini"><b dir="ltr">${esc(t(e.t))}</b><span>${esc(t(e.o))}</span></div>`).join(""))}
          ${sec(L("المهارات", "Skills"), lib.skills.map((s) => `<div class="cv-mini"><b>${esc(t(s.g))}</b><span>${t(s.items).map(esc).join(" · ")}</span></div>`).join(""))}
          ${sec(L("الدورات", "Courses"), `<ul class="cv-list">${lib.courses.map((e) => `<li>${esc(t(e.t))} <span>— ${esc(t(e.o))}</span></li>`).join("")}</ul>`)}
          ${sec(L("اللغات", "Languages"), `<p>${lib.languages.map((l) => `${esc(t(l.l))} <span class="muted">(${esc(t(l.v))})</span>`).join(" · ")}</p>`)}
          ${sec(L("الاهتمامات", "Interests"), `<p>${t(C.about.interests).map(esc).join(" · ")}</p>`)}
        </aside>
      </div>`;

    document.getElementById("cv-bar").innerHTML = `
      <a href="index.html">${ic("arrow", "back")} ${L("الموقع", "Website")}</a>
      <button id="cv-lang">${ic("globe")} ${A.lang === "ar" ? "English" : "العربية"}</button>
      <a id="cv-pdf" class="pri" href="${A.cvPdf()}" download="${A.cvName()}">${ic("download")} ${L("تحميل PDF", "Download PDF")}</a>`;
    document.getElementById("cv-lang").onclick = () => A.setLang(A.lang === "ar" ? "en" : "ar");
  }
  A.header = () => {}; A.footer = () => {};
  A.boot(render);
})();
