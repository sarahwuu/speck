// How far (px) a card slides left to fully reveal its delete action.
export const REVEAL = 116;

// How much extra (px) an overshoot past REVEAL can compress into before it
// feels maxed out — a soft limit, not a hard one.
const RUBBER_RANGE = 60;

/**
 * Maps a raw, unclamped drag distance to the card's displayed offset, with
 * rubber-band resistance past -REVEAL instead of a hard clamp.
 *
 * A hard clamp (Math.max(-REVEAL, raw)) is fine while a drag only ever
 * moves in one direction, but it throws away how far past -REVEAL the
 * finger actually traveled. The moment the drag reverses, the displayed
 * position has to "use up" that whole discarded distance before it moves
 * at all — a dead zone that reads as the gesture ignoring you, right at
 * the point where a real thumb naturally overshoots and corrects.
 *
 * This is monotonic and injective for raw <= 0, so reversing raw by any
 * amount immediately moves the output — there's no plateau to cross.
 */
export function rubberClamp(raw) {
  if (raw >= 0) return 0;
  if (raw >= -REVEAL) return raw;
  const overshoot = -REVEAL - raw;
  const damped = RUBBER_RANGE * (1 - 1 / (1 + overshoot / RUBBER_RANGE));
  return -REVEAL - damped;
}
