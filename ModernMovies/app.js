/* ==========================================================================
   Modern Dark Grid — search, filter, sorting and language logic (100% client-side)
   File shared by the Movies and TV Shows templates.
   Reads the data-* attributes of each .card; nothing touches the server.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Internationalisation (ca / es / en) — no server, everything in the browser.
   Exposed as TMM_I18N so the other blocks of this file
   can use it too (episode grouping, etc.).
   -------------------------------------------------------------------------- */
var TMM_I18N = (function () {
  "use strict";

  var LANG_KEY = "tmm_lang";

  var STRINGS = {
    ca: {
      moviesTitle: "Pel·lícules",
      showsTitle: "Sèries",
      titlesSuffix: "títols",
      toShows: "Sèries →",
      toMovies: "← Pel·lícules",
      toCollections: "Col·leccions →",
      toHome: "⌂ Inici",
      toStats: "Estadístiques",
      themeToLight: "Canvia al tema clar",
      themeToDark: "Canvia al tema fosc",
      searchPlaceholder: "Cerca per títol, any o gènere…",
      filterToggle: "Filtres ▾",
      genre: "Gènere",
      year: "Any",
      yearAll: "Tots",
      audioLanguage: "Idioma d'àudio",
      decadeYear: "Dècada / Any",
      collection: "Col·lecció",
      collectionAll: "Totes",
      azAll: "Tots",
      sortBy: "Ordena per",
      sortTitleAsc: "Títol (A-Z)",
      sortYearDesc: "Any (nou → vell)",
      sortYearAsc: "Any (vell → nou)",
      clearFilters: "Neteja els filtres",
      emptyMovies: "Cap pel·lícula coincideix amb els filtres actuals.",
      emptyShows: "Cap sèrie coincideix amb els filtres actuals.",
      footer: "Generat amb tinyMediaManager · plantilla Modern Grid",
      seasonsAbbrev: "T",
      seasonsWord: "temporades",
      synopsisTitle: "Sinopsi",
      castTitle: "Repartiment",
      techSheetTitle: "Fitxa tècnica",
      directorLabel: "Director",
      studioLabel: "Estudi",
      certificationLabel: "Certificació",
      collectionPrefix: "📚 Col·lecció: ",
      backToList: "Torna al llistat",
      episodesTitle: "Episodis",
      specialsLabel: "Especials",
      seasonLabel: "Temporada",
      episodesWord: "episodis",
      collectionsTitle: "Col·leccions",
      collectionsSuffix: "col·leccions",
      searchCollectionsPlaceholder: "Cerca pel nom de la col·lecció…",
      emptyCollections: "Cap col·lecció coincideix amb la cerca actual.",
      moviesInCollectionTitle: "Pel·lícules de la col·lecció",
      personFilterActor: "Actor",
      personFilterDirector: "Director",
      personFilterStudio: "Estudi",
      clearThisFilter: "Treu aquest filtre",
      genreModeAnd: "I",
      genreModeOr: "O",
      genreModeAndTitle: "Que tingui TOTS els gèneres marcats",
      genreModeOrTitle: "Que tingui ALMENYS UN dels gèneres marcats",
      langModeAndTitle: "Que tingui TOTS els idiomes marcats",
      langModeOrTitle: "Que tingui ALMENYS UN dels idiomes marcats",
      genreHint: "Clic: incloure · segon clic: excloure · tercer: treure",
      quality: "Qualitat",
      qualityAll: "Totes",
      duration: "Durada",
      durationAll: "Totes",
      dur40: "Fins a 40' · ~mitja hora",
      dur70: "Fins a 70' · ~1 hora",
      dur90: "Fins a 90' · ~hora i mitja",
      dur100: "Fins a 100'",
      dur110: "Fins a 110'",
      dur120: "Fins a 120' · ~2 hores",
      dur130: "Fins a 130'",
      dur160: "Fins a 160' · ~2 h 40",
      durMore: "Més de 160' · llarga",
      durationHint: "La durada inclou els crèdits finals",
      durUnknown: "Sense durada (desconeguda)",
      durationEpisode: "Durada d'episodi",
      versions: "Versions",
      versionsOnly: "Només amb diverses versions",
      versionsLabel: "Versions",
      versionCurrent: "Aquesta versió",
      sharedPageWarning: "Hi ha entrades de tMM amb el mateix nom de carpeta i any: l'export només desa una fitxa i una portada. Canvia el títol, l'any o el nom de la carpeta d'una d'elles perquè es puguin distingir.",
      allVersionsLink: "Veure totes les versions",
      personFilterVersions: "Versions",
      editionLabel: "Edició",
      videoLabel: "Vídeo",
      audioLabel: "Àudio",
      sizeLabel: "Mida",
      languagesLabel: "Idiomes"
    },
    es: {
      moviesTitle: "Películas",
      showsTitle: "Series",
      titlesSuffix: "títulos",
      toShows: "Series →",
      toMovies: "← Películas",
      toCollections: "Colecciones →",
      toHome: "⌂ Inicio",
      toStats: "Estadísticas",
      themeToLight: "Cambiar al tema claro",
      themeToDark: "Cambiar al tema oscuro",
      searchPlaceholder: "Buscar por título, año o género…",
      filterToggle: "Filtros ▾",
      genre: "Género",
      year: "Año",
      yearAll: "Todos",
      audioLanguage: "Idioma de audio",
      decadeYear: "Década / Año",
      collection: "Colección",
      collectionAll: "Todas",
      azAll: "Todos",
      sortBy: "Ordenar por",
      sortTitleAsc: "Título (A-Z)",
      sortYearDesc: "Año (nuevo → viejo)",
      sortYearAsc: "Año (viejo → nuevo)",
      clearFilters: "Borrar filtros",
      emptyMovies: "Ninguna película coincide con los filtros actuales.",
      emptyShows: "Ninguna serie coincide con los filtros actuales.",
      footer: "Generado con tinyMediaManager · plantilla Modern Grid",
      seasonsAbbrev: "T",
      seasonsWord: "temporadas",
      synopsisTitle: "Sinopsis",
      castTitle: "Reparto",
      techSheetTitle: "Ficha técnica",
      directorLabel: "Director",
      studioLabel: "Estudio",
      certificationLabel: "Certificación",
      collectionPrefix: "📚 Colección: ",
      backToList: "Volver al listado",
      episodesTitle: "Episodios",
      specialsLabel: "Especiales",
      seasonLabel: "Temporada",
      episodesWord: "episodios",
      collectionsTitle: "Colecciones",
      collectionsSuffix: "colecciones",
      searchCollectionsPlaceholder: "Buscar por nombre de colección…",
      emptyCollections: "Ninguna colección coincide con la búsqueda actual.",
      moviesInCollectionTitle: "Películas de la colección",
      personFilterActor: "Actor",
      personFilterDirector: "Director",
      personFilterStudio: "Estudio",
      clearThisFilter: "Quitar este filtro",
      genreModeAnd: "Y",
      genreModeOr: "O",
      genreModeAndTitle: "Que tenga TODOS los géneros marcados",
      genreModeOrTitle: "Que tenga AL MENOS UNO de los géneros marcados",
      langModeAndTitle: "Que tenga TODOS los idiomas marcados",
      langModeOrTitle: "Que tenga AL MENOS UNO de los idiomas marcados",
      genreHint: "Clic: incluir · segundo clic: excluir · tercero: quitar",
      quality: "Calidad",
      qualityAll: "Todas",
      duration: "Duración",
      durationAll: "Todas",
      dur40: "Hasta 40' · ~media hora",
      dur70: "Hasta 70' · ~1 hora",
      dur90: "Hasta 90' · ~hora y media",
      dur100: "Hasta 100'",
      dur110: "Hasta 110'",
      dur120: "Hasta 120' · ~2 horas",
      dur130: "Hasta 130'",
      dur160: "Hasta 160' · ~2 h 40",
      durMore: "Más de 160' · larga",
      durationHint: "La duración incluye los créditos finales",
      durUnknown: "Sin duración (desconocida)",
      durationEpisode: "Duración de episodio",
      versions: "Versiones",
      versionsOnly: "Solo con varias versiones",
      versionsLabel: "Versiones",
      versionCurrent: "Esta versión",
      sharedPageWarning: "Hay entradas de tMM con el mismo nombre de carpeta y año: la exportación solo guarda una ficha y un póster. Cambia el título, el año o el nombre de la carpeta de una de ellas para que se distingan.",
      allVersionsLink: "Ver todas las versiones",
      personFilterVersions: "Versiones",
      editionLabel: "Edición",
      videoLabel: "Vídeo",
      audioLabel: "Audio",
      sizeLabel: "Tamaño",
      languagesLabel: "Idiomas"
    },
    en: {
      moviesTitle: "Movies",
      showsTitle: "TV Shows",
      titlesSuffix: "titles",
      toShows: "TV Shows →",
      toMovies: "← Movies",
      toCollections: "Collections →",
      toHome: "⌂ Home",
      toStats: "Statistics",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
      searchPlaceholder: "Search by title, year or genre…",
      filterToggle: "Filters ▾",
      genre: "Genre",
      year: "Year",
      yearAll: "All",
      audioLanguage: "Audio language",
      decadeYear: "Decade / Year",
      collection: "Collection",
      collectionAll: "All",
      azAll: "All",
      sortBy: "Sort by",
      sortTitleAsc: "Title (A-Z)",
      sortYearDesc: "Year (new → old)",
      sortYearAsc: "Year (old → new)",
      clearFilters: "Clear filters",
      emptyMovies: "No movie matches the current filters.",
      emptyShows: "No show matches the current filters.",
      footer: "Generated with tinyMediaManager · Modern Grid template",
      seasonsAbbrev: "S",
      seasonsWord: "seasons",
      synopsisTitle: "Synopsis",
      castTitle: "Cast",
      techSheetTitle: "Details",
      directorLabel: "Director",
      studioLabel: "Studio",
      certificationLabel: "Certification",
      collectionPrefix: "📚 Collection: ",
      backToList: "Back to list",
      episodesTitle: "Episodes",
      specialsLabel: "Specials",
      seasonLabel: "Season",
      episodesWord: "episodes",
      collectionsTitle: "Collections",
      collectionsSuffix: "collections",
      searchCollectionsPlaceholder: "Search by collection name…",
      emptyCollections: "No collection matches the current search.",
      moviesInCollectionTitle: "Movies in this collection",
      personFilterActor: "Actor",
      personFilterDirector: "Director",
      personFilterStudio: "Studio",
      clearThisFilter: "Remove this filter",
      genreModeAnd: "AND",
      genreModeOr: "OR",
      genreModeAndTitle: "Must have ALL the selected genres",
      genreModeOrTitle: "Must have AT LEAST ONE of the selected genres",
      langModeAndTitle: "Must have ALL the selected languages",
      langModeOrTitle: "Must have AT LEAST ONE of the selected languages",
      genreHint: "Click: include · second click: exclude · third: clear",
      quality: "Quality",
      qualityAll: "All",
      duration: "Duration",
      durationAll: "All",
      dur40: "Up to 40' · ~half an hour",
      dur70: "Up to 70' · ~1 hour",
      dur90: "Up to 90' · ~1.5 hours",
      dur100: "Up to 100'",
      dur110: "Up to 110'",
      dur120: "Up to 120' · ~2 hours",
      dur130: "Up to 130'",
      dur160: "Up to 160' · ~2 h 40",
      durMore: "Over 160' · long",
      durationHint: "Runtime includes the end credits",
      durUnknown: "No runtime (unknown)",
      durationEpisode: "Episode runtime",
      versions: "Versions",
      versionsOnly: "Only with several versions",
      versionsLabel: "Versions",
      versionCurrent: "This version",
      sharedPageWarning: "Some tMM entries share the same folder name and year: the export keeps only one page and one poster. Change the title, year or folder name of one of them so they can be told apart.",
      allVersionsLink: "See all versions",
      personFilterVersions: "Versions",
      editionLabel: "Edition",
      videoLabel: "Video",
      audioLabel: "Audio",
      sizeLabel: "Size",
      languagesLabel: "Languages"
    }
  };

  function getLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      return stored && STRINGS[stored] ? stored : "en";
    } catch (e) {
      return "en";
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* localStorage not available */ }
  }

  function dict() { return STRINGS[getLang()] || STRINGS.en; }

  function t(key) {
    var d = dict();
    return d[key] !== undefined ? d[key] : key;
  }

  function apply() {
    var d = dict();
    var lang = getLang();
    document.documentElement.setAttribute("lang", lang);

    Array.prototype.slice.call(document.querySelectorAll("[data-i18n]")).forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (d[key] !== undefined) el.textContent = d[key];
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-i18n-placeholder]")).forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (d[key] !== undefined) el.setAttribute("placeholder", d[key]);
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-i18n-title]")).forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (d[key] !== undefined) el.setAttribute("title", d[key]);
    });

    Array.prototype.slice.call(document.querySelectorAll("#langSwitcher")).forEach(function (switcher) {
      Array.prototype.slice.call(switcher.querySelectorAll("button[data-lang]")).forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-lang") === lang);
      });
    });

    document.dispatchEvent(new CustomEvent("tmm:langchange"));
  }

  function wireSwitchers() {
    Array.prototype.slice.call(document.querySelectorAll("#langSwitcher")).forEach(function (switcher) {
      Array.prototype.slice.call(switcher.querySelectorAll("button[data-lang]")).forEach(function (b) {
        b.addEventListener("click", function () {
          setLang(b.getAttribute("data-lang"));
          apply();
        });
      });
    });
  }

  apply();
  wireSwitchers();

  return { t: t, getLang: getLang, setLang: setLang, apply: apply };
})();

