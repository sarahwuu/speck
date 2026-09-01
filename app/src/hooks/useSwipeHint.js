import { useCallback, useEffect, useRef, useState } from 'react';
import { readFlag, setFlag } from '../lib/storage.js';

const FLAG = 'speck.swipeHintShown';

/** A silent, one-time-ever nudge: the first time the feed has at least one
 * entry — right after the first save, or on first load if entries already
 * exist — the topmost card nudges left and springs back, once. Tracked in
 * localStorage so it never repeats, even across reloads. */
export function useSwipeHint(entries, route, saveVersion) {
  const [hintId, setHintId] = useState(null);
  const doneRef = useRef(false);
  const clearTimerRef = useRef(null);
  const entriesRef = useRef(entries);
  const routeRef = useRef(route);
  entriesRef.current = entries;
  routeRef.current = route;

  const fire = useCallback(() => {
    if (doneRef.current) return;
    if (readFlag(FLAG)) {
      doneRef.current = true;
      return;
    }
    const top = entriesRef.current[0];
    if (!top || routeRef.current !== 'feed') return;
    doneRef.current = true;
    setFlag(FLAG);
    setHintId(top.id);
    clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => setHintId(null), 3300);
  }, []);

  // First opportunity: shortly after mount, in case entries already exist.
  useEffect(() => {
    const t = setTimeout(fire, 2200);
    return () => clearTimeout(t);
  }, [fire]);

  // Or shortly after the first save, if the feed was empty at mount.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const t = setTimeout(fire, 600);
    return () => clearTimeout(t);
  }, [saveVersion, fire]);

  useEffect(() => () => clearTimeout(clearTimerRef.current), []);

  return hintId;
}
