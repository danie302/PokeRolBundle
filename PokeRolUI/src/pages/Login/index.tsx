import React from 'react';
import { Container, Paper } from '@mui/material';
import LoginForm from '../../components/LoginForm';
import LoginDecorative from '../../components/LoginDecorative';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  // Verify if user is logged in with jwt token
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  
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
        <LoginDecorative />
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default Login;