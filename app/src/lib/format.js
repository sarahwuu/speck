const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** "aug 25, 4:12pm" — the timestamp format used everywhere in the feed. */
export function stamp(date = new Date()) {
  const m = MONTHS[date.getMonth()];
  let h = date.getHours();
  const suffix = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${m} ${date.getDate()}, ${h}:${String(date.getMinutes()).padStart(2, '0')}${suffix}`;
}
