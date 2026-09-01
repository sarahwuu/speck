import IconButton from '../ds/IconButton.jsx';
import SearchField from '../ds/SearchField.jsx';
import EmptyState from '../ds/EmptyState.jsx';
import { RESULT_BLOB } from '../lib/blobs.js';

const ROW1 = 'qwertyuiop'.split('');
const ROW2 = 'asdfghjkl'.split('');
const ROW3 = 'zxcvbnm'.split('');

function Key({ onClick, flex = 1, bg = 'var(--white)', size = 20, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex,
        height: 44,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        border: 'none',
        borderRadius: 6,
        background: bg,
        font: `500 ${size}px/1 var(--font-sans)`,
        color: 'var(--ink)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

/**
 * The search overlay: the feed stays visible and dims under a scrim, a
 * search bar lands exactly on the app bar's line, and a live on-screen
 * keyboard drives the query. Results are a lightweight hairline-divided
 * list, not the full feed card.
 */
export default function SearchOverlay({ closing, query, onQuery, onBack, results, noResults, onTypeKey, onBackspace, onSpace }) {
  const noop = () => {};
  const resultsPad = query.trim() ? '16px 24px 24px' : '0px';

  return (
    <>
      <div
        onClick={onBack}
        style={{ position: 'absolute', inset: 0, background: 'var(--ink-16)', animation: closing ? 'speck-scrim-out 220ms ease-out both' : 'speck-scrim-in 200ms ease-out both' }}
      />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
        <div
          style={{
            pointerEvents: 'auto',
            background: 'var(--surface-page)',
            borderBottom: '1px solid var(--line)',
            padding: '68px 24px 12px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flex: 'none',
            animation: closing ? 'speck-bar-out 200ms ease-out both' : 'speck-bar-in 220ms cubic-bezier(0.2,0.8,0.2,1) both',
          }}
        >
          <IconButton name="back" label="close search" onClick={onBack} />
          <SearchField
            value={query}
            onChange={onQuery}
            autoFocus
            style={{ flex: 1, animation: closing ? 'speck-field-out 200ms ease-out both' : 'speck-field-in 260ms cubic-bezier(0.2,0.8,0.2,1) both' }}
          />
        </div>

        <div
          style={{
            pointerEvents: 'auto',
            flex: 'none',
            maxHeight: 340,
            overflowY: 'auto',
            background: 'var(--surface-page)',
            borderBottom: '1px solid var(--line)',
            padding: resultsPad,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {results.map((hit) => (
            <div
              key={hit.id}
              onClick={hit.onJump}
              style={{ cursor: 'pointer', padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 8, height: 8, flex: 'none', borderRadius: RESULT_BLOB, transform: 'rotate(-8deg)', background: hit.tint }} />
                <span style={{ font: '500 13px/1.45 var(--font-sans)', color: 'var(--text-meta)' }}>{hit.timestamp}</span>
              </div>
              <p style={{ margin: 0, font: '500 16px/1.45 var(--font-sans)', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {hit.before}
                <span style={{ fontWeight: 620, color: 'var(--primary-700)' }}>{hit.match}</span>
                {hit.after}
              </p>
            </div>
          ))}
          {noResults ? (
            <EmptyState size="small" title={`no entries match “${query.trim()}”.`}>
              try a shorter word, or a word the entry actually used.
            </EmptyState>
          ) : null}
        </div>

        <div onClick={onBack} style={{ flex: 1, pointerEvents: 'auto' }} />

        <div
          style={{
            animation: closing ? 'speck-keys-out 220ms ease-out both' : 'speck-keys-in 260ms cubic-bezier(0.2,0.8,0.2,1) both',
            pointerEvents: 'auto',
            flex: 'none',
            background: 'var(--neutral-200)',
            padding: '8px 3px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            {ROW1.map((k) => (
              <Key key={k} onClick={() => onTypeKey(k)}>
                {k}
              </Key>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '0 16px' }}>
            {ROW2.map((k) => (
              <Key key={k} onClick={() => onTypeKey(k)}>
                {k}
              </Key>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Key onClick={noop} flex={1.5} bg="var(--neutral-300)" size={16}>
              ⇧
            </Key>
            {ROW3.map((k) => (
              <Key key={k} onClick={() => onTypeKey(k)}>
                {k}
              </Key>
            ))}
            <Key onClick={onBackspace} flex={1.5} bg="var(--neutral-300)" size={16}>
              ⌫
            </Key>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Key onClick={noop} flex={1.5} bg="var(--neutral-300)" size={14}>
              123
            </Key>
            <Key onClick={onSpace} flex={5} size={14}>
              space
            </Key>
            <button
              type="button"
              onClick={noop}
              style={{ flex: 2, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, border: 'none', borderRadius: 6, background: 'var(--ink)', font: '540 14px/1 var(--font-sans)', color: 'var(--white)', cursor: 'pointer' }}
            >
              search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
