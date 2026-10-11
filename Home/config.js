/* ==========================================================================
   config.js - shared Modern Grid configuration

   This file goes in the ROOT of your site, next to index.html, i.e. in the
   parent folder of the three export folders. It is loaded by the landing page
   (index.html), the statistics page (stats.html) and every list and detail page.

   routes: name of the folder (relative to the root) where you exported each kind.
     - If you rename a folder, change it here; no need to re-export anything.
     - A value of null or "" means "I don't have this": its button on the landing
       page and every link pointing to it from the other exports are hidden.
   languageSource: where the audio languages come from (flags on the posters, the
     "Audio language" filter, the statistics page).
       "tracks"   (default) the language tag of each audio stream in the media file.
       "filename" the language codes written in the export's file name, inside a
                  bracket group that contains only codes, e.g.
                  "Example Film (2001) [Remastered] [CA,ES,EN,JA] [1080p].html". Handy if you
                  curate the "spoken languages" in tMM and rename with ${language}.
                  Accepted separators: , . / + & or space; "[es, en]" and "[ES.EN]" work too.
                  Groups with anything else ([Remastered], [1080p], [h265]...) are ignored.

   languageCodes: your OWN language codes (or a different name / flag for an existing one).
     They take priority over the standard, which is ISO 639-1 (two letters: es, ca, en, ja, zh...);
     the usual three-letter ISO 639-2 codes (spa, eng, cat, jpn, zho...) are also understood.
     Each code has: name (a string, or {ca, es, en}), flag (a language that already has a flag:
     es, en, ca, fr, de, it, pt, ja, ko, zh, ru, nl, pl, sv, tr) and mark (up to 3 letters
     drawn over the flag). Codes must be 2-3 letters to be recognised in a file name.
     Regions are read but dropped, like tMM does: "pt-BR" counts as pt and "es-MX" / "es-419" as es.
     To keep a variant apart, declare it: "pt-BR": {} (Portuguese flag, mark "BR", automatic name) or
     give it your own flag / mark / name. To merge one of YOUR codes into another: { br: { alias: "pt-BR" } }.
     "zxx" (no linguistic content, silent films) is built in. Note "la" is Latin in ISO: if you use LA for
     Latin American Spanish, declare it as in the example above.

   If this file is missing, the defaults below are used.
   ========================================================================== */
window.TMM_CONFIG = {
  routes: {
    movies: "movies",            // movies        (contains movielist.html and movies/)
    tvshows: "tvshows",          // TV shows      (contains tvshows.html)
    collections: "collections"   // collections   (contains moviesets.html)
  },
  languageSource: "tracks",      // "tracks" | "filename"
  languageCodes: {}              // see above
};
