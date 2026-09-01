import { useState } from 'react';

// Fixed "ideal" ratios per orientation, rather than the photo's own exact
// ratio — every landscape photo gets the same shaped frame, every portrait
// photo gets the same shaped frame, so the feed doesn't jitter between
// arbitrary shapes. object-fit: cover then fills that frame completely
// (a small, deliberate crop to conform to the ratio) instead of letting the
// image dictate the box and letterboxing whatever's left over.
const LANDSCAPE_RATIO = '4 / 3';
const PORTRAIT_RATIO = '3 / 4';

/**
 * An entry's attached photo, sized to an orientation-appropriate container:
 * landscape photos fill the card's full width at a shorter height;
 * portrait photos fill a narrower, taller box instead of being letterboxed
 * or stretched into a landscape-shaped frame. Orientation is read off the
 * decoded image itself (naturalWidth/naturalHeight), so it works for any
 * photo regardless of when it was saved.
 */
export default function EntryImage({ src, maxHeight, onClick, style }) {
  const [portrait, setPortrait] = useState(null); // null until the photo reports its own size

  return (
    <div style={{ display: 'flex', justifyContent: 'center', ...style }}>
      <img
        src={src}
        alt=""
        draggable={false}
        onClick={onClick}
        onLoad={(e) => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
        style={{
          display: 'block',
          cursor: onClick ? 'pointer' : undefined,
          background: 'var(--surface-sunken)',
          border: '1.9px solid var(--neutral-300)',
          borderRadius: 8,
          boxSizing: 'border-box',
          ...(portrait === null
            ? // Before the photo has reported its size: don't guess a
              // shape — just don't crop, so there's nothing to correct
              // once the real orientation is known a moment later.
              { width: '100%', height: 'auto', maxHeight, objectFit: 'contain' }
            : portrait
              ? { width: 'auto', maxWidth: '100%', height: maxHeight, aspectRatio: PORTRAIT_RATIO, objectFit: 'cover' }
              : { width: '100%', height: 'auto', maxHeight, aspectRatio: LANDSCAPE_RATIO, objectFit: 'cover' }),
        }}
      />
    </div>
  );
}
