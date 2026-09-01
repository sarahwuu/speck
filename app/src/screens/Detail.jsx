import IconButton from '../ds/IconButton.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { DETAIL_BLOB } from '../lib/blobs.js';
import { SAFE_TOP } from '../lib/safeArea.js';

/** Screenshot entry detail — image, caption if there is one (text always
 * leads), timestamp, back arrow, and the "⋯" menu that's the only place
 * edit/delete live for this entry type. */
export default function Detail({ entry, onBack, shotMenu, onToggleShotMenu, onCloseMenus, onEdit, onRequestDelete, confirm, onCancelDelete, onConfirmDelete }) {
  if (!entry) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', paddingTop: SAFE_TOP }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 4, padding: '0 12px', flex: 'none' }}>
        <IconButton name="back" label="back to feed" onClick={onBack} />
        <div style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
          <span style={{ width: 8, height: 8, flex: 'none', borderRadius: DETAIL_BLOB, transform: 'rotate(12deg)', background: 'var(--tint-screenshot)' }} />
          <span style={{ font: '500 13px/1.45 var(--font-sans)', color: 'var(--muted)' }}>{entry.timestamp}</span>
        </div>
        <IconButton name="more" label="entry options" onClick={onToggleShotMenu} />
      </div>

      <div style={{ flex: 1, padding: '8px 24px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entry.text ? <p style={{ margin: 0, font: '500 16px/1.55 var(--font-sans)', color: 'var(--ink)' }}>{entry.text}</p> : null}
        <div
          style={{
            height: 480,
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
      </div>

      {shotMenu ? (
        <>
          <div onClick={onCloseMenus} style={{ position: 'absolute', inset: 0, background: 'var(--ink-16)' }} />
          <div
            style={{
              position: 'absolute',
              top: 96,
              right: 16,
              width: 180,
              background: 'var(--surface-card)',
              border: '1px solid var(--line)',
              borderRadius: 8,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <button
              type="button"
              onClick={onEdit}
              style={{ height: 44, padding: '0 16px', textAlign: 'left', border: 'none', borderBottom: '1px solid var(--line)', background: 'transparent', font: '500 16px/1 var(--font-sans)', color: 'var(--ink)', cursor: 'pointer' }}
            >
              edit
            </button>
            <button
              type="button"
              onClick={onRequestDelete}
              style={{ height: 44, padding: '0 16px', textAlign: 'left', border: 'none', background: 'transparent', font: '500 16px/1 var(--font-sans)', color: 'var(--secondary-700)', cursor: 'pointer' }}
            >
              delete
            </button>
          </div>
        </>
      ) : null}

      {confirm && confirm.frame === 'shot' ? <ConfirmDialog title="delete this entry?" onCancel={onCancelDelete} onConfirm={onConfirmDelete} /> : null}
    </div>
  );
}