/* --------------------------------------------------------------------------
   Light / dark theme. By default it follows the system (CSS: prefers-color-scheme, no JS). The sun/moon button
   (added to every #langSwitcher) can force the other theme: it is saved in localStorage ("light" | "dark") and
   applied as <html data-theme>. If the user goes back to the system theme, the value is DELETED (nothing is pinned).
   It never checks whether the system "matches" the saved value: many systems switch from day to night on their own.
   -------------------------------------------------------------------------- */
var TMM_THEME = (function () {
  "use strict";

  var KEY = "tmm_theme";
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  var SVG = {
    moon: '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
  };

  function read() {
    try { var v = localStorage.getItem(KEY); return v === "light" || v === "dark" ? v : null; } catch (e) { return null; }
  }
  function write(v) {
    try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) { /* no storage: the effect only lasts for this page */ }
  }
  var override = read();

  function system() { return mq && mq.matches ? "light" : "dark"; }
  function current() { return override || system(); }
  function paint() {
    if (override) root.setAttribute("data-theme", override); else root.removeAttribute("data-theme");
  }

  function label() {
    return TMM_I18N.t(current() === "dark" ? "themeToLight" : "themeToDark");
  }
  function refresh() {
    var txt = label();
    Array.prototype.slice.call(document.querySelectorAll(".theme-toggle")).forEach(function (b) {
      b.setAttribute("aria-label", txt);
      b.setAttribute("title", txt);
    });
  }

  function toggle() {
    var target = current() === "dark" ? "light" : "dark";
    // If the target is the system theme, the user is undoing their choice: delete it, don't pin it.
    override = target === system() ? null : target;
    write(override);
    paint();
    refresh();
  }

  function build() {
    Array.prototype.slice.call(document.querySelectorAll("#langSwitcher")).forEach(function (sw) {
      if (sw.querySelector(".theme-toggle")) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "theme-toggle";
      b.innerHTML = SVG.moon + SVG.sun;
      b.addEventListener("click", toggle);
      sw.appendChild(b);
    });
    refresh();
  }

  paint();
  build();
  document.addEventListener("tmm:langchange", refresh);
  if (mq && mq.addEventListener) mq.addEventListener("change", refresh);
  window.addEventListener("storage", function (e) {
    if (e.key === KEY || e.key === null) { override = read(); paint(); refresh(); }
  });

  return { current: current, toggle: toggle };
})();

/* --------------------------------------------------------------------------
   Video file data. The .jmte files export ALL the media files
   of a movie (video, posters, nfo...) as plain text; here the one of type
   VIDEO is picked and the resolution is worked out from the real
   width/height (so 1920x1072, 1920x1080 and 1916x800 all come out as 1080p).
   Format: type~WIDTHxHEIGHT~codec~hdr~bytes~channels,channels,§ (one per file)
   -------------------------------------------------------------------------- */
var TMM_MEDIA = (function () {
  "use strict";

  function resLabel(w, h) {
    w = parseInt(w, 10) || 0;
    h = parseInt(h, 10) || 0;
    if (w >= 3000 || h >= 2000) return "2160p";
    if (w >= 2400 || h >= 1300) return "1440p";
    if (w >= 1800 || h >= 1000) return "1080p";
    if (w >= 1200 || h >= 700) return "720p";
    return (w || h) ? "SD" : "";
  }

  // Returns only the video files, already parsed
  function videos(raw) {
    return String(raw || "").split("§").map(function (rec) {
      var f = rec.split("~");
      if (f.length < 5 || f[0].trim() !== "VIDEO") return null;
      var dims = (f[1] || "").split("x");
      return {
        res: resLabel(dims[0], dims[1]),
        dims: (f[1] || "").replace("x", "×"),
        codec: (f[2] || "").trim(),
        hdr: (f[3] || "").trim(),
        bytes: parseInt(f[4], 10) || 0,
        audio: (f[5] || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean).map(function (t) {
          var p = t.split(":");
          return { ch: p[0], lang: (p[1] || "").trim() };
        })
      };
    }).filter(Boolean);
  }

  function firstRes(raw) {
    var v = videos(raw);
    for (var i = 0; i < v.length; i++) if (v[i].res) return v[i].res;
    return "";
  }

  return { videos: videos, firstRes: firstRes };
})();

/* --------------------------------------------------------------------------
   Audio languages with flags. Windows does not render flag emoji, so the
   flags are our own SVGs (included here). The codes tMM provides can be
   2 or 3 letters long, with odd capitalisation ("es", "spa", "JP"): they are normalised.
   The full name shows on mouse hover, in the interface language.
   -------------------------------------------------------------------------- */
