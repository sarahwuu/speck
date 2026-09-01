import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage.js';
import { stamp } from '../lib/format.js';

const STORAGE_KEY = 'speck.entries';

const SEED = [
  {
    id: 1,
    timestamp: 'aug 25, 4:12pm',
    text: 'the mind is not a vessel to be filled but a fire to be kindled, and what kindles it is rarely the thing you set out to read — it is the sentence you did not expect, arriving mid-scroll, three paragraphs into something you were only half attending to.',
  },
  { id: 2, timestamp: 'aug 25, 11:04am', text: 'the paragraph about attention as a currency', image: true },
  { id: 3, timestamp: 'aug 24, 9:20pm', image: true },
];

/** Entries — text and screenshot, two types only — persisted to
 * localStorage so a save survives a reload. */
export function useEntries() {
  const [entries, setEntries] = useState(() => readStorage(STORAGE_KEY, SEED));

  useEffect(() => {
    writeStorage(STORAGE_KEY, entries);
  }, [entries]);

  function addEntry(text, image) {
    const trimmedText = (text || '').trim();
    if (!trimmedText && !image) return null;
    const entry = { id: Date.now(), text: trimmedText, image: !!image, timestamp: stamp(), open: false };
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
