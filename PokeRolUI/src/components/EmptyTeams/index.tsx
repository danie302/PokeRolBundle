import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

interface EmptyTeamsProps {
  onCreateTeam: () => void;
}

const EmptyTeams: React.FC<EmptyTeamsProps> = ({ onCreateTeam }) => {
  const { t } = useTranslation();
  
  return (
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
        onClick={onCreateTeam}
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
  );
};

export default EmptyTeams; 