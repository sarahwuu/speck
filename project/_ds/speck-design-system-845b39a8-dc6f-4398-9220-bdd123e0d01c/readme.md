# speck — design system

speck is a mobile web app for saving fragments of what you read: a quote, a paraphrased idea, a screenshot, a short voice note. It is opened in iOS Safari and added to the home screen — a single-column, thumb-reach product with no desktop breakpoint.

The product argument, quoted from the foundations spec: commonplace journaling doesn't survive how content is actually consumed — mid-scroll, in short unplanned bursts. The blocker isn't save friction, it's anticipated organizing cost. People skip saving because they predict the item will need a folder, tag, or title later. So the core principle is **zero decisions at the moment of capture**: no folder, no tag, no title, no category, ever, at save time.

Three-step core flow: **capture** (one field, one submit), **log** (a single reverse-chronological stream), **revisit** (browse or search later, in a lower-pressure moment).

In scope: typed/pasted text (the default), screenshots (a faster way to extract a fragment, not a way to save the source), raw untranscribed audio (for tone and voice, not speed). Out of scope: link-saving, source media, practical/logistical notes. v1 explicitly excludes AI classification and tagging, share-sheet capture, resurfacing prompts, streak counters and consumption stats, multi-user accounts, and audio transcription.

## Products / surfaces

One product, two screens: the **feed** and the **entry detail** view. There is no marketing site, no desktop app, no admin surface in the sources provided. The `ui_kits/app` kit recreates the whole product; `slides/` recreates the spec-deck slide format the team documents in.

## Sources this system was built from

Both uploaded by the user; no codebase, Figma file, or repository was provided.

- `uploads/Color and type pairings.pdf` — "speck design system / FOUNDATIONS design spec", v1.0, updated 22 aug 2026, status adopted. Sections: overview, typography, color, accessibility, spacing, corner radius, app icon.
- `uploads/speck-components.pptx` — "speck COMPONENT LIBRARY", v1.0, 22 aug 2026. 11 slides: logo, buttons, button states, icon buttons, app bar, forms, messaging, entry cards, empty states, not-included.

Every token value, size, and rule here is copied from those two documents. Where a number is stated in the source it is used verbatim (34px button height, 1.9px input border, 41px audio play circle, 14px logo tile radius). Nothing was rounded to a 4/8px grid.

## Substitutions and flags

- **Fonts.** No font binaries were provided. Figtree, PT Serif and Space Mono are all published on Google Fonts, so the actual families are used — the latin subsets are vendored in `assets/fonts/`. Figtree ships as a variable font, which is what makes the spec's 540 and 620 weights renderable. If your licensed originals differ, drop the woff2 files in and update `tokens/fonts.css`.
- **Icons.** No icon font or sprite exists. The five glyphs were extracted as SVG from the component deck and re-saved in `assets/icons/`, preserving their exact geometry (24px grid, stroke 1.9, round caps). Nothing was drawn from memory or substituted from a CDN set.
- **Logo.** The mark and app icon were extracted from the deck as PNG (`assets/logo/`). There is no vector original in the sources, and no additional lockup was invented.
- **Intentional additions.** `Icon` — a wrapper that renders the deck's five extracted glyphs; the deck ships them as flat assets with no component around them. Nothing else was added: no Tabs, Select, Dialog, Tooltip, Avatar or Toast-stack, all of which the deck's "not included" slide either rules out or leaves undefined.

---

## Content fundamentals

**All lowercase, always.** Titles, buttons, labels, banners, empty states, section headings — "buttons", "save", "delete entry", "nothing here yet.", "no entries match “camus”." The only capitals in the whole system are eyebrow labels (SUBTITLE 2: 11px, caps, 0.02em tracking, used for `FEED`, `CAPTURE FIELD`, `VERSION`) and quoted material, which keeps whatever casing the author used.

**Sentences end in a period, even one-word ones**: "saved.", "nothing here yet.", "couldn't save." Fragments used as labels don't: "save", "cancel", "retry", "edit".

**Second person, sparingly. Never first person.** "your draft is still here — tap retry." "tap + to save the next line that catches you." The product never says "I", never "we", and never addresses the user by name.

**Verbs for actions, present participle for progress.** A button label swaps to the present participle while it works: save → "saving…" (with an ellipsis character, not three periods).

**State the mechanism, not the reassurance.** Copy explains what happened and what is true now: "audio saved without transcription — it won't appear in search." "audio entries aren't transcribed, so they never appear in search." "your draft is still here — tap retry." No apologies, no exclamation marks, no "oops", no "great job".

