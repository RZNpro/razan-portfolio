/* Content editor for the site owner (admin.html).
   Builds a form from CONTENT, keeps a live draft in localStorage (the site shows it on this machine),
   and publishes by writing assets/js/content.js (+ uploaded images) into the project folder,
   or downloading content.js when the browser can't write to folders. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let data = clone(window.CONTENT);
  let dirHandle = null;
  const pendingFiles = {}; // path -> Blob (uploads waiting to be written on publish)

  const SECTIONS = [
    ["person", "الملف الشخصي"], ["about", "نبذة عني"], ["projects", "المشاريع"], ["categories", "تصنيفات المشاريع"],
    ["experience", "الخبرات"], ["achievements", "الإنجازات"], ["library", "المكتبة والمهارات"],
    ["zones", "أماكن الخريطة"], ["ui", "نصوص الواجهة"]
  ];
  const LABEL = {
    name: "الاسم", brand: "العلامة", title: "العنوان", focus: "مجالات التركيز", headline: "العبارة الرئيسية", intro: "المقدمة",
    location: "الموقع", email: "البريد", phone: "رقم الجوال (يظهر في السيرة)", linkedin: "LinkedIn", github: "GitHub", cv: "ملف السيرة (PDF)", roles: "الأدوار (الفوتر)", quote: "الاقتباس",
    lead: "الفقرة الأولى", body: "الفقرة الثانية", facts: "معلومات سريعة", k: "العنوان", v: "القيمة", interests: "الاهتمامات",
    slug: "المعرّف (رابط الصفحة)", featured: "مشروع مميّز (يظهر كبير)", cat: "التصنيف", year: "السنة", image: "صورة غلاف (تغطي البطاقة)", logo: "الشعار / الهوية", logoBg: "لون خلفية الشعار", art: "موضع الصورة في اللوحة",
    kicker: "الوصف القصير", summary: "الملخص", role: "دوري", tags: "الوسوم", context: "السياق", challenge: "التحدي", approach: "المنهج (خطوات)",
    solution: "الحل", outcome: "النتيجة", tools: "الأدوات", links: "الروابط", label: "النص", url: "الرابط", award: "الجائزة", status: "الحالة",
    org: "الجهة", date: "التاريخ", points: "النقاط", icon: "الأيقونة", project: "مرتبط بمشروع", education: "التعليم", t: "العنوان", o: "الجهة / الوصف", y: "السنة",
    certifications: "الشهادات", courses: "الدورات", skills: "المهارات", g: "المجموعة", items: "العناصر", languages: "اللغات", l: "اللغة", n: "المستوى (1–5)",
    id: "المعرّف", pos: "موضع المبنى في اللوحة", place: "اسم المكان", section: "القسم", q: "السؤال", href: "الرابط"
  };
  const isBi = (v) => v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length && Object.keys(v).every((k) => k === "ar" || k === "en");
  const titleOf = (o) => { const v = o && (o.title || o.role || o.place || o.t || o.g || o.l || o.k || o.label || o.slug || o.id); return v ? (typeof v === "string" ? v : v.ar || v.en) : "عنصر"; };

  /* ---------- path helpers ---------- */
  const get = (path) => path.reduce((o, k) => (o == null ? o : o[k]), data);
  function set(path, val) { const last = path[path.length - 1]; const parent = get(path.slice(0, -1)); parent[last] = val; save(); }
  let saveT;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(() => { try { localStorage.setItem("rz-content-draft", JSON.stringify(data)); status("✓ حُفظت المسودة — تظهر في الموقع على جهازك"); } catch (e) { status("⚠️ المسودة كبيرة جدًا للتخزين المحلي — اربطي مجلد المشروع للصور", true); } }, 250);
  }
  function status(msg, bad) { const s = $("#status"); s.textContent = msg; s.classList.toggle("bad", !!bad); }

  /* ---------- field renderers ---------- */
  const P = (path) => esc(JSON.stringify(path));
  function input(path, v, long) {
    return long || String(v).length > 70
      ? `<textarea data-p='${P(path)}' rows="${Math.min(8, Math.ceil(String(v).length / 70) + 1)}">${esc(v)}</textarea>`
      : `<input data-p='${P(path)}' value="${esc(v)}">`;
  }
  function strList(path, arr, dir) {
    return `<div class="slist" ${dir ? `dir="${dir}"` : ""}>${arr.map((s, i) => `<div class="srow">${input([...path, i], s)}<button class="x" data-del='${P([...path, i])}' title="حذف">✕</button></div>`).join("")}
      <button class="add" data-addstr='${P(path)}'>＋ إضافة</button></div>`;
  }
  function field(key, path, v) {
    const lab = `<label class="lab">${esc(LABEL[key] || key)}</label>`;
    if (key === "icon") return `<div class="f">${lab}<button class="iconpick" data-icon='${P(path)}'><svg viewBox="0 0 24 24"><path d="${window.ICONS[v] || ""}"/></svg><span>${esc(v)}</span></button></div>`;
    if (key === "image") return `<div class="f">${lab}${imageField(path, v)}</div>`;
    if (key === "logo") return `<div class="f">${lab}${imageField(path, v)}</div>`;
    if (key === "logoBg") return `<div class="f">${lab}<div class="colorrow"><input type="color" data-p='${P(path)}' value="${esc(v || "#F3EFE3")}"><span>${esc(v || "—")}</span></div></div>`;
    if ((key === "art" || key === "pos") && Array.isArray(v)) return `<div class="f">${lab}<div class="artrow">${window.RWArt.paint(v, 0.5, "mini")}<span>x ${v[0]} · y ${v[1]}</span><button data-art='${P(path)}' data-kind="${key}">اختيار من اللوحة</button></div></div>`;
    if (key === "cat") return `<div class="f">${lab}<select data-p='${P(path)}'>${Object.keys(data.categories).filter((k) => k !== "all").map((k) => `<option value="${k}" ${k === v ? "selected" : ""}>${esc(data.categories[k].ar)}</option>`).join("")}</select></div>`;
    if (key === "project") return `<div class="f">${lab}<select data-p='${P(path)}'><option value="">—</option>${data.projects.map((p) => `<option value="${p.slug}" ${p.slug === v ? "selected" : ""}>${esc(p.title.ar)}</option>`).join("")}</select></div>`;
    if (typeof v === "boolean") return `<div class="f chk"><label><input type="checkbox" data-p='${P(path)}' ${v ? "checked" : ""}> ${esc(LABEL[key] || key)}</label></div>`;
    if (typeof v === "number") return `<div class="f">${lab}<input type="number" data-p='${P(path)}' data-num="1" value="${v}"></div>`;
    if (typeof v === "string") return `<div class="f">${lab}${input(path, v, ["summary", "challenge", "solution", "lead", "body", "intro", "context"].includes(key))}</div>`;
    if (isBi(v)) {
      if (Array.isArray(v.ar) || Array.isArray(v.en))
        return `<div class="f">${lab}<div class="bi"><div><em>عربي</em>${strList([...path, "ar"], v.ar || [], "rtl")}</div><div><em>English</em>${strList([...path, "en"], v.en || [], "ltr")}</div></div></div>`;
      const long = ["summary", "challenge", "solution", "lead", "body", "intro", "context", "headline"].includes(key);
      return `<div class="f">${lab}<div class="bi"><div><em>عربي</em><div dir="rtl">${input([...path, "ar"], v.ar ?? "", long)}</div></div><div><em>English</em><div dir="ltr">${input([...path, "en"], v.en ?? "", long)}</div></div></div></div>`;
    }
    if (Array.isArray(v)) {
      if (v.every((x) => typeof x === "string")) return `<div class="f">${lab}${strList(path, v, "ltr")}</div>`;
      return `<div class="f">${lab}${objList(path, v)}</div>`;
    }
    if (v && typeof v === "object") return `<fieldset class="f grp"><legend>${esc(LABEL[key] || key)}</legend>${Object.keys(v).map((k) => field(k, [...path, k], v[k])).join("")}</fieldset>`;
    return "";
  }
  function objList(path, arr) {
    return `<div class="olist">${arr.map((o, i) => `<details class="item" id="it-${path.join("-")}-${i}" ${arr.length < 3 ? "open" : ""}>
        <summary><b>${esc(titleOf(o))}</b><span class="tools">
          <button data-move='${P([...path, i])}' data-d="-1" title="لأعلى">↑</button><button data-move='${P([...path, i])}' data-d="1" title="لأسفل">↓</button>
          <button data-dup='${P([...path, i])}' title="نسخ">⧉</button><button class="x" data-del='${P([...path, i])}' title="حذف">✕</button></span></summary>
        <div class="ibody">${Object.keys(o).map((k) => field(k, [...path, i, k], o[k])).join("")}</div></details>`).join("")}
      <button class="add" data-addobj='${P(path)}'>＋ إضافة عنصر</button></div>`;
  }
  function imageField(path, v) {
    const src = v ? (pendingFiles[v] ? URL.createObjectURL(pendingFiles[v]) : v) : "";
    return `<div class="imgf">${src ? `<img src="${esc(src)}" alt="">` : `<div class="noimg">لا توجد صورة — يُعرض مقطع من اللوحة</div>`}
      <label class="btn">رفع صورة<input type="file" accept="image/*" data-img='${P(path)}' hidden></label>
      ${v ? `<button class="x" data-clear='${P(path)}'>إزالة الصورة</button>` : ""}</div>`;
  }

  /* ---------- render ---------- */
  let current = "person";
  function render(focusId) {
    $("#nav").innerHTML = SECTIONS.map(([k, l]) => `<a href="#${k}" class="${k === current ? "on" : ""}">${l}${Array.isArray(data[k]) ? `<small>${data[k].length}</small>` : ""}</a>`).join("");
    const v = data[current]; const lab = SECTIONS.find((s) => s[0] === current)[1];
    let html = `<h1>${lab}</h1>`;
    if (current === "projects") {
      // make sure every project can take an image
      data.projects.forEach((p) => { ["image", "logo", "logoBg"].forEach((k) => { if (!(k in p)) p[k] = ""; }); });
      html += `<p class="hint">لكل مشروع: الصورة (أو مقطع من اللوحة)، العنوان، الوصف، الوسوم، وكل أقسام صفحة دراسة الحالة.</p>`;
    }
    html += Array.isArray(v) && v.every((x) => typeof x !== "string") ? objList([current], v)
      : Array.isArray(v) ? strList([current], v, "ltr")
      : Object.keys(v).map((k) => field(k, [current, k], v[k])).join("");
    $("#main").innerHTML = html;
    if (focusId) { const el = document.getElementById(focusId); if (el) { el.open = true; el.scrollIntoView({ block: "start" }); } }
  }

  /* ---------- events ---------- */
  document.addEventListener("input", (e) => {
    const p = e.target.dataset.p; if (!p) return;
    const path = JSON.parse(p);
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.dataset.num ? Number(e.target.value) : e.target.value;
    set(path, val);
    if (path[path.length - 1] === "title" || path[path.length - 2] === "title") { const sum = e.target.closest("details")?.querySelector("summary b"); if (sum) sum.textContent = titleOf(get(path.slice(0, path.indexOf("title")))); }
  });
  document.addEventListener("change", async (e) => {
    if (e.target.matches("select[data-p]")) set(JSON.parse(e.target.dataset.p), e.target.value);
    if (e.target.dataset.img) {
      const path = JSON.parse(e.target.dataset.img); const f = e.target.files[0]; if (!f) return;
      const blob = await toWebp(f, 1600);
      const owner = get(path.slice(0, -1)); const name = `assets/img/uploads/${owner.slug || "img"}-${Date.now().toString(36)}.webp`;
      if (dirHandle) { pendingFiles[name] = blob; set(path, name); status("الصورة جاهزة — تُكتب في المجلد عند النشر"); }
      else { set(path, await blobToDataURL(blob)); status("الصورة محفوظة داخل المسودة (اربطي المجلد لحفظها كملف)"); }
      render(e.target.closest("details")?.id);
    }
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button,a"); if (!b) return;
    const d = b.dataset;
    if (d.del) { e.preventDefault(); if (!confirm("حذف هذا العنصر؟")) return; const p = JSON.parse(d.del); get(p.slice(0, -1)).splice(p[p.length - 1], 1); save(); render(); }
    if (d.addstr) { e.preventDefault(); get(JSON.parse(d.addstr)).push(""); save(); render(); }
    if (d.addobj) { e.preventDefault(); const arr = get(JSON.parse(d.addobj)); arr.push(blank(arr[0])); save(); render(`it-${JSON.parse(d.addobj).join("-")}-${arr.length - 1}`); }
    if (d.dup) { e.preventDefault(); const p = JSON.parse(d.dup); const arr = get(p.slice(0, -1)); const c = clone(arr[p[p.length - 1]]); if (c.slug) c.slug += "-copy"; arr.splice(p[p.length - 1] + 1, 0, c); save(); render(); }
    if (d.move) { e.preventDefault(); const p = JSON.parse(d.move); const arr = get(p.slice(0, -1)); const i = p[p.length - 1], j = i + Number(d.d); if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; save(); render(); }
    if (d.clear) { e.preventDefault(); set(JSON.parse(d.clear), ""); render(b.closest("details")?.id); }
    if (d.icon) { e.preventDefault(); iconPicker(JSON.parse(d.icon), b.closest("details")?.id); }
    if (d.art) { e.preventDefault(); artPicker(JSON.parse(d.art), b.closest("details")?.id); }
  });
  function blank(tpl) {
    const b = (v) => Array.isArray(v) ? (v.every((x) => typeof x === "number") ? [...v] : []) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, b(x)])) : typeof v === "number" ? 0 : typeof v === "boolean" ? false : "";
    const o = b(tpl || { title: { ar: "", en: "" } }); if ("slug" in o) o.slug = "new-" + Date.now().toString(36); return o;
  }

  /* ---------- pickers ---------- */
  function modal(html) { const m = $("#modal"); m.innerHTML = `<div class="mbox">${html}<button class="mclose">إغلاق</button></div>`; m.hidden = false; m.querySelector(".mclose").onclick = () => (m.hidden = true); return m; }
  function iconPicker(path, back) {
    const m = modal(`<h2>اختاري أيقونة</h2><div class="icons">${Object.keys(window.ICONS).map((k) => `<button data-k="${k}" title="${k}"><svg viewBox="0 0 24 24"><path d="${window.ICONS[k]}"/></svg><small>${k}</small></button>`).join("")}</div>`);
    m.querySelectorAll(".icons button").forEach((b) => b.onclick = () => { set(path, b.dataset.k); m.hidden = true; render(back); });
  }
  function artPicker(path, back) {
    const kind = path[path.length - 1];
    const m = modal(`<h2>${kind === "pos" ? "اضغطي على المبنى في اللوحة" : "اضغطي على الجزء اللي تبين يظهر كصورة للمشروع"}</h2>
      <div class="pickart"><img src="assets/img/art/sky.webp" alt=""><img class="isl" src="assets/img/art/island.webp" alt=""><span class="dot"></span></div>
      <div class="pv"></div>`);
    const box = m.querySelector(".pickart"), dot = m.querySelector(".dot"), pv = m.querySelector(".pv");
    const show = (v) => { dot.style.left = (v[0] / 1680 * 100) + "%"; dot.style.top = (v[1] / 944 * 100) + "%"; pv.innerHTML = window.RWArt.paint(v, 0.9, "big"); };
    show(get(path));
    box.onclick = (e) => { const r = box.getBoundingClientRect(); const v = [Math.round((e.clientX - r.left) / r.width * 1680), Math.round((e.clientY - r.top) / r.height * 944)]; set(path, v); show(v); };
    m.querySelector(".mclose").addEventListener("click", () => render(back));
  }

  /* ---------- images ---------- */
  function toWebp(file, max) {
    return new Promise((res) => {
      const img = new Image(); img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        c.toBlob((b) => res(b), "image/webp", 0.86);
      }; img.src = URL.createObjectURL(file);
    });
  }
  const blobToDataURL = (b) => new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(b); });

  /* ---------- publish ---------- */
  const serialize = () => `/* All site content, Arabic + English.\n   Edit with admin.html (or by hand). Every page renders from this file. */\nwindow.CONTENT = ${JSON.stringify(data, null, 2)};\n`;
  async function connect() {
    if (!window.showDirectoryPicker) { alert("المتصفح هذا ما يدعم الكتابة في المجلد. استخدمي Chrome أو Edge، أو اضغطي «تنزيل content.js»."); return false; }
    try {
      const h = await showDirectoryPicker({ mode: "readwrite" });
      await (await (await h.getDirectoryHandle("assets")).getDirectoryHandle("js")).getFileHandle("content.js");
      dirHandle = h; $("#folder").textContent = "✓ " + h.name; status("المجلد مربوط — النشر يكتب في الملفات مباشرة"); return true;
    } catch (e) { if (e.name !== "AbortError") alert("اختاري مجلد المشروع razan-portfolio (اللي فيه assets/js/content.js)."); return false; }
  }
  async function writeFile(root, path, blob) {
    const parts = path.split("/"); let dir = root;
    for (const p of parts.slice(0, -1)) dir = await dir.getDirectoryHandle(p, { create: true });
    const fh = await dir.getFileHandle(parts[parts.length - 1], { create: true }); const w = await fh.createWritable(); await w.write(blob); await w.close();
  }
  async function publish() {
    if (!dirHandle && !(await connect())) return;
    for (const [path, blob] of Object.entries(pendingFiles)) { await writeFile(dirHandle, path, blob); delete pendingFiles[path]; }
    await writeFile(dirHandle, "assets/js/content.js", new Blob([serialize()], { type: "text/javascript" }));
    localStorage.removeItem("rz-content-draft");
    status("✓ نُشر — content.js محدّث في مجلد المشروع. ارفعي التحديث للموقع.");
  }
  function download() {
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([serialize()], { type: "text/javascript" })); a.download = "content.js"; a.click();
    status("نزل content.js — ضعيه مكان assets/js/content.js");
  }

  /* ---------- boot ---------- */
  function route() {
    const [sec, slug] = location.hash.slice(1).split("/");
    if (SECTIONS.some((s) => s[0] === sec)) current = sec;
    render(slug && current === "projects" ? `it-projects-${data.projects.findIndex((p) => p.slug === slug)}` : null);
  }
  addEventListener("hashchange", route);
  $("#connect").onclick = connect;
  $("#publish").onclick = publish;
  $("#download").onclick = download;
  $("#discard").onclick = () => { if (!confirm("تجاهل كل التعديلات غير المنشورة؟")) return; localStorage.removeItem("rz-content-draft"); location.reload(); };
  $("#preview").onclick = () => open("index.html", "_blank");
  if (!window.RZ_LOCAL) $("#main").innerHTML = "<h1>المحرر يعمل على جهازك فقط</h1>";
  else { status(window.RZ_DRAFT ? "تعملين على مسودة محفوظة (غير منشورة)" : "المحتوى المنشور — أي تعديل يُحفظ كمسودة"); route(); }
})();
