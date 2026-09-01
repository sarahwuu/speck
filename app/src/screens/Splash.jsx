import { BLOBS } from '../lib/blobs.js';

const POSITIONS = [
  { left: 37, top: 56, size: 14 },
  { left: 63, top: 56, size: 14 },
  { left: 89, top: 56, size: 14 },
];

/** Three ink "specks" hopping in sequence — ONE two three, one TWO three,
 * one two THREE — for about 1.5s, then the whole thing fades into the feed. */
export default function Splash({ fadingOut }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        background: 'var(--surface-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: fadingOut ? 'speck-splash-out 300ms ease-out both' : 'none',
      }}
    >
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        {POSITIONS.map((p, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: 'var(--ink)',
              borderRadius: BLOBS[i],
              transformOrigin: 'center bottom',
              animation: `speck-speck 1200ms cubic-bezier(0.3,0.1,0.4,1) infinite ${i * 260}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
