import { useState } from 'react';

// Ported from _ds/.../components/actions/Button.jsx
// Three levels, two sizes. Medium is the default everywhere; small is only
// for actions inside a card.
const LEVELS = {
  primary: { background: 'var(--ink)', color: 'var(--white)', border: '1px solid transparent' },
  secondary: { background: 'transparent', color: 'var(--ink)', border: '1.9px solid var(--line)' },
  tertiary: { background: 'transparent', color: 'var(--ink)', border: '1px solid transparent' },
  destructive: { background: 'transparent', color: 'var(--secondary-700)', border: '1px solid transparent' },
};

export default function Button({
  level = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  loadingLabel,
  children,
  onClick,
  style,
  ...rest
}) {
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const sm = size === 'small';
  const base = LEVELS[level] || LEVELS.primary;
  const isOff = disabled || loading;
  let background = base.background;
  let color = base.color;
  if (!isOff && level === 'primary') {
    if (pressed) background = 'var(--fill-ink-pressed)';
    else if (hover) background = 'var(--fill-ink-hover)';
  }
  if (!isOff && level !== 'primary' && pressed) background = 'var(--ink-08)';
  if (disabled) {
    background = level === 'primary' ? 'var(--surface-disabled)' : base.background;
    color = 'var(--text-disabled)';
  }
  return (
    <button
      type="button"
      disabled={isOff}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => {
        setPressed(false);
        setHover(false);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setHover(true);
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        font: `540 ${sm ? 14 : 16}px/1 var(--font-sans)`,
        height: sm ? 'var(--btn-height-sm)' : 'var(--btn-height)',
        padding: sm ? '4px 12px' : '4px 16px',
        borderRadius: 'var(--radius-pill)',
        border: base.border,
        background,
        color,
        textDecoration: level === 'tertiary' && pressed ? 'underline' : 'none',
        cursor: isOff ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transform: pressed && !isOff ? 'scale(0.98)' : 'none',
        transition: 'background var(--motion-transition), transform var(--motion-press)',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ position: 'absolute', inset: `${sm ? -7 : -5}px -5px`, borderRadius: 'inherit' }} />
      {loading ? loadingLabel || 'saving…' : children}
    </button>
  );
}
