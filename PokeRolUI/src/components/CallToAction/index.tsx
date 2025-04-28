import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CallToAction: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Paper
      sx={{
        textAlign: 'center',
        p: 4,
        bgcolor: '#3B4CCA',
        borderRadius: 2
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          mb: 2
        }}
      >
        {t('homepage.readyToStart')}
      </Typography>
      <Button
        variant="contained"
        size="large"
        component={RouterLink}
        to="/register"
        sx={{
          bgcolor: '#FFDE00',
          color: '#3B4CCA',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#FFD700'
          }
        }}
      >
        {t('homepage.registerNow')}
      </Button>
    </Paper>
  );
};

export default CallToAction; 