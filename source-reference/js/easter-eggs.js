/**
 * Easter eggs — hidden interactions
 */

const EasterEggs = {
  konamiSequence: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"],
  konamiIndex: 0,
  logoClickCount: 0,
  logoClickTimer: null,

  init() {
    this.bindKonami();
    this.bindLogoClick();
    this.bindConsoleMessage();
  },

  bindKonami() {
    document.addEventListener("keydown", (e) => {
      if (e.code === this.konamiSequence[this.konamiIndex]) {
        this.konamiIndex++;
        if (this.konamiIndex === this.konamiSequence.length) {
          this.triggerKonami();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  },

  triggerKonami() {
    document.body.classList.add("konami-mode");
    setTimeout(() => document.body.classList.remove("konami-mode"), 5000);

    const msg = I18n.lang === "pt"
      ? "🎮 Código Konami ativado! Você encontrou um easter egg."
      : "🎮 Konami code activated! You found an easter egg.";
    this.showToast(msg);
  },

  bindLogoClick() {
    const logo = document.querySelector(".nav-logo");
    if (!logo) return;

    logo.addEventListener("click", (e) => {
      this.logoClickCount++;

      clearTimeout(this.logoClickTimer);
      this.logoClickTimer = setTimeout(() => { this.logoClickCount = 0; }, 800);

      if (this.logoClickCount >= 5) {
        e.preventDefault();
        this.logoClickCount = 0;
        document.body.classList.add("logo-spin");
        setTimeout(() => document.body.classList.remove("logo-spin"), 600);

        const msg = I18n.lang === "pt"
          ? "✨ VB — Vinícius Bevilaqua. Persistência é a chave."
          : "✨ VB — Vinícius Bevilaqua. Persistence is the key.";
        this.showToast(msg);
      }
    });
  },

  bindConsoleMessage() {
    const styles = [
      "color: #8b5cf6; font-size: 14px; font-weight: bold;",
      "color: #a1a1aa; font-size: 12px;"
    ];
    console.log("%c👋 Olá, dev curioso!", styles[0]);
    console.log("%cEste portfólio foi feito com HTML, CSS e JavaScript puro. Confira o código: https://github.com/viniciusbevilaqua", styles[1]);
  },

  showToast(message) {
    const existing = document.querySelector(".easter-toast");
    if (existing) existing.remove();

    const toast = Utils.createElement("div", {
      className: "easter-toast",
      role: "status",
      "aria-live": "polite",
      text: message
    });

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "0.875rem 1.5rem",
      background: "rgba(139, 92, 246, 0.95)",
      color: "#fff",
      borderRadius: "0.75rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      zIndex: "10000",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      animation: "fadeUp 0.4s ease-out",
      maxWidth: "90vw",
      textAlign: "center"
    });

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};
