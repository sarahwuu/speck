import IconButton from '../ds/IconButton.jsx';
import Button from '../ds/Button.jsx';
import Toast from '../ds/Toast.jsx';
import { SAFE_BOTTOM, SAFE_TOP } from '../lib/safeArea.js';

const PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/** The capture sheet: one open textarea, one attach-image icon, one save
 * action. Rises from the bottom as a true top layer over the still-mounted
 * feed. */
export default function Capture({
  closing,
  draft,
  onDraftChange,
  attached,
  onAttachImage,
  onRemoveAttachment,
  picker,
  onOpenLibrary,
  onClosePicker,
  onSelectPhoto,
  saving,
  onSave,
  toast,
  onClose,
}) {
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
        <div style={{ flex: 1, padding: '8px 24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <textarea
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              rows={8}
              placeholder="type, paste, or add a screenshot…"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',
                resize: 'none',
                border: 'none',
                outline: 'none',
                padding: 0,
                background: 'transparent',
                font: '500 16px/1.55 var(--font-sans)',
                color: 'var(--ink)',
              }}
            />
            <button
              type="button"
              onClick={onAttachImage}
              aria-label="add an image"
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
                color: 'var(--ink)',
                cursor: 'pointer',
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
              <div
                style={{
                  height: 176,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--surface-sunken)',
                  border: '1.9px solid var(--neutral-300)',
                  borderRadius: 8,
                  font: '500 13px/1.45 var(--font-sans)',
                  color: 'var(--muted)',
                }}
              >
                screenshot placeholder
              </div>
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <IconButton name="close" label="remove the attached screenshot" onClick={onRemoveAttachment} />
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ padding: `0 24px ${SAFE_BOTTOM(48)}`, display: 'flex', justifyContent: 'flex-end', flex: 'none' }}>
          <Button onClick={onSave} loading={saving} loadingLabel="saving…" style={{ height: 34 }}>
            save
          </Button>
        </div>

        {picker === 'menu' ? (
          <>
            <div onClick={onClosePicker} style={{ position: 'absolute', inset: 0, background: 'var(--ink-16)' }} />
            <div
              style={{
                position: 'absolute',
                left: 24,
                right: 24,
                bottom: SAFE_BOTTOM(48),
                background: 'var(--surface-card)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button type="button" onClick={onOpenLibrary} style={menuItemStyle(true)}>
                browse photos
              </button>
              <button type="button" onClick={onOpenLibrary} style={menuItemStyle(true)}>
                take a photo
              </button>
              <button type="button" onClick={onClosePicker} style={{ ...menuItemStyle(false), color: 'var(--muted)' }}>
                cancel
              </button>
            </div>
          </>
        ) : null}

        {picker === 'library' ? (
          <>
            <div onClick={onClosePicker} style={{ position: 'absolute', inset: 0, background: 'var(--ink-16)' }} />
            <div
              style={{
                position: 'absolute',
                left: 24,
                right: 24,
                bottom: SAFE_BOTTOM(48),
                background: 'var(--surface-card)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ font: '540 11px/1.2 var(--font-sans)', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  RECENT PHOTOS
                </span>
                <IconButton name="close" label="close the photo picker" onClick={onClosePicker} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {PHOTOS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={onSelectPhoto}
                    aria-label="attach this photo"
                    style={{ aspectRatio: '1', padding: 0, border: '1.9px solid var(--neutral-300)', borderRadius: 8, background: 'var(--surface-sunken)', cursor: 'pointer' }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button level="tertiary" size="small" onClick={onClosePicker} style={{ height: 30 }}>
                  cancel
                </Button>
              </div>
            </div>
          </>
        ) : null}

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: SAFE_BOTTOM(116), display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <Toast visible={toast}>saved</Toast>
        </div>
      </div>
    </>
  );
}

function menuItemStyle(bordered) {
  return {
    height: 52,
    padding: '0 16px',
    textAlign: 'left',
    border: 'none',
    borderBottom: bordered ? '1px solid var(--line)' : 'none',
    background: 'transparent',
    font: '500 16px/1 var(--font-sans)',
    color: 'var(--ink)',
    cursor: 'pointer',
  };
}
