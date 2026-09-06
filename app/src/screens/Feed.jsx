import EntryCard from '../components/EntryCard.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import IconButton from '../ds/IconButton.jsx';
import QuickCaptureButton from '../ds/QuickCaptureButton.jsx';
import EmptyState from '../ds/EmptyState.jsx';
import logoMarkInk from '../assets/logo/speck-mark-ink.png';
import { SAFE_BOTTOM, SAFE_TOP } from '../lib/safeArea.js';

function selectedLabelFor(count) {
  if (count === 0) return 'select entries';
  if (count === 1) return '1 selected';
  return `${count} selected`;
}

export default function Feed({
  entries,
  feedRef,
  registerCardRef,
  scrolled,
  onScroll,
  selecting,
  selected,
  onToggleSelect,
  onExitSelect,
  onRequestDeleteSelected,
  onEnterSelect,
  swipe,
  hintId,
  flashId,
  onRequestDelete,
  onToggleText,
  onOpenDetail,
  onOpenSearch,
  onOpenCapture,
  confirm,
  onCancelDelete,
  onConfirmDelete,
}) {
  const selectedCount = selected.size;
  const noneSelected = selectedCount === 0;
  const deleteColor = noneSelected ? 'var(--neutral-500)' : 'var(--secondary-700)';

  const confirmTitle = confirm && confirm.ids ? `delete ${confirm.ids.length} entries?` : 'delete this entry?';

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', paddingTop: SAFE_TOP }}>
      {selecting ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '24px 24px 12px',
            flex: 'none',
            background: 'var(--surface-page)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <button
            type="button"
            onClick={onExitSelect}
            style={{ height: 44, padding: 0, border: 'none', background: 'transparent', font: '500 16px/1 var(--font-sans)', color: 'var(--ink)', cursor: 'pointer' }}
          >
            cancel
          </button>
          <span style={{ flex: 1, textAlign: 'center', font: '500 16px/1 var(--font-sans)', color: 'var(--muted)' }}>
            {selectedLabelFor(selectedCount)}
          </span>
          <button
            type="button"
            onClick={onRequestDeleteSelected}
            disabled={noneSelected}
            style={{ height: 44, padding: 0, border: 'none', background: 'transparent', font: '500 16px/1 var(--font-sans)', color: deleteColor, cursor: 'pointer' }}
          >
            delete
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '24px 12px 12px 24px',
            flex: 'none',
            background: 'var(--surface-page)',
            borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
            transition: 'border-color var(--motion-transition)',
          }}
        >
          <span role="img" aria-label="speck" style={{ flex: 1, marginRight: 'auto', display: 'inline-flex', alignItems: 'center', gap: 11 }}>
            <img src={logoMarkInk} alt="" style={{ width: 26, height: 26, display: 'block' }} />
            <span style={{ font: '500 24px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--ink)' }}>speck</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 'none', marginLeft: 'auto' }}>
            <IconButton name="search" label="search entries" iconSize={22} onClick={onOpenSearch} />
            <IconButton name="check-circle" label="select entries" iconSize={22} onClick={onEnterSelect} />
          </div>
        </div>
      )}

      <div
        onScroll={onScroll}
        ref={feedRef}
        style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 120px', display: 'flex', flexDirection: 'column', gap: 24 }}
      >
        <p style={{ margin: 0, font: "italic 400 24px/1.3 'Libertinus Serif',Georgia,serif", color: 'var(--ink)' }}>
          what caught your eye today?
        </p>

        {entries.length === 0 ? (
          <EmptyState title="nothing here yet.">tap + to save the next line that catches you.</EmptyState>
        ) : (
          entries.map((entry) => {
            const isActive = swipe.openId === entry.id;
            return (
              <EntryCard
                key={entry.id}
                entry={entry}
                registerCardRef={registerCardRef}
                dx={isActive ? swipe.dx : 0}
                dragging={isActive && swipe.dragging}
                hinting={hintId === entry.id}
                flashing={flashId === entry.id}
                selecting={selecting}
                selected={selected.has(entry.id)}
                onToggleSelect={onToggleSelect}
                onPointerDown={swipe.onDown}
                onPointerMove={swipe.onMove}
                onPointerUp={swipe.onUp}
                onRequestDelete={onRequestDelete}
                onToggleText={onToggleText}
                onOpenDetail={onOpenDetail}
              />
            );
          })
        )}
      </div>

      {confirm && confirm.frame === 'feed' ? (
        <ConfirmDialog title={confirmTitle} onCancel={onCancelDelete} onConfirm={onConfirmDelete} />
      ) : null}

      <QuickCaptureButton fixed={false} onClick={onOpenCapture} label="new entry" style={{ position: 'absolute', right: 24, bottom: SAFE_BOTTOM(48) }} />
    </div>
  );
}
