// Ported from _ds/.../components/foundation/Icon.jsx
// The five glyphs in v1, plus check-circle — drawn later, same 24px grid /
// stroke 1.9 / round-cap style, for the feed's "select multiple" entry
// point (replacing a one-item "⋯" menu with a direct-acting icon).
const GLYPHS = {
  back: <path d="M14.5 5.5L8 12l6.5 6.5" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" strokeLinejoin="miter" />,
  more: (
    <g>
      <circle cx="5.5" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </g>
  ),
  play: <path d="M9.3 6.7l8.4 5.3-8.4 5.3z" fill="currentColor" strokeWidth="2.6" />,
  search: (
    <g>
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5l4 4" />
    </g>
  ),
  'check-circle': (
    <g>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.2 12.3l2.6 2.6 5-5.4" />
    </g>
  ),
};

export const ICON_NAMES = Object.keys(GLYPHS);

export default function Icon({ name, size = 20, color, strokeWidth = 1.9, style, ...rest }) {
  const glyph = GLYPHS[name];
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', color: color || 'currentColor', flex: 'none', ...style }}
      {...rest}
    >
      {glyph}
    </svg>
  );
}
