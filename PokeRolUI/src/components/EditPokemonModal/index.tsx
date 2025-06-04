import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip, Grid, Paper, Divider } from "@mui/material";
import { Edit as EditIcon, Speed as StatsIcon, Psychology as AbilityIcon, SportsEsports as MovesIcon, Notes as NotesIcon } from "@mui/icons-material";
import { Pokemon, Move } from "../../types/pokemon";
import { useState } from "react";

interface EditPokemonModalProps {
    open: boolean;
    onClose: () => void;
    pokemon: Pokemon;
    onSave: (updatedPokemon: Pokemon) => void;
}

const EditPokemonModal = ({ open, onClose, pokemon, onSave }: EditPokemonModalProps) => {
    const [selectedMoves, setSelectedMoves] = useState<Move[]>(pokemon.moves || []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
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
                ...pokemon.ability,
                name: formData.get('ability') as string,
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
                                Editar Pokémon
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
                                {pokemon.name} - Nivel {pokemon.level}
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
                                            Nivel
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        label="Nivel del Pokémon"
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
                                            IVs (Valores Individuales)
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Valores de 0 a 31 que determinan las estadísticas base del Pokémon
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {[
                                            { key: 'hp', label: 'HP' },
                                            { key: 'attack', label: 'Ataque' },
                                            { key: 'defense', label: 'Defensa' },
                                            { key: 'specialAttack', label: 'At. Esp.' },
                                            { key: 'specialDefense', label: 'Def. Esp.' },
                                            { key: 'speed', label: 'Velocidad' }
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
                                            EVs (Valores de Esfuerzo)
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Valores de 0 a 252 ganados mediante entrenamiento
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {[
                                            { key: 'hp', label: 'HP' },
                                            { key: 'attack', label: 'Ataque' },
                                            { key: 'defense', label: 'Defensa' },
                                            { key: 'specialAttack', label: 'At. Esp.' },
                                            { key: 'specialDefense', label: 'Def. Esp.' },
                                            { key: 'speed', label: 'Velocidad' }
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
                                            Habilidad
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <InputLabel>Selecciona una habilidad</InputLabel>
                                        <Select
                                            name="ability"
                                            defaultValue={pokemon.ability?.name || ''}
                                            label="Selecciona una habilidad"
                                            sx={{
                                                borderRadius: 2,
                                                backgroundColor: 'white',
                                            }}
                                        >
                                            {(pokemon.abilities || []).map((ability) => (
                                                <MenuItem key={ability.name} value={ability.name}>
                                                    {ability.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                            Movimientos ({selectedMoves.length}/4)
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Selecciona hasta 4 movimientos para tu Pokémon
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexWrap: 'wrap', 
                                        gap: 1,
                                        maxHeight: 200,
                                        overflowY: 'auto',
                                        p: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 2,
                                        border: '1px solid rgba(0,0,0,0.1)',
                                    }}>
                                        {(pokemon.availableMoves || []).map((move) => (
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
                                            Notas
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        label="Descripción o notas adicionales"
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
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
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
                            Guardar Cambios
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditPokemonModal; 