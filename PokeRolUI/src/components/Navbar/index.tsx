import { Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  // Create navigation items based on auth state
  const navItems = isLoggedIn 
    ? [
        { text: t('dashboard'), path: '/dashboard' },
        { text: t('logout'), action: handleLogout }
      ]
    : [
        { text: t('home'), path: '/' },
        { text: t('login'), path: '/login' },
        { text: t('register'), path: '/register' }
      ];

  const drawer = (
    <Box
      onClick={toggleDrawer}
      sx={{
        width: 250,
        backgroundColor: '#f8f8f8',
        height: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
      role="presentation"
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        borderBottom: '2px solid rgba(0,0,0,0.1)'
      }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Pokemon Solid", sans-serif',
            color: '#CC0000',
            textShadow: '1px 1px 0 #3B4CCA',
            letterSpacing: '2px'
          }}
        >
          PokéRol
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={item.path ? RouterLink : 'button'}
            to={item.path}
            onClick={item.action}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(59, 76, 202, 0.1)'
              },
              mb: 1,
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                textAlign: 'center',
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                  color: '#3B4CCA'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
          alt="Pikachu"
          style={{ width: '80px', height: 'auto' }}
        />
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" sx={{
      backgroundColor: '#CC0000', // Pokéball red
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: '"Pokemon Solid", sans-serif',
            letterSpacing: '3px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            fontWeight: 'bold',
            color: '#FFDE00', // Pokémon yellow
            textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #FF0000',
            transform: 'perspective(500px) rotateX(5deg)',
            '&:hover': {
              transform: 'perspective(500px) rotateX(0deg) scale(1.05)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          PokéRol
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{
                border: '2px solid #FFDE00',
                borderRadius: '8px',
                p: '5px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#FFDE00" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
              </svg>
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              item.path ? (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    fontFamily: '"Pokemon Solid", sans-serif',
                    borderRadius: '20px',
                    fontSize: '1.2rem',
                    textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #FF0000'
                  }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={item.text}
                  onClick={item.action}
                  color="inherit"
                  sx={{
                    fontFamily: '"Pokemon Solid", sans-serif',
                    borderRadius: '20px',
                    fontSize: '1.2rem',
                    textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #FF0000'
                  }}
                >
                  {item.text}
                </Button>
              )
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;