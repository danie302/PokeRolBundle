import React from 'react';
import { Box } from '@mui/material';

const ForgotPasswordDecorative: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, md: 4 },
        background: 'linear-gradient(135deg, #3B4CCA 0%, #2A3A99 100%)',
        borderRadius: { xs: 0, md: '0 16px 16px 0' },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: '8rem',
          mb: 2,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        }}
      >
        🎮
      </Box>
      <Box
        component="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#fff',
          mb: 2,
          fontFamily: '"Pokemon Solid", sans-serif',
          textShadow: '2px 2px 0 #000',
        }}
      >
        PokeRol
      </Box>
      <Box
        sx={{
          color: '#fff',
          opacity: 0.9,
          maxWidth: '300px',
        }}
      >
        Reset your password and get back to your Pokemon adventure!
      </Box>
    </Box>
  );
};

export default ForgotPasswordDecorative;
