/**
 * Theme toggle — dark / light mode
 */

const Theme = {
  STORAGE_KEY: "portfolio-theme",

  init() {
    const saved = Utils.storage(this.STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    this.set(theme, false);
    this.bindToggle();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!Utils.storage(this.STORAGE_KEY)) {
        this.set(e.matches ? "dark" : "light");
      }
    });
  },

  bindToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme");
      this.set(current === "dark" ? "light" : "dark");
    });
  },

  set(theme, animate = true) {
    if (animate) {
      document.body.classList.add("theme-transition");
      setTimeout(() => document.body.classList.remove("theme-transition"), 300);
    }

    document.body.setAttribute("data-theme", theme);
    Utils.setStorage(this.STORAGE_KEY, theme);

    const metaTheme = document.getElementById("metaThemeColor");
    if (metaTheme) {
      metaTheme.setAttribute("content", theme === "dark" ? "#0a0a0f" : "#fafafa");
    }

    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  },

  current() {
    return document.body.getAttribute("data-theme") || "dark";
  }
};
