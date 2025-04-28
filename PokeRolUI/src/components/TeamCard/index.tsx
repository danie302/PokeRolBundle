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
  Chip,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../../types/pokemon';
import PokemonItem from '../PokemonItem';

interface TeamCardProps {
  team: any;
  onDelete: (id: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onDelete }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  
  const handleCardClick = () => {
    navigate(`/team/${team.id}`);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    onDelete(team.id);
  };
  
  return (
    <Grid size={{ xs: 12, md: 6 }} key={team.id}>
      <Card 
        sx={{ 
          height: '100%',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
          }
        }}
        onClick={handleCardClick}
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
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
              {team.pokemons.slice(0, isMobile ? 4 : 6).map((pokemon: Pokemon) => (
                <PokemonItem 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                />
              ))}
            </Box>
            {team.pokemons.length > (isMobile ? 4 : 6) && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%', 
                mt: 1 
              }}>
                <Typography variant="body2" color="primary">
                  +{team.pokemons.length - (isMobile ? 4 : 6)} more
                </Typography>
              </Box>
            )}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <IconButton 
            size="small" 
            onClick={handleDeleteClick}
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