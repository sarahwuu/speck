import { useState } from 'react';
import markInk from '../assets/logo/speck-mark-ink.png';

// Ported from _ds/.../components/actions/QuickCaptureButton.jsx
// 56px, the speck mark itself as the button shape, filled ink. Fixed
// bottom-right, 48px clear of the home indicator.
export default function QuickCaptureButton({
  onClick,
  label = 'new entry',
  fixed = true,
  markSrc = markInk,
  style,
  ...rest
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        position: fixed ? 'fixed' : 'relative',
        right: fixed ? 'var(--screen-margin)' : undefined,
        bottom: fixed ? 'var(--safe-bottom)' : undefined,
        width: 'var(--fab-size)',
        height: 'var(--fab-size)',
        border: 'none',
        padding: 0,
        background: 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transform: pressed ? 'scale(0.98)' : 'none',
        transition: 'transform var(--motion-press), filter var(--motion-transition)',
        filter: pressed ? 'brightness(0.75)' : 'none',
        ...style,
      }}
      {...rest}
    >
      <img src={markSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <span style={{ position: 'relative', font: '500 28px/1 var(--font-sans)', color: 'var(--white)', marginTop: -2 }}>+</span>
    </button>
  );
}