var TMM_LANG = (function () {
  "use strict";

  // ISO 639-2 (3 letters) -> ISO 639-1 (2 letters). Codes that already have 2 letters are left as they are.
  var ALIAS = {
    spa: "es", cat: "ca", eng: "en", fra: "fr", fre: "fr", deu: "de", ger: "de", ita: "it",
    por: "pt", jpn: "ja", jp: "ja", kor: "ko", kr: "ko", zho: "zh", chi: "zh", cn: "zh",
    rus: "ru", nld: "nl", dut: "nl", pol: "pl", swe: "sv", tur: "tr", ara: "ar", hin: "hi",
    eus: "eu", baq: "eu", glg: "gl", ces: "cs", cze: "cs", ukr: "uk", ind: "id", hun: "hu",
    amh: "am", div: "dv", lit: "lt", tha: "th", heb: "he", ell: "el", gre: "el", fin: "fi",
    dan: "da", nor: "no", nob: "nb", ron: "ro", rum: "ro", bul: "bg", hrv: "hr", srp: "sr",
    slk: "sk", slo: "sk", slv: "sl", vie: "vi", fas: "fa", per: "fa", msa: "ms", may: "ms",
    ben: "bn", urd: "ur", cym: "cy", wel: "cy", gle: "ga", isl: "is", ice: "is", hye: "hy",
    arm: "hy", kat: "ka", geo: "ka", est: "et", lav: "lv", mkd: "mk", mac: "mk", sqi: "sq",
    alb: "sq"
  };

  var FLAGS = {
    es: '<rect width="60" height="40" fill="#c60b1e"/><rect y="10" width="60" height="20" fill="#ffc400"/>',
    ca: '<rect width="60" height="40" fill="#fcdd09"/><g fill="#da121a"><rect y="4.4" width="60" height="4.4"/><rect y="13.3" width="60" height="4.4"/><rect y="22.2" width="60" height="4.4"/><rect y="31.1" width="60" height="4.4"/></g>',
    en: '<rect width="60" height="40" fill="#012169"/><path d="M0,0L60,40M60,0L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0L60,40M60,0L0,40" stroke="#c8102e" stroke-width="3"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="12"/><path d="M30,0V40M0,20H60" stroke="#c8102e" stroke-width="7"/>',
    fr: '<rect width="20" height="40" fill="#0055a4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ef4135"/>',
    de: '<rect width="60" height="13.4" fill="#000"/><rect y="13.3" width="60" height="13.4" fill="#dd0000"/><rect y="26.6" width="60" height="13.4" fill="#ffce00"/>',
    it: '<rect width="20" height="40" fill="#009246"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ce2b37"/>',
    pt: '<rect width="60" height="40" fill="#f00"/><rect width="24" height="40" fill="#060"/><circle cx="24" cy="20" r="6.5" fill="#ffe000"/>',
    ja: '<rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="12" fill="#bc002d"/>',
    ko: '<rect width="60" height="40" fill="#fff"/><path d="M20,20A10,10 0 0 1 40,20Z" fill="#cd2e3a"/><path d="M20,20A10,10 0 0 0 40,20Z" fill="#0047a0"/>',
    zh: '<rect width="60" height="40" fill="#de2910"/><polygon fill="#ffde00" points="10.0,4.0 11.4,8.1 15.7,8.1 12.3,10.7 13.5,14.9 10.0,12.4 6.5,14.9 7.7,10.7 4.3,8.1 8.6,8.1"/>',
    ru: '<rect width="60" height="13.4" fill="#fff"/><rect y="13.3" width="60" height="13.4" fill="#0039a6"/><rect y="26.6" width="60" height="13.4" fill="#d52b1e"/>',
    nl: '<rect width="60" height="13.4" fill="#ae1c28"/><rect y="13.3" width="60" height="13.4" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#21468b"/>',
    pl: '<rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#dc143c"/>',
    sv: '<rect width="60" height="40" fill="#006aa7"/><path d="M0,20H60M22,0V40" stroke="#fecc00" stroke-width="8"/>',
    tr: '<rect width="60" height="40" fill="#e30a17"/><circle cx="22" cy="20" r="10" fill="#fff"/><circle cx="25" cy="20" r="8" fill="#e30a17"/><polygon fill="#fff" points="38.0,16.5 38.8,18.9 41.3,18.9 39.3,20.4 40.1,22.8 38.0,21.4 35.9,22.8 36.7,20.4 34.7,18.9 37.2,18.9"/>',
    eu: '<rect width="60" height="40" fill="#d52b1e"/><path d="M0,0L60,40M60,0L0,40" stroke="#009b48" stroke-width="4"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="5"/>',
    gl: '<rect width="60" height="40" fill="#fff"/><path d="M0,0L60,40" stroke="#0a6fb5" stroke-width="9"/>'
  };

  // Custom codes defined in config.js (languageCodes). They take priority over the standard,
  // so you can define, e.g., "la" as Latin American Spanish (in ISO "la" is Latin).
  function customDef(code) {
    var m = (window.TMM_CONFIG && window.TMM_CONFIG.languageCodes) || {};
    var k = String(code || "").trim().toLowerCase();
    for (var key in m) {
      if (Object.prototype.hasOwnProperty.call(m, key) && key.toLowerCase() === k) return m[key] || {};
    }
    return null;
  }

  // Region or script of a code ("pt-BR", "es-419", "zh-Hant"): accepted in file names and in
  // tags, but, as tMM does (pt-BR = Portuguese, es-MX and es-419 = Spanish), the code is reduced to
  // the base language. To keep a variant apart, declare it in languageCodes in config.js
  // ("pt-BR": {} is enough: pt flag, "BR" mark and an automatic name).
  var SUB_RX = /^(?:[a-z]{2}|\d{3}|[a-z]{4})$/;
  // "zxx" (ISO 639-2: no linguistic content) = silent film; tMM supports it too. It has no 2-letter code.
  var NAMES = {
    zxx: { ca: "Muda (sense diàleg)", es: "Muda (sin diálogo)", en: "Silent (no dialogue)" }
  };

  function resolve(raw, depth) {
    var def = customDef(raw);
    if (def) {
      // alias: a custom code that means the same as another one ({ alias: "pt-BR" }): they are merged
      if (def.alias && depth < 3) return resolve(String(def.alias).trim().toLowerCase().replace(/_/g, "-"), depth + 1) || raw;
      return raw;
    }
    var p = raw.split("-");
    var c = p[0];
    if (!c || c === "und" || c === "mul") return "";
    c = ALIAS[c] || c;
    // variant declared in config.js ("pt-br"): its own entry; otherwise the region is dropped
    if (p[1] && SUB_RX.test(p[1]) && customDef(c + "-" + p[1])) return resolve(c + "-" + p[1], depth + 1);
    return c;
  }

  // Canonical lowercase code: "ES" -> "es", "spa" -> "es", "es-ES" / "pt_BR" -> "es" / "pt"
  function norm(code) {
    return resolve(String(code || "").trim().toLowerCase().replace(/_/g, "-"), 0);
  }

  // Fixed order for the house languages (ca, es, en); the rest in order of appearance
  var PRIORITY = ["ca", "es", "en"];
  function order(codes) {
    var seen = {}, out = [];
    codes.forEach(function (c) { if (c && !seen[c]) { seen[c] = true; out.push(c); } });
    var first = PRIORITY.filter(function (c) { return seen[c]; });
    return first.concat(out.filter(function (c) { return PRIORITY.indexOf(c) === -1; }));
  }

  // Unique languages of the parsed video files (tag of each audio track)
  function fromVideos(videos) {
    var out = [];
    videos.forEach(function (v) {
      v.audio.forEach(function (a) { out.push(norm(a.lang)); });
    });
    return order(out);
  }

  // Where the languages come from: the audio tracks ("tracks", default) or the file
  // name ("filename"), according to window.TMM_CONFIG.languageSource (in config.js).
  function source() {
    var c = window.TMM_CONFIG || {};
    return c.languageSource === "filename" ? "filename" : "tracks";
  }

  // Is the code a real language? (rules out "[DC]", "[HD]"... which also have 2-3 letters)
  function known(c) {
    if (FLAGS[c] || customDef(c) || NAMES[c]) return true;
    try {
      var n = new Intl.DisplayNames(["en"], { type: "language" }).of(c);
      return !!n && String(n).toLowerCase() !== c;
    } catch (e) { return c.length === 2; }
  }

  // Languages in a file name: the bracket groups that contain ONLY language codes
  // of 2-3 letters (optional region: pt-BR, es-419, zh-Hant), separated by comma, dot,
  // space, "/", "+" or "&": [CA,ES,EN,JA], [es, en], [ES.EN], [ES,PT-BR]. A group with anything
  // else ([Remasterizado IA], [1080p]...) is ignored.
  var NAME_RX = /\[\s*([A-Za-z]{2,3}(?:[-_](?:[A-Za-z]{2}|\d{3}|[A-Za-z]{4}))?(?:\s*[,.\/+&\s]\s*[A-Za-z]{2,3}(?:[-_](?:[A-Za-z]{2}|\d{3}|[A-Za-z]{4}))?)*)\s*\]/g;
  function fromName(path) {
    var s = String(path || "");
    try { s = decodeURIComponent(s); } catch (e) { /* already decoded */ }
    s = s.split("?")[0].split("#")[0];
    s = s.slice(s.lastIndexOf("/") + 1);
    var out = [], m;
    NAME_RX.lastIndex = 0;
    while ((m = NAME_RX.exec(s)) !== null) {
      m[1].split(/[\s,.\/+&]+/).forEach(function (t) {
        var c = norm(t);
        if (c && known(c)) out.push(c);
      });
    }
    return order(out);
  }

  // Languages of an entry according to the chosen source; href = link or name of its file
  function forEntry(videos, href) {
    return source() === "filename" ? fromName(href) : fromVideos(videos);
  }

  function name(code) {
    var def = customDef(code);
    if (def && def.name) {
      if (typeof def.name === "string") return def.name;
      var lg = TMM_I18N.getLang();
      return def.name[lg] || def.name.en || def.name[Object.keys(def.name)[0]] || code.toUpperCase();
    }
    if (NAMES[code]) {
      return NAMES[code][TMM_I18N.getLang()] || NAMES[code].en;
    }
    try {
      var n = new Intl.DisplayNames([TMM_I18N.getLang()], { type: "language" }).of(code);
      if (n && n.toLowerCase() !== code) return n.charAt(0).toUpperCase() + n.slice(1);
    } catch (e) { /* old browser: keep the code */ }
    return code.toUpperCase();
  }

  function bullet(code) {
    var el = document.createElement("span");
    el.className = "lang-flag";
    el.dataset.lang = code;
    el.title = name(code);
    var def = customDef(code);
    var parts = code.split("-");
    var base = def && def.flag ? String(def.flag).toLowerCase() : parts[0];
    // "mark": short text (e.g. "LA", "BR") over the flag, to tell a variant from the base language
    var mark = def ? (def.mark ? String(def.mark) : (parts[1] || "")) : "";
    mark = mark.slice(0, 3).toUpperCase();
    if (FLAGS[base]) {
      var txt = mark
        ? '<text x="30" y="27.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="' + (mark.length > 2 ? 17 : 21) + '" font-weight="800" fill="#fff" stroke="#000" stroke-width="3.2" paint-order="stroke" stroke-linejoin="round">' + mark + "</text>"
        : "";
      el.innerHTML = '<svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + FLAGS[base] + txt + "</svg>";
    } else {
      el.classList.add("lang-flag-code");
      el.textContent = (mark || parts[0]).slice(0, 3).toUpperCase();
    }
    return el;
  }

  // max = how many flags are shown before the "+N" (no max: all of them)
  function render(codes, max) {
    var wrap = document.createElement("span");
    wrap.className = "lang-flags";
    var shown = max && codes.length > max ? codes.slice(0, max) : codes;
    shown.forEach(function (c) { wrap.appendChild(bullet(c)); });
    if (max && codes.length > max) {
      var more = document.createElement("span");
      more.className = "lang-flag lang-flag-more";
      more.textContent = "+";
      more.title = codes.slice(max).map(name).join(", ");
      more.dataset.rest = codes.slice(max).join(",");
      wrap.appendChild(more);
    }
    return wrap;
  }

  // When the interface language changes, the names in the title tooltips are translated
  document.addEventListener("tmm:langchange", function () {
    Array.prototype.slice.call(document.querySelectorAll(".lang-flag[data-lang]")).forEach(function (el) {
      el.title = name(el.dataset.lang);
    });
    Array.prototype.slice.call(document.querySelectorAll(".lang-flag-more[data-rest]")).forEach(function (el) {
      el.title = el.dataset.rest.split(",").map(name).join(", ");
    });
  });

  return { fromVideos: fromVideos, fromName: fromName, forEntry: forEntry, order: order, source: source, render: render, bullet: bullet, name: name, PRIORITY: PRIORITY };
})();

