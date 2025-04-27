import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
          borderRadius: 2,
          background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
        }}
      >
        {/* Left side - Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, md: 3 },
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontFamily: '"Pokemon Solid", sans-serif',
              fontSize: '2.2rem',
              mb: 3,
              letterSpacing: '4px',
              color: '#CC0000',
              textAlign: 'center', 
              textShadow: '2px 2px 5px #000, -1px -1px 5px #FFDE00'
            }}
          >
            {t('registerpage.title')}
          </Typography>
          
          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label={t('registerpage.firstName')}
                  name="firstName"
                  autoComplete="given-name"
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t('registerpage.lastName')}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Box>
            </Box>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('registerpage.username')}
              name="username"
              autoComplete="username"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('registerpage.email')}
              name="email"
              autoComplete="email"
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('registerpage.password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={t('registerpage.confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                bgcolor: '#3B4CCA',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#2a3ba9' }
              }}
            >
              {t('registerpage.register')}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                size="small"
                sx={{ color: '#3B4CCA' }}
              >
                {t('registerpage.alreadyHaveAccount')}
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* Right side - Decorative */}
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
      </Paper>
    </Container>
  );
};

export default Register;
