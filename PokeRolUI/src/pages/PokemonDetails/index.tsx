import { Box, Container, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchUserTeams } from "../../services/teams";
import { setTeams, updateTeam } from "../../store/teams/teams";
import { selectedPokemon as setSelectedPokemonAction } from "../../store/pokemons/pokemon";
import { Pokemon } from "../../types/pokemon";
import { Team } from "../../types/teams";
import PokemonDetailsHeader from "../../components/PokemonDetailsHeader";
import LifePoints from "../../components/LifePoints";
import PokemonStats from "../../components/PokemonStats";
import PokemonAbility from "../../components/PokemonAbility";
import PokemonMoves from "../../components/PokemonMoves";
import PokemonNotes from "../../components/PokemonNotes";
import EditPokemonModal from "../../components/EditPokemonModal";
import { updatePokemon as updatePokemonService, deletePokemon as deletePokemonService } from "../../services/pokemon";
import { usePokemonStats } from "../../utils/pokemonUtils";
import { useTranslation } from "react-i18next";

const PokemonDetails = () => {
    const { pokemonId, teamId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const user = useAppSelector((state: RootState) => state.user);
    const pokemon = useAppSelector((state: RootState) => state.pokemon);
    const allTeams = useAppSelector((state: RootState) => state.teams.teams);
    const dispatch = useAppDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { customStats } = usePokemonStats({ stats: pokemon.stats, level: pokemon.level, evs: pokemon.evs, ivs: pokemon.ivs });

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [isDeletingPokemon, setIsDeletingPokemon] = useState(false);

    const loadTeamAndPokemon = async () => {
        if (!user.id || !pokemonId) return;

        let currentPokemon = pokemon.id === pokemonId ? pokemon : null;
        let currentTeam = teamId ? allTeams.find((team: Team) => team.id === teamId) : null;

        if (!currentTeam || !currentPokemon) {
            const newTeams = await fetchUserTeams(user.id);
            dispatch(setTeams({ teams: newTeams }));
            currentTeam = teamId ? newTeams.find((team: Team) => team.id === teamId) : null;
            if (currentTeam) {
                currentPokemon = currentTeam.pokemons.find((p: Pokemon) => p.id === pokemonId) || null;
            }
        }
        if (currentPokemon) {
            dispatch(setSelectedPokemonAction(currentPokemon));
        } else {
            console.error("Pokemon not found after loading teams");
            navigate(teamId ? `/team/${teamId}` : '/dashboard');
        }
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSavePokemon = async (updatedPokemonData: Pokemon) => {
        try {
            await updatePokemonService(pokemon.id, updatedPokemonData);
            dispatch(setSelectedPokemonAction(updatedPokemonData));
            const updatedTeams = allTeams.map(team => ({
                ...team,
                pokemons: team.pokemons.map(p => p.id === updatedPokemonData.id ? updatedPokemonData : p)
            }));
            dispatch(setTeams({ teams: updatedTeams }));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to save pokemon:", error);
        }
    };

    const handleOpenDeleteConfirmDialog = () => {
        setIsConfirmDeleteOpen(true);
    };

    const handleCloseDeleteConfirmDialog = () => {
        setIsConfirmDeleteOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!pokemon || !pokemon.id) return;
        setIsDeletingPokemon(true);
        try {
            await deletePokemonService(pokemon.id);

            const newTeamsState = allTeams.map(team => ({
                ...team,
                pokemons: team.pokemons.filter(p => p.id !== pokemon.id)
            }));
            dispatch(setTeams({ teams: newTeamsState }));

            setIsConfirmDeleteOpen(false);
            setIsDeletingPokemon(false);
            navigate(teamId ? `/team/${teamId}` : '/dashboard');
        } catch (error) {
            console.error("Error deleting pokemon:", error);
            setIsDeletingPokemon(false);
        }
    };

    useEffect(() => {
        if (pokemonId && (!pokemon.id || pokemon.id !== pokemonId)) {
            loadTeamAndPokemon();
        }
    }, [pokemonId, user.id]);

    if (!pokemon || !pokemon.id || pokemon.id !== pokemonId) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            py: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
            <Container>
                <PokemonDetailsHeader pokemon={pokemon} onEdit={handleEdit} />
                <LifePoints maxLifePoints={customStats.hp} />
                <PokemonStats pokemon={pokemon} />
                <PokemonAbility 
                    name={pokemon.ability.name} 
                    description={pokemon.ability.description} 
                    type={pokemon.type[0]} 
                />
                <PokemonMoves moves={pokemon.moves} />
                <PokemonNotes notes={pokemon.description} />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleOpenDeleteConfirmDialog}
                        disabled={isDeletingPokemon}
                        sx={{ textTransform: 'none', padding: '10px 20px', fontSize: '1rem' }}
                    >
                        {isDeletingPokemon ? <CircularProgress size={24} color="inherit" /> : t('pokemonDetails.deleteButton')}
                    </Button>
                </Box>

            </Container>

            <EditPokemonModal
                open={isEditModalOpen}
                onClose={handleCloseModal}
                pokemon={pokemon}
                onSave={handleSavePokemon}
            />

            <Dialog
                open={isConfirmDeleteOpen}
                onClose={handleCloseDeleteConfirmDialog}
                aria-labelledby="confirm-delete-dialog-title"
                aria-describedby="confirm-delete-dialog-description"
            >
                <DialogTitle id="confirm-delete-dialog-title">
                    {t('pokemonDetails.deleteConfirmTitle')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-dialog-description">
                        {t('pokemonDetails.deleteConfirmText', { pokemonName: pokemon.name })}
                    </DialogContentText>
                    <DialogContentText sx={{mt: 1, color: 'warning.dark', fontWeight:'bold'}}>
                        {t('pokemonDetails.deleteConfirmWarning')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmDialog} disabled={isDeletingPokemon} color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus disabled={isDeletingPokemon}>
                        {isDeletingPokemon ? <CircularProgress size={24} color="inherit" /> : t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default PokemonDetails;