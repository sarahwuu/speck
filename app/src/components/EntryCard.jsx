import { useClampMeasure } from '../hooks/useClampMeasure.js';
import { blobFor, tiltFor } from '../lib/blobs.js';
import { REVEAL } from '../lib/swipe.js';

/**
 * One feed card, text or screenshot. Carries its own swipe-to-delete
 * gesture (dx/dragging come from the feed, which keeps only one card's
 * swipe open at a time) and its own "show more" clamp measurement.
 */
export default function EntryCard({
  entry,
  cardRef,
  dx,
  dragging,
  hinting,
  flashing,
  selecting,
  selected,
  onToggleSelect,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onRequestDelete,
  onToggleText,
  onOpenDetail,
}) {
  const hasText = !!entry.text;
  const hasImage = !!entry.image;
  const { ref: measureRef, truncated } = useClampMeasure(entry.text, entry.open);
  const swiped = dx !== 0 || dragging;
  const progress = swiped ? Math.min(1, -dx / REVEAL) : 0;
  const spin = Math.round(-45 + progress * 45);
  const revealOpacity = swiped && dx < -8 ? 1 : 0;
  const revealEvents = swiped && dx <= -REVEAL / 2 ? 'auto' : 'none';
  const swipeTransition = dragging && swiped ? 'none' : 'transform var(--motion-transition)';
  const tint = hasImage ? 'var(--tint-screenshot)' : 'var(--tint-text)';

  const cardAnimation = flashing
    ? 'speck-flash 1200ms ease-out both'
    : hinting
    ? 'speck-swipe-hint 2300ms cubic-bezier(0.2,0.8,0.2,1) both'
    : 'none';

  return (
    <div ref={cardRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span
          style={{
            width: 8,
            height: 8,
            flex: 'none',
            borderRadius: blobFor(entry.id),
            transform: `rotate(${tiltFor(entry.id)})`,
            background: tint,
          }}
        />
        <span style={{ flex: 1, font: '500 13px/1.45 var(--font-sans)', color: 'var(--text-meta)' }}>
          {entry.timestamp}
        </span>
        {selecting ? (
          <button
            type="button"
            onClick={onToggleSelect}
            aria-label="select this entry"
            aria-pressed={selected}
            style={{
              width: 44,
              height: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              border: 'none',
              borderRadius: 8,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                border: `1.9px solid ${selected ? 'var(--ink)' : 'var(--neutral-300)'}`,
                background: selected ? 'var(--ink)' : 'transparent',
              }}
            >
              {selected ? (
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="var(--white)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4.5 4.5L19 7" />
                </svg>
              ) : null}
            </span>
          </button>
        ) : null}
      </div>

      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: revealOpacity,
            pointerEvents: revealEvents,
            transition: 'opacity var(--motion-transition)',
          }}
        >
          <button
            type="button"
            onClick={onRequestDelete}
            aria-label="delete this entry"
            style={{
              position: 'relative',
              width: 44,
              height: 44,
              marginRight: 20,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--secondary-700)' }} />
            <span style={{ position: 'relative', display: 'flex', transform: `rotate(${spin}deg)`, transition: swipeTransition }}>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="var(--white)"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </span>
          </button>
        </div>

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            position: 'relative',
            background: 'var(--surface-card)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            padding: 16,
            touchAction: 'pan-y',
            userSelect: dragging ? 'none' : undefined,
            WebkitUserSelect: dragging ? 'none' : undefined,
            transform: `translateX(${dx}px)`,
            transition: swipeTransition,
            animation: cardAnimation,
          }}
        >
          {hasText ? (
            <>
              <p
                ref={measureRef}
                onClick={onToggleText}
                style={{
                  margin: 0,
                  font: '500 16px/1.55 var(--font-sans)',
                  color: 'var(--ink)',
                  cursor: 'text',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: entry.open ? 'unset' : 3,
                }}
              >
                {entry.text}
              </p>
              {truncated ? (
                <button
                  type="button"
                  onClick={onToggleText}
                  style={{
                    marginTop: 10,
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    font: '540 13px/1.45 var(--font-sans)',
                    color: 'var(--primary-700)',
                    cursor: 'pointer',
                  }}
                >
                  {entry.open ? 'show less' : 'show more'}
                </button>
              ) : null}
            </>
          ) : null}
          {hasImage ? (
            <div
              onClick={onOpenDetail}
              style={{
                cursor: 'pointer',
                marginTop: hasText ? 12 : 0,
                height: 176,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--surface-sunken)',
                border: '1.9px solid var(--neutral-300)',
                borderRadius: 8,
                font: '500 13px/1.45 var(--font-sans)',
                color: 'var(--muted)',
              }}
            >
              screenshot placeholder
            </div>
          ) : null}
        </div>
      </div>

      {hinting ? (
        <p
          style={{
            margin: '6px 2px 0',
            textAlign: 'right',
            font: '500 13px/1.45 var(--font-sans)',
            color: 'var(--text-meta)',
            animation: 'speck-hint-label 3200ms ease-out both',
            pointerEvents: 'none',
          }}
        >
          swipe to delete
        </p>
      ) : null}
    </div>
  );
}
