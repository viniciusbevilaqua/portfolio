/**
 * Utility helpers
 */

const Utils = {
  /**
   * Resolve a value from DATA — supports bilingual objects and plain strings.
   */
  t(value, lang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object" && (value.pt || value.en)) {
      return value[lang] || value.pt || value.en || "";
    }
    return String(value);
  },

  /**
   * Get nested value from object using dot notation path.
   */
  get(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  },

  /**
   * Debounce function calls.
   */
  debounce(fn, delay = 150) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Throttle function calls.
   */
  throttle(fn, limit = 100) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  },

  /**
   * Check if user prefers reduced motion.
   */
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  /**
   * Check if device supports fine pointer (desktop).
   */
  isDesktop() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  },

  /**
   * Check if viewport is mobile-sized.
   */
  isMobile() {
    return window.innerWidth < 768;
  },

  /**
   * Smooth scroll to element.
   */
  scrollToElement(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: Utils.prefersReducedMotion() ? "auto" : "smooth" });
  },

  /**
   * Escape HTML to prevent XSS when inserting dynamic content.
   */
  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Create element with optional attributes and children.
   */
  createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => {
      if (key === "className") el.className = val;
      else if (key === "text") el.textContent = val;
      else if (key === "html") el.innerHTML = val;
      else if (key.startsWith("data")) el.setAttribute(key.replace(/([A-Z])/g, "-$1").toLowerCase(), val);
      else el.setAttribute(key, val);
    });
    children.forEach(child => {
      if (typeof child === "string") el.appendChild(document.createTextNode(child));
      else if (child) el.appendChild(child);
    });
    return el;
  },

  /**
   * Read from localStorage safely.
   */
  storage(key, fallback = null) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Write to localStorage safely.
   */
  setStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore quota errors */
    }
  }
};
