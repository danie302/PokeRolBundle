import axios from 'axios'
import { Pokemon } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

export const getAllPokemonFromPokeApi = async (): Promise<{ name: string; url: string }[]> => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=1200`)
        return response.data.results
    } catch (error) {
        console.error('Error fetching all Pokémon from PokeAPI:', error)
        throw error
    }
}

export const createPokemon = async (pokemonData: Omit<Pokemon, 'id'>): Promise<Pokemon> => {
    try {
        const response = await axios.post('/pokemon', pokemonData);
        const newPokemon = response.data;
        return {
            id: newPokemon._id,
            ...newPokemon,
        } as Pokemon;
    } catch (error) {
        console.error('Error creating Pokémon:', error)
        throw error;
    }
}

export const getPokemonById = async (id: string): Promise<Pokemon> => {
    try {
        const response = await axios.get(`/pokemon/${id}`);
        const fetchedPokemon = response.data;
        return {
            id: fetchedPokemon._id,
            ...fetchedPokemon,
        } as Pokemon;
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error)
        throw error;
    }
}

export const updatePokemon = async (id: string, pokemonUpdateData: Partial<Pokemon>): Promise<Pokemon> => {
    try {
        const response = await axios.put(`/pokemon/${id}`, pokemonUpdateData);
        const updatedPokemon = response.data;
        return {
            id: updatedPokemon._id,
            ...updatedPokemon,
        } as Pokemon;
    } catch (error) {
        console.error('Error updating Pokémon:', error)
        throw error;
    }
}

export const deletePokemon = async (pokemonId: string): Promise<void> => {
    try {
        await axios.delete(`/pokemon/${pokemonId}`);
    } catch (error) {
        console.error(`Error deleting Pokémon with ID ${pokemonId}:`, error);
        throw error;
    }
};

export const fetchUserPokemons = async (userId: string): Promise<Pokemon[]> => {
    try {
        const response = await axios.get(`/pokemon/user/${userId}`);
        return response.data.map((p: any) => ({
            id: p._id,
            ...p,
        })) as Pokemon[];
    } catch (error) {
        console.error('Error fetching user Pokémons:', error);
        throw error;
    }
};