/* @ds-bundle: {"format":4,"namespace":"SpeckDesignSystem_845b39","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"QuickCaptureButton","sourcePath":"components/actions/QuickCaptureButton.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"EntryCard","sourcePath":"components/entries/EntryCard.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"CaptureField","sourcePath":"components/forms/CaptureField.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"Icon","sourcePath":"components/foundation/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/foundation/Icon.jsx"},{"name":"AppBar","sourcePath":"components/navigation/AppBar.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"a4f2ce171592","components/actions/IconButton.jsx":"2d512d2c7d1e","components/actions/QuickCaptureButton.jsx":"d78417893ed9","components/brand/Logo.jsx":"4394e8eb1e0e","components/entries/EntryCard.jsx":"cfa691754888","components/feedback/Banner.jsx":"4e4e093d9d15","components/feedback/EmptyState.jsx":"abd65e47a6ba","components/feedback/Toast.jsx":"06239a07db1f","components/forms/CaptureField.jsx":"c435b39a263d","components/forms/SearchField.jsx":"79a34c29d9bc","components/foundation/Icon.jsx":"99598cd21f2e","components/navigation/AppBar.jsx":"84c3255a5849","slides/ListSlide.jsx":"f1d6096f672c","slides/RampSlide.jsx":"d2accbe82a4e","slides/SlideFrame.jsx":"124b43fbcfbd","slides/SpecRowsSlide.jsx":"402304950259","slides/TitleSlide.jsx":"6210f7a0b0ba","ui_kits/app/App.jsx":"2b281eab91ea","ui_kits/app/CaptureScreen.jsx":"2680e2ab56e1","ui_kits/app/EntryDetailScreen.jsx":"da5d26cbf5a4","ui_kits/app/FeedScreen.jsx":"7cf420f6d0e0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SpeckDesignSystem_845b39 = window.SpeckDesignSystem_845b39 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LEVELS = {
  primary: {
    background: 'var(--ink)',
    color: 'var(--white)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--ink)',
    border: '1.9px solid var(--line)'
  },
  tertiary: {
    background: 'transparent',
    color: 'var(--ink)',
    border: '1px solid transparent'
  },
  destructive: {
    background: 'transparent',
    color: 'var(--secondary-700)',
    border: '1px solid transparent'
  }
};

/** Three levels, two sizes. Medium is the default everywhere; small is only for actions inside a card. */
function Button({
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
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const sm = size === 'small';
  const base = LEVELS[level] || LEVELS.primary;
  const isOff = disabled || loading;
  let background = base.background;
  let color = base.color;
  if (!isOff && level === 'primary') {
    if (pressed) background = 'var(--fill-ink-pressed)';else if (hover) background = 'var(--fill-ink-hover)';
  }
  if (!isOff && level !== 'primary' && pressed) background = 'var(--ink-08)';
  if (disabled) {
    background = level === 'primary' ? 'var(--surface-disabled)' : base.background;
    color = 'var(--text-disabled)';
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: isOff,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => {
      setPressed(false);
      setHover(false);
    },
    onPointerEnter: e => {
      if (e.pointerType === 'mouse') setHover(true);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      font: `${sm ? 540 : 540} ${sm ? 14 : 16}px/1 var(--font-sans)`,
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: `${sm ? -7 : -5}px -5px`,
      borderRadius: 'inherit'
    }
  }), loading ? loadingLabel || 'saving…' : children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/QuickCaptureButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 56px, the speck mark itself as the button shape, filled ink. Fixed bottom-right, 48px clear of the home indicator. */
function QuickCaptureButton({
  onClick,
  label = 'new entry',
  fixed = true,
  markSrc = 'assets/logo/speck-mark-ink.png',
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: markSrc,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: '500 28px/1 var(--font-sans)',
      color: 'var(--white)',
      marginTop: -2
    }
  }, "+"));
}
Object.assign(__ds_scope, { QuickCaptureButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/QuickCaptureButton.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Always lowercase, always paired with the mark. No stacked or monochrome-outline variant. */
function Logo({
  variant = 'inline',
  tone = 'ink',
  size = 26,
  assetBase = 'assets/logo',
  style,
  ...rest
}) {
  const contained = variant === 'contained';
  const dark = tone === 'paper';
  const mark = dark ? `${assetBase}/speck-mark-paper.png` : `${assetBase}/speck-mark-ink.png`;
  const wordColor = dark ? 'var(--paper)' : 'var(--ink)';
  const wordmark = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: mark,
    alt: "",
    style: {
      width: size,
      height: size,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `${contained ? 400 : 620} ${contained ? 24 : Math.round(size * 0.92)}px/1 var(--font-sans)`,
      color: contained ? dark ? 'var(--paper)' : 'var(--ink)' : wordColor,
      letterSpacing: '-0.01em'
    }
  }, "speck"));
  if (!contained) return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": "speck",
    style: {
      display: 'inline-flex',
      ...style
    }
  }, rest), wordmark);
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": "speck",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '14px 20px',
      borderRadius: 'var(--radius-logo-tile)',
      background: dark ? 'var(--ink)' : 'var(--paper)',
      ...style
    }
  }, rest), wordmark);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    background: 'var(--surface-card)',
    border: 'var(--line)',
    lead: 'var(--ink)'
  },
  success: {
    background: 'var(--success-bg)',
    border: 'var(--success-line)',
    lead: 'var(--success)'
  },
  error: {
    background: 'var(--error-bg)',
    border: 'var(--error-line)',
    lead: 'var(--secondary-700)'
  }
};

