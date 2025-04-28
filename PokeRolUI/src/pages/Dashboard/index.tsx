import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Pokemon } from '../../types/pokemon';
import { RootState, useAppSelector, useAppDispatch } from '../../store/store';
import { deleteTeam, fetchUserTeams } from '../../services/teams';
import { removeTeam, setTeams } from '../../store/teams/teams';

// Mock teams data for demonstration
// const mockTeams = [
//   {
//     id: 1,
//     name: 'My First Team',
//     description: 'A balanced team for beginners',
//     pokemons: [
//       { id: 25, name: 'Pikachu', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' },
//       { id: 4, name: 'Charmander', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png' },
//       { id: 7, name: 'Squirtle', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png' },
//       { id: 1, name: 'Bulbasaur', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
//       { id: 1, name: 'Bulbasaur', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
//       { id: 1, name: 'Bulbasaur', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
//     ]
//   },
//   {
//     id: 2,
//     name: 'Fire Squad',
//     description: 'Hot and powerful fire types',
//     pokemons: [
//       { id: 6, name: 'Charizard', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' },
//       { id: 38, name: 'Ninetales', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png' },
//       { id: 59, name: 'Arcanine', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png' },
//     ]
//   }
// ];

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state: RootState) => state.user);
  const teams = useAppSelector((state: RootState) => state.teams.teams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('teams', teams);
    const getTeams = async () => {
      try {
        // In a real implementation, we would fetch from API
        setLoading(true);
        if(user.id) {
          const data = await fetchUserTeams(user.id);
          dispatch(setTeams({teams: data}));
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load teams. Please try again.');
        setLoading(false);
      }
    };

    getTeams();
  }, [user]);

  const handleCreateTeam = () => {
    // Navigate to team creation page or open modal
    console.log('Create team');
  };

  const handleEditTeam = (teamId: string) => {
    console.log('Edit team', teamId);
  };

  const handleDeleteTeam = async (teamId: string) => {
    await deleteTeam(teamId);
    dispatch(removeTeam(teamId));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <Container>
        <Paper 
          elevation={3} 
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: 'linear-gradient(to right, #3B4CCA, #2a3ba9)'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '#FFDE00',
              fontWeight: 800,
              fontFamily: '"Pokemon Solid", sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 2
            }}
          >
            {t('dashboard.title', 'My Pokémon Teams')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              mb: 2
            }}
          >
            {t('dashboard.description', 'Manage your Pokémon teams and get ready for your next adventure!')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateTeam}
            sx={{
              bgcolor: '#FFDE00',
              color: '#3B4CCA',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#FFD700'
              }
            }}
          >
            {t('dashboard.createTeam', 'Create New Team')}
          </Button>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : teams.length === 0 ? (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.8)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('dashboard.noTeams', 'You don\'t have any teams yet!')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('dashboard.createFirst', 'Create your first team to get started on your journey.')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateTeam}
              sx={{
                bgcolor: '#CC0000',
                color: 'white',
                '&:hover': {
                  bgcolor: '#AA0000'
                }
              }}
            >
              {t('dashboard.createTeam', 'Create New Team')}
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {teams.map((team) => (
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
                      ))}
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditTeam(team.id)}
                      sx={{ color: '#3B4CCA' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteTeam(team.id)}
                      sx={{ color: '#CC0000' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard; 