/**
 * Main app initialization
 */

const App = {
  init() {
    I18n.init();
    Theme.init();
    Navigation.init();
    Cursor.init();
    Animations.init();
    Discs.init();
    EasterEggs.init();

    this.renderAbout();
    this.renderProjects();
    this.setupPhoto();
    this.updateFooter();
    this.bindLangChange();
  },

  bindLangChange() {
    document.addEventListener("langchange", () => {
      this.renderAbout();
      this.renderProjects();
    });
  },

  renderAbout() {
    const aboutText = document.getElementById("aboutText");
    if (aboutText) {
      aboutText.innerHTML = "";
      const paragraphs = DATA.about.paragraphs[I18n.lang] || DATA.about.paragraphs.pt;
      paragraphs.forEach(text => {
        aboutText.appendChild(Utils.createElement("p", { text }));
      });
    }

    const educ = DATA.about.education;
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = Utils.t(value, I18n.lang);
    };

    setText("educDegree", educ.degree);
    setText("educInstitution", educ.institution);
    setText("educPeriod", educ.period);
    setText("educSemester", educ.semester);

    const course = DATA.about.additionalCourse;
    setText("courseInstitution", course.institution);
    setText("courseName", course.name);

    const toolsCloud = document.getElementById("toolsCloud");
    if (toolsCloud) {
      toolsCloud.innerHTML = "";
      DATA.about.tools.forEach(tool => {
        toolsCloud.appendChild(Utils.createElement("span", { className: "tool-tag", text: tool }));
      });
    }
  },

  renderProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    DATA.projects.items.forEach((project, index) => {
      const card = Utils.createElement("article", {
        className: `project-card${project.featured ? " featured" : ""}`,
        "aria-label": project.name
      });

      const imageWrap = Utils.createElement("div", { className: "project-image-wrap" }, [
        Utils.createElement("img", {
          className: "project-image",
          src: project.image,
          alt: project.name,
          loading: "lazy"
        }),
        Utils.createElement("div", { className: "project-image-overlay", "aria-hidden": "true" })
      ]);

      const bodyChildren = [
        Utils.createElement("span", { className: "project-type", text: Utils.t(project.type, I18n.lang) }),
        Utils.createElement("h3", { className: "project-name", text: project.name }),
        Utils.createElement("p", { className: "project-description", text: Utils.t(project.description, I18n.lang) })
      ];

      if (project.tech?.length) {
        const techWrap = Utils.createElement("div", { className: "project-tech" });
        project.tech.forEach(t => {
          techWrap.appendChild(Utils.createElement("span", { className: "project-tech-tag", text: t }));
        });
        bodyChildren.push(techWrap);
      }

      if (project.contributions) {
        bodyChildren.push(Utils.createElement("p", {
          className: "project-contributions",
          text: Utils.t(project.contributions, I18n.lang)
        }));
      }

      if (project.note) {
        bodyChildren.push(Utils.createElement("p", {
          className: "project-note",
          text: Utils.t(project.note, I18n.lang)
        }));
      }

      const link = Utils.createElement("a", {
        className: "project-link",
        href: project.github,
        target: "_blank",
        rel: "noopener noreferrer"
      }, [
        document.createTextNode(Utils.t(DATA.projects.viewProject, I18n.lang)),
        (() => {
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("width", "16");
          svg.setAttribute("height", "16");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2");
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", "M5 12h14M12 5l7 7-7 7");
          svg.appendChild(path);
          return svg;
        })()
      ]);
      bodyChildren.push(link);

      const body = Utils.createElement("div", { className: "project-body" }, bodyChildren);

      card.appendChild(imageWrap);
      card.appendChild(body);

      if (project.color) {
        card.style.setProperty("--project-accent", project.color);
      }

      card.setAttribute("data-animate", "fade-up");
      card.setAttribute("data-delay", String(index * 100));

      grid.appendChild(card);
    });

    if (Animations.observer) {
      grid.querySelectorAll("[data-animate]").forEach(el => {
        Animations.observer.observe(el);
      });
    } else {
      grid.querySelectorAll("[data-animate]").forEach(el => el.classList.add("animated"));
    }
  },

  setupPhoto() {
    const photoPath = DATA.personal.photo;
    if (!photoPath) return;

    const container = document.getElementById("heroPhoto");
    const img = container?.querySelector(".hero-photo-img");
    if (container && img) {
      img.src = photoPath;
      img.alt = DATA.personal.name;
      container.style.display = "";
    }
  },

  updateFooter() {
    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const nameEl = document.getElementById("footerName");
    if (nameEl) nameEl.textContent = DATA.personal.name;
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
