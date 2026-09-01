import { useRef, useState } from 'react';
import IconButton from '../ds/IconButton.jsx';
import Button from '../ds/Button.jsx';
import Toast from '../ds/Toast.jsx';
import { SAFE_BOTTOM, SAFE_TOP } from '../lib/safeArea.js';
import { fileToDataUrl } from '../lib/image.js';

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
  const [loadingPhoto, setLoadingPhoto] = useState(false);

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
              <img
                src={attached}
                alt=""
                style={{
                  width: '100%',
                  height: 176,
                  display: 'block',
                  objectFit: 'cover',
                  background: 'var(--surface-sunken)',
                  border: '1.9px solid var(--neutral-300)',
                  borderRadius: 8,
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <IconButton name="close" label="remove the attached photo" onClick={onRemoveAttachment} />
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ padding: `0 24px ${SAFE_BOTTOM(48)}`, display: 'flex', justifyContent: 'flex-end', flex: 'none' }}>
          <Button onClick={onSave} loading={saving} loadingLabel="saving…" style={{ height: 34 }}>
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
