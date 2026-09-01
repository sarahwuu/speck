import Button from '../ds/Button.jsx';

/** The one delete confirmation in the app — swipe, the feed's multi-select
 * delete, and the screenshot detail's ⋯ menu all route through this same
 * dialog. */
export default function ConfirmDialog({ title, onCancel, onConfirm }) {
  return (
    <>
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'var(--ink-16)' }} />
      <div
        role="alertdialog"
        style={{
          position: 'absolute',
          zIndex: 4,
          left: 24,
          right: 24,
          bottom: 48,
          background: 'var(--surface-card)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div>
          <p style={{ margin: 0, font: '500 16px/1.35 var(--font-sans)', color: 'var(--ink)' }}>{title}</p>
          <p style={{ margin: '8px 0 0', font: '500 16px/1.45 var(--font-sans)', color: 'var(--muted)' }}>
            this can’t be undone.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button level="tertiary" onClick={onCancel} style={{ height: 34 }}>
            cancel
          </Button>
          <Button level="destructive" onClick={onConfirm} style={{ height: 34 }}>
            delete
          </Button>
        </div>
      </div>
    </>
  );
}
