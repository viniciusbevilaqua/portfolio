/**
 * Custom cursor — desktop only
 */

const Cursor = {
  init() {
    if (!Utils.isDesktop() || Utils.prefersReducedMotion()) return;

    this.cursor = document.getElementById("cursor");
    if (!this.cursor) return;

    this.dot = this.cursor.querySelector(".cursor-dot");
    this.ring = this.cursor.querySelector(".cursor-ring");

    document.body.classList.add("custom-cursor");
    this.cursor.classList.add("visible");

    this.bindMove();
    this.bindHover();
  },

  bindMove() {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      this.dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      this.ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mouseleave", () => {
      this.cursor.classList.remove("visible");
    });

    document.addEventListener("mouseenter", () => {
      this.cursor.classList.add("visible");
    });
  },

  bindHover() {
    const interactive = "a, button, .disc, .project-card, .contact-link, .tool-tag, .nav-link, .mobile-link";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactive)) {
        this.cursor.classList.add("hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactive)) {
        this.cursor.classList.remove("hover");
      }
    });
  }
};
