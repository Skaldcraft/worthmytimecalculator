/*!
 * PTU Cookies v0.1 — banner de consentimiento configurable
 * Sin dependencias. Sin llamadas a servidores externos. 100% en el navegador.
 * Licencia: uso libre por parte del cliente. Herramienta técnica, NO asesoramiento legal.
 */
(function () {
  "use strict";

  // ─────────────────────────────────────────────────────────────
  // 1. CONFIGURACIÓN (lo único que toca el cliente)
  // ─────────────────────────────────────────────────────────────
  var USER = (window.PTU_COOKIES_CONFIG || {});
  var CFG = {
    // Textos
    title: "Uso de cookies",
    message: "Utilizamos cookies propias y de terceros para el funcionamiento de la web, " +
             "analizar el tráfico y mostrar publicidad. Puedes aceptar todas, rechazarlas " +
             "o configurarlas. Más información en nuestra política de cookies.",
    policyUrl: "",              // ← el cliente pone su URL. Si está vacía, no se muestra el enlace.
    policyLabel: "Política de cookies",
    // Botones
    acceptLabel: "Aceptar todas",
    rejectLabel: "Rechazar todas",
    settingsLabel: "Configurar",
    saveLabel: "Guardar preferencias",
    // Categorías configurables (necessary siempre activa y no desmarcable)
    categories: [
      { id: "necessary", label: "Necesarias", desc: "Imprescindibles para el funcionamiento de la web. No se pueden desactivar.", required: true },
      { id: "analytics", label: "Analíticas",  desc: "Nos permiten medir el uso de la web de forma agregada." },
      { id: "marketing", label: "Publicidad",  desc: "Permiten mostrar anuncios relevantes dentro y fuera de la web." }
    ],
    // Apariencia
    position: "bottom",          // bottom | top | center
    theme: "light",              // light | dark
    primaryColor: "#0d6efd",     // color de acción principal
    primaryTextColor: "#ffffff",
    background: "",              // vacío = según theme
    textColor: "",               // vacío = según theme
    radius: "12px",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    zIndex: 2147483000,
    // Comportamiento
    consentVersion: "1",         // súbelo para volver a pedir consentimiento
    expireDays: 365,             // recomendación AEPD: no más de 24 meses
    reopenSelector: "[data-ptu-cookies-open]", // elemento del footer para reabrir el panel
    consentModeV2: true,         // envía señales a Google Consent Mode v2 si hay gtag/dataLayer
    onChange: null               // function(consent) {} — hook opcional
  };
  for (var k in USER) if (Object.prototype.hasOwnProperty.call(USER, k)) CFG[k] = USER[k];

  var STORE_KEY = "ptu_cookie_consent";

  // ─────────────────────────────────────────────────────────────
  // 2. ALMACENAMIENTO DEL CONSENTIMIENTO (prueba: fecha + versión)
  // ─────────────────────────────────────────────────────────────
  function readConsent() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.version !== CFG.consentVersion) return null;
      if (data.expires && Date.now() > data.expires) return null;
      return data;
    } catch (e) { return null; }
  }

  function saveConsent(prefs) {
    var data = {
      version: CFG.consentVersion,
      date: new Date().toISOString(),
      expires: Date.now() + CFG.expireDays * 864e5,
      categories: prefs
    };
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    applyConsent(data);
    return data;
  }

  // ─────────────────────────────────────────────────────────────
  // 3. BLOQUEO PREVIO REAL DE SCRIPTS (la parte que de verdad importa)
  //    Uso:  <script type="text/plain" data-ptu-category="analytics" src="..."></script>
  // ─────────────────────────────────────────────────────────────
  function unblockScripts(granted) {
    var nodes = document.querySelectorAll('script[type="text/plain"][data-ptu-category]');
    Array.prototype.forEach.call(nodes, function (old) {
      var cat = old.getAttribute("data-ptu-category");
      if (granted.indexOf(cat) === -1) return;
      var s = document.createElement("script");
      Array.prototype.forEach.call(old.attributes, function (a) {
        if (a.name === "type" || a.name === "data-ptu-category") return;
        s.setAttribute(a.name, a.value);
      });
      s.type = "text/javascript";
      if (!old.src) s.textContent = old.textContent;
      old.parentNode.insertBefore(s, old);
      old.parentNode.removeChild(old);
    });
    // iframes bloqueados: <iframe data-ptu-category="marketing" data-ptu-src="...">
    var frames = document.querySelectorAll("iframe[data-ptu-src][data-ptu-category]");
    Array.prototype.forEach.call(frames, function (f) {
      if (granted.indexOf(f.getAttribute("data-ptu-category")) === -1) return;
      f.src = f.getAttribute("data-ptu-src");
      f.removeAttribute("data-ptu-src");
    });
  }

  function pushConsentMode(prefs) {
    if (!CFG.consentModeV2) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag("consent", "update", {
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
      analytics_storage: prefs.analytics ? "granted" : "denied"
    });
  }

  function applyConsent(data) {
    var granted = Object.keys(data.categories).filter(function (c) { return data.categories[c]; });
    unblockScripts(granted);
    pushConsentMode(data.categories);
    document.documentElement.setAttribute("data-ptu-consent", granted.join(" "));
    if (typeof CFG.onChange === "function") { try { CFG.onChange(data); } catch (e) {} }
    window.dispatchEvent(new CustomEvent("ptu:consent", { detail: data }));
  }

  // Estado por defecto: todo denegado ANTES de cargar nada (Consent Mode default)
  if (CFG.consentModeV2) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["consent", "default", {
      ad_storage: "denied", ad_user_data: "denied",
      ad_personalization: "denied", analytics_storage: "denied",
      wait_for_update: 500
    }]);
  }

  // ─────────────────────────────────────────────────────────────
  // 4. INTERFAZ
  // ─────────────────────────────────────────────────────────────
  var dark = CFG.theme === "dark";
  var bg = CFG.background || (dark ? "#1c1f23" : "#ffffff");
  var fg = CFG.textColor || (dark ? "#f2f4f6" : "#1c1f23");
  var border = dark ? "rgba(255,255,255,.15)" : "rgba(0,0,0,.12)";

  function injectStyles() {
    if (document.getElementById("ptu-cookies-style")) return;
    var pos = CFG.position === "top"
      ? "top:16px;left:16px;right:16px;"
      : CFG.position === "center"
        ? "top:50%;left:50%;transform:translate(-50%,-50%);max-width:560px;"
        : "bottom:16px;left:16px;right:16px;";
    var css = [
      ".ptu-wrap{position:fixed;" + pos + "z-index:" + CFG.zIndex + ";font-family:" + CFG.fontFamily + ";",
      "background:" + bg + ";color:" + fg + ";border:1px solid " + border + ";border-radius:" + CFG.radius + ";",
      "box-shadow:0 8px 32px rgba(0,0,0,.18);padding:20px;max-width:860px;margin:0 auto;line-height:1.5;font-size:15px}",
      ".ptu-wrap[hidden]{display:none}",
      ".ptu-title{margin:0 0 8px;font-size:17px;font-weight:600}",
      ".ptu-msg{margin:0 0 16px}",
      ".ptu-msg a{color:" + CFG.primaryColor + "}",
      ".ptu-actions{display:flex;flex-wrap:wrap;gap:10px}",
      ".ptu-btn{cursor:pointer;border-radius:8px;padding:11px 18px;font-size:15px;font-weight:600;",
      "border:1px solid " + border + ";background:transparent;color:inherit;font-family:inherit;min-height:44px}",
      ".ptu-btn:focus-visible{outline:3px solid " + CFG.primaryColor + ";outline-offset:2px}",
      ".ptu-btn--primary{background:" + CFG.primaryColor + ";color:" + CFG.primaryTextColor + ";border-color:" + CFG.primaryColor + "}",
      ".ptu-btn--link{border-color:transparent;text-decoration:underline;padding-left:6px;padding-right:6px}",
      ".ptu-cats{margin:4px 0 16px;border-top:1px solid " + border + "}",
      ".ptu-cat{display:flex;gap:12px;align-items:flex-start;padding:14px 0;border-bottom:1px solid " + border + "}",
      ".ptu-cat label{font-weight:600;display:block}",
      ".ptu-cat p{margin:2px 0 0;font-size:13.5px;opacity:.8}",
      ".ptu-cat input{width:20px;height:20px;margin-top:2px;accent-color:" + CFG.primaryColor + "}",
      "@media(max-width:520px){.ptu-actions{flex-direction:column}.ptu-btn{width:100%}}"
    ].join("");
    var st = document.createElement("style");
    st.id = "ptu-cookies-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  var el, lastFocus;

  function render(showPanel, current) {
    injectStyles();
    if (el) el.parentNode.removeChild(el);
    el = document.createElement("div");
    el.className = "ptu-wrap";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "false");
    el.setAttribute("aria-labelledby", "ptu-title");

    var link = CFG.policyUrl
      ? ' <a href="' + CFG.policyUrl + '" target="_blank" rel="noopener">' + CFG.policyLabel + '</a>.'
      : "";

    var html = '<h2 class="ptu-title" id="ptu-title">' + CFG.title + "</h2>" +
               '<p class="ptu-msg">' + CFG.message + link + "</p>";

    if (showPanel) {
      html += '<div class="ptu-cats">';
      CFG.categories.forEach(function (c) {
        var checked = c.required || (current && current[c.id]) ? " checked" : "";
        var dis = c.required ? " disabled" : "";
        html += '<div class="ptu-cat"><input type="checkbox" id="ptu-c-' + c.id + '" data-cat="' + c.id + '"' + checked + dis + '>' +
                '<div><label for="ptu-c-' + c.id + '">' + c.label + "</label><p>" + (c.desc || "") + "</p></div></div>";
      });
      html += "</div>";
    }

    // Orden y jerarquía visual: Rechazar y Aceptar con el MISMO peso (requisito AEPD)
    html += '<div class="ptu-actions">' +
            '<button type="button" class="ptu-btn ptu-btn--primary" data-act="reject">' + CFG.rejectLabel + "</button>" +
            '<button type="button" class="ptu-btn ptu-btn--primary" data-act="accept">' + CFG.acceptLabel + "</button>" +
            (showPanel
              ? '<button type="button" class="ptu-btn" data-act="save">' + CFG.saveLabel + "</button>"
              : '<button type="button" class="ptu-btn ptu-btn--link" data-act="settings">' + CFG.settingsLabel + "</button>") +
            "</div>";

    el.innerHTML = html;
    document.body.appendChild(el);

    el.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-act]");
      if (!b) return;
      var act = b.getAttribute("data-act");
      if (act === "settings") return render(true, readConsent() && readConsent().categories);
      var prefs = {};
      CFG.categories.forEach(function (c) {
        if (c.required) { prefs[c.id] = true; return; }
        if (act === "accept") prefs[c.id] = true;
        else if (act === "reject") prefs[c.id] = false;
        else {
          var input = el.querySelector('[data-cat="' + c.id + '"]');
          prefs[c.id] = !!(input && input.checked);
        }
      });
      saveConsent(prefs);
      close();
    });

    var first = el.querySelector("[data-act]");
    if (first) first.focus();
  }

  function close() {
    if (el) { el.parentNode.removeChild(el); el = null; }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function open() {
    lastFocus = document.activeElement;
    var c = readConsent();
    render(true, c && c.categories);
  }

  function init() {
    var c = readConsent();
    if (c) applyConsent(c);
    else render(false, null);

    document.addEventListener("click", function (ev) {
      if (!CFG.reopenSelector) return;
      var t = ev.target.closest(CFG.reopenSelector);
      if (t) { ev.preventDefault(); open(); }
    });
  }

  // API pública mínima
  window.PTUCookies = {
    open: open,
    close: close,
    get: readConsent,
    has: function (cat) { var c = readConsent(); return !!(c && c.categories[cat]); },
    reset: function () { try { localStorage.removeItem(STORE_KEY); } catch (e) {} location.reload(); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
