import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { PokemonSelectorProps, SelectedPokemonListProps } from './types';
import { Pokemon } from '../../types/pokemon';
import { getPokemonImageUrl } from '../../utils/utils';

// Mock data for Pokemon search - this would be replaced with actual API calls
const mockPokemons: Pokemon[] = [
  {
    id: '1',
    pokeApiId: '1',
    userId: '1',
    name: 'Bulbasaur',
    type: ['Grass', 'Poison'],
    level: 1,
    experience: 0,
    nature: 'Hardy',
    ability: {
      name: 'Overgrow',
      description: 'When this Pokémon has just one or two types, it has a 10% chance to change its type to the other type of the same Pokémon species.'
    },
    weight: 69,
    height: 7,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45
    },
    ivs: {
      hp: 30,
      attack: 30,
      defense: 30,
      specialAttack: 30,
      specialDefense: 30,
      speed: 30
    },
    evs: {
      hp: 30,
      attack: 30,
      defense: 30,
      specialAttack: 30,
      specialDefense: 30,
      speed: 30
    },
    moves: [],
    description: 'Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with a cream-colored underside. It has large, dark green eyes and a wide, friendly smile. Its ears are short and rounded, and it has a small, pointed snout. Bulbasaur has a pair of small, sharp claws on its forepaws and a pair of large, sharp claws on its hindpaws.',
    isShiny: false
  },
  {
    id: '2',
    pokeApiId: '2',
    userId: '1',
    name: 'Ivysaur',
    type: ['Grass', 'Poison'],
    level: 1,
    experience: 0,
    nature: 'Hardy',
    ability: {
      name: 'Overgrow',
      description: 'When this Pokémon has just one or two types, it has a 10% chance to change its type to the other type of the same Pokémon species.'
    },
    weight: 130,
    height: 10,
    stats: {
      hp: 60,
      attack: 62,
      defense: 63, 
      specialAttack: 80,
      specialDefense: 80,
      speed: 60
    },
    ivs: {
      hp: 30,
      attack: 30,
      defense: 30,
      specialAttack: 30,
      specialDefense: 30,
      speed: 30
    },
    evs: {
      hp: 30,
      attack: 30,
      defense: 30,
      specialAttack: 30,
      specialDefense: 30,
      speed: 30
    },
    moves: [],
    description: 'Ivysaur is a larger, more muscular version of Bulbasaur. It has a more pronounced jawline and a more pronounced chest. Its ears are longer and more pointed, and it has a more pronounced snout. Ivysaur has a pair of small, sharp claws on its forepaws and a pair of large, sharp claws on its hindpaws.',
    isShiny: false
  }
];

// Component for displaying selected pokemons
function SelectedPokemonList({ pokemons, onRemove }: SelectedPokemonListProps) {
  if (pokemons.length === 0) {
    return <Typography variant="body2" color="text.secondary">No Pokémon selected yet</Typography>;
  }

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: 2, 
      mt: 2 
    }}>
      {pokemons.map((pokemon) => (
        <Box 
          key={pokemon.id} 
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          <Box sx={{ 
            width: 40, 
            height: 40, 
            mr: 1, 
            bgcolor: 'grey.100', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {pokemon.pokeApiId && (
              <img 
                src={getPokemonImageUrl(pokemon.pokeApiId)} 
                alt={pokemon.name} 
                style={{ width: 35, height: 35, objectFit: 'contain' }}
              />
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" fontWeight="medium">{pokemon.name}</Typography>
            <Typography variant="caption" color="text.secondary">{pokemon.type}</Typography>
          </Box>
          <Button 
            variant="text" 
            size="small"
            onClick={() => onRemove(pokemon.id)}
            color="error"
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            &times;
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export function PokemonSelector({ 
  selectedPokemons, 
  onAddPokemon, 
  onRemovePokemon 
}: PokemonSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Simulate API search with mock data
    const results = mockPokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
        Select Pokémon (Max 6)
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <TextField
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            size="small"
          />
          
          {searchResults.length > 0 && (
            <Box sx={{ 
              mt: 1, 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: 1,
              maxHeight: 200,
              overflow: 'auto'
            }}>
              {searchResults.map(pokemon => (
                <Box 
                  key={pokemon.id}
                  sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1,
                    '&:hover': { bgcolor: 'action.hover' },
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    onAddPokemon(pokemon);
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                >
                  <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    mr: 1, 
                    bgcolor: 'grey.100', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {pokemon.pokeApiId && (
                      <img 
                        src={getPokemonImageUrl(pokemon.pokeApiId)} 
                        alt={pokemon.name} 
                        style={{ width: 50, height: 50, objectFit: 'contain' }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2">{pokemon.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    {pokemon.type}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        
        <Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            Selected Pokémon
          </Typography>
          <SelectedPokemonList 
            pokemons={selectedPokemons} 
            onRemove={onRemovePokemon} 
          />
        </Box>
      </Box>
    </Box>
  );
} 