import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerValidator } from '../../utils/formValidator';
import { RegisterUserData, RegisterValidationErrors } from '../../types/forms';
import { registerNewUser } from '../../services/auth';

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<RegisterValidationErrors>({});
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newUserData: RegisterUserData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string
    };

    const errors = registerValidator(newUserData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const response = await registerNewUser(newUserData);
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error: any) {
      setValidationErrors({
        email: 'Email already in use',
        username: 'Username already in use',
      });
    }
  };

  return (
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
      
      <Box component="form" onSubmit={handleSubmit} onChange={()=>{setValidationErrors({})}} noValidate sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
            <TextField
              required
              fullWidth
              id="firstName"
              label={t('registerpage.firstName')}
              name="firstName"
              autoComplete="given-name"
              error={!!validationErrors.firstName}
              helperText={validationErrors.firstName}
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
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
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
          error={!!validationErrors.username}
          helperText={validationErrors.username}
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
          error={!!validationErrors.email}
          helperText={validationErrors.email}
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
          error={!!validationErrors.password}
          helperText={validationErrors.password}
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
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword}
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
          disabled={Object.keys(validationErrors).length > 0}
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
  );
};

export default RegisterForm; 