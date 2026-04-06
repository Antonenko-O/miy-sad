import React from 'react';
import { Plus } from 'lucide-react';
import { CareCard } from '../components/CareCard';
import { PlantCard } from '../components/PlantCard';
import { catalog } from '../data/plants';

const WaterIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 30C22 30 25 27 25 23C25 19 18 10 18 10C18 10 11 19 11 23C11 27 14 30 18 30Z"
      stroke="#34552B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PruneIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M10 26L16 20M26 10L20 16M20 16L18 14L10 22L12 24L20 16Z"
      stroke="#34552B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="12" r="4" stroke="#34552B" strokeWidth="1" />
  </svg>
);

const FertilizeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 8C18 8 12 14 12 20C12 24 14 27 18 28C22 27 24 24 24 20C24 14 18 8 18 8Z"
      stroke="#34552B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 28V34M15 31H21" stroke="#34552B" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Show only first 6 plants from catalog for the home preview
const previewPlants = catalog.plants.slice(0, 6);

interface HomeScreenProps {
  onAddPlant: () => void;
}

export function HomeScreen({ onAddPlant }: HomeScreenProps) {
  const now = new Date();
  const days = ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', 'п\'ятницю', 'суботу'];
  const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
    'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
  const season = ['Зима', 'Зима', 'Весна', 'Весна', 'Весна', 'Літо',
    'Літо', 'Літо', 'Осінь', 'Осінь', 'Осінь', 'Зима'][now.getMonth()];
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} · ${season}`;

  return (
    <div className="px-6 pt-12 pb-4">
      {/* Greeting */}
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: '#34552B', fontWeight: 600, lineHeight: 1.2 }}>
        Доброго ранку, Ольго 🌿
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#34552B', opacity: 0.6, marginTop: '4px', marginBottom: '32px' }}>
        {dateStr}
      </p>

      {/* Care Cards */}
      <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: '#34552B', fontWeight: 500, marginBottom: '16px' }}>
        Сьогодні потрібен догляд
      </h2>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px' }}>
        <CareCard icon={<WaterIcon />} title="Полив" count={5} rotation="-1.5deg" />
        <CareCard icon={<PruneIcon />} title="Обрізка" count={2} rotation="0.5deg" />
        <CareCard icon={<FertilizeIcon />} title="Підживлення" count={3} rotation="-0.8deg" />
      </div>

      {/* My Garden Preview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: '#34552B', fontWeight: 500 }}>
          Мій сад
        </h2>
        <button
          onClick={onAddPlant}
          style={{
            backgroundColor: '#34552B', color: '#FEFAF8', borderRadius: '4px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', border: 'none', cursor: 'pointer',
          }}
        >
          <Plus size={16} /> Додати
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {previewPlants.map((plant, index) => (
          <PlantCard key={plant.id} name={plant.name} latinName={plant.latinName ?? ''} category={plant.category} index={index} />
        ))}
      </div>
    </div>
  );
}