/* --------------------------------------------------------------------------
   Routes between exports. The folders where you exported movies, TV shows
   and collections can be changed in ONE file, config.js, at the web root
   (the parent folder of the three). If it does not exist (or has no "routes"), each
   export stands alone: no links to the others. If "routes" exists and a key is missing,
   the default name applies (movies / tvshows / collections). A cross-export link carries
   data-route (key), data-root (path back to the root, e.g. "../../") and
   data-rest (the rest of the path); its href is recomputed here. A route
   set to null or "" hides the links pointing to it.
   -------------------------------------------------------------------------- */
var TMM_ROUTES = (function () {
  "use strict";

  var DEF = { movies: "movies", tvshows: "tvshows", collections: "collections" };

  function dir(key) {
    var cfg = window.TMM_CONFIG && window.TMM_CONFIG.routes;
    // Without config.js (or without "routes"), each export stands alone: no links to the others.
    if (!cfg || typeof cfg !== "object") return null;
    var d = Object.prototype.hasOwnProperty.call(cfg, key) ? cfg[key] : DEF[key];
    if (d === null || d === false || d === undefined || d === "") return null;
    return String(d).replace(/^\.?\/+/, "").replace(/\/+$/, "");
  }

  // Link to an export that isn't there: buttons and chips are hidden; content links
  // (poster, title) stay as plain text that can't be clicked.
  function off(a) {
    if (a.classList.contains("crosslink") || a.classList.contains("chip")) {
      a.style.display = "none";
      var par = a.parentNode;
      if (par && par.tagName === "P" && par.children.length === 1) par.style.display = "none";
    } else {
      a.style.pointerEvents = "none";
      a.style.cursor = "default";
      a.setAttribute("tabindex", "-1");
      a.setAttribute("aria-disabled", "true");
    }
  }

  // The landing page (index.html) and the statistics (stats.html) are FILES at the root, not folders, and
  // must be switched on explicitly in config.js: routes.home / routes.stats = true (default
  // name) or the file name. If they are missing, the link is hidden (so no link is ever broken).
  var FILES = { home: "index.html", stats: "stats.html" };
  function file(key) {
    var cfg = window.TMM_CONFIG && window.TMM_CONFIG.routes;
    if (!cfg || typeof cfg !== "object") return null;
    var v = cfg[key];
    if (v === true) return FILES[key];
    if (typeof v === "string" && v) return v.replace(/^\.?\/+/, "");
    return null;
  }

  // Folder of a collection. The links ask tMM for it with ${movieSet;filename(escape=true)} (tMM 5.3.5 or
  // later, #3369), so it always matches the folder the exporter creates. This is the FALLBACK for
  // tMM versions before 5.3.5, where the title arrives with its ":" and the folder (5.3.4) replaces them:
  // "Alien: Romulus Collection" -> "Alien - Romulus Collection". It applies ': ' -> ' - ' and ':' -> '-', and does nothing if
  // the name has no ":". colonInCollectionFolders: "keep" in config.js turns it off.
  function setPath(s) {
    var c = window.TMM_CONFIG && window.TMM_CONFIG.colonInCollectionFolders;
    if (c === "keep" || s.indexOf(":") < 0) return s;
    return s.replace(/:\s+/g, " - ").replace(/:/g, "-");
  }

  function apply() {
    // Collection list: relative links "./<title>/movieset.html" (no data-route)
    Array.prototype.slice.call(document.querySelectorAll("a[href$='/movieset.html']:not([data-route])")).forEach(function (a) {
      var h = a.getAttribute("href") || "";
      if (h.indexOf("./") === 0) a.setAttribute("href", "./" + setPath(h.slice(2)));
    });
    Array.prototype.slice.call(document.querySelectorAll("a[data-route]")).forEach(function (a) {
      var key = a.getAttribute("data-route");
      var root = a.getAttribute("data-root") || "";
      if (FILES[key]) {
        var f = file(key);
        if (f === null) { off(a); return; }
        a.setAttribute("href", root + f);
        return;
      }
      var d = dir(key);
      if (d === null) { off(a); return; }
      var rest = a.getAttribute("data-rest") || "";
      if (key === "collections" && /\/movieset\.html$/.test(rest)) rest = setPath(rest);
      a.setAttribute("href", root + d + "/" + rest);
    });
  }

  apply();
  return { dir: dir, file: file, apply: apply };
})();

/* --------------------------------------------------------------------------
   Versions of the same title. tMM exports each version (Film 1988 / Film 4K,
   "Bola de Dragón" / "Dragon Ball"...) as a separate entry with the SAME
   scraper ID (data-vid). The list shows only one card per title
   (with the ×N badge) and all the versions are shown on the detail page.
   How does the detail page know which versions exist, if tMM only gives it its own title?
   The list saves them in the browser's localStorage (this works with
   file:// too) and, when the page is served by a web server, the detail page
   also re-reads the list so they are always up to date.
   -------------------------------------------------------------------------- */
var TMM_VERSIONS = (function () {
  "use strict";

  var PREFIX = "tmm_versions_";

  // Groups the cards by data-vid. The representative card is the version without
  // an edition (if there is one); the others are hidden from the list.
  function hrefOf(card) {
    var a = card.querySelector(".poster-link");
    return a ? a.getAttribute("href") : "";
  }

  // Entries pointing to the same page: only one is kept (the last one, which is
  // the one tMM writes last and therefore the one actually on disk)
  // prefer(e) (optional): if two entries share a page, keep the one
  // the page recognises as its own (e.g. by the number of episodes). e.shared = how many
  // tMM entries share this page.
  function dedupe(entries, prefer) {
    var groups = [], at = {};
    entries.forEach(function (e) {
      if (at[e.href] === undefined) { at[e.href] = groups.length; groups.push([]); }
      groups[at[e.href]].push(e);
    });
    return groups.map(function (list) {
      var pick = list[list.length - 1];
      if (prefer && list.length > 1) {
        for (var i = 0; i < list.length; i++) if (prefer(list[i])) { pick = list[i]; break; }
      }
      var copy = {};
      for (var k in pick) copy[k] = pick[k];
      copy.shared = list.length;
      return copy;
    });
  }

  function group(cards) {
    var byVid = {};
    var groups = [];
    cards.forEach(function (card) {
      var v = card.dataset.vid || "";
      var g = v ? byVid[v] : null;
      if (!g) {
        g = { vid: v, cards: [], rep: null };
        groups.push(g);
        if (v) byVid[v] = g;
      }
      g.cards.push(card);
    });
    groups.forEach(function (g) {
      var rep = g.cards[0];
      for (var i = 0; i < g.cards.length; i++) {
        if (!g.cards[i].dataset.edition) { rep = g.cards[i]; break; }
      }
      // if two entries share a page, the one actually on disk is the last one
      for (var j = g.cards.length - 1; j >= 0; j--) {
        if (hrefOf(g.cards[j]) === hrefOf(rep)) { rep = g.cards[j]; break; }
      }
      g.rep = rep;
      // DIFFERENT detail pages: two entries with the same title and year share
      // a folder in the export (tMM saves only one of them), and those are not two versions.
      var hrefs = {};
      g.pages = 0;
      g.cards.forEach(function (c) {
        var h = hrefOf(c);
        if (!hrefs[h]) { hrefs[h] = true; g.pages++; }
      });
      g.cards.forEach(function (c) {
        c._group = g;
        c.dataset.multi = g.pages > 1 ? "1" : "0";
        if (c !== rep) { c.classList.add("vdup"); c.style.display = "none"; }
      });
    });
    return groups;
  }

  function rank(res) { return parseInt(res, 10) || 0; }

  // Distinct resolutions in the group, highest first
  function uniqueRes(g) {
    var seen = {}, out = [];
    g.cards.forEach(function (c) {
      var r = TMM_MEDIA.firstRes(c.dataset.media);
      if (r && !seen[r]) { seen[r] = true; out.push(r); }
    });
    return out.sort(function (a, b) { return rank(b) - rank(a); });
  }

  // Badges on the representative card: quality and flags (movies only,
  // withMedia) and ×N if there are several versions.
  function decorate(g, withMedia) {
    var card = g.rep, n = g.pages;
    var link = card.querySelector(".poster-link");
    if (!link) return;
    if (withMedia) {
      var res = uniqueRes(g);
      if (res.length) {
        var qb = document.createElement("span");
        qb.className = "badge quality";
        qb.textContent = res.slice(0, 2).join(" · ") + (res.length > 2 ? " +" : "");
        qb.title = res.join(", ");
        link.appendChild(qb);
      }
      var all = [];
      g.cards.forEach(function (c) {
        var pl = c.querySelector(".poster-link");
        all = all.concat(TMM_LANG.forEntry(TMM_MEDIA.videos(c.dataset.media), pl ? pl.getAttribute("href") : ""));
      });
      var codes = TMM_LANG.order(all);
      if (codes.length) link.appendChild(TMM_LANG.render(codes, 3));
    }
    if (g.cards.length > g.pages) {
      var warn = document.createElement("span");
      warn.className = "badge shared-warn";
      warn.textContent = "⚠";
      warn.title = TMM_I18N.t("sharedPageWarning");
      link.appendChild(warn);
    }
    if (n > 1) {
      var b = document.createElement("span");
      b.className = "badge versions";
      b.textContent = "×" + n;
      b.title = TMM_I18N.t("versionsLabel") + ": " + n;
      link.appendChild(b);
      // the "year · edition" subtitle only makes sense for a specific version
      var sub = card.querySelector(".sub");
      if (sub && card.dataset.year) sub.textContent = card.dataset.year;
    }
  }

  function entryOf(card) {
    var a = card.querySelector(".poster-link");
    return {
      href: a ? a.getAttribute("href") : "",
      title: card.dataset.name || card.dataset.title || "",
      year: card.dataset.year || "",
      edition: card.dataset.edition || "",
      media: card.dataset.media || "",
      seasons: card.dataset.seasons || "",
      episodes: card.dataset.episodes || ""
    };
  }

  // { vid: [entries] } only for groups with more than one version
  function toMap(groups) {
    var map = {};
    groups.forEach(function (g) {
      if (g.vid && g.pages > 1) map[g.vid] = g.cards.map(entryOf);
    });
    return map;
  }

  function save(kind, groups) {
    if (!kind) return;
    try { localStorage.setItem(PREFIX + kind, JSON.stringify(toMap(groups))); } catch (e) { /* ignore */ }
  }

  // Calls cb(entries) with what is saved and, if possible, once more with the
  // freshly read list (only works when served over http/https).
  function lookup(kind, vid, listUrl, cb) {
    try {
      var saved = JSON.parse(localStorage.getItem(PREFIX + kind) || "null");
      if (saved && saved[vid]) cb(saved[vid]);
    } catch (e) { /* ignore */ }
    if (!/^https?:/i.test(location.protocol) || typeof fetch !== "function") return;
    fetch(listUrl).then(function (res) { return res.ok ? res.text() : ""; }).then(function (html) {
      if (!html) return;
      var doc = new DOMParser().parseFromString(html, "text/html");
      var found = [];
      Array.prototype.slice.call(doc.querySelectorAll(".card[data-vid]")).forEach(function (c) {
        if (c.dataset.vid === vid) found.push(entryOf(c));
      });
      if (found.length) cb(found);
    }).catch(function () { /* ignore */ });
  }

  return { group: group, decorate: decorate, save: save, lookup: lookup, dedupe: dedupe };
})();

