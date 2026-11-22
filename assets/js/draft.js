/* Developer drafts: if you edited content in admin.html and haven't published yet,
   this swaps the site content for your draft (on your machine only) and shows a small badge.
   Visitors never have a draft, so they always see the published content.js. */
(function () {
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:";
  window.RZ_LOCAL = local;
  try {
    const d = localStorage.getItem("rz-content-draft");
    if (d) { window.CONTENT = JSON.parse(d); window.RZ_DRAFT = true; }
  } catch (e) { console.warn("Draft ignored:", e); }

  if (!local || document.body.dataset.page === "admin") return;
  addEventListener("DOMContentLoaded", () => {
    const ar = (localStorage.getItem("rz-lang") || "ar") === "ar";
    const slug = new URLSearchParams(location.search).get("p");
    const target = document.body.dataset.page === "project" && slug ? `admin.html#projects/${slug}` : "admin.html";
    const b = document.createElement("div");
    b.className = "dev-badge";
    b.innerHTML = `<a href="${target}">✎ ${ar ? "تعديل المحتوى" : "Edit content"}</a>` +
      (window.RZ_DRAFT ? `<span>${ar ? "مسودة غير منشورة" : "Unpublished draft"}</span>` : "");
    document.body.appendChild(b);
  });
})();
