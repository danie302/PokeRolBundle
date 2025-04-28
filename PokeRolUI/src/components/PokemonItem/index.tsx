import React from 'react';
import { Grid, Box, CardMedia, Typography } from '@mui/material';
import { Pokemon } from '../../types/pokemon';
import { capitalizeFirstLetter } from '../../utils/utils';
interface PokemonItemProps {
  pokemon: Pokemon;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  // Generate image URL based on pokeApiId
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.isShiny ? 'shiny/' : ''}${pokemon.pokeApiId}.png`;
  
  return (
    <Grid size={3} sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      mt: 1
    }} key={pokemon.id}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 70,
            height: 70,
            objectFit: 'contain',
            mb: 1
          }}
          image={imageUrl}
          alt={pokemon.name}
        />
        <Typography variant="caption" align="center">
          {capitalizeFirstLetter(pokemon.name)}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PokemonItem; 