import { typeColors } from "../components/TeamDetails/constants/typeColors";
import { PokemonSearchResult } from "../components/TeamDetails/types";
import { Pokemon } from "../types/pokemon";

export const getPokemonImageUrl = (pokemonId: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getBackgroundGradient = (pokemon: Pokemon | PokemonSearchResult) => {
    if (!pokemon) return '';
    
    let types: string[];
    if ('types' in pokemon) {
        // Handle PokemonSearchResult
        if (!pokemon.types || pokemon.types.length === 0) return '';
        types = pokemon.types.map(t => t.type.name);
    } else {
        // Handle Pokemon
        if (!pokemon.type || pokemon.type.length === 0) return '';
        types = pokemon.type;
    }
    
    const primaryType = types[0];
    const secondaryType = types.length > 1 ? types[1] : primaryType;
    
    const color1 = typeColors[primaryType] || '#3B4CCA';
    const color2 = typeColors[secondaryType] || '#3B4CCA';
    
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};