/* --------------------------------------------------------------------------
   Grid: search, filters and sorting (list page)
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var grid = document.getElementById("grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var kind = grid.dataset.kind || "";
  var groups = TMM_VERSIONS.group(cards);
  var searchInput = document.getElementById("search");
  var filterToggle = document.getElementById("filterToggle");
  var filtersPanel = document.getElementById("filters");
  var genreChipsWrap = document.getElementById("genreChips");
  var genreModeWrap = document.getElementById("genreMode");
  var qualitySelect = document.getElementById("qualitySelect");
  var durationSelect = document.getElementById("durationSelect");
  var versionsToggle = document.getElementById("versionsToggle");
  var yearSelect = document.getElementById("yearSelect");
  var langChipsWrap = document.getElementById("langChips");
  var langModeWrap = document.getElementById("langMode");
  var decadeSelect = document.getElementById("decadeSelect"); // optional (old templates: year only)
  var collectionSelect = document.getElementById("collectionSelect");
  var azBar = document.getElementById("azBar");
  var sortSelect = document.getElementById("sortSelect");
  var clearBtn = document.getElementById("clearFilters");
  var emptyState = document.getElementById("emptyState");
  var countEl = document.getElementById("resultCount");
  var personPill = document.getElementById("activeFilterPill");
  var personPillText = document.getElementById("activeFilterText");
  var personPillClear = document.getElementById("activeFilterClear");

  var state = {
    q: "",
    genres: new Set(),        // included genres
    genresExclude: new Set(), // excluded genres
    genreMode: "and",         // "and" (all) | "or" (any)
    decade: "", // "1980" = 1980-1989
    year: "",
    quality: "",
    duration: "",        // "" | maximum minutes ("40"…"130","160") | "160+" | "unknown"
    multiVersion: false, // only titles with several versions
    langs: new Set(),    // selected audio languages
    langMode: "or",      // "or" (any, default) | "and" (all at once)
    collection: "",
    letter: "", // "" (all) | "A".."Z" | "#" (starts with a number or symbol)
    person: { kind: "", value: "" } // kind: "" | "actor" | "director" | "studio"
  };

  // ---- Strips accents so "Érase..." is grouped under E, etc. ----
  function baseLetter(str) {
    if (!str) return "";
    var stripped = String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var match = stripped.match(/[A-Za-z0-9]/);
    if (!match) return "";
    var ch = match[0].toUpperCase();
    return /[0-9]/.test(ch) ? "#" : ch;
  }

  // Resolution of the card's video file ("2160p", "1080p"...)
  function cardQuality(card) {
    return TMM_MEDIA.firstRes(card.dataset.media);
  }

  function decadeOf(y) {
    y = parseInt(y, 10);
    return y > 0 ? Math.floor(y / 10) * 10 : 0;
  }

  var allYears = []; // years present (all titles), newest first

  // Audio languages present: ca, es, en first; the rest by number of titles
  function buildLangChips() {
    if (!langChipsWrap) return;
    var counts = {};
    groups.forEach(function (g) {
      var seen = {};
      g.cards.forEach(function (c) { cardLangs(c).forEach(function (l) { seen[l] = true; }); });
      Object.keys(seen).forEach(function (l) { counts[l] = (counts[l] || 0) + 1; });
    });
    var codes = Object.keys(counts);
    if (!codes.length) { langChipsWrap.closest(".filter-group").style.display = "none"; return; }
    var pri = TMM_LANG.PRIORITY;
    codes.sort(function (a, b) {
      var pa = pri.indexOf(a), pb = pri.indexOf(b);
      if (pa !== -1 || pb !== -1) return (pa === -1 ? 99 : pa) - (pb === -1 ? 99 : pb);
      return counts[b] - counts[a] || a.localeCompare(b);
    });
    langChipsWrap.textContent = "";
    codes.forEach(function (code) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip lang-chip";
      chip.dataset.lang = code;
      chip.appendChild(TMM_LANG.bullet(code));
      var label = document.createElement("span");
      label.className = "lang-chip-name";
      label.textContent = TMM_LANG.name(code);
      chip.appendChild(label);
      var n = document.createElement("small");
      n.textContent = " " + counts[code];
      chip.appendChild(n);
      chip.addEventListener("click", function () {
        if (state.langs.has(code)) state.langs.delete(code); else state.langs.add(code);
        paintLangChips();
        applyFilters();
      });
      langChipsWrap.appendChild(chip);
    });
    paintLangChips();
  }

  function paintLangChips() {
    if (!langChipsWrap) return;
    Array.prototype.slice.call(langChipsWrap.querySelectorAll(".lang-chip")).forEach(function (c) {
      c.classList.toggle("active", state.langs.has(c.dataset.lang));
    });
    if (langModeWrap) {
      Array.prototype.slice.call(langModeWrap.querySelectorAll("button")).forEach(function (b) {
        b.classList.toggle("active", b.dataset.mode === state.langMode);
      });
    }
  }

  if (langModeWrap) {
    Array.prototype.slice.call(langModeWrap.querySelectorAll("button")).forEach(function (b) {
      b.addEventListener("click", function () {
        state.langMode = b.dataset.mode;
        paintLangChips();
        applyFilters();
      });
    });
  }

  // Audio languages of a version (cached)
  function cardLangs(card) {
    if (!card._langs) {
      var pl = card.querySelector(".poster-link");
      card._langs = TMM_LANG.forEntry(TMM_MEDIA.videos(card.dataset.media), pl ? pl.getAttribute("href") : "");
    }
    return card._langs;
  }

  function i18nOption(value, key) {
    var o = document.createElement("option");
    o.value = value;
    o.setAttribute("data-i18n", key);
    o.textContent = TMM_I18N.t(key);
    return o;
  }

  // Years in the dropdown: only those of the chosen decade (or all of them if none is chosen)
  function fillYearOptions() {
    if (!yearSelect) return;
    var keep = state.year;
    yearSelect.textContent = "";
    yearSelect.appendChild(i18nOption("", "yearAll"));
    allYears.forEach(function (y) {
      if (state.decade && String(decadeOf(y)) !== state.decade) return;
      var opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    });
    yearSelect.value = keep;
    state.year = yearSelect.value; // "" if the year no longer fits the decade
  }

  // ---- Builds the dynamic options from the cards ----
  function buildOptions() {
    var genreSet = new Set();
    var yearSet = new Set();
    var collSet = new Set();

    cards.forEach(function (card) {
      (card.dataset.genres || "").split("|").forEach(function (g) {
        if (g) genreSet.add(g);
      });
      if (card.dataset.year) yearSet.add(card.dataset.year);
      if (card.dataset.collection) collSet.add(card.dataset.collection);
    });

    if (genreChipsWrap) {
      Array.from(genreSet).sort().forEach(function (g) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip";
        chip.textContent = g;
        chip.dataset.genre = g;
        chip.addEventListener("click", function () {
          // cycle: none -> included -> excluded -> none
          if (state.genres.has(g)) {
            state.genres.delete(g); state.genresExclude.add(g);
          } else if (state.genresExclude.has(g)) {
            state.genresExclude.delete(g);
          } else {
            state.genres.add(g);
          }
          paintGenreChips();
          applyFilters();
        });
        genreChipsWrap.appendChild(chip);
      });
    }

    allYears = Array.from(yearSet).sort(function (a, b) { return b - a; });
    if (decadeSelect) {
      // titles (not versions) per decade
      var perDecade = {};
      groups.forEach(function (g) {
        var d = decadeOf(g.rep.dataset.year);
        if (d) perDecade[d] = (perDecade[d] || 0) + 1;
      });
      decadeSelect.textContent = "";
      decadeSelect.appendChild(i18nOption("", "yearAll"));
      Object.keys(perDecade).map(Number).sort(function (a, b) { return b - a; }).forEach(function (d) {
        var opt = document.createElement("option");
        opt.value = String(d);
        opt.textContent = d + "–" + (d + 9) + " (" + perDecade[d] + ")";
        decadeSelect.appendChild(opt);
      });
    }
    fillYearOptions();
    buildLangChips();

    // Quality (video file resolution) and versions (same scraper ID repeated)
    if (qualitySelect) {
      var qSet = new Set();
      cards.forEach(function (card) { var q = cardQuality(card); if (q) qSet.add(q); });
      if (qSet.size === 0) {
        qualitySelect.closest(".filter-group").style.display = "none";
      } else {
        Array.from(qSet).sort(function (a, b) { return parseInt(b, 10) - parseInt(a, 10); }).forEach(function (q) {
          var opt = document.createElement("option");
          opt.value = q;
          opt.textContent = q;
          qualitySelect.appendChild(opt);
        });
      }
    }
    // Badges (quality, flags, ×N) on each title's representative card
    groups.forEach(function (g) { TMM_VERSIONS.decorate(g, kind === "movies"); });
    if (versionsToggle) {
      var multiCount = groups.filter(function (g) { return g.pages > 1; }).length;
      var vc = document.getElementById("versionsCount");
      if (vc) vc.textContent = "(" + multiCount + ")";
      versionsToggle.disabled = multiCount === 0;
    }

    if (collectionSelect) {
      if (collSet.size === 0) {
        collectionSelect.closest(".filter-group").style.display = "none";
      } else {
        Array.from(collSet).sort().forEach(function (c) {
          var opt = document.createElement("option");
          opt.value = c;
          opt.textContent = c;
          collectionSelect.appendChild(opt);
        });
      }
    }

    if (azBar) {
      var letterSet = new Set();
      cards.forEach(function (card) {
        var l = baseLetter(card.dataset.title);
        if (l) letterSet.add(l);
      });
      var order = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(function (l) { return letterSet.has(l); });

      var allBtn = document.createElement("button");
      allBtn.type = "button";
      allBtn.className = "az-btn active";
      allBtn.setAttribute("data-i18n", "azAll");
      allBtn.textContent = TMM_I18N.t("azAll");
      allBtn.addEventListener("click", function () {
        state.letter = "";
        setActiveLetterBtn(null);
        applyFilters();
      });
      azBar.appendChild(allBtn);

      order.forEach(function (l) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "az-btn";
        btn.textContent = l;
        btn.dataset.letter = l;
        btn.addEventListener("click", function () {
          state.letter = l;
          setActiveLetterBtn(l);
          applyFilters();
        });
        azBar.appendChild(btn);
      });

      // On very narrow screens (CSS, <= 560 px) the letters are replaced by a one-line dropdown;
      // it shares the state (state.letter) and the ?letter= parameter with the buttons.
      var azSel = document.createElement("select");
      azSel.className = "az-select";
      azSel.setAttribute("aria-label", azBar.getAttribute("aria-label") || "A-Z");
      var opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "A\u2013Z";
      azSel.appendChild(opt0);
      order.forEach(function (l) {
        var op = document.createElement("option");
        op.value = l;
        op.textContent = l;
        azSel.appendChild(op);
      });
      azSel.addEventListener("change", function () {
        state.letter = azSel.value;
        setActiveLetterBtn(state.letter || null);
        applyFilters();
      });
      azBar.appendChild(azSel);
    }

    // Filter state in the URL (?q=, ?genre=, ?xgenre=, ?gmode=, ?year=, ?collection=,
    // ?letter=, ?sort=). That way the "back" button on a detail page restores the filters, and
    // a search can also be saved as a bookmark or a link.
    var params = new URLSearchParams(window.location.search);
    var openPanel = false;

    var wantedQ = params.get("q");
    if (wantedQ && searchInput) {
      searchInput.value = wantedQ;
      state.q = wantedQ;
    }

    var wantedCollection = params.get("collection");
    if (wantedCollection && collectionSelect) {
      collectionSelect.value = wantedCollection;
      state.collection = collectionSelect.value; // "" if it no longer exists
      if (state.collection) openPanel = true;
    }

    if (langChipsWrap) {
      params.getAll("audio").forEach(function (code) {
        if (langChipsWrap.querySelector('.lang-chip[data-lang="' + code + '"]')) state.langs.add(code);
      });
      if (params.get("amode") === "and") state.langMode = "and";
      if (state.langs.size) { paintLangChips(); openPanel = true; }
    }

    var wantedDecade = params.get("decade");
    if (wantedDecade && decadeSelect) {
      decadeSelect.value = wantedDecade;
      state.decade = decadeSelect.value; // "" if it doesn't exist
      if (state.decade) { fillYearOptions(); openPanel = true; }
    }
    var wantedYear = params.get("year");
    if (wantedYear && yearSelect) {
      // an old ?year=1988 link also sets the decade
      if (decadeSelect && !state.decade && decadeOf(wantedYear)) {
        decadeSelect.value = String(decadeOf(wantedYear));
        state.decade = decadeSelect.value;
        fillYearOptions();
      }
      yearSelect.value = wantedYear;
      state.year = yearSelect.value;
      if (state.year) openPanel = true;
    }

    if (genreChipsWrap) {
      var chips = Array.prototype.slice.call(genreChipsWrap.querySelectorAll(".chip"));
      var findChip = function (name) {
        return chips.find(function (c) { return c.dataset.genre.toLowerCase() === name.toLowerCase(); });
      };
      params.getAll("genre").forEach(function (g) {
        var m = findChip(g);
        if (m) { state.genres.add(m.dataset.genre); openPanel = true; }
      });
      params.getAll("xgenre").forEach(function (g) {
        var m = findChip(g);
        if (m && !state.genres.has(m.dataset.genre)) { state.genresExclude.add(m.dataset.genre); openPanel = true; }
      });
      if (params.get("gmode") === "or") { state.genreMode = "or"; }
    }

    var wantedQuality = params.get("quality");
    if (wantedQuality && qualitySelect) {
      qualitySelect.value = wantedQuality;
      state.quality = qualitySelect.value;
      if (state.quality) openPanel = true;
    }
    var wantedDuration = params.get("duration");
    if (wantedDuration && durationSelect) {
      durationSelect.value = wantedDuration;
      state.duration = durationSelect.value; // "" if it isn't a valid range
      if (state.duration) openPanel = true;
    }
    if (params.get("versions") === "1" && versionsToggle) {
      state.multiVersion = true;
      versionsToggle.classList.add("active");
      openPanel = true;
    }

    var wantedLetter = params.get("letter");
    if (wantedLetter && azBar && azBar.querySelector('.az-btn[data-letter="' + wantedLetter.replace(/"/g, "") + '"]')) {
      state.letter = wantedLetter;
      setActiveLetterBtn(wantedLetter);
    }

    var wantedSort = params.get("sort");
    if (wantedSort && sortSelect) {
      sortSelect.value = wantedSort;
      if (sortSelect.value !== wantedSort) sortSelect.value = "title-asc"; // unknown value
      else if (wantedSort !== "title-asc") openPanel = true;
    }

    if (openPanel && filtersPanel) {
      filtersPanel.classList.add("open");
      if (filterToggle) filterToggle.classList.add("active");
    }

    // ?actor=... / ?director=... / ?studio=... in the URL (coming from a link on a detail page)
    ["actor", "director", "studio", "tmdb", "imdb"].some(function (kind) {
      var value = params.get(kind);
      if (!value) return false;
      state.person = { kind: kind, value: value };
      return true;
    });
    paintGenreChips();
    renderPersonPill();
  }

  // ---- "Filtering by Actor/Director/Studio: X" pill, with a button to remove it ----
  function renderPersonPill() {
    if (!personPill) return;
    if (!state.person.value) { personPill.hidden = true; return; }
    var kind = state.person.kind;
    var labelKey = kind === "actor" ? "personFilterActor"
      : kind === "director" ? "personFilterDirector"
      : (kind === "tmdb" || kind === "imdb") ? "personFilterVersions"
      : "personFilterStudio";
    var shown = state.person.value;
    if (kind === "tmdb" || kind === "imdb") { // shows the title instead of the ID
      var first = cards.find(function (c) { return (c.dataset[kind] || "") === state.person.value; });
      if (first) shown = first.dataset.title;
    }
    if (personPillText) personPillText.textContent = TMM_I18N.t(labelKey) + ": " + shown;
    personPill.hidden = false;
  }
  document.addEventListener("tmm:langchange", renderPersonPill);

  if (personPillClear) {
    personPillClear.addEventListener("click", function () {
      state.person = { kind: "", value: "" };
      renderPersonPill();
      applyFilters();
    });
  }

  // ---- Paints the state (included / excluded) of the genre chips and the AND/OR selector ----
  function paintGenreChips() {
    if (genreChipsWrap) {
      Array.prototype.slice.call(genreChipsWrap.querySelectorAll(".chip")).forEach(function (c) {
        c.classList.toggle("active", state.genres.has(c.dataset.genre));
        c.classList.toggle("excluded", state.genresExclude.has(c.dataset.genre));
      });
    }
    if (genreModeWrap) {
      Array.prototype.slice.call(genreModeWrap.querySelectorAll("button")).forEach(function (b) {
        b.classList.toggle("active", b.dataset.mode === state.genreMode);
      });
    }
  }

  if (genreModeWrap) {
    Array.prototype.slice.call(genreModeWrap.querySelectorAll("button")).forEach(function (b) {
      b.addEventListener("click", function () {
        state.genreMode = b.dataset.mode;
        paintGenreChips();
        applyFilters();
      });
    });
  }

  // ---- Genres: the included ones (all/any depending on AND/OR) and none of the excluded ones ----
  function matchesGenreFilter(genres) {
    var inc = state.genres, exc = state.genresExclude;
    var okInc = inc.size === 0 || (state.genreMode === "and"
      ? Array.from(inc).every(function (g) { return genres.indexOf(g) !== -1; })
      : genres.some(function (g) { return inc.has(g); }));
    var okExc = exc.size === 0 || !genres.some(function (g) { return exc.has(g); });
    return okInc && okExc;
  }

  // ---- Marks the matching letter button (or "All") as active ----
  function setActiveLetterBtn(letter) {
    if (!azBar) return;
    Array.prototype.slice.call(azBar.querySelectorAll(".az-btn")).forEach(function (b) {
      b.classList.toggle("active", letter ? b.dataset.letter === letter : !b.dataset.letter);
    });
    var sel = azBar.querySelector(".az-select");
    if (sel) sel.value = letter || "";
  }

  // ---- Checks the actor/director/studio filter (it comes from a link, not from a visible control) ----
  function matchesPersonFilter(card) {
    if (!state.person.value) return true;
    var wanted = state.person.value.trim();
    if (state.person.kind === "tmdb" || state.person.kind === "imdb") {
      return (card.dataset[state.person.kind] || "").trim() === wanted;
    }
    if (state.person.kind === "studio") {
      // tMM puts co-producers in a single field: "HBO / Warner Bros. / Bad Robot"
      var raw = (card.dataset.studio || "").trim();
      if (raw === wanted) return true;
      return raw.split(/\s+\/\s+/).map(function (s) { return s.trim(); }).indexOf(wanted) !== -1;
    }
    var attr = state.person.kind === "actor" ? card.dataset.actors : card.dataset.directors;
    return (attr || "").split("|").map(function (s) { return s.trim(); }).indexOf(wanted) !== -1;
  }

  // ---- Writes the current filter state to the URL (no reload, no new history entry) ----
  var syncTimer = null;
  function syncUrl() {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      var p = new URLSearchParams();
      if (state.q.trim()) p.set("q", state.q.trim());
      state.genres.forEach(function (g) { p.append("genre", g); });
      state.genresExclude.forEach(function (g) { p.append("xgenre", g); });
      if (state.genreMode === "or") p.set("gmode", "or");
      if (state.decade) p.set("decade", state.decade);
      state.langs.forEach(function (l) { p.append("audio", l); });
      if (state.langs.size && state.langMode === "and") p.set("amode", "and");
      if (state.year) p.set("year", state.year);
      if (state.quality) p.set("quality", state.quality);
      if (state.duration) p.set("duration", state.duration);
      if (state.multiVersion) p.set("versions", "1");
      if (state.collection) p.set("collection", state.collection);
      if (state.letter) p.set("letter", state.letter);
      if (state.person.value) p.set(state.person.kind, state.person.value);
      if (sortSelect && sortSelect.value && sortSelect.value !== "title-asc") p.set("sort", sortSelect.value);
      var qs = p.toString();
      try { history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "")); } catch (e) { /* ignore */ }
    }, 250);
  }

  // ---- Duration: "up to X minutes" (cumulative), "over 160" or "unknown". Without a duration it fits no range ----
  function matchesDuration(card) {
    if (!state.duration) return true;
    var rt = parseInt(card.dataset.runtime, 10);
    if (state.duration === "unknown") return !(rt > 0);
    if (!rt || rt <= 0) return false;
    if (state.duration === "160+") return rt > 160;
    return rt <= parseInt(state.duration, 10);
  }

  // ---- Does this version (card) pass every filter? ----
  function cardMatches(card, q) {
    var title = (card.dataset.title || "").toLowerCase();
    var name = (card.dataset.name || "").toLowerCase();
    var year = card.dataset.year || "";
    var genres = (card.dataset.genres || "").split("|");
    var collection = card.dataset.collection || "";

    var matchesSearch = !q || title.indexOf(q) !== -1 || name.indexOf(q) !== -1 || year.indexOf(q) !== -1 ||
      genres.some(function (g) { return g.toLowerCase().indexOf(q) !== -1; });

    return matchesSearch &&
      matchesGenreFilter(genres) &&
      (!state.decade || String(decadeOf(year)) === state.decade) &&
      (!state.year || year === state.year) &&
      (!state.collection || collection === state.collection) &&
      (!state.letter || baseLetter(card.dataset.title) === state.letter) &&
      matchesPersonFilter(card) &&
      (!state.langs.size || Array.from(state.langs)[state.langMode === "and" ? "every" : "some"](function (l) { return cardLangs(card).indexOf(l) !== -1; })) &&
      (!state.quality || cardQuality(card) === state.quality) &&
      matchesDuration(card) &&
      (!state.multiVersion || card.dataset.multi === "1");
  }

  // ---- Applies all the filters at once ----
  // A title (group of versions) is shown if ANY of its versions passes
  // the filters; the list always shows the representative card.
  function applyFilters() {
    var q = state.q.trim().toLowerCase();
    var visible = 0;

    groups.forEach(function (g) {
      var show = g.cards.some(function (card) { return cardMatches(card, q); });
      g.rep.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible;
    if (emptyState) emptyState.classList.toggle("show", visible === 0);
    syncUrl();
  }

  // ---- Sorting ----
  function applySort() {
    if (!sortSelect) return;
    var mode = sortSelect.value;
    var sorted = cards.slice().sort(function (a, b) {
      if (mode === "year-desc") return (b.dataset.year || 0) - (a.dataset.year || 0);
      if (mode === "year-asc") return (a.dataset.year || 0) - (b.dataset.year || 0);
      return (a.dataset.title || "").localeCompare(b.dataset.title || "");
    });
    sorted.forEach(function (card) { grid.appendChild(card); });
    syncUrl();
  }

  // ---- Listeners ----
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.q = searchInput.value;
      applyFilters();
    });
  }

  if (filterToggle && filtersPanel) {
    filterToggle.addEventListener("click", function () {
      filtersPanel.classList.toggle("open");
      filterToggle.classList.toggle("active");
    });
  }

  if (decadeSelect) {
    decadeSelect.addEventListener("change", function () {
      state.decade = decadeSelect.value;
      fillYearOptions(); // if the chosen year belongs to another decade, clear it
      applyFilters();
    });
  }

  if (yearSelect) {
    yearSelect.addEventListener("change", function () {
      state.year = yearSelect.value;
      // choosing a year with no decade selected also selects its decade
      if (state.year && decadeSelect && !state.decade) {
        state.decade = String(decadeOf(state.year));
        decadeSelect.value = state.decade;
        fillYearOptions();
        yearSelect.value = state.year;
      }
      applyFilters();
    });
  }

  if (durationSelect) {
    // With no durations in the export, the group is useless
    if (!cards.some(function (c) { return parseInt(c.dataset.runtime, 10) > 0; })) {
      durationSelect.closest(".filter-group").style.display = "none";
    }
    durationSelect.addEventListener("change", function () {
      state.duration = durationSelect.value;
      applyFilters();
    });
  }

  if (qualitySelect) {
    qualitySelect.addEventListener("change", function () {
      state.quality = qualitySelect.value;
      applyFilters();
    });
  }

  if (versionsToggle) {
    versionsToggle.addEventListener("click", function () {
      state.multiVersion = !state.multiVersion;
      versionsToggle.classList.toggle("active", state.multiVersion);
      applyFilters();
    });
  }

  if (collectionSelect) {
    collectionSelect.addEventListener("change", function () {
      state.collection = collectionSelect.value;
      applyFilters();
    });
  }

  if (sortSelect) sortSelect.addEventListener("change", applySort);

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      state = { q: "", genres: new Set(), genresExclude: new Set(), genreMode: "and", decade: "", year: "", quality: "", duration: "", multiVersion: false, langs: new Set(), langMode: "or", collection: "", letter: "", person: { kind: "", value: "" } };
      if (searchInput) searchInput.value = "";
      if (decadeSelect) decadeSelect.value = "";
      fillYearOptions();
      if (collectionSelect) collectionSelect.value = "";
      if (qualitySelect) qualitySelect.value = "";
      if (durationSelect) durationSelect.value = "";
      if (versionsToggle) versionsToggle.classList.remove("active");
      paintGenreChips();
      paintLangChips();
      setActiveLetterBtn(null);
      renderPersonPill();
      applyFilters();
    });
  }

  document.addEventListener("tmm:langchange", function () {
    if (!langChipsWrap) return;
    Array.prototype.slice.call(langChipsWrap.querySelectorAll(".lang-chip")).forEach(function (c) {
      c.querySelector(".lang-chip-name").textContent = TMM_LANG.name(c.dataset.lang);
    });
  });

  TMM_VERSIONS.save(kind, groups);
  buildOptions();
  applyFilters();
  applySort(); // applies the dropdown's default order (before, it only sorted when changed by hand)
})();

