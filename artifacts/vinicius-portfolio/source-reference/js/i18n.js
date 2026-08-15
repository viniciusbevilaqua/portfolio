/**
 * Internationalization (i18n) system
 */

const I18n = {
  lang: "pt",
  STORAGE_KEY: "portfolio-lang",

  init() {
    const saved = Utils.storage(this.STORAGE_KEY);
    const browserLang = navigator.language?.startsWith("pt") ? "pt" : "en";
    this.lang = saved || browserLang;
    this.apply();
    this.bindToggle();
  },

  bindToggle() {
    const btn = document.getElementById("langToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.lang = this.lang === "pt" ? "en" : "pt";
      Utils.setStorage(this.STORAGE_KEY, this.lang);
      this.apply();
    });
  },

  apply() {
    document.documentElement.lang = this.lang === "pt" ? "pt-BR" : "en";

    const langBtn = document.getElementById("langToggle");
    if (langBtn) {
      const text = langBtn.querySelector(".lang-text");
      if (text) text.textContent = this.lang === "pt" ? "PT" : "EN";
      langBtn.setAttribute("aria-label", this.lang === "pt" ? "Switch to English" : "Mudar para Português");
    }

    this.translateStaticElements();
    this.updateMeta();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: this.lang } }));
  },

  translateStaticElements() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const value = Utils.get(DATA, key);
      if (value != null) {
        el.textContent = Utils.t(value, this.lang);
      }
    });

    const skipLink = document.querySelector(".skip-link");
    if (skipLink) {
      skipLink.textContent = this.lang === "pt" ? "Ir para o conteúdo principal" : "Skip to main content";
    }

    const hamburger = document.getElementById("navHamburger");
    if (hamburger) {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-label", expanded
        ? (this.lang === "pt" ? "Fechar menu" : "Close menu")
        : (this.lang === "pt" ? "Abrir menu" : "Open menu"));
    }

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", this.lang === "pt" ? "Alternar tema" : "Toggle theme");
    }
  },

  updateMeta() {
    const desc = Utils.t(DATA.meta.description, this.lang);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", desc);
    document.title = DATA.meta.title;
  },

  t(value) {
    return Utils.t(value, this.lang);
  }
};
