import { useCallback, useEffect, useRef, useState } from 'react';

/** Is this clamped-to-3-lines paragraph actually overflowing? Measured
 * against the real line height rather than a character count, and
 * re-measured a few times after mount (fonts loading, layout settling)
 * so "show more" appears reliably even on a cold load. */
export function useClampMeasure(text, open) {
  const ref = useRef(null);
  const [truncated, setTruncated] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || open) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight) || 25;
    const over = el.scrollHeight > Math.round(lh * 3) + 1;
    setTruncated((prev) => (prev !== over ? over : prev));
  }, [open]);

  useEffect(() => {
    measure();
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(measure);
    });
    const timers = [120, 400, 1000].map((ms) => setTimeout(measure, ms));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      timers.forEach(clearTimeout);
    };
  }, [measure, text]);

  return { ref, truncated };
}
