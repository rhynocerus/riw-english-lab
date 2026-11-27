
(function () {
  "use strict";

  const order = ["/index.html", "/lecciones/false-friends/index.html", "/lecciones/phrasal-verbs/index.html", "/lecciones/time-travelers/index.html", "/lecciones/sound-detective/index.html", "/lecciones/real-life-english/index.html", "/lecciones/word-partners/index.html", "/lecciones/grammar-rescue/index.html", "/lecciones/question-quest/index.html", "/lecciones/everyday-expressions/index.html", "/lecciones/good-better-best/index.html", "/lecciones/cognate-detective/index.html", "/lecciones/interactive-series/index.html?type=listen&level=1", "/lecciones/interactive-series/index.html?type=listen&level=2", "/lecciones/interactive-series/index.html?type=listen&level=3", "/lecciones/interactive-series/index.html?type=listen&level=4", "/lecciones/interactive-series/index.html?type=listen&level=5", "/lecciones/interactive-series/index.html?type=listen&level=6", "/lecciones/interactive-series/index.html?type=dialogue&level=1", "/lecciones/interactive-series/index.html?type=dialogue&level=2", "/lecciones/interactive-series/index.html?type=dialogue&level=3", "/lecciones/interactive-series/index.html?type=dialogue&level=4", "/lecciones/interactive-series/index.html?type=dialogue&level=5", "/lecciones/interactive-series/index.html?type=dialogue&level=6"];

  function key(url) {
    const u = new URL(url, location.href);
    const path = u.pathname;
    const marker = "/lecciones/";
    const at = path.lastIndexOf(marker);

    let relative;
    if (at >= 0) {
      relative = path.slice(at);
    } else if (path.endsWith("/index.html")) {
      relative = "/index.html";
    } else {
      return null;
    }

    if (relative.includes("/interactive-series/")) {
      const params = new URLSearchParams(u.search);
      const type = params.get("type");
      const level = params.get("level");
      return relative + "?type=" + type + "&level=" + level;
    }

    return relative;
  }

  function moveVoice() {
    const voice = document.getElementById("riw-voice-box");
    const panel = document.querySelector("main .panel");

    if (!voice || !panel || panel.contains(voice)) return;

    const target =
      panel.querySelector(".quiz-context") ||
      panel.querySelector(".controls") ||
      panel.querySelector(".toolbar") ||
      panel;

    target.appendChild(voice);
    voice.classList.add("riw-voice-inside");
  }

  function navigation() {
    const main = document.querySelector("main");
    if (!main) return;

    const current = order.indexOf(key(location.href));
    if (current < 0) return;

    let nav = main.querySelector("nav");
    if (!nav) {
      nav = document.createElement("nav");
      const footer = main.querySelector("footer");
      if (footer) main.insertBefore(nav, footer);
      else main.appendChild(nav);
    }

    nav.className = "riw-navigation-v2";
    nav.removeAttribute("style");
    nav.setAttribute("aria-label", "Navegación de los 24 laboratorios");

    const links = [
      ["← Atrás", current > 0 ? order[current - 1] : null],
      ["⌂ Todos los ejercicios", "/lecciones/index.html"],
      ["Adelante →", current < order.length - 1 ? order[current + 1] : null],
      ["🌐 Google Traductor", "https://translate.google.com/?sl=en&tl=es&op=translate"]
    ];

    nav.replaceChildren();

    for (const [label, destination] of links) {
      const a = document.createElement("a");
      a.textContent = label;

      if (destination) {
        a.href = destination;
      } else {
        a.setAttribute("aria-disabled", "true");
        a.removeAttribute("href");
      }

      if (label.includes("Google")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      nav.appendChild(a);
    }

    /* URLs relativas a la raíz del proyecto, incluso en GitHub Pages */
    for (const a of nav.querySelectorAll('a[href^="/"]')) {
      const target = a.getAttribute("href");
      const projectRoot = new URL("../../", location.href);
      a.href = new URL(target.slice(1), projectRoot).href;
    }
  }

  function init() {
    navigation();
    moveVoice();

    const observer = new MutationObserver(() => moveVoice());
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
