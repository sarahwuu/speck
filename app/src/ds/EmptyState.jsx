// Ported from _ds/.../components/feedback/EmptyState.jsx
// Two empty states in the app, both a single line. No illustration.
export default function EmptyState({ title, children, size = 'large', style, ...rest }) {
  const large = size === 'large';
  return (
    <div style={{ padding: '0 4px', ...style }} {...rest}>
      <p style={{ margin: 0, font: `${large ? '540 20px/1.25' : '540 16px/1.35'} var(--font-sans)`, color: 'var(--ink)' }}>
        {title}
      </p>
      {children ? (
        <p style={{ margin: '10px 0 0', font: '500 14px/1.45 var(--font-sans)', color: 'var(--muted)', maxWidth: 320 }}>
          {children}
        </p>
      ) : null}
    </div>
  );
}
