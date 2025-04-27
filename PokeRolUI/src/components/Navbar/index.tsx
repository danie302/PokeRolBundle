import { Toolbar, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
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
                  fontSize: '2.2rem',
                  fontWeight: 'bold',
                  color: '#FFDE00', // Pokémon yellow
                  textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #FF0000',
                }}
              >
                PokéRol
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/" 
                  color="inherit" 
                  sx={{ 
                    fontFamily: '"Pokemon Solid", sans-serif',
                    borderRadius: '20px',
                    fontSize: '1.2rem',
                    textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #FF0000'
                  }}
                >
                  Home
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/login" 
                  color="inherit"
                  sx={{ 
                    fontFamily: '"Pokemon Solid", sans-serif',
                    borderRadius: '20px',
                    fontSize: '1.2rem',
                    textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #FF0000'
                  }}
                >
                  Login
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
    )
}

export default Navbar;