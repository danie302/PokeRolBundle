import React, { useState } from 'react';
import { Container, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import ResetPasswordDecorative from '../../components/ResetPasswordDecorative';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const tokenFromStorage = localStorage.getItem('token');
  if (tokenFromStorage) {
    navigate('/dashboard');
  }

  if (!token) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          Invalid or missing reset token. Please request a new password reset.
        </Paper>
      </Container>
    );
  }

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
        <ResetPasswordForm token={token} success={success} setSuccess={setSuccess} />
        <ResetPasswordDecorative />
      </Paper>
    </Container>
  );
};

export default ResetPassword;
