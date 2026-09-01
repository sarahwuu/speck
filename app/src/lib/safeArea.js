// Real devices have their own status bar and home indicator — no fake "9:41"
// clock or decorative home-indicator bar needed, just clearance so content
// doesn't sit under a notch, camera cutout, or gesture bar. `env()` resolves
// to 0 on devices without one, so these degrade to the plain pixel value.
export const SAFE_TOP = 'env(safe-area-inset-top)';
export const SAFE_BOTTOM = (px) => `calc(${px}px + env(safe-area-inset-bottom))`;
