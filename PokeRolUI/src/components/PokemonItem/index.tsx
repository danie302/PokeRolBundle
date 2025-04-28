import React from 'react';
import { Grid, Box, CardMedia, Typography } from '@mui/material';
import { Pokemon } from '../../types/pokemon';

interface PokemonItemProps {
  pokemon: Pokemon;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  return (
    <Grid size={3} key={pokemon.id}>
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
          image={'pokemon.image'}
          alt={pokemon.name}
        />
        <Typography variant="caption" align="center">
          {pokemon.name}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PokemonItem; 