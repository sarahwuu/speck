// Hand-drawn-looking tint dots: three slightly irregular blob shapes cycled
// by id, each given a small tilt, echoing the imperfect logo mark instead of
// a perfect circle.
export const BLOBS = [
  '54% 46% 43% 57% / 49% 58% 42% 51%',
  '44% 56% 52% 48% / 57% 44% 56% 43%',
  '58% 42% 47% 53% / 43% 55% 45% 57%',
];

export function blobFor(id) {
  return BLOBS[id % BLOBS.length];
}

export function tiltFor(id) {
  return `${(id % 5) * 9 - 18}deg`;
}

// Fixed blob shapes used where a single dot appears once, not per-entry
// (the entry-detail header and search results).
export const DETAIL_BLOB = '58% 42% 47% 53% / 43% 55% 45% 57%';
export const RESULT_BLOB = '44% 56% 52% 48% / 57% 44% 56% 43%';
