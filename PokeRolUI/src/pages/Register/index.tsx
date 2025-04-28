import React from 'react';
import { Container, Paper } from '@mui/material';
import RegisterForm from '../../components/RegisterForm';
import RegisterDecorative from '../../components/RegisterDecorative';
import { Navigate } from 'react-router-dom';

const Register: React.FC = () => {
  // Verify if user is logged in with jwt token
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" />;
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
        <RegisterForm />
        <RegisterDecorative />
      </Paper>
    </Container>
  );
};

export default Register;
