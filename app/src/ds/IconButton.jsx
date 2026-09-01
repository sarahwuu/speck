import { useState } from 'react';
import Icon from './Icon.jsx';

// Ported from _ds/.../components/actions/IconButton.jsx
// 44px tap target, 20px glyph, transparent by default. Every one carries an
// aria-label.
export default function IconButton({ name, label, disabled = false, onClick, size = 44, style, ...rest }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        padding: 0,
        background: pressed && !disabled ? 'var(--neutral-200)' : 'transparent',
        color: disabled ? 'var(--neutral-400)' : 'var(--ink)',
        cursor: disabled ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transition: 'background var(--motion-transition)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={20} />
    </button>
  );
}
