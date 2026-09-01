/** Small localStorage wrapper — every call is guarded, since some browsers
 * (private windows, blocked site data) throw on access rather than no-op. */
export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function readFlag(key) {
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

export function setFlag(key) {
  try {
    localStorage.setItem(key, '1');
  } catch {
    /* ignore */
  }
}

export function clearFlag(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
