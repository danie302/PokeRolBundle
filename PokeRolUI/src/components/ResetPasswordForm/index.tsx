import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResetPasswordData, ResetPasswordValidationErrors } from '../../types/forms';
import { resetPassword } from '../../services/auth';

interface ResetPasswordFormProps {
  token: string;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, success, setSuccess }) => {
  const { t } = useTranslation();
  const [validationErrors, setValidationErrors] = useState<ResetPasswordValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const resetPasswordData: ResetPasswordData = {
      token,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validation
    const errors: ResetPasswordValidationErrors = {};

    if (!resetPasswordData.password) {
      errors.password = 'Password is required';
    } else if (resetPasswordData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!resetPasswordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await resetPassword(token, resetPasswordData.password);
      setSuccess(true);
    } catch (err) {
      setError('Invalid or expired reset token. Please request a new password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
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
          {t('resetPassword.successTitle')}
        </Typography>
        <Alert severity="success" sx={{ mb: 3 }}>
          {t('resetPassword.successMessage')}
        </Alert>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: '#CC0000',
            '&:hover': { bgcolor: '#990000' }
          }}
        >
          {t('resetPassword.goToLogin')}
        </Button>
      </Box>
    );
  }

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
        {t('resetPassword.title')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} onChange={() => { setValidationErrors({}); setError(''); }} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('resetPassword.newPassword')}
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
          error={!!validationErrors.password}
          helperText={validationErrors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label={t('resetPassword.confirmPassword')}
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          autoComplete="new-password"
          sx={{ mb: 2 }}
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
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            bgcolor: '#CC0000',
            '&:hover': { bgcolor: '#990000' },
            '&:disabled': { bgcolor: '#ccc' }
          }}
        >
          {isLoading ? t('resetPassword.resetting') : t('resetPassword.submit')}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
