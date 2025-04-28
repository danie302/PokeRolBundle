import React from 'react';
import { Box, Typography, Button, CardMedia, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 6,
        borderRadius: 2,
        background: 'linear-gradient(to right, #CC0000, #FF0000)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          background: 'white',
          borderRadius: '50%',
          right: {
            xs: '5%',
            sm: '5%',
            md: '5%',
            lg: '10%'
          },
          top: '50%',
          transform: 'translateY(-50%)',
          border: '10px solid #222224',
          display: {
            xs: 'none',
            sm: 'block',
            md: 'block'
          },
        }}
      >
        <CardMedia
          component="img"
          image={'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'}
          alt={'Charmander'}
          sx={{
            objectFit: 'contain',
            transform: 'translatex(5%)',
          }}
        />
      </Box>
      <Box sx={{
        maxWidth: {
          xs: '100%',
          sm: '60%',
          md: '60%',
          lg: '40%'
        },
        paddingLeft: {
          xs: '0',
          sm: '0',
          md: '0',
          lg: '5%'
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 800,
            fontSize: {
              xs: '2.5em',
              sm: '3.5em',
              md: '4em'
            },
            fontFamily: '"Pokemon Solid", sans-serif',
            mb: 2,
            textShadow: '3px 3px 6px rgb(5, 4, 4)'
          }}
        >
          {t('homepage.title')}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            width: '100%',
            color: 'white',
            mb: 3,
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          {t('homepage.description')}
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
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
            '&:hover': {
              bgcolor: '#FFD700'
            }
          }}
        >
          {t('homepage.button')}
        </Button>
      </Box>
    </Paper>
  );
};

export default HeroSection; 