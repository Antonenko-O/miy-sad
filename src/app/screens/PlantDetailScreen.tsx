import React from 'react';
import { getPlantById, getCompanions } from '../data/plants';
import { PlantIcon } from '../components/PlantIcon';
import { CATEGORY_CONFIG } from '../types';

const MONTHS = ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Вер','Жов','Лис','Гру'];

const Pin = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

interface PlantDetailScreenProps {
  plantId: string;
  onBack: () => void;
  onSelectPlant: (id: string) => void;
}

export function PlantDetailScreen({ plantId, onBack, onSelectPlant }: PlantDetailScreenProps) {
  const plant = getPlantById(plantId);
  if (!plant) return <div className="px-6 pt-12"><p>Рослину не знайдено</p></div>;

  const cfg = CATEGORY_CONFIG[plant.category];
  const companions = getCompanions(plant.companions);

  const careItems = [
    { emoji: '💧', label: 'Полив', value: plant.wateringFrequency },
    { emoji: '☀️', label: 'Сонце', value: plant.sun },
    { emoji: '🌱', label: 'Ґрунт', value: plant.soilType },
    { emoji: '✂️', label: 'Обрізка', value: plant.pruningTime },
    { emoji: '❄️', label: 'Зимівля', value: plant.winterCover },
    { emoji: '🪲', label: 'Хвороби', value: plant.diseases },
  ].filter((i) => i.value && i.value !== 'None' && i.value !== 'null');

  // Parse bloom months for calendar (simple version)
  const bloomText = plant.bloomMonths ?? '';
  const bloomMonthIndices = MONTHS.map((m, i) =>
    bloomText.toLowerCase().includes(m.toLowerCase()) ? i : -1
  ).filter((i) => i >= 0);

  const rotations = ['-0.8deg', '0.5deg', '-0.5deg', '0.7deg', '-0.6deg', '0.4deg'];

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: '220px', background: `linear-gradient(135deg, ${cfg.cardColor} 0%, ${cfg.tabColor} 100%)`,
        borderRadius: '0 0 16px 16px', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '48px', left: '24px',
            backgroundColor: 'rgba(255,255,255,0.9)', padding: '8px 14px',
            borderRadius: '20px', color: cfg.accent, fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer',
          }}
        >
          ← До каталогу
        </button>
        <PlantIcon category={plant.category} color={cfg.accent} size={100} opacity={0.4} />
      </div>

      <div className="px-6 pt-6">
        {/* Name */}
        <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: cfg.accent, fontWeight: 600, marginBottom: '4px' }}>
          {plant.name}
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: cfg.accent, fontStyle: 'italic', opacity: 0.7, marginBottom: '20px' }}>
          {plant.latinName}
        </p>

        {/* Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[plant.hardiness, plant.height ? `${plant.height} м` : null, plant.regions].filter(Boolean).map((chip) => (
            <div key={chip} style={{
              backgroundColor: cfg.cardColor, border: `1px solid ${cfg.accent}`,
              padding: '6px 12px', borderRadius: '16px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: cfg.accent, fontWeight: 500,
            }}>
              {chip}
            </div>
          ))}
        </div>

        {/* Add button */}
        <button style={{
          width: '100%', backgroundColor: cfg.accent, color: '#FFFFFF',
          padding: '14px', borderRadius: '4px', border: 'none', cursor: 'pointer',
          fontFamily: 'Caveat, cursive', fontSize: '22px', fontWeight: 600, marginBottom: '32px',
        }}>
          + Додати до мого саду
        </button>

        {/* Care */}
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: cfg.accent, fontWeight: 600, marginBottom: '16px' }}>
          Догляд
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {careItems.map((item, i) => (
            <div key={i} style={{
              position: 'relative', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: cfg.cardColor,
              transform: `rotate(${rotations[i % rotations.length]})`,
              boxShadow: `2px 4px 10px rgba(0,0,0,0.08)`, borderRadius: '4px',
            }}>
              <Pin color={cfg.pinColor} />
              <div style={{ fontSize: '20px' }}>{item.emoji}</div>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: cfg.accent, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: cfg.accent, opacity: 0.75 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Seasonal calendar */}
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: cfg.accent, fontWeight: 600, marginBottom: '12px' }}>
          Сезонний календар
        </h2>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            {MONTHS.map((m) => (
              <div key={m} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '9px', color: cfg.accent, opacity: 0.5, width: '8.33%', textAlign: 'center' }}>{m}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '2px', height: '28px' }}>
            {MONTHS.map((_, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: '2px',
                backgroundColor: bloomMonthIndices.includes(i) ? cfg.tabColor : 'transparent',
                border: bloomMonthIndices.includes(i) ? 'none' : `1px dashed ${cfg.accent}30`,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
            {[{ color: cfg.tabColor, label: 'Цвітіння' }, { color: cfg.accent, label: 'Посадка' }, { color: '#FFE4CC', label: 'Обрізка' }].map((leg) => (
              <div key={leg.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: leg.color, borderRadius: '2px' }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: cfg.accent, opacity: 0.7 }}>{leg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companions */}
        {companions.length > 0 && (
          <>
            <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: cfg.accent, fontWeight: 600, marginBottom: '16px' }}>
              Добре поєднується з
            </h2>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
              {companions.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => onSelectPlant(c.id)}
                  style={{
                    position: 'relative', flexShrink: 0, padding: '16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    backgroundColor: cfg.cardColor, minWidth: '110px',
                    transform: `rotate(${i % 2 === 0 ? '-0.8deg' : '0.5deg'})`,
                    boxShadow: '2px 4px 10px rgba(0,0,0,0.08)', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  <Pin color={cfg.pinColor} />
                  <PlantIcon category={c.category} color={cfg.accent} size={40} opacity={0.6} />
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', color: cfg.accent, fontWeight: 600, textAlign: 'center' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '14px', color: cfg.accent }}>→</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Fun fact */}
        {plant.funFact && plant.funFact !== 'null' && (
          <div style={{
            margin: '16px 0 32px', padding: '16px', borderRadius: '4px',
            backgroundColor: cfg.cardColor, transform: 'rotate(-0.4deg)',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.07)', position: 'relative',
          }}>
            <Pin color={cfg.pinColor} />
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: cfg.accent, opacity: 0.85, fontStyle: 'italic' }}>
              🌿 {plant.funFact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
