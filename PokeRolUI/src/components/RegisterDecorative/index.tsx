import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RegisterDecorative: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Box
      sx={{
        flex: 1,
        background: 'linear-gradient(135deg, #3B4CCA 0%, #2a3ba9 100%)',
        color: 'white',
        borderRadius: '20px',
        p: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: { xs: 'none', md: 'flex' }
      }}
    >
      {/* Starter Pokémon */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '80px', height: '80px' }}>
          <img 
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" 
            alt="Bulbasaur" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ position: 'relative', width: '80px', height: '80px' }}>
          <img 
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" 
            alt="Charmander" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ position: 'relative', width: '80px', height: '80px' }}>
          <img 
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png" 
            alt="Squirtle" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
      </Box>
      
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        sx={{
          position: 'relative',
          fontWeight: 'bold',
          fontFamily: '"Pokemon Solid", sans-serif',
          fontSize: '2rem',
          mb: 2,
          color: '#FFDE00',
          textShadow: '3px 3px 0 #000, -1px -1px 0 #FF0000',
          zIndex: 1,
          letterSpacing: '2px'
        }}
      >
        {t('registerpage.chooseStarter')}
      </Typography>
      
      <Typography
        textAlign="center"
        sx={{
          position: 'relative',
          zIndex: 1,
          textShadow: '1px 1px 10px rgba(0, 0, 0, 0.81)',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          maxWidth: '80%'
        }}
      >
        {t('registerpage.starterDescription')}
      </Typography>
      
      {/* Background Pokeball */}
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          bottom: '-150px',
          right: '-150px',
          border: '20px solid rgba(255,255,255,0.1)',
          zIndex: 0
        }}
      />
      
      {/* Decorative stars/sparkles */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: '#FFDE00',
            borderRadius: '50%',
            top: `${10 + i * 20}%`,
            left: `${10 + i * 15}%`,
            opacity: 0.6,
            animation: 'twinkle 2s infinite alternate',
            animationDelay: `${i * 0.3}s`,
            '@keyframes twinkle': {
              '0%': { opacity: 0.3, transform: 'scale(0.8)' },
              '100%': { opacity: 0.8, transform: 'scale(1.2)' }
            }
          }}
        />
      ))}
    </Box>
  );
};

export default RegisterDecorative; 