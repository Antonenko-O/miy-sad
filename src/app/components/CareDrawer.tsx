import React, { useEffect } from 'react';

interface CareItem {
  plantName: string;
  instruction: string;
  volume?: string;
  tip?: string;
}

interface CareDrawerProps {
  open: boolean;
  onClose: () => void;
  type: 'water' | 'prune' | 'fertilize' | null;
}

const CARE_DATA: Record<'water' | 'prune' | 'fertilize', { title: string; emoji: string; color: string; items: CareItem[] }> = {
  water: {
    title: 'Полив сьогодні',
    emoji: '💧',
    color: '#DBEAFE',
    items: [
      { plantName: 'Троянда садова', instruction: 'Полив під корінь, уникати листя', volume: '10–15 л', tip: 'Краще зранку або ввечері' },
      { plantName: 'Піон лікарський', instruction: 'Рясний полив раз на тиждень', volume: '8–10 л', tip: 'Не мочити бутони' },
      { plantName: 'Гортензія', instruction: 'Рясний полив, ґрунт завжди вологий', volume: '15–20 л', tip: 'Любить дощову воду' },
      { plantName: 'Лаванда', instruction: 'Помірний полив після висихання ґрунту', volume: '3–5 л', tip: 'Перезволоження шкідливе' },
      { plantName: 'Яблуня', instruction: 'Полив в зону крони', volume: '30–40 л', tip: 'Особливо важливо при плодоношенні' },
    ],
  },
  prune: {
    title: 'Обрізка сьогодні',
    emoji: '✂️',
    color: '#DCFCE7',
    items: [
      { plantName: 'Троянда садова', instruction: 'Формуюча обрізка на 3–5 бруньок', tip: 'Зріз під кутом 45°, вище бруньки на 5 мм' },
      { plantName: 'Смородина чорна', instruction: 'Видалити старі гілки (старші 4 років)', tip: 'Залишити 5–7 сильних пагонів' },
    ],
  },
  fertilize: {
    title: 'Підживлення сьогодні',
    emoji: '🌱',
    color: '#FEF9C3',
    items: [
      { plantName: 'Троянда садова', instruction: 'Азот + калій (квітневе підживлення)', tip: 'Після поливу, не на суху землю' },
      { plantName: 'Гортензія', instruction: 'Добриво для рододендронів (кисле)', tip: 'pH ґрунту 4.5–5.5' },
      { plantName: 'Яблуня', instruction: 'Карбамід 30 г/м² по проекції крони', tip: 'Розчинити у воді і полити' },
    ],
  },
};

export function CareDrawer({ open, onClose, type }: CareDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!type) return null;
  const data = CARE_DATA[type];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 100, opacity: open ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: '#FEFAF8',
        borderRadius: '20px 20px 0 0',
        zIndex: 101,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        maxHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        paddingBottom: '80px',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '8px' }}>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#34552B', opacity: 0.2, borderRadius: '2px' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 24px 16px',
          borderBottom: '1px solid #34552B15',
        }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: '#34552B', fontWeight: 600 }}>
            {data.emoji} {data.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '20px', color: '#34552B', opacity: 0.5, padding: '4px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Plant list */}
        <div style={{ overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{
              backgroundColor: data.color,
              borderRadius: '4px',
              padding: '14px 16px',
              transform: `rotate(${i % 2 === 0 ? '-0.5deg' : '0.4deg'})`,
              boxShadow: '2px 4px 10px rgba(0,0,0,0.06)',
              position: 'relative',
            }}>
              {/* Star pin */}
              <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#34552B">
                  <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
                </svg>
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '20px', color: '#34552B', fontWeight: 600, marginBottom: '4px' }}>
                {item.plantName}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#34552B', marginBottom: item.tip ? '6px' : 0 }}>
                {item.instruction}
                {item.volume && <span style={{ fontWeight: 600 }}> · {item.volume}</span>}
              </div>
              {item.tip && (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#34552B', opacity: 0.6, fontStyle: 'italic' }}>
                  💡 {item.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
