import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link as RouterLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ForgotPasswordData, ForgotPasswordValidationErrors } from '../../types/forms';
import { requestPasswordReset } from '../../services/auth';

interface ForgotPasswordFormProps {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ success, setSuccess }) => {
  const { t } = useTranslation();
  const [validationErrors, setValidationErrors] = useState<ForgotPasswordValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const forgotPasswordData: ForgotPasswordData = {
      email: formData.get('email') as string,
    };

    // Basic validation
    const errors: ForgotPasswordValidationErrors = {};
    if (!forgotPasswordData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordData.email)) {
      errors.email = 'Invalid email format';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await requestPasswordReset(forgotPasswordData.email);
      setEmailSent(forgotPasswordData.email);
      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
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
          {t('forgotPassword.successTitle')}
        </Typography>
        <Alert severity="success" sx={{ mb: 3 }}>
          {t('forgotPassword.successMessage')} {emailSent}
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
          {t('forgotPassword.backToLogin')}
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
        {t('forgotPassword.title')}
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
          id="email"
          label={t('forgotPassword.email')}
          name="email"
          autoComplete="email"
          autoFocus
          sx={{ mb: 2 }}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
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
          {isLoading ? t('forgotPassword.sending') : t('forgotPassword.submit')}
        </Button>
      </Box>

      <Box sx={{ mt: 2, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          {t('forgotPassword.rememberPassword')}{' '}
          <Link to="/login" style={{ color: '#3B4CCA', textDecoration: 'none' }}>
            {t('forgotPassword.backToLogin')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
