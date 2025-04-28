import React from 'react';
import { Container, Paper } from '@mui/material';
import LoginForm from '../../components/LoginForm';
import LoginDecorative from '../../components/LoginDecorative';

const Login: React.FC = () => {
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