import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pokemon } from '../../types/pokemon';
import PokemonItem from '../PokemonItem';

interface TeamCardProps {
  team: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onEdit, onDelete }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }} key={team.id}>
      <Card 
        sx={{ 
          height: '100%',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography 
              variant="h5" 
              component="h2"
              sx={{ 
                fontWeight: 'bold',
                color: '#3B4CCA'
              }}
            >
              {team.name}
            </Typography>
            <Chip 
              label={`${team.pokemons.length} Pokémon`} 
              size="small"
              sx={{ 
                bgcolor: '#FFDE00',
                color: '#3B4CCA',
                fontWeight: 'bold'
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {team.description}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={1}>
            {team.pokemons.map((pokemon: Pokemon) => (
              <PokemonItem 
                key={pokemon.id} 
                pokemon={pokemon} 
              />
            ))}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <IconButton 
            size="small" 
            onClick={() => onEdit(team.id)}
            sx={{ color: '#3B4CCA' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(team.id)}
            sx={{ color: '#CC0000' }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TeamCard; 