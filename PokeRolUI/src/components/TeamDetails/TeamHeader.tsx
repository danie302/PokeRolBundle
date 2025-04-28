import React from 'react';
import { Box, Typography, IconButton, Paper, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

interface TeamHeaderProps {
  teamName: string;
  pokemonCount: number;
  onGoBack: () => void;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ teamName, pokemonCount, onGoBack }) => {
  const { t } = useTranslation();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #3B4CCA 0%, #2A3A9B 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background circles */}
      <Box sx={{
        position: 'absolute',
        right: -20,
        top: -20,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        right: 40,
        bottom: -40,
        width: 150,
        height: 150,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        zIndex: 0
      }} />
      
      <IconButton 
        onClick={onGoBack} 
        size="large"
        sx={{ 
          mr: 2, 
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.2)',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      
      <Box sx={{ zIndex: 1, flex: 1 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {teamName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Chip 
            label={`${pokemonCount} ${pokemonCount === 1 ? t('team.pokemon') : t('team.pokemons')}`} 
            size="small"
            sx={{ 
              bgcolor: '#FFDE00',
              color: '#3B4CCA',
              fontWeight: 'bold'
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default TeamHeader; 