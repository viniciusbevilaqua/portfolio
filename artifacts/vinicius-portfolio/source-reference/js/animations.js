/**
 * Animations — scroll reveal, hero canvas, typing effect
 */

const Animations = {
  observer: null,

  init() {
    this.initScrollReveal();
    this.initHeroCanvas();
    this.initTypingEffect();
  },

  initScrollReveal() {
    if (Utils.prefersReducedMotion()) {
      document.querySelectorAll("[data-animate]").forEach(el => el.classList.add("animated"));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute("data-delay")) || 0;
            setTimeout(() => entry.target.classList.add("animated"), delay);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-animate]").forEach(el => {
      this.observer.observe(el);
    });
  },

  initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas || Utils.prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(60, Math.floor(canvas.offsetWidth / 20));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = Theme.current() === "dark";
      const dotColor = isDark ? "139, 92, 246" : "124, 58, 237";
      const lineColor = isDark ? "99, 102, 241" : "139, 92, 246";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", Utils.debounce(resize, 200));
    document.addEventListener("themechange", () => {
      cancelAnimationFrame(animationId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
      draw();
    });
  },

  initTypingEffect() {
    const buildingEl = document.querySelector(".building-text");
    if (!buildingEl || Utils.prefersReducedMotion()) return;

    const words = [
      DATA.hero.building,
      "Learning",
      "Creating",
      "Growing"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const current = words[wordIndex];

      if (isDeleting) {
        buildingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        buildingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 1500);
  }
};
