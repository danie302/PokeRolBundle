import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useTranslation } from 'react-i18next';
import { Pokemon } from '../../types/pokemon';
import PokemonItem from '../PokemonItem';
import { useNavigate, useParams } from 'react-router-dom';
import { selectedPokemon } from '../../store/pokemons/pokemon';
import { useAppDispatch } from '../../store/store';

interface PokemonListProps {
  pokemons: Pokemon[];
  onAddPokemon: () => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onAddPokemon }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { teamId } = useParams();
  const dispatch = useAppDispatch();
  const navigateToPokemonDetails = (pokemon: Pokemon) => {
    dispatch(selectedPokemon(pokemon));
    navigate(`/team/${teamId}/${pokemon.id}`);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        background: 'rgba(59, 76, 202, 0.05)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CatchingPokemonIcon sx={{ mr: 1, color: '#3B4CCA' }} />
          <Typography variant="h6" fontWeight="500" color="#3B4CCA">
            {t('team.pokemon')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddPokemon}
          size="small"
          sx={{
            bgcolor: '#3B4CCA',
            '&:hover': {
              bgcolor: '#2A3A9B'
            }
          }}
        >
          {t('team.addPokemon')}
        </Button>
      </Box>

      <Divider />

      {pokemons.length === 0 ? (
        <Box sx={{
          textAlign: 'center',
          py: 8,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CatchingPokemonIcon sx={{ fontSize: 60, color: 'rgba(0,0,0,0.2)', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {t('team.noPokemon')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddPokemon}
            sx={{
              bgcolor: '#3B4CCA',
              '&:hover': {
                bgcolor: '#2A3A9B'
              }
            }}
          >
            {t('team.addFirstPokemon')}
          </Button>
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2} columns={12}>
            {pokemons.map((pokemon: Pokemon) => (
              <Grid size={{ sm: 6, md: 3, lg: 2 }} key={pokemon.id}>
                <Box
                  onClick={() =>navigateToPokemonDetails(pokemon)}
                  sx={{
                    p: 2,
                    margin: 'auto',
                    borderRadius: 2,
                    transition: '0.3s all',
                    '&:hover': {
                      bgcolor: 'rgba(59, 76, 202, 0.05)',
                      transform: 'translateY(-5px)'
                    }
                  }}>
                  <PokemonItem pokemon={pokemon} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default PokemonList; 