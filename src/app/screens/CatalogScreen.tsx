import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { CatalogCard } from '../components/CatalogCard';
import { catalog, searchPlants } from '../data/plants';
import type { CategoryId } from '../types';

type FilterId = 'all' | CategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Усі' },
  { id: 'kvity', label: 'Квіти' },
  { id: 'kushchi', label: 'Кущі' },
  { id: 'plodovi', label: 'Плодові' },
  { id: 'dekoratyvni', label: 'Декоративні' },
];

interface CatalogScreenProps {
  onSelectPlant: (id: string) => void;
}

export function CatalogScreen({ onSelectPlant }: CatalogScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');

  const accent = '#1E3A5F';

  const plants = useMemo(() => {
    if (query.trim().length > 1) return searchPlants(query);
    if (activeFilter === 'all') return catalog.plants;
    return catalog.plants.filter((p) => p.category === activeFilter);
  }, [activeFilter, query]);

  return (
    <div className="px-6 pt-12 pb-4">
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: accent, fontWeight: 600, marginBottom: '4px' }}>
        Каталог рослин 🌱
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: accent, opacity: 0.6, marginBottom: '20px' }}>
        Знайдіть ідеальні рослини для вашого саду
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Пошук рослин..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px',
            border: `1px solid #BBFFD8`, borderRadius: '24px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: accent,
            backgroundColor: '#FFFFFF', outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => { setActiveFilter(f.id); setQuery(''); }}
            style={{
              backgroundColor: activeFilter === f.id ? accent : 'transparent',
              color: activeFilter === f.id ? '#FFFFFF' : accent,
              border: `1px solid ${accent}`,
              padding: '8px 16px', borderRadius: '20px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
              whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingBottom: '8px' }}>
        {plants.map((plant, index) => (
          <div key={plant.id} onClick={() => onSelectPlant(plant.id)} style={{ cursor: 'pointer' }}>
            <CatalogCard
              name={plant.name}
              latinName={plant.latinName ?? ''}
              category={plant.category}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* FAB */}
      <button
        style={{
          position: 'fixed', bottom: '84px', right: '24px',
          width: '52px', height: '52px', borderRadius: '50%',
          backgroundColor: accent, color: '#FFFFFF', border: 'none',
          boxShadow: '0 4px 12px rgba(30,58,95,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 20,
        }}
      >
        <Plus size={22} />
      </button>
    </div>
  );
}
