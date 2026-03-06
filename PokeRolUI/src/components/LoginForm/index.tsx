import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginUserData, LoginValidationErrors } from '../../types/forms';
import { loginValidator } from '../../utils/formValidator';
import { getUser, loginUser } from '../../services/auth';
import { setUser } from '../../store/users/user';
import { useAppDispatch } from '../../store/store';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<LoginValidationErrors>({});
  const dispatch = useAppDispatch();
  
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
      const user = await getUser();
      dispatch(setUser(user));
      navigate('/dashboard');
    } else {
      setValidationErrors({
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      });
    }
  };

  return (
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
            component={RouterLink}
            to="/forgot-password"
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
  );
};

export default LoginForm; 