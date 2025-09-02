export const colorMap: Record<string, string> = {
  // Original colors
  Gray: '#808080',
  Black: '#000000',
  Blue: '#1E90FF',
  Brown: '#8B4513',
  White: '#FFFFFF',
  Beige: '#F5F5DC',
  
  // NEW: Add all the hex codes from your sofaProducts mock data
  DarkBrown: '#5d4037',       // From product 1
  Grey: '#78909c',            // From product 1 (different shade of gray)
  LightBeige: '#f5f5f5',      // From product 2
  BlueGrey: '#90a4ae',        // From product 2
  DarkChocolate: '#3e2723',   // From product 3
  Cognac: '#d84315',          // From product 3
};

// Helper function to get color name from hex value
export function getColorName(hexCode: string): string | undefined {
  const hex = hexCode.toUpperCase();
  return Object.keys(colorMap).find(name => colorMap[name].toUpperCase() === hex);
}