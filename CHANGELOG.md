# Changelog

All notable changes to the **Modern Grid** tinyMediaManager (tMM) export templates
(`ModernMovies`, `ModernTVShows`, `ModernCollections`) and the root landing page (`Home`).

Format loosely follows [Keep a Changelog](https://keepachangelog.com/). The project is
developed in iterative rounds against real exports and real `tmm.log` files, so versions
are numbered per round (`0.N.0`) rather than dated. Entries are newest first.

Legend: **Verified** = confirmed against a real export/log of my own library.
Every release listed here has been tested by me on real exports of my own library, not only on tidy demo data
(my library is anything but tidy, which is the point).

---

## [0.24.1] — Standalone templates by default

### Fixed
- **Each template is now standalone by default.** Without `config.js` (or without its `routes`) the templates show no
  links to the other exports: the header buttons and the "collection" chip are hidden, and posters/titles in a
  collection page stay as plain content instead of pointing at a missing export. Before, a lone *Movies* export
  showed dead "Series" and "Collections" buttons. To link the exports, put `config.js` (from the Home zip) at the
  site root; with a `config.js` that has `routes`, nothing changes.

### Changed
- README: it now says up front that every template works on its own and that the landing page is an optional extra;
  the `config.js` section explains when the exports are linked.

---

## [0.24.0] — First public release

The first version I'm showing to the outside world. Be gentle.

### Changed
- Default export folder names are now `movies` / `tvshows` / `collections` (they were
  my own `pelis` / `tv` / `sagas`). This affects the fallback links in the list/detail
  templates, the Home page and `TMM_ROUTES` in `app.js`. **Upgrading from an earlier version:** set the
  folder names you actually use in `config.js` (`routes`) at the site root; nothing else changes.
- The interface now opens in **English** by default (it was Spanish): `getLang` in `app.js`, the Home
  and statistics pages and the `<html lang>` of every template. A language already chosen with the CA / ES / EN
  switch is remembered as before.
- `template.conf` descriptions are in English and no longer carry a personal URL.
- `config.js` and the route-config comment in `app.js` are in English. The rest of the source
  comments are still in Catalan.

### Added
- New `languageSource` option in `config.js`: `"tracks"` (default, the language tag of each audio
  stream) or `"filename"` (language codes written in the export's file name, e.g.
  `Example Film (2001) [Remastered] [CA,ES,EN,JA] [1080p] …html`). It drives the poster flags, the detail
  page, the versions box, the **Audio language** filter and the statistics chart. A bracket group is
  used only if every token in it is a language code, so `[Remastered]`, `[1080p]` or `[DC]` are
  ignored. No re-export needed: the file name is already in the links.
- New `languageCodes` option in `config.js` to declare your own language codes (name per interface
  language, flag borrowed from a built-in one, a short mark drawn over it), e.g. `la` as Latin American
  Spanish. Custom codes win over the ISO meaning and are their own language in the filter and statistics.
  The README explains how to add a variant that reuses a flag (`pb` = Brazilian Portuguese with the
  Portuguese flag and a "BR" mark) and how to draw a brand-new flag.
- Language codes with a **region or script** (`pt-BR`, `es-419`, `zh-Hant`; `-` or `_`, any case) are accepted in
  file names (they no longer break the bracket group) and in audio tags, and are read like tMM does: the region is
  dropped (`pt-BR` = `pt`, `es-MX` / `es-419` = `es`) and `ES` / `es` / `es-ES` merge. A variant can be kept apart by
  declaring it in `languageCodes` (`"pt-BR": {}` is enough: Portuguese flag, mark "BR", automatic name); `alias` merges
  one of your own codes into another. `zxx` (silent films) is built in, with its own badge and name.
  The ISO 639-2 (three-letter) alias table was extended to about 60 languages, so tags such as `eus`,
  `glg`, `ces` or `ukr` now group with their two-letter forms.
- README (English), MIT licence, release scripts and a GitHub Actions workflow that builds one zip
  per template, one for the landing page and one with everything.

---

## [0.23.0] — Unknown runtime option, duration filter on TV shows

### Added
- Duration select gets a last option **"No runtime (unknown)"** (`?duration=unknown`) listing titles
  without a runtime; key `durUnknown`.
- **TV shows** get the same filter as "Episode runtime" (key `durationEpisode`), fed by a new
  `data-runtime="${if show.runtime}${show.runtime}${end}"` on each card (tMM's scraped per-episode
  runtime, guarded with `${if}`). Verified on a real TV export (`show.runtime` is exposed, the export does not abort).

---

## [0.22.0] — Duration filter

### Added
- **Duration** filter on the movie list: cumulative "up to N minutes" select (40, 70, 90, 100, 110,
  120, 130, 160) plus "over 160", with friendly labels ("~1 hour", "~half an hour"…) in ca/es/en.
  Finer steps between 90 and 130 min where most films sit. Group-aware (any version of a title may
  satisfy it); titles without a runtime never match while the filter is active; the group is hidden
  when the export carries no runtimes. A tooltip reminds that tMM runtimes include end credits.
  In the URL as `?duration=100` / `?duration=160+`; reset by "Clear filters". New i18n keys
  `duration`, `durationAll`, `dur40`…`dur160`, `durMore`, `durationHint`. Movies only. Movie list
  template needs re-exporting.

---

## [0.21.1] — AND/OR switch on the audio-language filter

### Changed
- The audio-language filter now has the same **AND / OR** switch as the genre filter. The default is
  **OR** (a title needs at least one of the selected languages); **AND** (all selected languages)
  is one click away. Still group-aware: one version of a title must satisfy the condition. The mode
  is stored in the URL only when it is not the default (`&amode=and`) and reset by "Clear filters".
  New i18n keys `langModeAndTitle` / `langModeOrTitle` (ca/es/en); the I/O buttons reuse
  `genreModeAnd` / `genreModeOr` and the `.genre-mode` styles. Movie list template needs
  re-exporting.

---

## [0.21.0] — Audio-language filter

### Added
- **Audio language** filter on the movie list: one chip per language found in the audio tracks
  (flag, localised name, number of titles), ordered ca, es, en and then by frequency. Several chips
  can be on at once and a title must have **all** of them (e.g. Catalan + English). Like the other
  filters it is group-aware: a title matches if one of its versions has every selected language.
  In the URL as repeated `?audio=ca&audio=en`; cleared by "Clear filters". Hidden if the export
  has no language data. New i18n key `audioLanguage`; `TMM_LANG` now also exposes `bullet`, `name`
  and `PRIORITY`.

---

## [0.20.0] — Decade filter, then year within the decade

### Changed
- The single **Year** dropdown of the movie and TV lists is now a **Decade / Year** pair
  (`#decadeSelect` + `#yearSelect`). Decades are listed newest first with the number of titles
  (`1990–1999 (10)`); once a decade is chosen the year list only offers that decade's years.
  Picking a year with no decade selected also sets its decade; changing the decade clears a year that
  no longer fits. Both filters are in the URL (`?decade=1990&year=1998`); old `?year=1988` links still
  work and fill in the decade. Counts are per title (versions of one ID count once).
- New i18n key `decadeYear` (ca/es/en) and `.select-pair` style. Templates without `#decadeSelect`
  keep working with the plain year list.

---

## [0.19.0] — Statistics page

### Added
- **`Home/stats.html`** (copied next to `index.html`) and a "Statistics" card on the Home page. It reads
  the list pages like the global search (so it needs http(s); over `file://` it explains why), honours
  `config.js` routes and the CA/ES/EN switch, and shows: stat tiles (movies, shows with seasons/episodes,
  collections, hours of film, total video size, titles with several versions), movie quality
  (best version of each title), audio languages, titles by release decade (movies + shows stacked) and the
  12 most frequent genres (movies vs shows).
- Charts follow the dataviz rules: validated two-colour categorical pair (blue / orange) on the dark
  surface, thin marks with 4px rounded data ends and 2px gaps, legend only when there are two series,
  per-mark hover/focus tooltips, and a **Table** toggle on every chart as the non-visual alternative.
- Movie list cards carry a new `data-runtime` attribute (`movie.runtime`), used for the hours tile.
  The movie list must be re-exported for that tile to be accurate.

### Notes
- Counts are per **title** (versions of the same ID count once); the size tile adds up every version's
  video file; the quality chart uses the best resolution among a title's versions.

---

## [0.18.0] — Shared route config and global search

### Added
- **`config.js`** at the site root (new file in `Home/`, to be copied next to `index.html`). One
  `window.TMM_CONFIG.routes` object names the folder of each export (`movies`, `tvshows`,
  `collections`; defaults were `pelis` / `tv` / `sagas` until 0.24.0). It is read by the Home page and by every list and
  detail page of the three exports (loaded with a plain `<script>`, so it also works over `file://`).
  A route set to `null` or `""` hides its Home card and every link pointing to it. Without the file,
  the defaults apply, so existing exports keep working.
- Cross-export links (list cross-links, movie → collection chip, collection → movie links) now carry
  `data-route` / `data-root` / `data-rest`; `TMM_ROUTES` in `app.js` recomputes their `href`.
- **Global search on Home**: one box that reads the three list pages and shows matches grouped by type
  (posters, up to 12 each, "See all (N)" → list page with `?q=`). Versions of one title count once and
  alternative titles (e.g. "Dragon Ball Z" / "Bola de Drac Z") are searchable. Needs the site to be served
  over http(s); over `file://` it explains that and offers per-list searches.

### Changed
- Home counters are keyed by route instead of by hard-coded path, and are computed through the same index.

---

## [0.17.2] — Same-folder entries: warning and correct match

### Changed
- When several tMM entries share one export page (same title/folder name + year, e.g. two
  "Dragon Ball Z (1989)"), the versions box now keeps the entry that matches the page being viewed
  (by episode count for shows) instead of just the last one, and shows a **warning** explaining that
  the export can only keep one page and one poster per name. The list card gets a ⚠ badge.
- If those entries are the card representative, the one that is really on disk (the last) is used.

### Notes
- This is a tMM naming limit, not something a template can work around: the detail path and the
  artwork file names come from tMM, and two entries with identical names overwrite each other.
  Fix on the tMM side (different title, year or folder name).

---

## [0.17.1] — Flag order, same-folder entries

### Fixed
- Language flags are now ordered **ca, es, en** first, then the remaining languages in audio-track
  order (previously only track order, so a file with ja/es/ca/en showed ja first).
- Two entries with the same title **and** year (e.g. two "Dragon Ball Z (1989)") share one export
  folder, so tMM keeps only one detail page; the versions box listed both and marked both as
  "This version". Entries pointing to the same page are now collapsed into one (the last one, which
  is the one tMM writes last), and `×N` / the "several versions" filter count distinct pages only.

---

## [0.17.0] — One card per title, versions on the detail page

### Changed
- The movie and TV lists now show **one card per title**. Entries sharing the same scraper ID
  (`data-vid`: movies tmdb → imdb; TV shows tmdb → tvdb → imdb) are grouped, so one title ×3 or
  "Bola de Dragón" / "Dragon Ball" no longer repeat in the grid. The representative card is the
  version without an edition (else the first); it keeps the non-clickable `×N` badge, shows the
  resolutions of all versions (`2160p · 1080p`) and the language flags of all of them.
- Filters and search are group-aware: a title is shown if **any** of its versions matches
  (quality, genre, year, person, letter, search incl. the alternative titles). The result counter
  counts titles. "Only with several versions" now also exists on the TV list.
- Collection pages show a movie with several versions once.
- Home counts distinct titles instead of cards.

### Added
- **Versions box** on movie and TV show pages (`#versionsBox`): every version with title, year,
  edition and, for movies, resolution · codec · HDR · size and flags (for shows: seasons and
  episodes). The current version is marked, the others link to their page. A "Versions ×N" pill
  in the header jumps to the box. Hidden when the title has a single version.
- `TMM_VERSIONS` helper in `app.js`. The list page stores the multi-version groups in
  `localStorage` (`tmm_versions_movies` / `tmm_versions_tvshows`) because tMM hands a detail page
  only its own entity; when served over http(s) the detail page also re-reads the list page.
  Over `file://` the list must have been opened once in that browser.
- New data attributes on cards: `data-kind`, `data-name`, `data-edition`, and for shows
  `data-vid`, `data-seasons`, `data-episodes` (`tvShow.episodeCount` is used by other tMM templates).
- i18n key `versionCurrent` (ca/es/en).

### Removed
- Clicking `×N` no longer filters the list by the title's ID (no longer needed).

---

## [0.16.0] — Audio-language flags

### Added
- Round flag bullets for the audio languages of the movie's video file: up to 3 on the top-right
  of each poster in the list (a 4th "+" bullet when there are more, tooltip lists the rest), all
  of them in a new **Languages** row of the movie page, and on movies inside collection pages.
  Hover shows the language name, localised to the UI language (`Intl.DisplayNames`).
- Flags are inline SVG (Windows does not render flag emoji): es, ca, en, fr, de, it, pt, ja, ko,
  zh, ru, nl, pl, sv, tr; other languages fall back to a code bullet.
- Language codes are normalised (`es`, `spa`, `JP` → `es`, `es`, `ja`) and de-duplicated in track
  order.

### Changed
- The ×N versions badge moved to the top-left of the poster.

### Verified
- Reads `language` from each audio stream (`a.language`): confirmed on real exports, flags appear.

## [0.15.1] — Quality detection fixes from a real export

### Fixed
- **2160p (and most 1080p) never detected.** `exactVideoFormat` is only populated for unusual
  heights (e.g. 1072p, 1076p). Resolution is now derived from the real `videoWidth` /
  `videoHeight` of the video file (3840×1600 → 2160p, 1920×1072 → 1080p), so the Quality
  filter offers 2160p / 1080p / 720p / SD.
- Video files are separated from posters/NFO by `type` in the browser (the template exports
  all media files as plain text), instead of relying on JMTE comparison semantics. Movie page
  Video / Audio / Size rows now appear for every movie with file info.
- Quality badge also shown on movies inside a collection page.
- Removed the always-visible "Versions" link from the movie page (a detail page cannot know
  whether other versions exist). The ×N badge on list cards is now clickable and filters the
  list to all versions of that title.
- "Only with several versions" filter is always visible (with a count, disabled at 0) instead
  of being hidden when no duplicates exist.

### Verified
- `movie.ids.tmdb` map-key access works in JMTE (real export, no errors).

*Subsequent real exports confirmed these fixes.*

## [0.15.0] — Real Back button, video quality, versions

### Changed
- The Back arrow on detail pages now calls `history.back()` (falling back to the list link
  when the page was opened with no history), so it returns to wherever the user came from —
  filtered list, collection page, another title — instead of always the main list. Applies to
  all three templates.

### Added
- **Video quality from tMM's own fields** (`mediaFiles[].exactVideoFormat / videoCodec /
  hdrFormat / filesize`, `audioStreams[].audioChannels`), confirmed in the field dumps of the
  my `tmm.log`; no file-name parsing, so it works with any renamer pattern. Resolution
  badge on cards, a **Quality** filter, and Video / Audio / Size rows on the movie page.
- **Versions**: titles sharing a TMDB id (IMDb id as fallback) are treated as versions of the
  same movie. Cards show a **×N** badge, a "Only with several versions" filter, the `edition`
  field next to the year, and the movie page links to `?tmdb=<id>` (list filtered to all
  versions, with a dismissible pill).

### Known limitations
- No audio codec (DTS, AC3…): the field dump only exposes channels, bit depth and bitrate.

*Validated on real exports.*

## [0.14.0] — Filters persist in the URL

### Added
- All list-page filter state (search, included / excluded genres, AND/OR mode, year,
  collection, A–Z letter, sort, person filters) is mirrored into the query string with
  `history.replaceState` (debounced, no extra history entries) and restored on load. Using
  the browser's Back button from a detail page now returns to the list exactly as it was, and
  a search can be bookmarked or shared. Works over `file://`. Legacy `?genre=` links keep
  working. The filters panel opens automatically when the URL carries filters.

*Validated on real exports (including Back navigation over `file://`).*

## [0.13.0] — Genre filter: AND / OR and excluded genres

### Changed
- Genre chips are now three-state, cycled by clicking: *off → included → excluded → off*.
  Excluded genres are shown red and struck through.
- Added an **AND / OR** toggle next to the genre label. AND = the title must have *all*
  included genres; OR = *any* of them. **Default is AND** (previously the behaviour was
  equivalent to OR).
- Excluded genres always apply on top (e.g. Romance included + Drama excluded). Excluding
  without including anything is allowed.
- "Clear filters" resets genres and puts the toggle back to AND. `?genre=` links from
  detail pages still work and count as "included".


## [0.12.0] — Co-production studios

### Fixed
- tMM returns studios as one string separated by `" / "`
  (e.g. `HBO / Warner Bros. Television / Bad Robot`). The detail page treated it as one
  studio, so a link only matched titles with the *exact same* combination. The string is
  now split and each studio gets its own link; the list-page `?studio=` filter matches if
  the studio is **any** of a title's co-producers.
- Studio names are now URL-encoded, so names containing `&` or `#` no longer break links.

### Known limitation
- Splitting is done only on `" / "` (with spaces). A legitimate studio name containing that
  separator would be split.


## [0.11.0] — Link depth fixes, default sort, chronological collections

### Fixed
- **Collection detail → movie links** pointed to `cole/sagas/pelis/movies/…` instead of
  `cole/pelis/movies/…`. A collection page lives two levels below the export root
  (`sagas/<Collection>/movieset.html`), so it needs `../../`. *Verified against my own URLs.*
- **Movie detail → collection button** pointed to `cole/pelis/sagas/…` instead of
  `cole/sagas/…` (same off-by-one depth error in the opposite direction). Now `../../sagas/…`.
  All other relative links in the three detail templates were audited and were already correct.
- **List order looked random on page load.** The sort dropdown showed "Title (A–Z)" but the
  sort function only ran when the dropdown *changed*, so the grid appeared in raw tMM order.
  It now also runs once on load.

### Added
- Movies inside a collection page are always shown in **chronological order** (year
  ascending, ties broken by title). That grid now uses `#moviesGrid` instead of `#grid` so the
  list-page filter logic and this sort do not interfere.

## [0.10.0] — Root landing page

### Added
- `Home/index.html`: a standalone static hub (not a tMM template) to be dropped at the root
  of the export tree (`cole/index.html`, next to `pelis/`, `tv/`, `sagas/`). Three cards
  (Movies / TV Shows / Collections), CA/ES/EN switcher sharing the `tmm_lang` key with the
  templates, and live item counts obtained by `fetch()`-ing each list page and counting
  `.card` elements. Counts need an HTTP server; over `file://` they silently stay hidden and
  the links still work.

## [0.9.0] — Full-catalogue Collections export, hero poster, people links

### Fixed
- **Collections export aborted after 18 of 441 collections.** Root cause (from the real
  `tmm.log`): `Illegal char <:> at index 5: Alien: Romulus Collection`. For `movie_set`
  exports tMM uses the raw, unsanitised collection title as the output folder name and
  aborts the *entire* export when it contains `:` or `/`. This is an **upstream tMM bug that
  cannot be worked around from a template**. Workaround: rename the 15 affected collections
  in tMM before exporting. The tMM developer has since
  confirmed a fix for the next release. *Verified against the real log and export.*
- **Overlapping poster on collection detail pages.** `.hero-poster` lacked
  `position: relative` and a size, so the absolutely-positioned `.poster-stack` stretched
  over the whole hero. Added `position: relative; aspect-ratio: 2 / 3` (Collections only —
  note this makes `ModernCollections/style.css` intentionally differ from the other two).
- All seasons on a TV show detail page now start collapsed (previously the first one opened).
- `.trim-trail` script no longer destroys child `<a>` elements (it only trims the trailing
  text node), which was required once names became links.

### Added
- **Actors, directors and studios are clickable** on movie and TV detail pages and filter
  the list page via `?actor=`, `?director=`, `?studio=`, with a dismissible "Actor: …" pill
  above the grid.
- Defensive `./` prefix on collection links in the list page so a title containing `:` can
  never be parsed by the browser as a URL scheme.

## [0.8.0] — Real-export fixes for Collections

### Fixed
- `${movieSet;filename(escape=false)}` does not throw on `MovieSet` but silently returns an
  empty string, producing `href=".html"` everywhere. Links now use `${movieSet.title}/movieset.html`,
  matching how tMM really names the folders (raw title + fixed `movieset.html`).
- `ModernCollections/detail.jmte` used root-relative asset paths although it lives one level
  deeper; all `style.css`, `app.js`, `images/…`, `nopicture.png`, `nofanart.png` references
  now carry `../`. This was the cause of the "CSS isn't applied" report.
- Cross-links between the three templates now match my real folder names
  (`pelis/`, `tv/`, `sagas/`); added Movies ↔ Collections and TV ↔ Collections links and a
  real "go to collection" link from a movie page.

*Verified against my real mini-export.*

## [0.7.0] — A–Z bar, catalogue mode, Collections template

### Added
- **A–Z letter filter** under the header; only letters that have at least one matching title
  are shown, accents are stripped (`Érase` → E) and digits/symbols fall under `#`.
- **`ModernCollections`**: new `type=movie_set` template (list + detail). Built from the
  reference Movie Set template supplied by me. Posters use a CSS "poster stack"
  (first movie's poster) and the hero backdrop uses a multi-background trick so no
  unverified `copyArtwork` renderer on a `MovieSet` is needed.

### Removed
- The watched/pending ("Estado") filter and every watched indicator (card badges, detail
  pills, per-episode pills): the site is a catalogue of what exists, not a viewing tracker.

## [0.6.0] — Fourth round: ratings, overlay, director commas, i18n

### Added
- **CA / ES / EN interface switcher** (client-side, `localStorage` key `tmm_lang`, Spanish
  by default). Only fixed UI text is translated; tMM data is not.

### Changed
- Card hover overlay now shows a short, larger, brighter genre list instead of the full
  plot (clamped to 3 lines).

### Fixed
- Director rendered as `, , , , Rich Moore, , , ,`: JMTE's `foreach` separator is emitted
  between *every* iteration even when the body outputs nothing. The comma now lives inside
  the `if`, and a small script trims the trailing one.

### Removed
- Ratings (badge, minimum-rating filter, rating sort, ★ pill): `rating.rating` never fails
  but is always `0` on this library (probably because the real values live in the `ratings` map; not confirmed).

## [0.5.0] — Collection field

### Fixed
- Export aborted at the first movie belonging to a collection:
  `Property 'name' on object '…Colección' can not be accessed`. `movieSet` has no `name`
  property; templates now use `${movie.movieSet}` directly. *Verified via `tmm.log`.*

## [0.4.0] — Non-existent fields

### Fixed
- Export aborted on `Property 'languages' on object 'TvShow'` and
  `Property 'videoFormat' on object 'Movie'`. In JMTE, reading a missing property throws and
  stops the **whole** export. All such guessed fields were removed
  (`languages`, `videoFormat`, `videoCodec`, `audioCodec`, `filesize`, `directors`,
  `episodeCount`). Director is now derived from `crew` filtered by `role="Director"`.
  *Verified via `tmm.log`.*

### Removed (for now)
- Resolution/quality badge and file size on the movie page; they would need
  `movie.mediaFiles`, which is confirmed to exist but is more complex in JMTE.

## [0.3.0] — Export stopping early

### Fixed
- `default=` of `copyArtwork` is resolved relative to the export root; `list.jmte` used
  `../nopicture.png`. Corrected to `nopicture.png`.
  *Correction: this was a reasonable but wrong hypothesis for the early-abort symptom (the
  real cause was §3d). The change is still correct and was kept.*

### Added
- `onerror` fallback on every poster image so a missing image can never leave a broken icon.

## [0.2.0] — TV show links

### Fixed
- tMM exports each TV show as its own folder with a fixed `tvshow.html` inside, not a flat
  `tvshows/<name>.html`. `ModernTVShows/list.jmte` now links to
  `${show;filename(escape=false)}/tvshow.html`. Movies keep the flat `movies/<name>.html`
  layout. *Confirmed on several real shows.*

## [0.1.0] — Initial release

### Added
- `ModernMovies` and `ModernTVShows` templates: dark poster grid, live search, genre / year /
  collection filters, sort, detail pages with hero, synopsis, cast and technical table;
  collapsible seasons on TV detail pages; shared `app.js` / `style.css`; no external
  dependencies and no server required.
- Accent handling: `filename(escape=true)` replaced by `escape=false` in list links
  (a hypothesis at the time; later confirmed to be adequate for movies and shows).

---

## Known issues / upstream

- **tMM collection titles with `:` or `/` abort the Collections export** (see 0.9.0). Rename
  them in tMM until the fixed release is installed.
