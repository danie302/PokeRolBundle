import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { RootState, useAppSelector, useAppDispatch } from '../../store/store';
import { deleteTeam, fetchUserTeams } from '../../services/teams';
import { removeTeam, setTeams } from '../../store/teams/teams';
import TeamHeader from '../../components/TeamHeader';
import EmptyTeams from '../../components/EmptyTeams';
import TeamCard from '../../components/TeamCard';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state: RootState) => state.user);
  const teams = useAppSelector((state: RootState) => state.teams?.teams || []);
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
  }, [user, dispatch]);

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
        <TeamHeader onCreateTeam={handleCreateTeam} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : teams.length === 0 ? (
          <EmptyTeams onCreateTeam={handleCreateTeam} />
        ) : (
          <Grid container spacing={3}>
            {teams.map((team) => (
              <TeamCard 
                key={team.id}
                team={team}
                onEdit={handleEditTeam}
                onDelete={handleDeleteTeam}
              />
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard; 