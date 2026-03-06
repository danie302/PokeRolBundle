import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
  Zoom,
  Fade,
  Tab,
  Tabs
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Pokemon } from '../../types/pokemon';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { typeColors } from './constants/typeColors';
import { PokemonSearchResult, PokemonListResponse, AddPokemonModalProps } from './types';
import SearchBar from './AddPokemonModal/SearchBar';
import AbilitySelector from './AddPokemonModal/AbilitySelector';
import { createPokemon } from '../../services/pokemon';
import { updateTeam } from '../../services/teams';
import { setTeams } from '../../store/teams/teams';
import { getBackgroundGradient } from '../../utils/utils';

interface Ability {
  name: string;
  description: string;
  is_hidden: boolean;
}

const AddPokemonModal: React.FC<AddPokemonModalProps> = ({
  open,
  teamId,
  onClose,
  onPokemonAdded
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PokemonSearchResult[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonSearchResult | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const user = useSelector((state: RootState) => state.user);
  const teams = useSelector((state: RootState) => state.teams);
  const team = teams.teams.find((team) => team.id === teamId);
  const dispatch = useAppDispatch();

  // Clear search results when modal is closed
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSearchResults([]);
      setSelectedPokemon(null);
      setSelectedAbility(null);
      setError(null);
      setIsShiny(false);
      setActiveTab(0);
    }
  }, [open]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setError(null);
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      // Primero intentar buscar por ID exacto o nombre exacto
      try {
        const directResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
        if (directResponse.data) {
          setSearchResults([directResponse.data]);
          setIsSearching(false);
          return;
        }
      } catch (directError) {
        // Si falla la búsqueda directa, continuamos con la búsqueda parcial
      }
      
      // Búsqueda parcial: obtener lista de pokémon y filtrar
      const listResponse = await axios.get<PokemonListResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1000'
      );
      
      const normalizedQuery = searchQuery.toLowerCase();
      const filteredResults = listResponse.data.results
        .filter(pokemon => pokemon.name.includes(normalizedQuery))
        .slice(0, 10); // Limitar a 10 resultados para rendimiento
      
      if (filteredResults.length === 0) {
        setError(t('search.noResults'));
        setIsSearching(false);
        return;
      }
      
      // Obtener detalles completos de cada pokémon que coincide
      const detailedResults = await Promise.all(
        filteredResults.map(async (pokemon) => {
          const response = await axios.get<PokemonSearchResult>(pokemon.url);
          return response.data;
        })
      );
      
      setSearchResults(detailedResults);
    } catch (err) {
      console.error('Error searching Pokémon:', err);
      setError(t('search.error'));
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPokemon = (pokemon: PokemonSearchResult) => {
    setSelectedPokemon(pokemon);
    setSelectedAbility(null);
    setActiveTab(0);
  };

  const handleAddToTeam = async () => {
    if (!selectedPokemon || !selectedAbility) return;
    try {
      // Create a new Pokémon object that matches your Pokemon interface
      const newPokemon: Omit<Pokemon, 'id'> = {
        pokeApiId: selectedPokemon.id.toString(),
        name: selectedPokemon.name,
        type: selectedPokemon.types.map(t => t.type.name),
        isShiny: isShiny, // Use the selected shiny state
        level: 1, // Default level
        experience: 0,
        stats: {
          hp: selectedPokemon.stats[0].base_stat,
          attack: selectedPokemon.stats[1].base_stat,
          defense: selectedPokemon.stats[2].base_stat,
          specialAttack: selectedPokemon.stats[3].base_stat,
          specialDefense: selectedPokemon.stats[4].base_stat,
          speed: selectedPokemon.stats[5].base_stat,
        },
        ivs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        evs: {
          hp: 0,
          attack: 0,
          specialAttack: 0,
          defense: 0,
          specialDefense: 0,
          speed: 0,
        },
        weight: selectedPokemon.weight,
        height: selectedPokemon.height,
        ability: {
          name: selectedAbility.name,
          description: selectedAbility.description
        },
        abilities: [],
        availableMoves: [],
        moves: [],
        description: '',
        userId: user.id,
      };

      const createdPokemon = await createPokemon(newPokemon);

      // Update the team with the new Pokémon
      if (!team) {
        console.error('Team not found:', teamId);
        setError(t('team.errorTeamNotFound'));
        return;
      }

      const newTeam = {
        ...team,
        pokemons: [...team.pokemons, createdPokemon]
      }

      await updateTeam(teamId, newTeam);
      dispatch(setTeams({ teams: [newTeam] }));

      onPokemonAdded();
      onClose();
    } catch (err) {
      console.error('Error adding Pokémon to team:', err);
      setError(t('team.errorAddingPokemon'));
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      TransitionComponent={Zoom}
      PaperProps={{
        sx: { 
          borderRadius: 2,
          width: '100%',
          maxWidth: 600,
          backgroundImage: 'url("https://i.imgur.com/EeYQyDO.png")',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.97)'
        }
      }}
    >
      <Box sx={{ 
        bgcolor: '#3B4CCA', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        {/* Decorative Pokeball Background */}
        <Box sx={{
          position: 'absolute',
          right: -30,
          top: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }} />
        <Box sx={{
          position: 'absolute',
          right: 40,
          bottom: -40,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0
        }} />
        
        <CatchingPokemonIcon sx={{ mr: 1, fontSize: 28, position: 'relative', zIndex: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', position: 'relative', zIndex: 1 }}>
          {t('team.addPokemon')}
        </Typography>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {/* Search Bar */}
        {!selectedPokemon && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isSearching={isSearching}
          />
        )}

        {/* Error Message */}
        {error && (
          <Fade in>
            <Paper 
              elevation={0}
              sx={{ 
                mb: 2, 
                p: 2, 
                bgcolor: 'rgba(211, 47, 47, 0.1)', 
                borderRadius: 2,
                border: '1px solid rgba(211, 47, 47, 0.3)',
                textAlign: 'center'
              }}
            >
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Paper>
          </Fade>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !selectedPokemon && (
          <Fade in>
            <Paper 
              elevation={1}
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(59, 76, 202, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CatchingPokemonIcon sx={{ color: '#3B4CCA', mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#3B4CCA' }}>
                    {t('search.results')}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('search.foundCount', { count: searchResults.length })}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
                {searchResults.map(pokemon => (
                  <Paper
                    elevation={0}
                    key={pokemon.id} 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      mb: 1,
                      border: '1px solid rgba(0,0,0,0.05)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        bgcolor: 'rgba(59, 76, 202, 0.05)'
                      }
                    }}
                    onClick={() => handleSelectPokemon(pokemon)}
                  >
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(59, 76, 202, 0.1)',
                      mr: 2,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <Box sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                      }} />
                      <img 
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        style={{ width: 55, height: 55, position: 'relative', zIndex: 1 }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ 
                        textTransform: 'capitalize', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        {pokemon.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ 
                          color: 'text.secondary',
                          bgcolor: 'rgba(0,0,0,0.05)',
                          px: 1,
                          py: 0.2,
                          borderRadius: 1,
                          mr: 1
                        }}>
                          #{pokemon.id.toString().padStart(3, '0')}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {pokemon.types.map(typeInfo => (
                            <Chip 
                              key={typeInfo.type.name}
                              label={typeInfo.type.name}
                              size="small"
                              sx={{ 
                                textTransform: 'capitalize',
                                height: 20,
                                fontSize: '0.7rem',
                                bgcolor: typeColors[typeInfo.type.name] || '#A8A77A',
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Fade>
        )}

        {/* Selected Pokémon */}
        {selectedPokemon && (
          <Fade in>
            <Paper 
              elevation={2}
              sx={{ 
                mb: 3, 
                overflow: 'hidden',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <Box sx={{ 
                p: 3,
                background: getBackgroundGradient(selectedPokemon),
                color: 'white',
                textAlign: 'center',
                position: 'relative',
              }}>
                {/* Decorative background elements */}
                <Box sx={{
                  position: 'absolute',
                  right: -20,
                  top: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  zIndex: 0
                }} />
                <Box sx={{
                  position: 'absolute',
                  left: -30,
                  bottom: -30,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  zIndex: 0
                }} />
                
                <Typography variant="h5" sx={{ 
                  textTransform: 'capitalize', 
                  fontWeight: 'bold',
                  mb: 0.5,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {selectedPokemon.name}
                </Typography>
                <Typography variant="body2" sx={{ 
                  mb: 2, 
                  opacity: 0.9,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  #{selectedPokemon.id.toString().padStart(3, '0')}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 1, 
                  mb: 2,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {selectedPokemon.types.map(typeInfo => (
                    <Chip 
                      key={typeInfo.type.name}
                      label={typeInfo.type.name}
                      sx={{ 
                        textTransform: 'capitalize',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 'bold',
                        borderColor: 'rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(5px)'
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              {/* Tabs for Appearance and Abilities */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  centered
                  sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}
                >
                  <Tab label={t('pokemon.appearance')} />
                  <Tab label={t('pokemon.abilities')} />
                </Tabs>
              </Box>

              {/* Appearance Tab */}
              {activeTab === 0 && (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <Box 
                      onClick={() => setIsShiny(false)}
                      sx={{ 
                        mx: 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: !isShiny ? 'scale(1.1)' : 'scale(1)',
                        position: 'relative',
                        '&:hover': {
                          transform: 'scale(1.15)'
                        }
                      }}
                    >
                      <Box sx={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: !isShiny ? '3px solid #3B4CCA' : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: !isShiny ? '0 0 0 2px rgba(59, 76, 202, 0.3)' : 'none',
                        mb: 1,
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <Box sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
                        }} />
                        <img 
                          src={selectedPokemon.sprites.front_default}
                          alt={selectedPokemon.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            filter: !isShiny ? 'none' : 'grayscale(40%)'
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ 
                        color: !isShiny ? '#3B4CCA' : 'text.secondary',
                        fontWeight: !isShiny ? 'bold' : 'normal'
                      }}>
                        {t('pokemon.normal')}
                      </Typography>
                    </Box>
                    
                    {selectedPokemon.sprites.front_shiny && (
                      <Box 
                        onClick={() => setIsShiny(true)}
                        sx={{ 
                          mx: 1,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          transform: isShiny ? 'scale(1.1)' : 'scale(1)',
                          '&:hover': {
                            transform: 'scale(1.15)'
                          }
                        }}
                      >
                        <Box sx={{ 
                          width: 120, 
                          height: 120, 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: isShiny ? '3px solid #FFD700' : '1px solid rgba(0,0,0,0.1)',
                          boxShadow: isShiny ? '0 0 0 2px rgba(255, 215, 0, 0.3)' : 'none',
                          mb: 1,
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <Box sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: isShiny ? 
                              'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%), radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)' : 
                              'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
                          }} />
                          <img 
                            src={selectedPokemon.sprites.front_shiny}
                            alt={`${selectedPokemon.name} shiny`}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'contain' 
                            }}
                          />
                          {isShiny && (
                            <Box sx={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: '#FFD700',
                              color: 'white',
                              zIndex: 2
                            }}>
                              <StarIcon sx={{ fontSize: 12 }} />
                            </Box>
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ 
                          color: isShiny ? '#FFD700' : 'text.secondary',
                          fontWeight: isShiny ? 'bold' : 'normal',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {isShiny && <StarIcon sx={{ fontSize: 12, mr: 0.5 }} />}
                          {t('pokemon.shiny')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {/* Abilities Tab */}
              {activeTab === 1 && (
                <Box sx={{ p: 2 }}>
                  <AbilitySelector
                    abilities={selectedPokemon.abilities}
                    selectedAbility={selectedAbility}
                    onSelectAbility={setSelectedAbility}
                  />
                </Box>
              )}

              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="text"
                  color="primary"
                  onClick={() => setSelectedPokemon(null)}
                >
                  {t('team.selectDifferent')}
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 3,
            borderColor: 'rgba(59, 76, 202, 0.5)',
            color: '#3B4CCA',
            '&:hover': {
              borderColor: '#3B4CCA',
              bgcolor: 'rgba(59, 76, 202, 0.05)'
            }
          }}
        >
          {t('cancel')}
        </Button>
        <Button 
          onClick={handleAddToTeam}
          variant="contained"
          disabled={!selectedPokemon || !selectedAbility}
          sx={{ 
            bgcolor: '#3B4CCA',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              bgcolor: '#2A3A9B'
            }
          }}
        >
          {t('team.addToTeam')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPokemonModal; 