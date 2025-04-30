import { Box, Container, Typography } from "@mui/material";
import PokemonImage from "../../components/PokemonImage";
import { useParams } from "react-router";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchUserTeams } from "../../services/teams";
import { setTeams } from "../../store/teams/teams";
import { selectedPokemon } from "../../store/pokemons/pokemon";
import { Pokemon } from "../../types/pokemon";
import { Team } from "../../types/teams";

const PokemonDetails = () => {
    const { pokemonId, teamId } = useParams();
    const user = useAppSelector((state: RootState) => state.user);
    const pokemon = useAppSelector((state: RootState) => state.pokemon);
    const team = useAppSelector((state: RootState) => state.teams.teams.find((team) => team.id === teamId));
    const dispatch = useAppDispatch();

    const loadTeam = async () => {
        if (!team) {
            //load team
            const newTeams = await fetchUserTeams(user.id);
            dispatch(setTeams({ teams: newTeams }));
            dispatch(selectedPokemon(newTeams.find((team: Team) => team.id === teamId)?.pokemons.find((pokemon: Pokemon) => pokemon.id === pokemonId)));
        }
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
                {/* baackground color is a gradient from #based on the pokemon type      */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, ${pokemon.type.map((type) => `#${type} 0%, #${type} 100%`).join(', ')}`,
                    borderRadius: 2, padding: 2
                }}>
                    <PokemonImage {...pokemon} />
                    <Typography variant="h4">{pokemon.name}</Typography>
                </Box>

            </Container>
        </Box>
    );
};

export default PokemonDetails;