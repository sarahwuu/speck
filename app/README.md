# speck

A React implementation of the **speck** Claude Design prototype
(`../project/speck prototype.dc.html`) — a minimal capture-and-log app: type
or paste a thought or attach a screenshot, and it lands at the top of your
feed. Text entries clamp at 4 lines with "show more"; screenshots open a
detail view. Swipe a card left (or use multi-select from the "⋯" menu) to
delete, search filters and jumps you to a match, and everything follows the
speck design system's tokens (colors, type, spacing, radius, motion) ported
into `src/styles/tokens.css`.

Differences from the prototype file: this is real React (Vite + hooks, one
component per screen) instead of the `.dc.html` template runtime, and
entries persist to `localStorage` so a save survives a reload (the
prototype resets to its seed data every time).

## Run it

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
```

## Layout

- `src/ds/` — the design system's components, ported from the bundle
  (`Button`, `IconButton`, `Icon`, `QuickCaptureButton`, `Toast`,
  `SearchField`, `EmptyState`).
- `src/screens/` — `Splash`, `Feed`, `Capture`, `Detail`,
  `SearchOverlay` — one per app screen.
- `src/components/` — smaller shared pieces (`EntryCard`, `ConfirmDialog`,
  `StatusBar`).
- `src/hooks/` — `useEntries` (localStorage-backed CRUD), `useSwipeHint`
  (the one-time swipe nudge), `useClampMeasure` (the "show more" overflow
  check).
- `src/App.jsx` — the phone-frame shell and all interactive state
  (navigation, swipe gesture, search, selection, confirm dialog).
- `src/styles/tokens.css` — the design system's tokens, ported verbatim.
