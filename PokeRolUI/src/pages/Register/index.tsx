import React from 'react';
import { Container, Paper } from '@mui/material';
import RegisterForm from '../../components/RegisterForm';
import RegisterDecorative from '../../components/RegisterDecorative';

const Register: React.FC = () => {
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
