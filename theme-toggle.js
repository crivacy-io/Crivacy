const THEME_KEY = "crivacy-marketing-theme";

function getStoredTheme() {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage issues.
  }
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  document.querySelectorAll("[data-logo-light][data-logo-dark]").forEach((img) => {
    const next = theme === "dark" ? img.getAttribute("data-logo-dark") : img.getAttribute("data-logo-light");
    if (next) img.setAttribute("src", next);
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    const isDark = theme === "dark";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.innerHTML = isDark
      ? '<span class="theme-dot"></span><span>Dark</span>'
      : '<span class="theme-dot"></span><span>Light</span>';
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (!document.body || document.body.classList.contains("app-page")) return;

  const isMobile = window.matchMedia && window.matchMedia("(max-width: 900px)").matches;
  if (isMobile) {
    applyTheme("dark");
    return;
  }

  const initial = getStoredTheme() || document.body.getAttribute("data-theme") || "light";
  applyTheme(initial);

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      setStoredTheme(next);
    });
  });
});
