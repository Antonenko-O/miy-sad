// Auto-imports all plant images from assets/images/plants/
// Vite's import.meta.glob loads only files that actually exist

const imageModules = import.meta.glob(
  '../../assets/images/plants/*.webp',
  { eager: true, import: 'default' }
) as Record<string, string>;

// Build a map: plantId → image URL
const imageMap: Record<string, string> = {};
for (const path in imageModules) {
  // path looks like: ../../assets/images/plants/troyanda-sadova.webp
  const filename = path.split('/').pop() ?? '';
  const plantId = filename.replace('.webp', '');
  imageMap[plantId] = imageModules[path];
}

/** Returns image URL for the plant, or null if not yet generated */
export function getPlantImage(plantId: string): string | null {
  return imageMap[plantId] ?? null;
}

/** Returns true if a plant image exists */
export function hasPlantImage(plantId: string): boolean {
  return plantId in imageMap;
}

/** How many plant images are available */
export const plantImageCount = Object.keys(imageMap).length;
