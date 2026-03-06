import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import ForgotPasswordDecorative from '../../components/ForgotPasswordDecorative';
import { Navigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const [success, setSuccess] = useState(false);

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
        <ForgotPasswordForm success={success} setSuccess={setSuccess} />
        <ForgotPasswordDecorative />
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
