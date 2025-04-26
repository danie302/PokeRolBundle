import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/pokemon';


const initialState: Pokemon = {
    id: '',
    pokeApiId: '',
    userId: '',
    name: '',
    type: [],
    level: 0,
    experience: 0,
    nature: '',
    ability: { name: '', description: '' },
    weight: 0,
    height: 0,
    stats: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
    ivs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
    evs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
    moves: [],
    description: '',
    isShiny: false,
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        selectedPokemon: (state, action) => {
            state = action.payload;
        },
        clearSelectedPokemon: (state) => {
            state = initialState;
        },
    },
})

export const { selectedPokemon, clearSelectedPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;