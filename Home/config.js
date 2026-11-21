/* ==========================================================================
   config.js - shared Modern Grid configuration

   This file goes in the ROOT of your site, next to index.html, i.e. in the
   parent folder of the three export folders. It is loaded by the landing page
   (index.html), the statistics page (stats.html) and every list and detail page.

   routes: name of the folder (relative to the root) where you exported each kind.
     - If you rename a folder, change it here; no need to re-export anything.
     - A value of null or "" means "I don't have this": its button on the landing
       page and every link pointing to it from the other exports are hidden.
     - home / stats: "Home" and "Statistics" links in the header of every list and detail page.
       They are files, not folders, and must be switched on: true (index.html / stats.html at the
       root) or a file name. Missing, false or "" = no link, so nothing ever points at a missing page.
     - Without this file (or without "routes"), each export stands alone: the templates
       show no links to the others, so a single template works by itself, even from disk.
       Add this file only if you want the three exports linked together.
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
     es, en, ca, fr, de, it, pt, eu, gl, ja, ko, zh, ru, nl, pl, sv, tr) and mark (up to 3 letters
     drawn over the flag). Codes must be 2-3 letters to be recognised in a file name.
     Regions are read but dropped, like tMM does: "pt-BR" counts as pt and "es-MX" / "es-419" as es.
     To keep a variant apart, declare it: "pt-BR": {} (Portuguese flag, mark "BR", automatic name) or
     give it your own flag / mark / name. To merge one of YOUR codes into another: { br: { alias: "pt-BR" } }.
     "zxx" (no linguistic content, silent films) is built in. Note "la" is Latin in ISO: if you use LA for
     Latin American Spanish, declare it as in the example above.

   badges: what is drawn over each poster in the lists (and over the movies of a collection page).
     true = shown, false = hidden; a missing key keeps its default. Hiding a badge does not remove
     its filter: you can hide the quality badge and still filter by quality. No re-export needed.
       quality        resolution (2160p, 1080p...)                         default true
       seasons        number of seasons (TV shows)                          default true
       languages      audio-language flags                                  default true
       versions       "×N" when a title has several versions                default true
       sharedWarning  "⚠" when two tMM entries share one export page        default true
       hover          genres shown when the pointer is over the poster      default true
       watched        "✓" for watched titles, "7/24" for TV shows in progress default false
                      Also shows the watched marks on detail pages (title and episodes) and adds a
                      "Watched" filter, but only if at least one title in the export is watched.
                      Off by default: the flag is only useful if you keep it up to date in tMM (or sync
                      it from Kodi / Trakt), and on a public site every visitor would see it.
                      Needs a re-export with 0.30.0 or later (older exports carry no watched data).

   footer: the line at the bottom of every page.
       "credit"  "Generated with tinyMediaManager · Modern Grid template by Johnnydement", each name
                 a link (tMM website, this project on GitHub, the author)                    (default)
       "plain"   the same without the author
       "none"    no footer at all
     No re-export needed. Keeping the credit is appreciated, never required (MIT licence).

   If this file is missing, the exports are standalone and the landing page uses the default folder names below.
   ========================================================================== */
window.TMM_CONFIG = {
  routes: {
    movies: "movies",            // movies        (contains movielist.html and movies/)
    tvshows: "tvshows",          // TV shows      (contains tvshows.html)
    collections: "collections",  // collections   (contains moviesets.html)
    home: true,                  // "Home" link on every page (index.html at the root); false/"" = hide
    stats: true                  // "Statistics" link on every page (stats.html at the root); false/"" = hide
  },
  // Collection links use tMM's own folder name (${movieSet;filename}, tMM 5.3.5 or later).
  // With older tMM versions the colon of "Alien: Romulus" is replaced by this script (-> "Alien - Romulus"), as tMM 5.3.4
  // does in the folder name; set "keep" if your collection folders keep the colon.
  colonInCollectionFolders: "replace",  // "replace" | "keep"
  languageSource: "tracks",      // "tracks" | "filename"
  languageCodes: {},             // see above
  badges: {                      // see above; these are the defaults
    quality: true,
    seasons: true,
    languages: true,
    versions: true,
    sharedWarning: true,
    hover: true,
    watched: false
  },
  footer: "credit"               // "credit" | "plain" | "none"
};
