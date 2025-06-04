import { Box, Container } from "@mui/material";
import { useParams } from "react-router";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchUserTeams } from "../../services/teams";
import { setTeams } from "../../store/teams/teams";
import { selectedPokemon } from "../../store/pokemons/pokemon";
import { Move, Pokemon } from "../../types/pokemon";
import { Team } from "../../types/teams";
import PokemonDetailsHeader from "../../components/PokemonDetailsHeader";
import LifePoints from "../../components/LifePoints";
import PokemonStats from "../../components/PokemonStats";
import PokemonAbility from "../../components/PokemonAbility";
import PokemonMoves from "../../components/PokemonMoves";
import PokemonNotes from "../../components/PokemonNotes";
import EditPokemonModal from "../../components/EditPokemonModal";
import { updatePokemon } from "../../services/pokemon";
import { usePokemonStats } from "../../utils/pokemonUtils";

const PokemonDetails = () => {
    const { pokemonId, teamId } = useParams();
    const user = useAppSelector((state: RootState) => state.user);
    const pokemon = useAppSelector((state: RootState) => state.pokemon);
    const team = useAppSelector((state: RootState) => state.teams.teams.find((team) => team.id === teamId));
    const dispatch = useAppDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { customStats } = usePokemonStats({ stats: pokemon.stats, level: pokemon.level, evs: pokemon.evs, ivs: pokemon.ivs });

    const loadTeam = async () => {
        if (!team) {
            //load team
            const newTeams = await fetchUserTeams(user.id);
            dispatch(setTeams({ teams: newTeams }));
            dispatch(selectedPokemon(newTeams.find((team: Team) => team.id === teamId)?.pokemons.find((pokemon: Pokemon) => pokemon.id === pokemonId)));
        }
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSavePokemon = (updatedPokemon: Pokemon) => {
        // TODO: Implement the API call to update the pokemon
        updatePokemon(pokemon.id, updatedPokemon);
        dispatch(selectedPokemon(updatedPokemon));
    };

    useEffect(() => {
        loadTeam();
    }, [user]);

    return (
        <Box sx={{
            minHeight: '100vh',
            py: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
            <Container>
                {/* Pokemon Header */}
                <PokemonDetailsHeader pokemon={pokemon} onEdit={handleEdit} />
                {/* Life Points */}
                <LifePoints maxLifePoints={customStats.hp} />
                {/* Stats */}
                <PokemonStats pokemon={pokemon} />
                {/* Ability */}
                <PokemonAbility 
                    name={pokemon.ability.name} 
                    description={pokemon.ability.description} 
                    type={pokemon.type[0]} 
                />
                {/* Moves */}
                <PokemonMoves moves={pokemon.moves} />
                {/* Notes */}
                <PokemonNotes notes={pokemon.description} />
            </Container>

            <EditPokemonModal
                open={isEditModalOpen}
                onClose={handleCloseModal}
                pokemon={pokemon}
                onSave={handleSavePokemon}
            />
        </Box>
    );
};

export default PokemonDetails;