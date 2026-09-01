// Ported from _ds/.../components/foundation/Icon.jsx
// The five glyphs in v1. All drawn on a 24px grid; colour comes from `currentColor`.
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
