import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

interface TeamHeaderProps {
  onCreateTeam: () => void;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ onCreateTeam }) => {
  const { t } = useTranslation();
  
  return (
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
        onClick={onCreateTeam}
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
  );
};

export default TeamHeader; 