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
  IconButton
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoginUserData, LoginValidationErrors } from '../../types/forms';
import { loginValidator } from '../../utils/formValidator';
import { loginUser } from '../../services/auth';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [validationErrors, setValidationErrors] = useState<LoginValidationErrors>({});
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const loginUserData: LoginUserData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    const errors = loginValidator(loginUserData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const response = await loginUser(loginUserData);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } else {
      setValidationErrors({
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
          borderRadius: 2
        }}
      >
        {/* Left side - Decorative */}
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
          {/* Decorative pokeball */}
          <Box
            sx={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              background: 'white',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '12px solid #222224',
              boxShadow: '0 0 30px rgba(0,0,0,0.3)',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '50%',
                background: '#CC0000',
                borderTopLeftRadius: '90px',
                borderTopRightRadius: '90px',
                top: '-12px',
                left: 0,
                border: '0px solid #222224',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '60px',
                background: 'white',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '10px solid #222224',
                zIndex: 2
              }
            }}
          />
          {/* Add a Pokemon character */}
          <Box 
            sx={{ 
              position: 'absolute',
              width: '150px',
              height: '150px',
              bottom: '10%',
              right: '5%',
              zIndex: 1
            }}
          >
            <img 
              src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" 
              alt="Pikachu" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            sx={{
              position: 'relative',
              fontWeight: 'bold',
              fontFamily: '"Pokemon Solid", sans-serif',
              fontSize: '2.5rem',
              mb: 2,
              color: '#FFDE00',
              textShadow: '3px 3px 0 #000, -1px -1px 0 #FF0000',
              zIndex: 1,
              transform: 'perspective(500px) rotateX(5deg)',
              letterSpacing: '2px'
            }}
          >
            PokéRol
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
            {t('loginpage.description')}
          </Typography>
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
        
        {/* Right side - Login form */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 'bold',
              fontFamily: '"Pokemon Solid", sans-serif',
              fontSize: '2.5rem',
              mb: 3,
              letterSpacing: '4px',
              color: '#CC0000',
              textAlign: { xs: 'center', md: 'left' },
              textShadow: '3px 3px 0 #000, -1px -1px 0 #FF0000'
            }}
          >
            {t('loginpage.title')}
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} onChange={()=>{setValidationErrors({})}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('loginpage.email')}
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ mb: 2 }}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('loginpage.password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
              error={!!validationErrors.password}
              helperText={validationErrors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: '#CC0000',
                '&:hover': { bgcolor: '#990000' }
              }}
            >
              {t('loginpage.button')}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
              <Button
                variant="text"
                size="small"
                sx={{ color: '#3B4CCA' }}
              >
                {t('loginpage.forgotPassword')}
              </Button>
              <Button
                variant="text"
                size="small"
                component={RouterLink}
                to="/register"
                sx={{ color: '#3B4CCA' }}
              >
                {t('loginpage.signUp')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;