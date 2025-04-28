import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Alert,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { RootState, useAppSelector } from '../../store/store';
import { Team } from '../../types/teams';

// Import components
import TeamHeader from '../../components/TeamDetails/TeamHeader';
import TeamDescription from '../../components/TeamDetails/TeamDescription';
import PokemonList from '../../components/TeamDetails/PokemonList';
import AddPokemonModal from '../../components/TeamDetails/AddPokemonModal';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [isAddPokemonModalOpen, setIsAddPokemonModalOpen] = useState(false);
  
  // Get all teams from the store
  const teamsState = useAppSelector((state: RootState) => state.teams?.teams || []);
  
  useEffect(() => {
    // Find the team in the store
    if (teamsState.length > 0 && teamId) {
      const foundTeam = teamsState.find(t => t.id === teamId);
      if (foundTeam) {
        setTeam(foundTeam);
      } else {
        setError('Team not found');
      }
    } else if (teamsState.length === 0) {
      // If we have no teams and we're not loading, redirect to dashboard
      navigate('/dashboard');
    }
  }, [teamsState]);
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };
  
  const handleAddPokemon = () => {
    setIsAddPokemonModalOpen(true);
  };
  
  const handleCloseAddPokemonModal = () => {
    setIsAddPokemonModalOpen(false);
  };
  
  const handlePokemonAdded = () => {
    // The team state will be updated from the parent component
    setIsAddPokemonModalOpen(false);
    
    // In a real implementation, you would refresh the team data here
    // For now, we'll use the mock data update
    if (team && teamId) {
      // Here you would make an API call to get the updated team
      // For example: const updatedTeam = await fetchTeam(teamId);
      // setTeam(updatedTeam);
      
      // Just for demo purpose, we'll add a mock Pokémon
      console.log('Pokémon added to team successfully!');
    }
  };

  if (error || !team) {
    return (
      <Box sx={{
        minHeight: '100vh',
        py: 4,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}>
        <Container maxWidth="lg">
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {error || 'Team not found'}
          </Alert>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            variant="contained"
            sx={{ 
              bgcolor: '#3B4CCA',
              '&:hover': {
                bgcolor: '#2A3A9B'
              }
            }}
          >
            {t('back')}
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <Container maxWidth="lg">
        {/* Team Header Component */}
        <TeamHeader 
          teamName={team.name}
          pokemonCount={team.pokemons.length}
          onGoBack={handleGoBack}
        />
        
        {/* Team Description Component (if description exists) */}
        <TeamDescription description={team.description} />
        
        {/* Pokemon List Component */}
        <PokemonList 
          pokemons={team.pokemons}
          onAddPokemon={handleAddPokemon}
        />
        
        {/* Modal for adding Pokemon */}
        <AddPokemonModal
          open={isAddPokemonModalOpen}
          teamId={teamId || ''}
          onClose={handleCloseAddPokemonModal}
          onPokemonAdded={handlePokemonAdded}
        />
      </Container>
    </Box>
  );
};

export default TeamDetails; 