interface TypeColors {
  [key: string]: string;
}

export const typeColors: TypeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

/**
 * Returns a CSS gradient based on the Pokémon's types
 */
export const getBackgroundGradient = (types: string[]): string => {
  if (!types || types.length === 0) {
    return 'linear-gradient(to bottom right, #f5f5f5, #e0e0e0)';
  }

  if (types.length === 1) {
    const color = typeColors[types[0]] || '#f5f5f5';
    return `linear-gradient(to bottom right, ${color}, ${color}88)`;
  }

  const color1 = typeColors[types[0]] || '#f5f5f5';
  const color2 = typeColors[types[1]] || '#e0e0e0';
  
  return `linear-gradient(to bottom right, ${color1}, ${color2})`;
}; 