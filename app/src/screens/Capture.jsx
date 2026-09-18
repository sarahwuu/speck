import { useLayoutEffect, useRef, useState } from 'react';
import IconButton from '../ds/IconButton.jsx';
import Button from '../ds/Button.jsx';
import Toast from '../ds/Toast.jsx';
import { SAFE_BOTTOM, SAFE_TOP } from '../lib/safeArea.js';
import { fileToDataUrl } from '../lib/image.js';
import EntryImage from '../components/EntryImage.jsx';

const MIN_TEXTAREA_ROWS = 8;
// Clearance reserved below the last line so the attach-photo icon (pinned
// to the bottom-right of the textarea's own box) never sits flush against
// it — the fixed row count used to leave this gap for free on any note
// under 8 lines; auto-growing to the exact content height would otherwise
// lose it for longer notes.
const ICON_GUTTER = 56;

function lineStartBefore(value, cursor) {
  return value.lastIndexOf('\n', cursor - 1) + 1;
}

/** Turns "* " at the start of a line into a real bullet as you type it.
 * "- " is left as a literal hyphen — it already reads as a dash bullet on
 * its own — but both are tracked as list markers so Enter can continue
 * them onto the next line. */
function autoBullet(value, cursor) {
  const lineStart = lineStartBefore(value, cursor);
  if (value.slice(lineStart, cursor) === '* ') {
    return { value: value.slice(0, lineStart) + '• ' + value.slice(cursor), cursor: lineStart + 2 };
  }
  return null;
}

/** Continues a "• " or "- " list onto the next line on Enter, the way
 * most note apps do — and lets a second Enter on an empty bullet line
 * close the list instead of adding yet another empty marker. Only
 * engages when Enter is pressed at the end of a bulleted line with no
 * selection, so it never fights with normal editing elsewhere. */
function continueBulletOnEnter(el) {
  const { value } = el;
  if (el.selectionStart !== el.selectionEnd) return null;
  const cursor = el.selectionStart;
  const lineStart = lineStartBefore(value, cursor);
  const nextNewline = value.indexOf('\n', cursor);
  const lineEnd = nextNewline === -1 ? value.length : nextNewline;
  if (cursor !== lineEnd) return null; // only at end-of-line, not mid-line

  const match = value.slice(lineStart, lineEnd).match(/^([•-]) (.*)$/);
  if (!match) return null;
  const [, marker, rest] = match;

  if (rest.trim() === '') {
    // an empty bullet — Enter again means "done with the list"
    return { value: value.slice(0, lineStart) + value.slice(cursor), cursor: lineStart };
  }
  const insertion = `\n${marker} `;
  return { value: value.slice(0, cursor) + insertion + value.slice(cursor), cursor: cursor + insertion.length };
}

/** The capture sheet: one open textarea, one attach-image icon, one save
 * action. Rises from the bottom as a true top layer over the still-mounted
 * feed. The attach icon opens the device's own photo/camera picker — no
 * in-app mock of one. */
export default function Capture({
  closing,
  draft,
  onDraftChange,
  attached,
  onAttach,
  onRemoveAttachment,
  saving,
  onSave,
  toast,
  onClose,
}) {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  // Auto-grow with the content instead of scrolling inside a fixed-height
  // box — a fixed row count meant a longer note just got cramped into a
  // small scrollable window instead of the sheet's own scroll handling it.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight + ICON_GUTTER}px`;
  }, [draft]);

  // Both handlers below write the transformed value and cursor position
  // straight to the DOM node before telling React about it, rather than
  // fixing the cursor up a frame later. A controlled textarea normally
  // snaps the cursor to the end of the value on every re-render; a
  // requestAnimationFrame callback to restore it loses the race against
  // fast typing (the next keystroke can land before the frame fires,
  // landing at the wrong position and scrambling the text). Setting the
  // DOM value/selection synchronously first means the subsequent React
  // re-render is just reassigning the same string, which browsers don't
  // treat as a reason to move the caret.
  function handleDraftChange(e) {
    const el = e.target;
    const bulleted = autoBullet(el.value, el.selectionStart);
    if (!bulleted) {
      onDraftChange(el.value);
      return;
    }
    el.value = bulleted.value;
    el.selectionStart = el.selectionEnd = bulleted.cursor;
    onDraftChange(bulleted.value);
  }

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const el = e.target;
    const result = continueBulletOnEnter(el);
    if (!result) return;
    e.preventDefault();
    el.value = result.value;
    el.selectionStart = el.selectionEnd = result.cursor;
    onDraftChange(result.value);
  }

  async function onFileChange(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = ''; // allow picking the same file again later
    if (!file) return;
    setLoadingPhoto(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      onAttach(dataUrl);
    } catch {
      // picker was cancelled, or the file couldn't be read — just drop it
    } finally {
      setLoadingPhoto(false);
    }
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 6,
          background: 'var(--ink-16)',
          animation: closing ? 'speck-sheet-scrim-out 300ms ease-out both' : 'speck-sheet-scrim-in 380ms ease-out both',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 7,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-page)',
          overflow: 'hidden',
          willChange: 'transform',
          paddingTop: SAFE_TOP,
          animation: closing
            ? 'speck-sheet-out 300ms cubic-bezier(0.32,0,0.67,0) both'
            : 'speck-sheet-in 380ms cubic-bezier(0.16,0.84,0.24,1) both',
        }}
      >
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 12px', flex: 'none' }}>
          <IconButton name="close" label="close capture" onClick={onClose} />
        </div>
        <div style={{ flex: 1, padding: '8px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={handleDraftChange}
              onKeyDown={handleKeyDown}
              placeholder="type, paste, or add a screenshot…"
              style={{
                width: '100%',
                minHeight: MIN_TEXTAREA_ROWS * 16 * 1.55,
                boxSizing: 'border-box',
                display: 'block',
                resize: 'none',
                overflow: 'hidden',
                border: 'none',
                outline: 'none',
                padding: 0,
                background: 'transparent',
                font: '500 16px/1.55 var(--font-sans)',
                color: 'var(--ink)',
              }}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
              tabIndex={-1}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              disabled={loadingPhoto}
              aria-label="add a photo from your camera roll or camera"
              style={{
                position: 'absolute',
                right: -10,
                bottom: 0,
                width: 44,
                height: 44,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: 999,
                background: 'transparent',
                color: loadingPhoto ? 'var(--neutral-400)' : 'var(--ink)',
                cursor: loadingPhoto ? 'default' : 'pointer',
                padding: 0,
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block' }}>
                <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                <circle cx="8.8" cy="9.6" r="1.3" fill="currentColor" stroke="none" />
                <path d="M4.5 17.5l4.8-4.8 3.4 3.4 2.6-2.6 4.2 4.2" />
              </svg>
            </button>
          </div>

          {attached ? (
            <div style={{ position: 'relative' }}>
              <EntryImage src={attached} maxHeight={320} />
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <IconButton name="close" label="remove the attached photo" onClick={onRemoveAttachment} />
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ padding: `0 24px ${SAFE_BOTTOM(48)}`, display: 'flex', justifyContent: 'flex-end', flex: 'none' }}>
          <Button onClick={onSave} disabled={!draft.trim() && !attached} loading={saving} loadingLabel="saving…" style={{ height: 34 }}>
            save
          </Button>
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: SAFE_BOTTOM(116), display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <Toast visible={toast}>saved</Toast>
        </div>
      </div>
    </>
  );
}
