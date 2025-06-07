import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip, Grid, Paper, Divider, CircularProgress, IconButton } from "@mui/material";
import { Edit as EditIcon, Speed as StatsIcon, Psychology as AbilityIcon, SportsEsports as MovesIcon, Notes as NotesIcon, Search as SearchIcon, Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { Pokemon, Move } from "../../types/pokemon";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface EditPokemonModalProps {
    open: boolean;
    onClose: () => void;
    pokemon: Pokemon;
    onSave: (updatedPokemon: Pokemon) => void;
}

interface PokeApiAbility {
    name: string;
    description: string;
    is_hidden: boolean;
}

interface PokeApiMove {
    name: string;
    url: string;
    power: number | null;
    accuracy: number | null;
    type: string;
    damage_class: string;
    description: string;
}

const EditPokemonModal = ({ open, onClose, pokemon, onSave }: EditPokemonModalProps) => {
    const { t } = useTranslation();
    const [selectedMoves, setSelectedMoves] = useState<Move[]>([]);
    const [availableAbilities, setAvailableAbilities] = useState<PokeApiAbility[]>([]);
    const [loadingAbilities, setLoadingAbilities] = useState(false);
    const [selectedAbility, setSelectedAbility] = useState<string>('');
    
    // Move search states
    const [moveSearchQuery, setMoveSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<PokeApiMove[]>([]);
    const [loadingMoves, setLoadingMoves] = useState(false);

    // Load current pokemon data when modal opens
    useEffect(() => {
        if (open) {
            // Load current moves
            console.log('Loading Pokemon moves:', pokemon.moves);
            setSelectedMoves(pokemon.moves || []);
            
            // Load current ability
            setSelectedAbility(pokemon.ability?.name || '');
            
            // Fetch abilities from PokeAPI
            if (pokemon.pokeApiId) {
                fetchPokemonAbilities();
            }
        } else {
            // Reset states when modal closes
            setSelectedMoves([]);
            setSelectedAbility('');
            setAvailableAbilities([]);
            setMoveSearchQuery('');
            setSearchResults([]);
        }
    }, [open, pokemon]);

    const fetchPokemonAbilities = async () => {
        setLoadingAbilities(true);
        try {
            // Fetch Pokemon data from PokeAPI
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokeApiId}`);
            const pokemonData = pokemonResponse.data;

            // Fetch ability descriptions
            const abilityPromises = pokemonData.abilities.map(async (abilityItem: any) => {
                const abilityResponse = await axios.get(abilityItem.ability.url);
                
                // Find English description
                const englishDescription = abilityResponse.data.effect_entries.find(
                    (entry: any) => entry.language.name === 'en'
                );
                
                return {
                    name: abilityItem.ability.name,
                    description: englishDescription ? englishDescription.effect : 'No description available.',
                    is_hidden: abilityItem.is_hidden
                };
            });
            
            const abilitiesData = await Promise.all(abilityPromises);
            setAvailableAbilities(abilitiesData);
            
            // Set current ability if not already set
            if (!selectedAbility && abilitiesData.length > 0) {
                setSelectedAbility(pokemon.ability?.name || abilitiesData[0].name);
            }
        } catch (error) {
            console.error('Error fetching abilities from PokeAPI:', error);
            // Fallback to stored abilities if API fails
            const fallbackAbilities = (pokemon.abilities || []).map(ability => ({
                ...ability,
                is_hidden: false // Default value for stored abilities
            }));
            setAvailableAbilities(fallbackAbilities);
        } finally {
            setLoadingAbilities(false);
        }
    };

    const searchMoves = async () => {
        if (!moveSearchQuery.trim() || moveSearchQuery.length < 2) return;
        
        setLoadingMoves(true);
        try {
            // Get all moves from PokeAPI
            const movesListResponse = await axios.get('https://pokeapi.co/api/v2/move?limit=1000');
            
            // Filter moves based on search query
            const filteredMoves = movesListResponse.data.results.filter((move: any) =>
                move.name.toLowerCase().includes(moveSearchQuery.toLowerCase())
            ).slice(0, 20); // Limit to 20 results for performance

            // Fetch detailed move data
            const moveDetailsPromises = filteredMoves.map(async (move: any) => {
                const moveDetailResponse = await axios.get(move.url);
                const moveData = moveDetailResponse.data;
                
                // Find English description
                const englishEffectEntry = moveData.effect_entries?.find(
                    (entry: any) => entry.language.name === 'en'
                );
                const description = englishEffectEntry?.effect || 'No description available.';
                
                return {
                    name: moveData.name,
                    url: move.url,
                    power: moveData.power,
                    accuracy: moveData.accuracy,
                    type: moveData.type.name,
                    damage_class: moveData.damage_class.name,
                    description: description
                };
            });

            const movesData = await Promise.all(moveDetailsPromises);
            setSearchResults(movesData);
        } catch (error) {
            console.error('Error searching moves:', error);
            setSearchResults([]);
        } finally {
            setLoadingMoves(false);
        }
    };

    const addMoveToSelected = (pokeApiMove: PokeApiMove) => {
        // Check if move already exists
        if (selectedMoves.find(m => m.name === pokeApiMove.name)) {
            return;
        }

        const newMove: Move = {
            name: pokeApiMove.name,
            type: pokeApiMove.type,
            power: pokeApiMove.power || 0,
            accuracy: pokeApiMove.accuracy || 0,
            description: pokeApiMove.description,
            damage_class: pokeApiMove.damage_class
        };

        setSelectedMoves([...selectedMoves, newMove]);
    };

    const removeMoveFromSelected = (moveName: string) => {
        setSelectedMoves(selectedMoves.filter(m => m.name !== moveName));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        // Find the selected ability object
        const selectedAbilityObj = availableAbilities.find(ability => ability.name === selectedAbility);
        
        const updatedPokemon = {
            ...pokemon,
            level: Number(formData.get('level')),
            description: formData.get('description') as string,
            stats: pokemon.stats,
            ivs: {
                hp: Number(formData.get('iv_hp')),
                attack: Number(formData.get('iv_attack')),
                defense: Number(formData.get('iv_defense')),
                specialAttack: Number(formData.get('iv_specialAttack')),
                specialDefense: Number(formData.get('iv_specialDefense')),
                speed: Number(formData.get('iv_speed')),
            },
            evs: {
                hp: Number(formData.get('ev_hp')),
                attack: Number(formData.get('ev_attack')),
                defense: Number(formData.get('ev_defense')),
                specialAttack: Number(formData.get('ev_specialAttack')),
                specialDefense: Number(formData.get('ev_specialDefense')),
                speed: Number(formData.get('ev_speed')),
            },
            moves: selectedMoves,
            ability: {
                name: selectedAbility,
                description: selectedAbilityObj?.description || pokemon.ability?.description || ''
            }
        };
        onSave(updatedPokemon);
        onClose();
    };

    const handleMoveChange = (move: Move) => {
        if (selectedMoves.find(m => m.name === move.name)) {
            setSelectedMoves(selectedMoves.filter(m => m.name !== move.name));
        } else if (selectedMoves.length < 4) {
            setSelectedMoves([...selectedMoves, move]);
        }
    };

    const handleAbilityChange = (event: any) => {
        setSelectedAbility(event.target.value);
    };

    const StatField = ({ label, name, defaultValue, min = 0, max = 31 }: { label: string, name: string, defaultValue: number, min?: number, max?: number }) => (
        <TextField
            fullWidth
            label={label}
            name={name}
            type="number"
            defaultValue={defaultValue}
            inputProps={{ min, max }}
            size="small"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                    '&.Mui-focused': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(59, 76, 202, 0.3)',
                    }
                }
            }}
        />
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-pokemon-modal"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                width: { xs: '95%', sm: 700, md: 800 },
                maxHeight: '95vh',
                overflowY: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(255,255,255,0.8)',
                outline: 'none',
            }}>
                {/* Header */}
                <Box sx={{
                    p: 4,
                    pb: 2,
                    background: 'linear-gradient(135deg, #3B4CCA 0%, #2a3ba9 100%)',
                    color: 'white',
                    borderRadius: '12px 12px 0 0',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        right: -20,
                        top: -20,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                    }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
                        <EditIcon sx={{ fontSize: 32 }} />
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                {t('pokemonDetails.editPokemon')}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
                                {pokemon.name} - {t('pokemonDetails.level')} {pokemon.level}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 4, pt: 3 }}>
                        <Grid container spacing={3}>
                            {/* Level Section */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ 
                                    p: 3, 
                                    borderRadius: 2, 
                                    backgroundColor: 'rgba(59, 76, 202, 0.05)',
                                    border: '1px solid rgba(59, 76, 202, 0.1)',
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <StatsIcon sx={{ color: '#3B4CCA' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3B4CCA' }}>
                                            {t('pokemonDetails.level')}
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        label={t('pokemonDetails.level')}
                                        name="level"
                                        type="number"
                                        defaultValue={pokemon.level}
                                        inputProps={{ min: 1, max: 100 }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: 'white',
                                            }
                                        }}
                                    />
                                </Paper>
                            </Grid>

                            {/* IVs Section */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ 
                                    p: 3, 
                                    borderRadius: 2, 
                                    backgroundColor: 'rgba(76, 175, 80, 0.05)',
                                    border: '1px solid rgba(76, 175, 80, 0.1)',
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <StatsIcon sx={{ color: '#4CAF50' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                                            {t('pokemonDetails.ivs')}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {t('pokemonDetails.ivsDescription')}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {[
                                            { key: 'hp', label: t('pokemonDetails.hp') },
                                            { key: 'attack', label: t('pokemonDetails.attack') },
                                            { key: 'defense', label: t('pokemonDetails.defense') },
                                            { key: 'specialAttack', label: t('pokemonDetails.specialAttack') },
                                            { key: 'specialDefense', label: t('pokemonDetails.specialDefense') },
                                            { key: 'speed', label: t('pokemonDetails.speed') }
                                        ].map((stat) => (
                                            <Grid size={4} key={stat.key}>
                                                <StatField
                                                    label={`IV ${stat.label}`}
                                                    name={`iv_${stat.key}`}
                                                    defaultValue={pokemon.ivs?.[stat.key as keyof typeof pokemon.ivs] || 0}
                                                    min={0}
                                                    max={31}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* EVs Section */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ 
                                    p: 3, 
                                    borderRadius: 2, 
                                    backgroundColor: 'rgba(255, 152, 0, 0.05)',
                                    border: '1px solid rgba(255, 152, 0, 0.1)',
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <StatsIcon sx={{ color: '#FF9800' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                                            {t('pokemonDetails.evs')}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {t('pokemonDetails.evsDescription')}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {[
                                            { key: 'hp', label: t('pokemonDetails.hp') },
                                            { key: 'attack', label: t('pokemonDetails.attack') },
                                            { key: 'defense', label: t('pokemonDetails.defense') },
                                            { key: 'specialAttack', label: t('pokemonDetails.specialAttack') },
                                            { key: 'specialDefense', label: t('pokemonDetails.specialDefense') },
                                            { key: 'speed', label: t('pokemonDetails.speed') }
                                        ].map((stat) => (
                                            <Grid size={4} key={stat.key}>
                                                <StatField
                                                    label={`EV ${stat.label}`}
                                                    name={`ev_${stat.key}`}
                                                    defaultValue={pokemon.evs?.[stat.key as keyof typeof pokemon.evs] || 0}
                                                    min={0}
                                                    max={252}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Ability Section */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ 
                                    p: 3, 
                                    borderRadius: 2, 
                                    backgroundColor: 'rgba(156, 39, 176, 0.05)',
                                    border: '1px solid rgba(156, 39, 176, 0.1)',
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <AbilityIcon sx={{ color: '#9C27B0' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#9C27B0' }}>
                                            {t('pokemonDetails.abilities')}
                                        </Typography>
                                    </Box>

                                    {loadingAbilities ? (
                                        <Box sx={{ textAlign: 'center', p: 3 }}>
                                            <CircularProgress size={32} sx={{ color: '#9C27B0', mb: 2 }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {t('pokemonDetails.loadingAbilities')}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <>
                                            {/* Current ability display */}
                                            <Box sx={{ 
                                                mb: 3, 
                                                p: 2.5,
                                                backgroundColor: 'rgba(156, 39, 176, 0.08)',
                                                borderRadius: 2,
                                                border: '1px solid rgba(156, 39, 176, 0.2)',
                                            }}>
                                                <Typography variant="subtitle1" sx={{ color: '#863f94', fontWeight: 'bold', mb: 1.5 }}>
                                                    {t('pokemonDetails.selectedAbility')}
                                                </Typography>
                                                
                                                {selectedAbility && availableAbilities.length > 0 ? (() => {
                                                    const currentAbilityDetails = availableAbilities.find(a => a.name === selectedAbility);
                                                    return (
                                                        <Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                                <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#6a1b9a' }}>
                                                                    {selectedAbility.replace('-', ' ')}
                                                                </Typography>
                                                                {currentAbilityDetails && (
                                                                    <Chip 
                                                                        label={currentAbilityDetails.is_hidden ? t('pokemonDetails.hidden') : t('pokemonDetails.standard')}
                                                                        size="small" 
                                                                        sx={{ 
                                                                            bgcolor: currentAbilityDetails.is_hidden ? 'rgba(255, 152, 0, 0.2)' : 'rgba(156, 39, 176, 0.2)',
                                                                            color: currentAbilityDetails.is_hidden ? '#FF9800' : '#9C27B0',
                                                                            fontSize: '0.75rem',
                                                                            fontWeight: 'medium',
                                                                            height: 22
                                                                        }} 
                                                                    />
                                                                )}
                                                            </Box>
                                                            {currentAbilityDetails?.description && (
                                                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                                                                    {currentAbilityDetails.description}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    );
                                                })() : (
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                        {t('pokemonDetails.noAbilitySelected')}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Ability selector */}
                                            <FormControl fullWidth sx={{ mb: 2 }}>
                                                <InputLabel>{t('pokemonDetails.changeAbility')}</InputLabel>
                                                <Select
                                                    value={selectedAbility}
                                                    onChange={handleAbilityChange}
                                                    label={t('pokemonDetails.changeAbility')}
                                                    sx={{
                                                        borderRadius: 2,
                                                        backgroundColor: 'white',
                                                    }}
                                                >
                                                    {availableAbilities.map((ability) => (
                                                        <MenuItem key={ability.name} value={ability.name}>
                                                            <Box sx={{ py: 0.5 }}>
                                                                <Typography 
                                                                    variant="body1" 
                                                                    sx={{ 
                                                                        textTransform: 'capitalize',
                                                                        fontWeight: 'medium',
                                                                        mb: 0.5,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 1
                                                                    }}
                                                                >
                                                                    {ability.name.replace('-', ' ')}
                                                                    {ability.is_hidden && (
                                                                        <Chip 
                                                                            label={t('pokemonDetails.hidden')} 
                                                                            size="small" 
                                                                            sx={{ 
                                                                                bgcolor: 'rgba(156, 39, 176, 0.2)',
                                                                                color: '#9C27B0',
                                                                                fontSize: '0.7rem',
                                                                                height: 18
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Typography>
                                                                <Typography 
                                                                    variant="body2" 
                                                                    color="text.secondary"
                                                                    sx={{ 
                                                                        fontSize: '0.75rem',
                                                                        lineHeight: 1.2,
                                                                        maxWidth: 300,
                                                                        whiteSpace: 'normal'
                                                                    }}
                                                                >
                                                                    {ability.description}
                                                                </Typography>
                                                            </Box>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </>
                                    )}
                                </Paper>
                            </Grid>

                            {/* Moves Section */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ 
                                    p: 3, 
                                    borderRadius: 2, 
                                    backgroundColor: 'rgba(244, 67, 54, 0.05)',
                                    border: '1px solid rgba(244, 67, 54, 0.1)',
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <MovesIcon sx={{ color: '#F44336' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F44336' }}>
                                            {t('pokemonDetails.moves')} ({selectedMoves.length})
                                        </Typography>
                                    </Box>
                                    
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        {t('pokemonDetails.movesDescription')}
                                    </Typography>

                                    {/* Current moves */}
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 2, color: '#F44336', fontWeight: 'bold' }}>
                                            {t('pokemonDetails.currentMoves')}
                                        </Typography>
                                        {selectedMoves.length > 0 ? (
                                            <Box sx={{ 
                                                display: 'flex', 
                                                flexWrap: 'wrap', 
                                                gap: 1,
                                                p: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                borderRadius: 2,
                                                border: '1px solid rgba(244, 67, 54, 0.2)',
                                            }}>
                                                {selectedMoves.map((move) => (
                                                    <Chip
                                                        key={move.name}
                                                        label={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                                    {move.name.replace('-', ' ')}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                                                    ({move.type})
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        onDelete={() => removeMoveFromSelected(move.name)}
                                                        deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                                                        color="primary"
                                                        variant="filled"
                                                        sx={{ 
                                                            m: 0.25,
                                                            '& .MuiChip-label': {
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', p: 2 }}>
                                                {t('pokemonDetails.noMovesSelected')}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Move search */}
                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                label={t('pokemonDetails.searchMoves')}
                                                placeholder={t('pokemonDetails.searchMovesPlaceholder')}
                                                value={moveSearchQuery}
                                                onChange={(e) => setMoveSearchQuery(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        searchMoves();
                                                    }
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 2,
                                                        backgroundColor: 'white',
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={searchMoves}
                                                disabled={loadingMoves || moveSearchQuery.length < 2}
                                                startIcon={loadingMoves ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                                                sx={{
                                                    borderRadius: 2,
                                                    minWidth: 120,
                                                    background: 'linear-gradient(135deg, #F44336 0%, #d32f2f 100%)',
                                                }}
                                            >
                                                {loadingMoves ? 'Buscando...' : 'Buscar'}
                                            </Button>
                                        </Box>

                                        {/* Search results */}
                                        {searchResults.length > 0 && (
                                            <Box sx={{
                                                maxHeight: 300,
                                                overflowY: 'auto',
                                                p: 2,
                                                backgroundColor: 'white',
                                                borderRadius: 2,
                                                border: '1px solid rgba(244, 67, 54, 0.2)',
                                            }}>
                                                <Typography variant="subtitle2" sx={{ mb: 2, color: '#F44336', fontWeight: 'bold' }}>
                                                    {t('pokemonDetails.searchResults')} ({searchResults.length}):
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    {searchResults.map((move) => (
                                                        <Grid size={12} key={move.name}>
                                                            <Paper
                                                                elevation={0}
                                                                sx={{
                                                                    p: 2,
                                                                    borderRadius: 2,
                                                                    backgroundColor: selectedMoves.find(m => m.name === move.name)
                                                                        ? 'rgba(76, 175, 80, 0.1)'
                                                                        : 'rgba(0, 0, 0, 0.02)',
                                                                    border: '1px solid',
                                                                    borderColor: selectedMoves.find(m => m.name === move.name)
                                                                        ? '#4CAF50'
                                                                        : 'rgba(0,0,0,0.1)',
                                                                    transition: 'all 0.2s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(244, 67, 54, 0.05)',
                                                                        borderColor: '#F44336',
                                                                    }
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Box sx={{ flex: 1 }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                                            <Typography 
                                                                                variant="body1" 
                                                                                sx={{ 
                                                                                    fontWeight: 'bold',
                                                                                    textTransform: 'capitalize'
                                                                                }}
                                                                            >
                                                                                {move.name.replace('-', ' ')}
                                                                            </Typography>
                                                                            <Chip 
                                                                                label={move.type} 
                                                                                size="small"
                                                                                sx={{ 
                                                                                    textTransform: 'capitalize',
                                                                                    fontSize: '0.7rem'
                                                                                }}
                                                                            />
                                                                            {selectedMoves.find(m => m.name === move.name) && (
                                                                                <Chip 
                                                                                    label={t('pokemonDetails.added')} 
                                                                                    size="small"
                                                                                    color="success"
                                                                                    sx={{ fontSize: '0.7rem' }}
                                                                                />
                                                                            )}
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                <strong>{t('pokemonDetails.power')}:</strong> {move.power || 'N/A'}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                <strong>{t('pokemonDetails.accuracy')}:</strong> {move.accuracy || 'N/A'}%
                                                                            </Typography>
                                                                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                                                                <strong>{t('pokemonDetails.damageClass')}:</strong> {move.damage_class}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    <IconButton
                                                                        onClick={() => addMoveToSelected(move)}
                                                                        disabled={selectedMoves.find(m => m.name === move.name) !== undefined}
                                                                        color="primary"
                                                                        sx={{
                                                                            bgcolor: selectedMoves.find(m => m.name === move.name) 
                                                                                ? 'rgba(76, 175, 80, 0.1)'
                                                                                : 'rgba(244, 67, 54, 0.1)',
                                                                            '&:hover': {
                                                                                bgcolor: selectedMoves.find(m => m.name === move.name)
                                                                                    ? 'rgba(76, 175, 80, 0.2)'
                                                                                    : 'rgba(244, 67, 54, 0.2)',
                                                                            }
                                                                        }}
                                                                    >
                                                                        <AddIcon />
                                                                    </IconButton>
                                                                </Box>
                                                            </Paper>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        )}

                                        {moveSearchQuery.length >= 2 && searchResults.length === 0 && !loadingMoves && (
                                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', p: 2, fontStyle: 'italic' }}>
                                                {t('pokemonDetails.noMovesFound')} "{moveSearchQuery}"
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Legacy moves (if any from stored data) */}
                                    {pokemon.availableMoves && pokemon.availableMoves.length > 0 && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" sx={{ mb: 2, color: '#F44336', fontWeight: 'bold' }}>
                                                {t('pokemonDetails.originalMoves')}
                                            </Typography>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                flexWrap: 'wrap', 
                                                gap: 1,
                                                p: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                borderRadius: 2,
                                                border: '1px solid rgba(0,0,0,0.1)',
                                            }}>
                                                {pokemon.availableMoves.map((move) => (
                                                    <Chip
                                                        key={move.name}
                                                        label={move.name}
                                                        onClick={() => handleMoveChange(move)}
                                                        color={selectedMoves.find(m => m.name === move.name) ? "primary" : "default"}
                                                        variant={selectedMoves.find(m => m.name === move.name) ? "filled" : "outlined"}
                                                        sx={{ 
                                                            m: 0.25,
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>

                            {/* Notes Section */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ 
                                    p: 3, 
                                    borderRadius: 2, 
                                    backgroundColor: 'rgba(96, 125, 139, 0.05)',
                                    border: '1px solid rgba(96, 125, 139, 0.1)',
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <NotesIcon sx={{ color: '#607D8B' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#607D8B' }}>
                                            {t('pokemonDetails.notes')}
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        label={t('pokemonDetails.description')}
                                        name="description"
                                        multiline
                                        rows={4}
                                        defaultValue={pokemon.description}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: 'white',
                                            }
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Footer with buttons */}
                    <Divider />
                    <Box sx={{ 
                        p: 3, 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 2,
                        backgroundColor: '#fafafa',
                        borderRadius: '0 0 12px 12px',
                    }}>
                        <Button 
                            onClick={onClose}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            {t('pokemonDetails.cancel')}
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            disabled={loadingAbilities}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #3B4CCA 0%, #2a3ba9 100%)',
                                boxShadow: '0 4px 12px rgba(59, 76, 202, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2a3ba9 0%, #1e2a7a 100%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 16px rgba(59, 76, 202, 0.4)',
                                }
                            }}
                        >
                            {t('pokemonDetails.saveChanges')}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditPokemonModal; 