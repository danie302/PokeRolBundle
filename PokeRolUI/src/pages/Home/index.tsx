import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Container,
  Paper
} from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container>
        {/* Hero Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 2,
            background: 'linear-gradient(to right, #CC0000, #FF0000)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              width: '150px', 
              height: '150px', 
              background: 'white', 
              borderRadius: '50%', 
              right: '5%', 
              top: '50%', 
              transform: 'translateY(-50%)',
              border: '10px solid #222224',
              display: {
                xs: 'none',
                sm: 'block',
                md: 'block' 
              },
            }}
          >
          <CardMedia
                  component="img"
                  image={'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'}
                  alt={'Charmander'}
                  sx={{ 
                    objectFit: 'contain',
                    transform: 'translatex(5%)',
                  }}
                />
          </Box>
          <Box sx={{ maxWidth: '60%' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                color: 'white', 
                fontWeight: 800,
                fontFamily: '"Pokemon Solid", sans-serif',
                mb: 2,
                textShadow: '3px 3px 6px rgb(5, 4, 4)'
              }}
            >
              Welcome to PokéRol
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                mb: 3,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Your ultimate Pokémon role-playing companion
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: '#FFDE00',
                color: '#3B4CCA',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#FFD700'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Paper>

        {/* Features Section */}
        <Typography
          variant="h2"
          component="h2"
          sx={{ 
            textAlign: 'center',
            mb: 4,
            fontFamily: '"Pokemon Solid", sans-serif',
            fontWeight: 'bold',
            color: '#FFDE00', // Pokémon yellow
            textShadow: '3px 3px 0 #3B4CCA',
          }}
        >
          Features
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 6 }}>
          {[
            {
              title: 'Create Characters',
              description: 'Build and customize your Pokémon trainer with unique abilities and traits',
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
            },
            {
              title: 'Manage Your Team',
              description: 'Track and evolve your Pokémon collection with detailed stats tracking',
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png'
            },
            {
              title: 'Join Adventures',
              description: 'Embark on quests with other trainers in a dynamic gameplay environment',
              image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'
            }
          ].map((feature, index) => (
            <Box key={index} sx={{ width: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  sx={{ 
                    objectFit: 'contain',
                    bgcolor: '#f5f5f5' 
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    sx={{ color: '#CC0000', fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Call to Action */}
        <Paper
          sx={{ 
            textAlign: 'center',
            p: 4,
            bgcolor: '#3B4CCA',
            borderRadius: 2
          }}
        >
          <Typography
            variant="h5"
            sx={{ 
              color: 'white',
              mb: 2
            }}
          >
            Ready to start your Pokémon adventure?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: '#FFDE00',
              color: '#3B4CCA',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#FFD700'
              }
            }}
          >
            Register Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;