/**
 * Learning discs — circular elements
 */

const Discs = {
  init() {
    this.render();
    document.addEventListener("langchange", () => this.render());
  },

  render() {
    const grid = document.getElementById("discsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    DATA.learning.items.forEach((item, index) => {
      const disc = Utils.createElement("div", {
        className: `disc intensity-${item.intensity}`,
        role: "group",
        "aria-label": Utils.t(item.name, I18n.lang)
      }, [
        Utils.createElement("div", { className: "disc-circle" }, [
          Utils.createElement("span", { className: "disc-icon", text: item.icon }),
          Utils.createElement("div", { className: "disc-ring", "aria-hidden": "true" })
        ]),
        Utils.createElement("span", { className: "disc-name", text: Utils.t(item.name, I18n.lang) }),
        Utils.createElement("span", { className: "disc-description", text: Utils.t(item.description, I18n.lang) })
      ]);

      disc.setAttribute("data-animate", "fade-up");
      disc.setAttribute("data-delay", String(index * 80));

      grid.appendChild(disc);
    });

    if (Animations.observer) {
      grid.querySelectorAll("[data-animate]").forEach(el => {
        Animations.observer.observe(el);
      });
    } else {
      grid.querySelectorAll("[data-animate]").forEach(el => el.classList.add("animated"));
    }
  }
};
