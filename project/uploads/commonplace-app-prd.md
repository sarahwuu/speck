# Product Requirements Document
## [Working title: Commonplace] — a low-friction commonplace journal

**Owner:** Sarah Wu
**Status:** Draft v1 — for review
**Timeline:** 2-week solo build

---

## 1. Problem

Commonplace journaling — collecting quotes, ideas, and interesting fragments encountered
while reading, watching, or listening — is a practice worth reviving, but the traditional
form (a physical notebook) fails against how content is actually consumed today: on a
phone, mid-scroll, in bed, in short unplanned bursts.

The failure is not physical access alone. Testing this against existing zero-friction
tools (e.g. TikTok's one-tap Favorite) shows the block persists even when the save action
itself is effortless. The real blocker is **anticipated organizing cost**: the user
avoids capturing in the moment because they predict the saved item will require folder,
tag, or categorization decisions later — work they know they won't do — so the item
gets abandoned as "not worth it" before it's ever saved. The result: a mental note that's
forgotten within minutes.

A general-purpose notes app doesn't solve this either. It has no identity — it's a mix
of grocery lists, passwords, and stray tasks — so a curated "worth remembering" fragment
doesn't feel like it belongs there, even when the app is already open.

## 2. Target user (v1)

The designer/builder herself. This is a single-user, self-tested MVP, not a
market-segmented product. Any claim about broader audiences (creators, reading
communities, mindfulness spaces) is a *future-direction hypothesis* to name in the case
study, not a design input for v1 — there's no research to support designing for those
groups yet.

## 3. Scope — what belongs here

**In scope:** quotes, ideas, excerpts, fragments of "external wisdom" encountered while
consuming content — reading, scrolling, listening, conversation. Entries are always the
*extracted fragment* (a quote, a paraphrased idea) — never the source itself. E.g. a
quote pulled from a breakup video is in scope; saving/bookmarking the video to rewatch
later is not. This rules out link-saving or attaching source media as a feature.

**Capture formats (v1):**
- **Text** — typed or pasted, the default format. No length limit at capture (no
constraint on what can be typed/pasted), but text entries display capped at 4 lines in
the feed, truncated with "show more" (plain text, no icon) that expands the card in
place — no navigation, no detail screen. Applies to text entries only; screenshot and
audio cards use fixed-height treatments and don't need this rule.
- **Screenshot** — justified as a *faster fragment-extraction method*, not source-saving.
A screenshot of a passage or quote is often quicker than retyping it, and stays
consistent with "capture the fragment, not the source" as long as it's used for that
purpose (a quote on screen), not as a way to save something to revisit in full later.
- **Raw audio** — added deliberately for a reason distinct from speed: it preserves tone
and personal voice, and supports using the app as a freer, less constrained space to
express a thought, not only transcribe one. Not transcribed in v1 (see Section 8 for the
tradeoff this creates). Dictation into the text field (native iOS keyboard mic) remains
available separately and covers "voice for speed" without needing this feature — raw
audio exists for the voice/expression reason above, not as a shortcut for typing.

**Explicitly out of scope:** practical/logistical saves (recipes, store names, errands,
anything actionable). These belong in a general notes app and are excluded on purpose —
including them would recreate the "junk drawer, no identity" problem this product exists
to avoid.

## 4. Core principle

**Zero decisions at the moment of capture.** No folder, no tag, no title, no category
choice when saving. Any required decision at capture time reintroduces the organizing
cost that causes the user to skip saving in the first place. This principle overrides
other feature ideas — if a feature requires a decision at capture, cut it or defer it to
later.

## 5. Core user flow (MVP)

1. **Capture** — user opens a pinned, always-reachable surface (mobile web app, saved to
home screen) and dumps raw input: a pasted quote, a typed fragment, a rough description
of an idea. One field. Submit. Done.
2. **Log** — entry lands in a single reverse-chronological stream. No required
structuring at this step.
3. **Revisit** — user browses or searches the stream later, in a lower-pressure moment,
to reread or reflect on past entries.

No categorization step, no AI processing, no multi-view navigation in v1.

## 6. Out of scope for v1 (explicitly deferred)

- AI-assisted classification, tagging, or connection-finding
- Native share-sheet / OS-level capture (e.g. saving directly from TikTok or Safari) —
real mobile engineering, not realistic solo in 2 weeks
- Multi-category or retrievable/reflective split — dropped, doesn't apply once scope is
limited to wisdom/ideas
- Resurfacing prompts (e.g. "1 year ago today") — not disqualified on concept, deferred
specifically because a 2-week test window has no historical entries for it to surface.
Legitimate future iteration once real data exists; name as such in the case study rather
than building dead UI now.
- Streak counters / consumption stats (e.g. "128 snips this year," day-streak) — ruled
out on principle, not just timing. Contradicts the product's own low-pressure,
reflective register and pulls toward productivity/gamification framing the rest of the
spec explicitly argues against.
- Multi-user or account system
- Audio transcription — a deliberate future v2 decision, not v1. Raw audio capture is
in scope (see Section 3); auto-transcribing it is a distinct, separate feature that
would (a) quietly reintroduce AI into the product without that being a named decision,
and (b) rely on Safari's speech-to-text support, which is inconsistent enough to be a
real build risk on the locked PWA/Safari-only platform. If added later, it should be
scoped and justified on its own, not folded in under time pressure.

## 7. Success criteria for the case study

Not user growth or engagement metrics — this is a personal-use validation, not a
launched product. Success = the designer actually reaches for it instead of reverting to
the mental-note-then-forget pattern, over a real testing window (e.g. 1–2 weeks of daily
use post-build). The case study should report this honestly, including if it partially
fails.

## 8. Known tradeoffs to state explicitly in the write-up

- Pinned web app, not true OS-level ambient capture — a real limitation, named as a
"next iteration" rather than hidden.
- No AI in the product itself for v1; if a future AI layer is added (auto-theming,
connection-finding across entries), it should be scoped and justified separately, not
folded back in to hit a deadline.
- Single-user validation only — no evidence yet that this generalizes beyond the
designer's own behavior.
- Raw audio entries are not scannable in the log the way text is — revisiting the feed
means pressing play on each voice entry rather than reading at a glance, which works
against the low-effort "revisit" step in Section 5. Accepted deliberately because the
reason for including audio (tone/personal voice) can't be preserved in scannable text
without losing what it was for — but it's a real cost, not a free addition, and worth
naming plainly rather than glossing over.

## 9. Identity system (locked)

**Wordmark:** "speck," lowercase, geometric sans, black ink on paper.

**App icon (home screen):** three dots, varied sizes, off-axis placement (not aligned
on a single line, not evenly spaced) — one dot in the accent blue, the rest black ink.
Represents scattered fragments; the blue dot is the one that caught your attention among
many. No shadow, no gradient, flat, consistent with the spec's zero-elevation rule
elsewhere. Tested against: ellipsis pattern-matching (rejected — a straight line of
dots reads as a system "more options"/loading indicator, not a mark), monotonic
size-fade (rejected — reads as disappearing, contradicts a product about keeping
things), and density (rejected denser 5-8 dot clusters — collapse into noise at true
~60px icon size).

**Lockup mark (headers, splash, marketing, case study cover):** single black dot
paired with the wordmark, aligned to cap height. Not used as the app icon — a single
dot alone loses the "many scattered fragments" meaning and risks reading as a
notification/status indicator, especially in color. Kept black specifically to avoid
that collision.

**Open:** verify final domain/App Store name availability before this is treated as
permanent (see Section 10 note on the "Speck" naming check).

## 10. Open questions (resolve before build)

- Search: needed in v1, or can browsing a short chronological list suffice for the
2-week test window?
- Any visual/tone direction yet, or does that come after the flow is locked?

**Resolved:** Input formats are text, screenshot, and raw audio (untranscribed) — see
Section 3 for reasoning on each. Resurfacing and streak mechanics were considered — see
Section 6 for why each was deferred or ruled out. Identity system — see Section 9.
