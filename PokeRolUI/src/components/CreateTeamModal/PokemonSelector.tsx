import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { PokemonSelectorProps, SimplePokemon, SelectedPokemonListProps } from './types';

// Mock data for Pokemon search - this would be replaced with actual API calls
const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'Bulbasaur', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', type: 'Grass' },
  { id: '4', name: 'Charmander', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', type: 'Fire' },
  { id: '7', name: 'Squirtle', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png', type: 'Water' },
  { id: '25', name: 'Pikachu', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', type: 'Electric' },
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
            {pokemon.imageUrl && (
              <img 
                src={pokemon.imageUrl} 
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
  const [searchResults, setSearchResults] = useState<SimplePokemon[]>([]);

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
                    width: 32, 
                    height: 32, 
                    mr: 1, 
                    bgcolor: 'grey.100', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {pokemon.imageUrl && (
                      <img 
                        src={pokemon.imageUrl} 
                        alt={pokemon.name} 
                        style={{ width: 24, height: 24, objectFit: 'contain' }}
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