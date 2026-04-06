import React from 'react';
import { Plus } from 'lucide-react';
import { PlantIcon } from '../components/PlantIcon';
import type { CategoryId } from '../types';

const Pin = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

const mockGarden: { name: string; quantity: string; status: 'ok' | 'attention'; rotation: string; category: CategoryId }[] = [
  { name: 'Троянда Кримська', quantity: '3 кущі', status: 'ok', rotation: '-1deg', category: 'kvity' },
  { name: 'Лаванда', quantity: '5 рослин', status: 'attention', rotation: '0.8deg', category: 'kvity' },
  { name: 'Гортензія', quantity: '2 кущі', status: 'ok', rotation: '-0.5deg', category: 'kushchi' },
  { name: 'Яблуня', quantity: '1 дерево', status: 'ok', rotation: '1deg', category: 'plodovi' },
  { name: 'Самшит', quantity: '4 рослини', status: 'attention', rotation: '-0.7deg', category: 'dekoratyvni' },
  { name: 'Хоста', quantity: '6 рослин', status: 'ok', rotation: '0.6deg', category: 'kushchi' },
];

const accent = '#7C2D12';
const cardBg = '#FFF3E8';
const pinColor = '#7C2D12';

export function MyGardenScreen() {
  return (
    <div className="px-6 pt-12 pb-4">
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: accent, fontWeight: 600 }}>
        Мій сад
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#34552B', opacity: 0.6, marginTop: '4px', marginBottom: '24px' }}>
        {mockGarden.length} рослин · Весна
      </p>

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        {[
          { value: '3', label: 'Потребують поливу', rotation: '-0.8deg' },
          { value: '5', label: 'Цвітуть зараз', rotation: '0.5deg' },
          { value: 'завтра', label: 'Наступний догляд', rotation: '-0.3deg' },
        ].map((s) => (
          <div key={s.label} style={{
            padding: '12px 8px', textAlign: 'center',
            backgroundColor: '#FFFFFF', border: '1px solid #FFD4A8',
            transform: `rotate(${s.rotation})`,
            boxShadow: '2px 4px 12px rgba(124,45,18,0.08)', borderRadius: '4px',
          }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: accent, fontWeight: 600, marginBottom: '2px' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#34552B', opacity: 0.7 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Plant list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockGarden.map((plant, i) => (
          <div key={i} style={{
            position: 'relative', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: cardBg, transform: `rotate(${plant.rotation})`,
            boxShadow: '2px 4px 10px rgba(124,45,18,0.10)', borderRadius: '4px',
            transition: 'transform 0.2s ease',
          }}>
            <Pin color={pinColor} />
            <div style={{ flexShrink: 0 }}>
              <PlantIcon category={plant.category} color={accent} size={44} opacity={0.45} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: accent, fontWeight: 600, marginBottom: '2px' }}>
                {plant.name}
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#34552B', opacity: 0.6 }}>
                {plant.quantity}
              </p>
            </div>
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: plant.status === 'ok' ? '#22C55E' : '#F97316',
            }} />
          </div>
        ))}

        {/* Add card */}
        <div style={{
          padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
          border: '2px dashed #FFD4A8', transform: 'rotate(-0.5deg)', borderRadius: '4px',
          minHeight: '100px', cursor: 'pointer', backgroundColor: 'transparent',
        }}>
          <Plus size={28} color={accent} strokeWidth={1.5} />
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: accent, fontWeight: 500 }}>
            Додати рослину
          </span>
        </div>
      </div>
    </div>
  );
}