/* --------------------------------------------------------------------------
   Trims the leftover comma at the end of lists built with foreach
   (e.g. the Director field, which adds ", " after each name). It only touches
   the LAST text node (the trailing ", "), leaving the <a> elements inside
   alone -now that each name is a clickable link- so they are not destroyed.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";
  Array.prototype.slice.call(document.querySelectorAll(".trim-trail")).forEach(function (el) {
    var last = el.lastChild;
    if (last && last.nodeType === Node.TEXT_NODE) {
      last.textContent = last.textContent.replace(/,\s*$/, "");
    }
  });
})();

/* --------------------------------------------------------------------------
   Studios: tMM gives them as a single text separated by " / " (co-productions).
   Here it is split into one link per studio, each one filtering the list
   by its name (?studio=...), so Westworld shows up under HBO, Bad Robot...
   -------------------------------------------------------------------------- */
(function () {
  "use strict";
  Array.prototype.slice.call(document.querySelectorAll(".studio-list")).forEach(function (el) {
    var base = el.getAttribute("data-base");
    var names = (el.textContent || "").split(/\s+\/\s+/).map(function (n) { return n.trim(); }).filter(Boolean);
    if (!base || names.length === 0) return;
    el.textContent = "";
    names.forEach(function (name, i) {
      if (i > 0) el.appendChild(document.createTextNode(" / "));
      var a = document.createElement("a");
      a.className = "person-link";
      a.href = base + "?studio=" + encodeURIComponent(name);
      a.textContent = name;
      el.appendChild(a);
    });
  });
})();

