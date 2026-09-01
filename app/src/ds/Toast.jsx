// Ported from _ds/.../components/feedback/Toast.jsx
// Ink pill, one word, 1.6s then fades. The only confirmation a capture gets.
export default function Toast({ children = 'saved', visible = true, style, ...rest }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '9px 20px',
        minHeight: 37,
        boxSizing: 'border-box',
        background: 'var(--ink)',
        color: 'var(--paper)',
        borderRadius: 'var(--radius-pill)',
        font: '540 14px/1 var(--font-sans)',
        opacity: visible ? 1 : 0,
        transition: 'opacity var(--motion-transition)',
        pointerEvents: 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