**Quiet by policy.** A save gets one word — "saved" — in a toast that fades after 1.6s. No celebration, no streaks, no counters, no consumption stats; the spec names those as contradicting the low-pressure register the product argues for.

**Em dashes for the second clause.** The house sentence shape is a short statement, an em dash, then the consequence: "one card shape for every entry type. a tint dot marks the type instead of an icon or label."

**Absences are stated as decisions.** The deck's last slide lists what is not built and why — "listed so their absence reads as a decision, not an omission." Follow that in documentation: name the exclusion, give the one-line reason.

**No emoji, anywhere.** Not in UI, not in docs, not in commit-message-grade copy. The tint dot is the only non-text marker in the product.

**Numerals stay numerals** — "0:34", "aug 12, 7:42am", "34px". Dates are lowercase and abbreviated: "aug 12, 7:42am", "22 aug 2026". Times are 12-hour with a lowercase suffix and no space.

**Documentation voice** (this file, the deck): the same lowercase register, plus Space Mono for token names and spec values. Spec prose is declarative and load-bearing — "pressed is the state that must never be skipped".

---

## Visual foundations

**The register.** Paper, ink, one blue, one brick. Editorial rather than app-like: mostly square corners, hairline rules instead of shadows, a serif italic used once per screen at most. It should feel like a well-set notebook, not a dashboard.

**Colour.** Three ramps numbered 900 (darkest) → 100 (lightest): a slate-blue primary at hue 260, a warm neutral at hue 90, a brick secondary at hue 27. Four named aliases carry almost all the work: `ink` (neutral 900), `muted` (neutral 800), `line` (neutral 200), `paper` (just above neutral 100, the app background). Text uses ink, muted and primary 700 **only** — the house rule is tighter than the AA math, and hierarchy is built with size and weight rather than by reaching down the ramp. Fills are ink, not blue; primary 100–400 are tints, dots and swatches. Secondary/brick is destructive actions at 700 and a warm accent at 200–300 — never a second brand colour, never navigation, never a primary button. Success is deliberately quiet green; both functional colours are always paired with words.

**Type.** Figtree carries the interface at 400 (contained wordmark only), 500, 540 and 620. PT Serif appears only as display numerals and month headings — the one editorial gesture in the system, and italic at 24px is its most common form. Space Mono is documentation only: token names and spec values, never product UI. One mobile scale, no responsive breakpoint. 1rem = 16px, and 16px is the hard floor for anything typed into (below it Safari auto-zooms on focus). Quote and note text is never smaller than 16px.

**Spacing and layout.** 4px base unit: 4 (icon-to-label), 8 (tight internal padding), 12 (grid gaps, between cards), 16 (card padding, list gutters), 24 (screen side margins), 32 (between major sections), 48 (top-of-screen and home-indicator safe padding). Single column, full-width cards inside 24px margins, thumb-reach: primary actions sit low. Fixed elements: the 56px app bar (sticky, on paper) and the 56px quick-capture button, bottom-right, 24px in from the margin and 48px clear of the home indicator. Nothing else floats.

**Corner radii.** Mostly square — radius is reserved for things you tap. 0 for page containers, 3px for calendar/stamp tiles, 8px for cards, inputs and swatches, 16px for the segmented toggle, pill for primary buttons and avatars. The logo tile is its own 14px.

**Backgrounds and imagery.** Flat paper. No gradients, no textures, no repeating patterns, no hand-drawn illustration, no full-bleed photography anywhere in the product. Screenshots are user content, framed in a neutral-100 well with a 1.9px neutral-300 border; until an image exists the well carries a lowercase text placeholder. The app icon is the only "illustration": loose ink dots on paper — three fragments, unevenly scattered, echoing the entry-type tint dots. If photography is ever used behind the paper wordmark, it must be dark enough to carry white type; there is no protection gradient or capsule in the system.

**Elevation and borders.** There are no shadows. Elevation is a 1px `line` border: cards, banners and the scrolled app-bar rule all use it. Inputs use a heavier 1.9px border so the field reads as tappable; it steps from `line` to primary 700 once the field has focus or content. The app bar sits on paper with no rule at all until the feed scrolls.

**Transparency and blur.** No blur, ever. A single transparency scale (100/80/64/56/40/24/16/8/4%) applies to any ramp colour and covers scrims, pressed states and dividers rather than introducing new tokens. `ink-08` is the pressed wash on borderless controls; `ink-24` is the home indicator.

