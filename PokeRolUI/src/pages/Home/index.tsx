import React from 'react';
import { Box, Container } from '@mui/material';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import CallToAction from '../../components/CallToAction';
import { Navigate } from 'react-router-dom';

const Home: React.FC = () => {
  // Verify if user is logged in with jwt token
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container>
        <HeroSection />
        <FeaturesSection />
        <CallToAction />
      </Container>
    </Box>
  );
};

export default Home;