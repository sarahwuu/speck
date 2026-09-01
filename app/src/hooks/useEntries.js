import { useCallback, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage.js';
import { stamp } from '../lib/format.js';

const STORAGE_KEY = 'speck.entries';

/** Entries — text and screenshot, two types only — persisted to
 * localStorage so a save survives a reload. The app starts empty: the
 * design system's sample quotes were only for the design prototype, not
 * real seed content.
 *
 * The CRUD functions are all useCallback'd with empty deps (they only
 * touch the setState function, which React guarantees is stable) so a
 * memoized EntryCard can hold onto them across renders instead of treating
 * every entries update as a reason to re-render every card. */
export function useEntries() {
  const [entries, setEntries] = useState(() => readStorage(STORAGE_KEY, []));

  useEffect(() => {
    writeStorage(STORAGE_KEY, entries);
  }, [entries]);

  const addEntry = useCallback((text, image) => {
    const trimmedText = (text || '').trim();
    if (!trimmedText && !image) return null;
    // `image`, when present, is the attached photo's own data URL — kept
    // as-is (not coerced to a boolean) so the feed and detail screen can
    // actually render it.
    const entry = { id: Date.now(), text: trimmedText, image: image || false, timestamp: stamp(), open: false };
    setEntries((prev) => [entry, ...prev]);
    return entry;
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const deleteMany = useCallback((ids) => {
    const set = new Set(ids);
    setEntries((prev) => prev.filter((e) => !set.has(e.id)));
  }, []);

  const toggleOpen = useCallback((id) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, open: !e.open } : e)));
  }, []);

  const setTruncated = useCallback((id, truncated) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, truncated } : e)));
  }, []);

  return { entries, addEntry, deleteEntry, deleteMany, toggleOpen, setTruncated };
}
