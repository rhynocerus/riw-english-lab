
/* RIW English Lab · HUD compartido */
(function () {
  function init() {
    const main = document.querySelector("body > main");
    if (!main) return;

    const header = main.querySelector(":scope > header");
    const title = main.querySelector(":scope > h1");

    if (!header || !title ||
        header.classList.contains("riw-unified-hud")) return;

    const logo = header.querySelector("img");
    if (!logo) return;

    const logoBox = document.createElement("div");
    logoBox.className = "riw-hud-logo";

    const name = document.createElement("div");
    name.className = "riw-hud-name";
    name.textContent = "RIW English Lab";

    logoBox.appendChild(logo);
    header.replaceChildren(title, name, logoBox);
    header.classList.add("riw-unified-hud");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
