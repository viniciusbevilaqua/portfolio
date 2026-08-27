/**
 * Navigation — navbar, scroll spy, mobile menu
 */

const Navigation = {
  sections: ["hero", "about", "projects", "learning", "cv-section"],
  activeSection: "hero",

  init() {
    this.navbar = document.getElementById("navbar");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.mobileLinks = document.querySelectorAll(".mobile-link");
    this.indicator = document.getElementById("navIndicator");
    this.hamburger = document.getElementById("navHamburger");
    this.mobileMenu = document.getElementById("mobileMenu");

    this.bindScroll();
    this.bindLinks();
    this.bindMobile();
    this.updateIndicator();
  },

  bindScroll() {
    const onScroll = Utils.throttle(() => {
      if (this.navbar) {
        this.navbar.classList.toggle("scrolled", window.scrollY > 20);
      }
      this.updateActiveSection();
    }, 80);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  },

  bindLinks() {
    const allLinks = [...this.navLinks, ...this.mobileLinks];

    allLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        Utils.scrollToElement(href);
        this.closeMobile();
        history.pushState(null, "", href);
      });
    });
  },

  bindMobile() {
    if (!this.hamburger || !this.mobileMenu) return;

    this.hamburger.addEventListener("click", () => {
      const isOpen = this.mobileMenu.classList.toggle("open");
      this.hamburger.setAttribute("aria-expanded", String(isOpen));
      this.mobileMenu.setAttribute("aria-hidden", String(!isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
      I18n.translateStaticElements();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeMobile();
    });
  },

  closeMobile() {
    if (!this.mobileMenu?.classList.contains("open")) return;
    this.mobileMenu.classList.remove("open");
    this.hamburger?.setAttribute("aria-expanded", "false");
    this.mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  },

  updateActiveSection() {
    const navHeight = this.navbar?.offsetHeight || 72;
    const scrollPos = window.scrollY + navHeight + 100;

    let current = this.sections[0];

    for (const id of this.sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        current = id;
      }
    }

    if (current !== this.activeSection) {
      this.activeSection = current;
      this.setActiveLink(current);
    }
  },

  setActiveLink(sectionId) {
    const allLinks = [...this.navLinks, ...this.mobileLinks];

    allLinks.forEach(link => {
      const isActive = link.getAttribute("data-section") === sectionId;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    this.updateIndicator();
  },

  updateIndicator() {
    if (!this.indicator || Utils.isMobile()) return;

    const activeLink = document.querySelector(`.nav-link.active`);
    const navLinksContainer = document.getElementById("navLinks");

    if (!activeLink || !navLinksContainer) return;

    const containerRect = navLinksContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    this.indicator.style.width = `${linkRect.width}px`;
    this.indicator.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
  }
};

window.addEventListener("resize", Utils.debounce(() => Navigation.updateIndicator(), 150));