**Motion.** One transition: 160ms ease-out. One press: 80ms ease-out with scale 0.98. No bounce, no spring, no entrance animation, no skeleton shimmer. The toast is the only timed element — 1.6s, then it fades.

**Interaction states.** Hover is pointer-only and gated behind a hover media query (on iOS it latches after a tap): primary goes one step lighter, to ink 600 (`--fill-ink-hover`). Pressed is the state that must never be skipped, because on touch it is the only feedback before the result: ink 800 fill (`--fill-ink-pressed`) and scale 0.98 on text buttons; a neutral-200 circle fading in behind the glyph on icon buttons, with no scale change (the target is already small). Tertiary underlines on press, not by default. Focus is one treatment system-wide — a 3px primary-300 ring, flush to the edge, on `:focus-visible` only, so a tap never leaves a ring. Disabled is a flat token pair (neutral 200 fill, neutral 500 label; neutral 400 glyphs), never reduced opacity.

**Touch sizing.** 34px buttons with the tap area extended to 44px, 44px icon-button targets with 20px glyphs, 30px small buttons for actions inside a card, nothing below 16px type in an input.

**Colour vibe of imagery.** Warm and low-contrast: the neutral ramp is hue 90, so everything reads slightly cream rather than grey. There is no grain, no duotone treatment, and no b&w filter defined.

---

## Iconography

Five glyphs exist, and only five: `back` (chevron-left), `close` (x), `more` (three dots), `play` (filled triangle), `search` (magnifier). The deck names back, close, more and play as "the only four in v1"; search belongs to the search field.

- **Format.** SVG, drawn on a 24px grid, rendered at 20px inside a 44px tap target. Stroke glyphs use stroke-width 1.9 with round caps and joins; `more` and `play` are filled (`play` carries a 2.6 stroke so its corners round). Colour comes from `currentColor` — ink by default, neutral 400 when disabled, white on ink fills.
- **No icon font, no sprite sheet, no CDN set.** The files in `assets/icons/` are the source geometry extracted from the component deck.
- **No emoji and no unicode characters as icons.** The deck is explicit about why: text characters never optically centre in a circle. The one exception is the `+` in the quick-capture button, which is typeset in Figtree 500 at 28px because it sits inside the speck mark, not in a circle.
- **The tint dot replaces an icon** for entry type: a 7px circle in primary 300 (text), 400 (screenshot) or 500 (audio). Do not add type icons or type labels to cards.
- **Every icon-only control carries an `aria-label`** — there are no text labels to fall back on.

---

## Components

Built from the component deck's inventory, grouped by concern.

- `components/brand/` — **Logo**
- `components/foundation/` — **Icon**
- `components/actions/` — **Button**, **IconButton**, **QuickCaptureButton**
- `components/navigation/` — **AppBar**
- `components/forms/` — **CaptureField**, **SearchField**
- `components/feedback/` — **Banner**, **Toast**, **EmptyState**
- `components/entries/** — **EntryCard**

Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` and one `@dsCard` HTML showing its states.

Deliberately absent, per the deck's last slide: tabs, desktop navigation, header links, select/dropdown, and a third button size.

## Index

- `styles.css` — the single entry point consumers link. `@import`s only.
- `tokens/` — `fonts.css` (`@font-face`), `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `motion.css`, `base.css` (resets, link colours, the one focus treatment).
- `assets/fonts/` — Figtree (variable, roman + italic), PT Serif (400/700, roman + italic), Space Mono (400/700), latin subsets.
- `assets/logo/` — `speck-mark-ink.png`, `speck-mark-paper.png`, `speck-app-icon.png`.
- `assets/icons/` — `chevron-left.svg`, `x.svg`, `more-horizontal.svg`, `play.svg`, `search.svg`.
- `components/` — the 12 components listed above.
- `guidelines/` — 21 specimen cards for the Design System tab (Colors, Type, Spacing, Brand).
- `ui_kits/app/` — the click-through product recreation: `index.html`, `App.jsx`, `FeedScreen.jsx`, `CaptureScreen.jsx`, `EntryDetailScreen.jsx`, plus its own README.
- `slides/` — the spec-deck slide format: `title.slide.html`, `spec-rows.slide.html`, `ramps.slide.html`, `list.slide.html`, `index.html`, `slides.css` and the four slide JSX types.
- `thumbnail.html` — the system's homepage tile.
- `SKILL.md` — Agent-Skills front matter for using this system outside this project.
