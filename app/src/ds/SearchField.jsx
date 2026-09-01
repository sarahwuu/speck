import { useState } from 'react';
import Icon from './Icon.jsx';

// Ported from _ds/.../components/forms/SearchField.jsx
// Search. Pill radius separates it from the capture field at a glance.
// The focus ring is applied to the pill itself (see .speck-search-pill in
// global.css) rather than drawn by the native input, per design feedback.
export default function SearchField({ value = '', onChange, placeholder = 'search entries', onClear, style, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="speck-search-pill"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 41,
        boxSizing: 'border-box',
        padding: '0 6px 0 18px',
        border: `1.9px solid ${focused || value ? 'var(--border-input-active)' : 'var(--border-input)'}`,
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        transition: 'border-color var(--motion-transition)',
        ...style,
      }}
    >
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          background: 'transparent',
          padding: 0,
          font: '500 16px/1.55 var(--font-sans)',
          color: 'var(--ink)',
          appearance: 'none',
          WebkitAppearance: 'none',
        }}
        {...rest}
      />
      {value ? (
        <button
          type="button"
          aria-label="clear search"
          onClick={() => {
            if (onChange) onChange('');
            if (onClear) onClear();
          }}
          style={{
            width: 30,
            height: 30,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            color: 'var(--neutral-600)',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Icon name="close" size={15} />
        </button>
      ) : null}
    </div>
  );
}
