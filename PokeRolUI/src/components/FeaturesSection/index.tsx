import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FeatureCard from '../FeatureCard';

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('homepage.createCharacters'),
      description: t('homepage.createCharactersDescription'),
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
    },
    {
      title: t('homepage.manageYourTeam'),
      description: t('homepage.manageYourTeamDescription'),
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png'
    },
    {
      title: t('homepage.joinAdventures'),
      description: t('homepage.joinAdventuresDescription'),
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'
    }
  ];

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontFamily: '"Pokemon Solid", sans-serif',
          fontWeight: 'bold',
          color: '#FFDE00', // Pokémon yellow
          textShadow: '3px 3px 0 #3B4CCA',
          overflowWrap: 'break-word'
        }}
      >
        {t('homepage.features')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 6 }}>
        {features.map((feature, index) => (
          <Box key={index} sx={{ width: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              image={feature.image}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FeaturesSection; 