/* --------------------------------------------------------------------------
   "Back" button on detail pages: goes back to where you actually came from (the list with
   its filters, a collection, another title's page...). If the page was
   opened on its own in a new tab (no history), it falls back to the
   normal link to the list.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";
  Array.prototype.slice.call(document.querySelectorAll(".back-btn")).forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
  });
})();

/* --------------------------------------------------------------------------
   Movie detail page: fills in Video / Audio / Size and the resolution pill from
   the video file data (.media-data). If there is none
   (e.g. a movie without file information), these rows are hidden.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var holder = document.querySelector(".media-data");
  if (!holder) return;

  function dropRow(key) {
    var label = document.querySelector("[data-i18n='" + key + "']");
    var tr = label && label.closest("tr");
    if (tr) tr.parentNode.removeChild(tr);
  }

  var videos = TMM_MEDIA.videos(holder.getAttribute("data-media"));
  if (!videos.length) {
    dropRow("videoLabel"); dropRow("audioLabel"); dropRow("languagesLabel"); dropRow("sizeLabel");
    return;
  }

  var CH = { "1": "1.0", "2": "2.0", "3": "2.1", "4": "4.0", "5": "5.0", "6": "5.1", "7": "6.1", "8": "7.1" };
  var videoSlot = document.querySelector(".video-slot");
  var audioSlot = document.querySelector(".audio-slot");
  var sizeSlot = document.querySelector(".size-slot");

  if (videoSlot) {
    videoSlot.textContent = videos.map(function (v) {
      var bits = [v.res || v.dims];
      if (v.codec) bits.push(v.codec);
      if (v.hdr) bits.push(v.hdr);
      return bits.join(" · ");
    }).join(" + ");
    videoSlot.title = videos.map(function (v) { return v.dims; }).join(" + ");
  }

  var seen = {};
  var audio = [];
  videos.forEach(function (v) {
    v.audio.forEach(function (a) {
      var c = a.ch;
      var l = CH[c] || (c + "ch");
      if (!seen[l]) { seen[l] = true; audio.push(l); }
    });
  });
  if (audioSlot) {
    if (audio.length) audioSlot.textContent = audio.join(" · ");
    else dropRow("audioLabel");
  }

  var langSlot = document.querySelector(".lang-slot");
  if (langSlot) {
    var codes = TMM_LANG.forEntry(videos, location.pathname);
    if (codes.length) langSlot.appendChild(TMM_LANG.render(codes));
    else dropRow("languagesLabel");
  }

  var total = videos.reduce(function (sum, v) { return sum + v.bytes; }, 0);
  if (sizeSlot) {
    if (total) {
      var gb = total / (1024 * 1024 * 1024);
      sizeSlot.textContent = gb >= 1 ? gb.toFixed(2) + " GB" : Math.round(total / (1024 * 1024)) + " MB";
    } else dropRow("sizeLabel");
  }

  var row = document.querySelector(".badge-row");
  var res = TMM_MEDIA.firstRes(holder.getAttribute("data-media"));
  if (row && res) {
    var pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = res;
    row.appendChild(pill);
  }
})();

/* --------------------------------------------------------------------------
   Detail page: list of versions of the same title (#versionsBox). If the title has
   a single version, or the others are unknown, the box stays hidden.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var box = document.getElementById("versionsBox");
  if (!box || !box.dataset.vid) return;

  var kind = box.dataset.kind;
  var vid = box.dataset.vid;
  var listUrl = new URL(box.dataset.list, location.href).href;

  function norm(u) {
    try { return decodeURIComponent(new URL(u, location.href).pathname).toLowerCase(); }
    catch (e) { return String(u); }
  }
  var here = norm(location.href);
  var entries = [];

  function sizeText(bytes) {
    if (!bytes) return "";
    var gb = bytes / (1024 * 1024 * 1024);
    return gb >= 1 ? gb.toFixed(2) + " GB" : Math.round(bytes / (1024 * 1024)) + " MB";
  }

  function pill(text, cls) {
    var s = document.createElement("span");
    s.className = "pill" + (cls ? " " + cls : "");
    s.textContent = text;
    return s;
  }

  function render() {
    box.textContent = "";
    // quick link to the box, next to the resolution/duration in the header
    var row = document.querySelector(".badge-row");
    var oldJump = row && row.querySelector(".versions-jump");
    if (oldJump) oldJump.parentNode.removeChild(oldJump);
    if (entries.length < 2) { box.hidden = true; return; }
    if (row) {
      var jump = document.createElement("a");
      jump.className = "pill versions-jump";
      jump.href = "#versionsBox";
      jump.textContent = TMM_I18N.t("versionsLabel") + " ×" + entries.length;
      row.appendChild(jump);
    }

    var h = document.createElement("h2");
    h.className = "section-title";
    var hl = document.createElement("span");
    hl.setAttribute("data-i18n", "versionsLabel");
    hl.textContent = TMM_I18N.t("versionsLabel");
    h.appendChild(hl);
    h.appendChild(document.createTextNode(" (" + entries.length + ")"));
    box.appendChild(h);

    var ul = document.createElement("ul");
    ul.className = "version-list";
    entries.forEach(function (e) {
      var isHere = norm(new URL(e.href, listUrl).href) === here;
      var li = document.createElement("li");
      li.className = "version-item" + (isHere ? " current" : "");

      var main = document.createElement("div");
      main.className = "version-main";
      var name = e.title + (e.year ? " (" + e.year + ")" : "");
      if (isHere) {
        var strong = document.createElement("strong");
        strong.textContent = name;
        main.appendChild(strong);
      } else {
        var a = document.createElement("a");
        a.href = new URL(e.href, listUrl).href;
        a.textContent = name;
        main.appendChild(a);
      }
      if (e.edition) main.appendChild(pill(e.edition));
      if (isHere) {
        var cur = pill("", "pill-current");
        cur.setAttribute("data-i18n", "versionCurrent");
        cur.textContent = TMM_I18N.t("versionCurrent");
        main.appendChild(cur);
      }
      li.appendChild(main);

      var meta = document.createElement("div");
      meta.className = "version-meta";
      if (kind === "tvshows") {
        var bits = [];
        if (e.seasons) bits.push(e.seasons + " " + TMM_I18N.t("seasonsWord"));
        if (e.episodes) bits.push(e.episodes + " " + TMM_I18N.t("episodesWord"));
        if (bits.length) meta.appendChild(document.createTextNode(bits.join(" · ")));
      } else {
        var vids = TMM_MEDIA.videos(e.media);
        var res = TMM_MEDIA.firstRes(e.media);
        var bytes = vids.reduce(function (s, v) { return s + v.bytes; }, 0);
        var line = [];
        if (res) line.push(res);
        if (vids[0] && vids[0].codec) line.push(vids[0].codec);
        if (vids[0] && vids[0].hdr) line.push(vids[0].hdr);
        if (bytes) line.push(sizeText(bytes));
        if (line.length) {
          var t = document.createElement("span");
          t.textContent = line.join(" · ");
          meta.appendChild(t);
        }
        var codes = TMM_LANG.forEntry(vids, e.href);
        if (codes.length) meta.appendChild(TMM_LANG.render(codes, 6));
      }
      li.appendChild(meta);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    if (entries.some(function (e) { return e.shared > 1; })) {
      var w = document.createElement("p");
      w.className = "versions-warn";
      w.setAttribute("data-i18n", "sharedPageWarning");
      w.textContent = "⚠ " + TMM_I18N.t("sharedPageWarning");
      box.appendChild(w);
    }
    box.hidden = false;
  }

  // episodes on THIS page (to know which of two entries with the same name is its own)
  var ownEpisodes = document.querySelectorAll(".episode").length;
  function mine(e) { return kind === "tvshows" && ownEpisodes > 0 && parseInt(e.episodes, 10) === ownEpisodes; }

  TMM_VERSIONS.lookup(kind, vid, listUrl, function (list) { entries = TMM_VERSIONS.dedupe(list, mine); render(); });
  document.addEventListener("tmm:langchange", function () { if (entries.length > 1) render(); });
})();

/* --------------------------------------------------------------------------
   Sorts the movies inside ONE collection by year (collection
   detail page). Independent of the list block above (that one looks for
   #grid, and here we use #moviesGrid on purpose so they don't clash
   -this grid has no dropdown, it is always in chronological order-).
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var moviesGrid = document.getElementById("moviesGrid");
  if (!moviesGrid) return;

  var cards = Array.prototype.slice.call(moviesGrid.querySelectorAll(".card"));
  var sorted = cards.slice().sort(function (a, b) {
    var ya = parseInt(a.dataset.year, 10);
    var yb = parseInt(b.dataset.year, 10);
    if (isNaN(ya) && isNaN(yb)) return (a.dataset.title || "").localeCompare(b.dataset.title || "");
    if (isNaN(ya)) return 1;
    if (isNaN(yb)) return -1;
    if (ya !== yb) return ya - yb;
    return (a.dataset.title || "").localeCompare(b.dataset.title || "");
  });
  sorted.forEach(function (card) { moviesGrid.appendChild(card); });

  // A single card per movie (the versions are shown on its detail page),
  // with the resolution badge and the language flags
  TMM_VERSIONS.group(cards).forEach(function (g) { TMM_VERSIONS.decorate(g, true); });
})();

/* ==========================================================================
   Episodes grouped by season (TV show detail page)
   The .jmte puts all the episodes flat inside #episodesFlat, with
   data-season on each one; here they are regrouped into collapsible blocks per
   season. Doing it in JS avoids depending on whether JMTE can group lists.
   Labels are re-rendered when the language changes (tmm:langchange event).
   ========================================================================== */
