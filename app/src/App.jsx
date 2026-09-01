import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEntries } from './hooks/useEntries.js';
import { useSwipeHint } from './hooks/useSwipeHint.js';
import { REVEAL } from './lib/swipe.js';
import Splash from './screens/Splash.jsx';
import Feed from './screens/Feed.jsx';
import Capture from './screens/Capture.jsx';
import Detail from './screens/Detail.jsx';
import SearchOverlay from './screens/SearchOverlay.jsx';

function snippet(entry, query) {
  const q = query.trim();
  const src = entry.text || (entry.image ? 'screenshot' : '');
  if (!q) return { before: src, match: '', after: '' };
  const i = src.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return { before: src, match: '', after: '' };
  const start = Math.max(0, i - 24);
  return {
    before: (start ? '…' : '') + src.slice(start, i),
    match: src.slice(i, i + q.length),
    after: src.slice(i + q.length),
  };
}

export default function App() {
  const { entries, addEntry, deleteEntry, deleteMany, toggleOpen } = useEntries();

  // ---- splash --------------------------------------------------------
  const [splashPhase, setSplashPhase] = useState('in'); // 'in' | 'out' | 'done'
  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase('out'), 1500);
    return () => clearTimeout(t1);
  }, []);
  useEffect(() => {
    if (splashPhase !== 'out') return;
    const t2 = setTimeout(() => setSplashPhase('done'), 300);
    return () => clearTimeout(t2);
  }, [splashPhase]);

  // ---- navigation ------------------------------------------------------
  const [route, setRoute] = useState('feed'); // 'feed' | 'capture' | 'detail'
  const [detailId, setDetailId] = useState(null);
  const [shotMenu, setShotMenu] = useState(false);

  // ---- feed: selection, app menu, confirm dialog ------------------------
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [confirm, setConfirm] = useState(null); // {frame:'feed'|'shot', id} | {frame:'feed', ids}
  const [scrolled, setScrolled] = useState(false);

  // ---- feed: swipe-to-delete (one card open at a time) -------------------
  // Gesture state lives in a ref (pointermove fires fast and needs a
  // synchronous read of "where is the drag right now"); it's mirrored into
  // state so the feed re-renders as the card follows the finger.
  const [swipeOpenId, setSwipeOpenId] = useState(null);
  const [swipeDx, setSwipeDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const swipeRef = useRef({ id: null, dx: 0, dragging: false });
  const dragStartX = useRef(0);
  const dragged = useRef(false);

  function commitSwipe(id, dx, isDragging) {
    swipeRef.current = { id, dx, dragging: isDragging };
    setSwipeOpenId(id);
    setSwipeDx(dx);
    setDragging(isDragging);
  }

  // ---- feed: search jump + flash-highlight ------------------------------
  const [flash, setFlash] = useState(null);
  const [pendingScrollId, setPendingScrollId] = useState(null);
  const feedRef = useRef(null);
  const cardRefs = useRef({});
  const registerCardRef = useCallback((id, el) => {
    cardRefs.current[id] = el;
  }, []);

  useEffect(() => {
    if (pendingScrollId == null) return;
    const el = cardRefs.current[pendingScrollId];
    if (feedRef.current && el) {
      feedRef.current.scrollTo({ top: Math.max(0, el.offsetTop - 24), behavior: 'smooth' });
    }
    setPendingScrollId(null);
  }, [pendingScrollId]);

  // ---- capture sheet -----------------------------------------------------
  const [captureClosing, setCaptureClosing] = useState(false);
  const [draft, setDraft] = useState('');
  const [attached, setAttached] = useState(false);
  const [picker, setPicker] = useState(null); // null | 'menu' | 'library'
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const [saveVersion, setSaveVersion] = useState(0);
  const captureTimer = useRef(null);
  const saveTimer = useRef(null);
  const toastTimer = useRef(null);

  // ---- search overlay ------------------------------------------------------
  const [searching, setSearching] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [query, setQuery] = useState('');
  const searchCloseTimer = useRef(null);
  const flashTimer = useRef(null);

  const hintId = useSwipeHint(entries, route, saveVersion);

  useEffect(
    () => () => {
      clearTimeout(captureTimer.current);
      clearTimeout(saveTimer.current);
      clearTimeout(toastTimer.current);
      clearTimeout(searchCloseTimer.current);
      clearTimeout(flashTimer.current);
    },
    [],
  );

  // ---- feed handlers -------------------------------------------------------
  const onFeedScroll = useCallback((e) => {
    const on = e.currentTarget.scrollTop > 4;
    setScrolled((prev) => (prev !== on ? on : prev));
  }, []);

  function onSwipeDown(id, e) {
    dragStartX.current = e.clientX;
    dragged.current = false;
    const startDx = swipeRef.current.id === id ? swipeRef.current.dx : 0;
    commitSwipe(id, startDx, true);
  }

  function onSwipeMove(id, e) {
    const cur = swipeRef.current;
    if (!cur.dragging || cur.id !== id) return;
    if (Math.abs(e.clientX - dragStartX.current) > 6) dragged.current = true;
    const base = cur.dx <= -REVEAL ? -REVEAL : 0;
    const dx = Math.max(-REVEAL, Math.min(0, base + e.clientX - dragStartX.current));
    commitSwipe(id, dx, true);
  }

  function onSwipeUp(id) {
    const cur = swipeRef.current;
    if (cur.id !== id) return;
    const open = cur.dx < -REVEAL / 2;
    commitSwipe(open ? id : null, open ? -REVEAL : 0, false);
  }

  const swipe = { openId: swipeOpenId, dx: swipeDx, dragging, onDown: onSwipeDown, onMove: onSwipeMove, onUp: onSwipeUp };

  const onToggleSelect = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  function onToggleText(id) {
    if (dragged.current) return;
    const cur = swipeRef.current;
    if (cur.id === id && cur.dx <= -REVEAL / 2) {
      commitSwipe(null, 0, false);
      return;
    }
    toggleOpen(id);
  }

  const onOpenDetailFromCard = useCallback((id) => {
    if (dragged.current) return;
    setDetailId(id);
    setRoute('detail');
  }, []);

  const onRequestDelete = useCallback((id) => {
    setConfirm({ frame: 'feed', id });
  }, []);

  function onRequestDeleteSelected() {
    if (selected.size) setConfirm({ frame: 'feed', ids: Array.from(selected) });
  }

  const onCancelDelete = useCallback(() => {
    setConfirm(null);
    commitSwipe(null, 0, false);
  }, []);

  const onConfirmDelete = useCallback(() => {
    setConfirm((c) => {
      if (!c) return null;
      if (c.ids) deleteMany(c.ids);
      else deleteEntry(c.id);
      if (c.frame === 'shot') {
        setRoute('feed');
        setDetailId(null);
      }
      return null;
    });
    commitSwipe(null, 0, false);
    setSelecting(false);
    setSelected(new Set());
  }, [deleteEntry, deleteMany]);

  const onEnterSelect = useCallback(() => {
    setAppMenuOpen(false);
    setSelecting(true);
    setSelected(new Set());
    commitSwipe(null, 0, false);
  }, []);
  const onExitSelect = useCallback(() => {
    setSelecting(false);
    setSelected(new Set());
  }, []);

  // ---- capture handlers ----------------------------------------------------
  const openCapture = useCallback(() => {
    clearTimeout(captureTimer.current);
    setRoute('capture');
    setCaptureClosing(false);
    commitSwipe(null, 0, false);
  }, []);

  const closeCapture = useCallback(() => {
    clearTimeout(captureTimer.current);
    setRoute('feed');
    setCaptureClosing(true);
    setPicker(null);
    captureTimer.current = setTimeout(() => setCaptureClosing(false), 300);
  }, []);

  const onSave = useCallback(() => {
    if (saving) return;
    const text = draft.trim();
    const image = attached;
    if (!text && !image) return;
    setSaving(true);
    saveTimer.current = setTimeout(() => {
      addEntry(text, image);
      setSaving(false);
      setDraft('');
      setAttached(false);
      setToast(true);
      setRoute('feed');
      setCaptureClosing(true);
      captureTimer.current = setTimeout(() => setCaptureClosing(false), 300);
      setSaveVersion((v) => v + 1);
      toastTimer.current = setTimeout(() => setToast(false), 1600);
    }, 900);
  }, [saving, draft, attached, addEntry]);

  // ---- detail (screenshot) handlers -----------------------------------------
  const backToFeed = useCallback(() => {
    if (searching) {
      setSearching(false);
      setSearchClosing(true);
      clearTimeout(searchCloseTimer.current);
      searchCloseTimer.current = setTimeout(() => {
        setSearchClosing(false);
        setQuery('');
      }, 220);
      return;
    }
    setRoute('feed');
    setDetailId(null);
    setShotMenu(false);
    setConfirm(null);
  }, [searching]);

  function requestDeleteShot() {
    setShotMenu(false);
    setConfirm({ frame: 'shot', id: detailId });
  }

  // ---- search handlers -------------------------------------------------------
  const openSearch = useCallback(() => {
    clearTimeout(searchCloseTimer.current);
    setSearching(true);
    setSearchClosing(false);
    setQuery('');
    commitSwipe(null, 0, false);
  }, []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return entries.filter((e) => (e.text || '').toLowerCase().includes(q) || (e.timestamp || '').toLowerCase().includes(q));
  }, [entries, query]);

  const jumpToEntry = useCallback((id) => {
    clearTimeout(searchCloseTimer.current);
    clearTimeout(flashTimer.current);
    setSearching(false);
    setSearchClosing(false);
    setQuery('');
    setPendingScrollId(id);
    setFlash(id);
    flashTimer.current = setTimeout(() => setFlash(null), 1200);
  }, []);

  const results = searchResults.map((e) => ({
    id: e.id,
    timestamp: e.timestamp,
    tint: e.image ? 'var(--tint-screenshot)' : 'var(--tint-text)',
    ...snippet(e, query),
    onJump: () => jumpToEntry(e.id),
  }));
  const noResults = query.trim() !== '' && searchResults.length === 0;

  const typeKey = useCallback((k) => setQuery((q) => q + k), []);
  const backspaceKey = useCallback(() => setQuery((q) => q.slice(0, -1)), []);
  const spaceKey = useCallback(() => setQuery((q) => q + ' '), []);

  const detailEntry = entries.find((e) => e.id === detailId) || null;

  return (
    <div style={{ padding: 48, fontFamily: 'var(--font-sans)', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: 390,
          height: 844,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--surface-page)',
          border: '1px solid var(--line)',
          borderRadius: 44,
        }}
      >
        {route !== 'detail' ? (
          <Feed
            entries={entries}
            feedRef={feedRef}
            registerCardRef={registerCardRef}
            scrolled={scrolled}
            onScroll={onFeedScroll}
            selecting={selecting}
            selected={selected}
            onToggleSelect={onToggleSelect}
            onExitSelect={onExitSelect}
            onRequestDeleteSelected={onRequestDeleteSelected}
            appMenuOpen={appMenuOpen}
            onToggleAppMenu={() => setAppMenuOpen((v) => !v)}
            onCloseAppMenu={() => setAppMenuOpen(false)}
            onEnterSelect={onEnterSelect}
            swipe={swipe}
            hintId={hintId}
            flashId={flash}
            onRequestDelete={onRequestDelete}
            onToggleText={onToggleText}
            onOpenDetail={onOpenDetailFromCard}
            onOpenSearch={openSearch}
            onOpenCapture={openCapture}
            confirm={confirm}
            onCancelDelete={onCancelDelete}
            onConfirmDelete={onConfirmDelete}
          />
        ) : null}

        {route === 'capture' || captureClosing ? (
          <Capture
            closing={captureClosing}
            draft={draft}
            onDraftChange={setDraft}
            attached={attached}
            onAttachImage={() => setPicker('menu')}
            onRemoveAttachment={() => setAttached(false)}
            picker={picker}
            onOpenLibrary={() => setPicker('library')}
            onClosePicker={() => setPicker(null)}
            onSelectPhoto={() => {
              setAttached(true);
              setPicker(null);
            }}
            saving={saving}
            onSave={onSave}
            toast={toast}
            onClose={closeCapture}
          />
        ) : null}

        {route === 'detail' ? (
          <Detail
            entry={detailEntry}
            onBack={backToFeed}
            shotMenu={shotMenu}
            onToggleShotMenu={() => setShotMenu((v) => !v)}
            onCloseMenus={() => setShotMenu(false)}
            onEdit={() => setShotMenu(false)}
            onRequestDelete={requestDeleteShot}
            confirm={confirm}
            onCancelDelete={onCancelDelete}
            onConfirmDelete={onConfirmDelete}
          />
        ) : null}

        {searching || searchClosing ? (
          <SearchOverlay
            closing={searchClosing}
            query={query}
            onQuery={setQuery}
            onBack={backToFeed}
            results={results}
            noResults={noResults}
            onTypeKey={typeKey}
            onBackspace={backspaceKey}
            onSpace={spaceKey}
          />
        ) : null}

        {splashPhase !== 'done' ? <Splash fadingOut={splashPhase === 'out'} /> : null}

        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 9,
            transform: 'translateX(-50%)',
            width: 134,
            height: 5,
            borderRadius: 999,
            background: 'var(--ink-24)',
          }}
        />
      </div>
    </div>
  );
}
