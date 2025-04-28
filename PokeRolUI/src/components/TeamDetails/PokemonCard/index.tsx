import React from 'react';
import { Box, Card, CardContent, Typography, styled } from '@mui/material';
import { Pokemon } from '../../../types/pokemon';
import { getBackgroundGradient } from '../constants/typeColors';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const PokemonImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 140,
  background: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const TypeChip = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'white',
  textTransform: 'capitalize',
  margin: theme.spacing(0, 0.5),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
}));

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  // Extract the type names from the Pokemon's type array
  const typeNames = pokemon.type || [];

  return (
    <StyledCard 
      onClick={onClick}
      sx={{ 
        background: getBackgroundGradient(typeNames),
      }}
    >
      <PokemonImage>
        {/* Display the Pokemon's PokeAPI ID image if it exists */}
        {pokemon.pokeApiId && (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokeApiId}.png`}
            alt={pokemon.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </PokemonImage>
      <CardContent sx={{ color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            #{pokemon.pokeApiId}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            Lvl {pokemon.level}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mb: 1, textTransform: 'capitalize' }}>
          {pokemon.name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {typeNames.map((type) => (
            <TypeChip key={type}>
              {type}
            </TypeChip>
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default PokemonCard; 