(function () {
  "use strict";

  var flat = document.getElementById("episodesFlat");
  var seasonsWrap = document.getElementById("seasons");
  if (!flat || !seasonsWrap) return;

  var episodes = Array.prototype.slice.call(flat.querySelectorAll(".episode"));
  var bySeason = {};
  var order = [];

  episodes.forEach(function (ep) {
    var s = ep.dataset.season || "0";
    if (!bySeason[s]) { bySeason[s] = []; order.push(s); }
    bySeason[s].push(ep);
  });

  order.sort(function (a, b) { return Number(a) - Number(b); });

  var titleEls = [];

  function labelFor(s) {
    return s === "0" ? TMM_I18N.t("specialsLabel") : TMM_I18N.t("seasonLabel") + " " + s;
  }

  order.forEach(function (s) {
    var block = document.createElement("div");
    block.className = "season-block collapsed";

    var title = document.createElement("div");
    title.className = "season-title";
    title.dataset.season = s;
    title.dataset.count = String(bySeason[s].length);
    title.innerHTML = '<span class="arrow">▾</span> <span class="season-label"></span>' +
      ' <span class="season-count" style="color:var(--text-faint);font-weight:400;"></span>';
    titleEls.push(title);

    var list = document.createElement("div");
    list.className = "episode-list";
    bySeason[s].forEach(function (ep) { list.appendChild(ep); });

    block.appendChild(title);
    block.appendChild(list);
    seasonsWrap.appendChild(block);

    title.addEventListener("click", function () { block.classList.toggle("collapsed"); });
  });

  function renderLabels() {
    titleEls.forEach(function (title) {
      var s = title.dataset.season;
      var count = title.dataset.count;
      title.querySelector(".season-label").textContent = labelFor(s);
      title.querySelector(".season-count").textContent = "(" + count + " " + TMM_I18N.t("episodesWord") + ")";
    });
  }

  renderLabels();
  document.addEventListener("tmm:langchange", renderLabels);

  flat.remove();
})();
