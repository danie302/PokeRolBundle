import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Teams, Team } from '../../types/teams';
import { Pokemon } from '../../types/pokemon';

const initialState: Teams = {
    teams: [],
}

export const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams: (_state, action: PayloadAction<Teams>) => {
            return action.payload;
        },
        clearTeams: () => {
            return initialState;
        },
        addTeam: (state, action: PayloadAction<Team>) => {
            state.teams.push(action.payload);
        },
        removeTeam: (state, action: PayloadAction<string>) => {
            state.teams = state.teams.filter((team) => team.id !== action.payload);
        },
        updateTeam: (state, action: PayloadAction<Team>) => {
            const index = state.teams.findIndex((team) => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = action.payload;
            }
        },
        addPokemonToTeam: (state, action: PayloadAction<{ teamId: string, pokemon: Pokemon }>) => {
            const team = state.teams.find((team) => team.id === action.payload.teamId);
            if (team) {
                team.pokemons.push(action.payload.pokemon);
            }
        },
        removePokemonFromTeam: (state, action: PayloadAction<{ teamId: string, pokemon: Pokemon }>) => {
            const team = state.teams.find((team) => team.id === action.payload.teamId);
            if (team) {
                team.pokemons = team.pokemons.filter((pokemon) => pokemon.id !== action.payload.pokemon.id);
            }
        },
    },
});

export const { setTeams, clearTeams, addTeam, removeTeam, updateTeam, addPokemonToTeam, removePokemonFromTeam } = teamSlice.actions;

export default teamSlice.reducer;


