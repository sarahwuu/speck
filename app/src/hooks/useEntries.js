import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage.js';
import { stamp } from '../lib/format.js';

const STORAGE_KEY = 'speck.entries';

/** Entries — text and screenshot, two types only — persisted to
 * localStorage so a save survives a reload. The app starts empty: the
 * design system's sample quotes were only for the design prototype, not
 * real seed content. */
export function useEntries() {
  const [entries, setEntries] = useState(() => readStorage(STORAGE_KEY, []));

  useEffect(() => {
    writeStorage(STORAGE_KEY, entries);
  }, [entries]);

  function addEntry(text, image) {
    const trimmedText = (text || '').trim();
    if (!trimmedText && !image) return null;
    // `image`, when present, is the attached photo's own data URL — kept
    // as-is (not coerced to a boolean) so the feed and detail screen can
    // actually render it.
    const entry = { id: Date.now(), text: trimmedText, image: image || false, timestamp: stamp(), open: false };
    setEntries((prev) => [entry, ...prev]);
    return entry;
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function deleteMany(ids) {
    const set = new Set(ids);
    setEntries((prev) => prev.filter((e) => !set.has(e.id)));
  }

  function toggleOpen(id) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, open: !e.open } : e)));
  }

  function setTruncated(id, truncated) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, truncated } : e)));
  }

  return { entries, addEntry, deleteEntry, deleteMany, toggleOpen, setTruncated };
}