/** Inline banner. Reserved for something the user has to know about; never stacked. */
function Banner({
  tone = 'neutral',
  lead,
  children,
  actionLabel,
  onAction,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: tone === 'error' ? 'alert' : 'status',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '15px 16px',
      background: t.background,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-sm)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      flex: 1,
      font: '500 16px/1.45 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, lead ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 540,
      color: t.lead
    }
  }, lead, " ") : null, children), actionLabel ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    level: "secondary",
    onClick: onAction,
    style: tone === 'error' ? {
      borderColor: 'var(--error-line)',
      color: 'var(--secondary-700)'
    } : undefined
  }, actionLabel) : null);
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Two empty states in the app, both a single line. No illustration. */
function EmptyState({
  title,
  children,
  size = 'large',
  style,
  ...rest
}) {
  const large = size === 'large';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '0 4px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: `${large ? '540 20px/1.25' : '540 16px/1.35'} var(--font-sans)`,
      color: 'var(--ink)'
    }
  }, title), children ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      font: '500 14px/1.45 var(--font-sans)',
      color: 'var(--muted)',
      maxWidth: 320
    }
  }, children) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ink pill, one word, 1.6s then fades. The only confirmation a capture gets. */
function Toast({
  children = 'saved',
  visible = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    "aria-live": "polite",
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/CaptureField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The capture field: one input, 16px type always, or Safari zooms on focus. */
function CaptureField({
  value = '',
  onChange,
  placeholder = 'type, paste, screenshot, or record…',
  error,
  autoFocus = false,
  rows = 3,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--secondary-700)' : focused || value ? 'var(--border-input-active)' : 'var(--border-input)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    value: value,
    rows: rows,
    autoFocus: autoFocus,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      resize: 'none',
      padding: '12px 14px',
      minHeight: 84,
      font: '500 16px/1.55 var(--font-sans)',
      color: 'var(--ink)',
      background: error ? 'var(--error-bg)' : 'transparent',
      border: `1.9px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      transition: 'border-color var(--motion-transition), background var(--motion-transition)'
    }
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--error)'
    }
  }, error) : null);
}
Object.assign(__ds_scope, { CaptureField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CaptureField.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GLYPHS = {
  back: /*#__PURE__*/React.createElement("path", {
    d: "M14.5 5.5L8 12l6.5 6.5"
  }),
  close: /*#__PURE__*/React.createElement("path", {
    d: "M6.5 6.5l11 11M17.5 6.5l-11 11",
    strokeLinejoin: "miter"
  }),
  more: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "5.5",
    cy: "12",
    r: "1.7",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.7",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18.5",
    cy: "12",
    r: "1.7",
    fill: "currentColor",
    stroke: "none"
  })),
  play: /*#__PURE__*/React.createElement("path", {
    d: "M9.3 6.7l8.4 5.3-8.4 5.3z",
    fill: "currentColor",
    strokeWidth: "2.6"
  }),
  search: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.5 15.5l4 4"
  }))
};

/** The five glyphs in v1. All drawn on a 24px grid; colour comes from `currentColor`. */
function Icon({
  name,
  size = 20,
  color,
  strokeWidth = 1.9,
  style,
  ...rest
}) {
  const glyph = GLYPHS[name];
  if (!glyph) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      display: 'block',
      color: color || 'currentColor',
      flex: 'none',
      ...style
    }
  }, rest), glyph);
}
const ICON_NAMES = Object.keys(GLYPHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 44px tap target, 20px glyph, transparent by default. Every one carries an aria-label. */
function IconButton({
  name,
  label,
  disabled = false,
  onClick,
  size = 44,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/entries/EntryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TINT = {
  text: 'var(--tint-text)',
  screenshot: 'var(--tint-screenshot)',
  audio: 'var(--tint-audio)'
};
const BARS = [11, 21, 8, 27, 15, 23, 10, 19, 13, 25, 9, 22, 16, 28, 11, 20];
function Waveform({
  bars = BARS
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flex: 1,
      minWidth: 0,
      overflow: 'hidden'
    }
  }, bars.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: h,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--waveform)',
      flex: 'none'
    }
  })));
}

/** One card shape for every entry type. A tint dot marks the type instead of an icon or label. */
function EntryCard({
  type = 'text',
  timestamp,
  quote,
  source,
  duration,
  screenshotLabel = 'screenshot placeholder',
  note,
  onClick,
  onPlay,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    onClick: onClick,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--card-padding)',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: TINT[type] || TINT.text,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--text-meta)'
    }
  }, timestamp)), type === 'text' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      font: '540 16px/1.55 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, quote), source ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, source) : null) : null, type === 'screenshot' ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      minHeight: 176,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-sunken)',
      border: '1.9px solid var(--neutral-300)',
      borderRadius: 'var(--radius-sm)',
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, screenshotLabel) : null, type === 'audio' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "play audio entry",
    onClick: onPlay,
    style: {
      width: 41,
      height: 41,
      flex: 'none',
      borderRadius: '50%',
      border: 'none',
      background: 'var(--ink)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 19,
    color: "var(--white)"
  })), /*#__PURE__*/React.createElement(Waveform, null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--text-meta)',
      flex: 'none'
    }
  }, duration)), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, note) : null) : null);
}
Object.assign(__ds_scope, { EntryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/entries/EntryCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Search. Pill radius separates it from the capture field at a glance. */
function SearchField({
  value = '',
  onChange,
  placeholder = 'search entries',
  onClear,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "search",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      background: 'transparent',
      padding: 0,
      font: '500 16px/1.55 var(--font-sans)',
      color: 'var(--ink)',
      appearance: 'none',
      WebkitAppearance: 'none'
    }
  }, rest)), value ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "clear search",
    onClick: () => {
      onChange && onChange('');
      onClear && onClear();
    },
    style: {
      width: 30,
      height: 30,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      background: 'transparent',
      color: 'var(--neutral-600)',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 15
  })) : null);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Two bars, both 56px on top of the status-bar inset. No tab bar, no menu. */
function AppBar({
  variant = 'feed',
  title,
  scrolled = false,
  onBack,
  onMore,
  assetBase = 'assets/logo',
  statusInset = 0,
  style,
  ...rest
}) {
  const detail = variant === 'detail';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'var(--surface-page)',
      paddingTop: statusInset,
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      transition: 'border-color var(--motion-transition)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--appbar-height)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '0 12px'
    }
  }, detail ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "back",
    label: "back",
    onClick: onBack
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 22,
    assetBase: assetBase
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: detail ? 'center' : 'left',
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, detail ? title : null), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "more",
    label: "more options",
    onClick: onMore
  })));
}
Object.assign(__ds_scope, { AppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppBar.jsx", error: String((e && e.message) || e) }); }

// slides/ListSlide.jsx
try { (() => {
function ListSlide({
  number,
  title,
  description,
  items = []
}) {
  return /*#__PURE__*/React.createElement(SlideFrame, {
    number: number,
    title: title,
    description: description
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: -60
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.term,
    style: {
      display: 'flex',
      gap: 48,
      padding: '30px 0',
      borderTop: i === 0 ? 'none' : '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 420,
      font: '540 32px/1.2 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, it.term), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '500 26px/1.45 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, it.body)))));
}
Object.assign(window, {
  ListSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/ListSlide.jsx", error: String((e && e.message) || e) }); }

// slides/RampSlide.jsx
try { (() => {
function RampSlide({
  number,
  title,
  description,
  ramps = []
}) {
  return /*#__PURE__*/React.createElement(SlideFrame, {
    number: number,
    title: title,
    description: description
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 54,
      marginTop: -60
    }
  }, ramps.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "s-lbl"
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, r.steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 96,
      borderRadius: 8,
      background: s.value,
      border: s.border ? '1px solid var(--line)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "s-mono",
    style: {
      fontSize: 20
    }
  }, s.name)))), r.note ? /*#__PURE__*/React.createElement("span", {
    className: "s-note",
    style: {
      fontSize: 24
    }
  }, r.note) : null))));
}
Object.assign(window, {
  RampSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/RampSlide.jsx", error: String((e && e.message) || e) }); }

// slides/SlideFrame.jsx
try { (() => {
function SlideFrame({
  number,
  title,
  description,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slide"
  }, number ? /*#__PURE__*/React.createElement("span", {
    className: "s-num"
  }, number) : null, title ? /*#__PURE__*/React.createElement("h1", {
    className: "s-title"
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    className: "s-desc",
    style: {
      margin: 0
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    className: "s-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-body"
  }, children)));
}
Object.assign(window, {
  SlideFrame
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/SlideFrame.jsx", error: String((e && e.message) || e) }); }

// slides/SpecRowsSlide.jsx
try { (() => {
function SpecRowsSlide({
  number,
  title,
  description,
  rows = []
}) {
  return /*#__PURE__*/React.createElement(SlideFrame, {
    number: number,
    title: title,
    description: description
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: -50
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "s-panel",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '26px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 340,
      display: 'flex',
      alignItems: 'center'
    }
  }, r.sample), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 240,
      font: '500 30px/1 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '500 26px/1.4 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, r.note)))));
}
Object.assign(window, {
  SpecRowsSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/SpecRowsSlide.jsx", error: String((e && e.message) || e) }); }

// slides/TitleSlide.jsx
try { (() => {
const {
  Logo
} = window.SpeckDesignSystem_845b39;
function TitleSlide({
  eyebrow = 'COMPONENT LIBRARY',
  title = 'components',
  lede,
  meta = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 104,
      top: 96
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 46,
    assetBase: "../assets/logo"
  })), /*#__PURE__*/React.createElement("span", {
    className: "s-lbl",
    style: {
      position: 'absolute',
      left: 104,
      top: 300
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      position: 'absolute',
      left: 104,
      top: 340,
      margin: 0,
      font: '620 132px/1 var(--font-sans)',
      color: 'var(--ink)',
      letterSpacing: '-0.02em'
    }
  }, title), lede ? /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'absolute',
      left: 104,
      top: 520,
      width: 1000,
      margin: 0,
      font: '500 30px/1.5 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, lede) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 104,
      right: 104,
      bottom: 96,
      display: 'flex',
      gap: 96,
      borderTop: '1px solid var(--line)',
      paddingTop: 32
    }
  }, meta.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "s-lbl"
  }, m.label), /*#__PURE__*/React.createElement("span", {
    className: "s-mono",
    style: {
      color: 'var(--ink)'
    }
  }, m.value))))));
}
Object.assign(window, {
  TitleSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/TitleSlide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/App.jsx
try { (() => {
const SEED = [{
  id: 'e1',
  type: 'text',
  timestamp: 'aug 12, 7:42am',
  quote: '“the struggle itself towards the heights is enough to fill a man\u2019s heart.”',
  source: 'camus, the myth of sisyphus'
}, {
  id: 'e2',
  type: 'screenshot',
  timestamp: 'aug 11, 9:15pm'
}, {
  id: 'e3',
  type: 'audio',
  timestamp: 'aug 10, 2:03pm',
  duration: '0:34',
  note: 'play to revisit — not scannable at a glance like text, a known tradeoff for keeping tone and voice.'
}, {
  id: 'e4',
  type: 'text',
  timestamp: 'aug 9, 11:20am',
  quote: '“attention is the rarest and purest form of generosity.”',
  source: 'simone weil, letter to joë bousquet'
}];
function App() {
  const [entries, setEntries] = React.useState(SEED);
  const [screen, setScreen] = React.useState('feed');
  const [openId, setOpenId] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [draft, setDraft] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [banner, setBanner] = React.useState(null);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);
  function save() {
    if (!draft.trim()) return;
    setSaving(true);
    setTimeout(() => {
      const now = new Date();
      const stamp = 'aug 13, ' + (now.getHours() % 12 || 12) + ':' + String(now.getMinutes()).padStart(2, '0') + (now.getHours() < 12 ? 'am' : 'pm');
      setEntries(e => [{
        id: 'n' + Date.now(),
        type: 'text',
        timestamp: stamp,
        quote: draft.trim()
      }, ...e]);
      setDraft('');
      setSaving(false);
      setScreen('feed');
      setToast('saved');
    }, 700);
  }
  if (screen === 'capture') {
    return /*#__PURE__*/React.createElement(CaptureScreen, {
      draft: draft,
      onDraft: setDraft,
      onCancel: () => {
        setScreen('feed');
        setDraft('');
      },
      onSave: save,
      saving: saving
    });
  }
  if (screen === 'detail') {
    return /*#__PURE__*/React.createElement(EntryDetailScreen, {
      entry: entries.find(e => e.id === openId),
      onBack: () => setScreen('feed'),
      onDelete: () => {
        setEntries(e => e.filter(x => x.id !== openId));
        setScreen('feed');
        setToast('deleted');
      }
    });
  }
  return /*#__PURE__*/React.createElement(FeedScreen, {
    entries: entries,
    query: query,
    onQuery: setQuery,
    toast: toast,
    banner: banner,
    onDismissBanner: () => setBanner(null),
    onOpen: id => {
      setOpenId(id);
      setScreen('detail');
    },
    onCapture: () => setScreen('capture')
  });
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CaptureScreen.jsx
try { (() => {
const {
  IconButton,
  CaptureField,
  Button,
  Banner
} = window.SpeckDesignSystem_845b39;
function CaptureScreen({
  draft,
  onDraft,
  onCancel,
  onSave,
  saving,
  error
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--appbar-height)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "close",
    label: "close capture",
    onClick: onCancel
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '8px var(--screen-margin) 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(CaptureField, {
    value: draft,
    onChange: onDraft,
    rows: 5,
    error: error,
    autoFocus: true
  }), error ? /*#__PURE__*/React.createElement(Banner, {
    tone: "error",
    lead: "couldn\u2019t save."
  }, "your draft is still here \u2014 tap save to retry.") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onSave,
    loading: saving,
    loadingLabel: "saving\u2026"
  }, "save"), /*#__PURE__*/React.createElement(Button, {
    level: "tertiary",
    onClick: onCancel
  }, "cancel"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 48
    }
  }));
}
Object.assign(window, {
  CaptureScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CaptureScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/EntryDetailScreen.jsx
try { (() => {
const {
  AppBar,
  Button,
  Banner,
  Icon
} = window.SpeckDesignSystem_845b39;
function EntryDetailScreen({
  entry,
  onBack,
  onDelete
}) {
  const [confirming, setConfirming] = React.useState(false);
  if (!entry) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    variant: "detail",
    title: entry.timestamp,
    onBack: onBack,
    statusInset: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px var(--screen-margin) 48px'
    }
  }, entry.type === 'text' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.55 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, entry.quote), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      font: '500 18px/1.35 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, entry.source)) : null, entry.type === 'screenshot' ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 380,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-sunken)',
      border: '1.9px solid var(--neutral-300)',
      borderRadius: 'var(--radius-sm)',
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--muted)'
    }
  }, "screenshot placeholder") : null, entry.type === 'audio' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 41,
      height: 41,
      borderRadius: '50%',
      background: 'var(--ink)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 19,
    color: "var(--white)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.45 var(--font-sans)',
      color: 'var(--text-meta)'
    }
  }, entry.duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Banner, null, "audio saved without transcription \u2014 it won\u2019t appear in search."))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    level: "tertiary"
  }, "edit"), /*#__PURE__*/React.createElement(Button, {
    level: "destructive",
    onClick: () => setConfirming(true)
  }, "delete entry")), confirming ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "error",
    lead: "delete this entry?",
    actionLabel: "delete",
    onAction: onDelete
  }, "this can\u2019t be undone.")) : null));
}
Object.assign(window, {
  EntryDetailScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/EntryDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/FeedScreen.jsx
try { (() => {
const {
  AppBar,
  EntryCard,
  SearchField,
  QuickCaptureButton,
  Toast,
  EmptyState,
  Banner
} = window.SpeckDesignSystem_845b39;
function MonthHeading({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '24px 0 12px',
      font: 'italic 400 24px/1.2 var(--font-serif)',
      color: 'var(--ink)'
    }
  }, children);
}
function FeedScreen({
  entries,
  query,
  onQuery,
  onOpen,
  onCapture,
  toast,
  banner,
  onDismissBanner
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const filtered = query ? entries.filter(e => e.type !== 'audio' && ((e.quote || '') + (e.source || '')).toLowerCase().includes(query.toLowerCase())) : entries;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    scrolled: scrolled,
    assetBase: "../../assets/logo",
    statusInset: 44
  }), /*#__PURE__*/React.createElement("div", {
    onScroll: e => setScrolled(e.currentTarget.scrollTop > 2),
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 var(--screen-margin) 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: query,
    onChange: onQuery
  })), banner ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: banner.tone,
    lead: banner.lead,
    actionLabel: banner.actionLabel,
    onAction: onDismissBanner
  }, banner.body)) : null, filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, query ? /*#__PURE__*/React.createElement(EmptyState, {
    size: "small",
    title: 'no entries match “' + query + '”.'
  }, "audio entries aren\u2019t transcribed, so they never appear in search.") : /*#__PURE__*/React.createElement(EmptyState, {
    title: "nothing here yet."
  }, "tap + to save the next line that catches you.")) : null, filtered.length ? /*#__PURE__*/React.createElement(MonthHeading, null, "august") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, filtered.map(e => /*#__PURE__*/React.createElement(EntryCard, {
    key: e.id,
    type: e.type,
    timestamp: e.timestamp,
    quote: e.quote,
    source: e.source,
    duration: e.duration,
    note: e.note,
    onClick: () => onOpen(e.id)
  })))), /*#__PURE__*/React.createElement(QuickCaptureButton, {
    onClick: onCapture,
    fixed: false,
    markSrc: "../../assets/logo/speck-mark-ink.png",
    style: {
      position: 'absolute',
      right: 24,
      bottom: 48
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 116,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    visible: !!toast
  }, toast || 'saved')));
}
Object.assign(window, {
  FeedScreen,
  MonthHeading
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/FeedScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.QuickCaptureButton = __ds_scope.QuickCaptureButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.EntryCard = __ds_scope.EntryCard;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.CaptureField = __ds_scope.CaptureField;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.AppBar = __ds_scope.AppBar;

})();
