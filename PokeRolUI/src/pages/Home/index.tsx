import React from 'react';
import { Box, Container } from '@mui/material';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import CallToAction from '../../components/CallToAction';

const Home: React.FC = () => {
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