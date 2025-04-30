import axios from 'axios'
import { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2'

export const getAllPokemon = async (): Promise<{ name: string; url: string }[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=1025`)
        return response.data.results
    } catch (error) {
        console.error('Error fetching all Pokémon:', error)
        throw error
    }
}

export const createPokemon = async (pokemon: Omit<Pokemon, 'id'>) => {
    try {
        const { data } = await axios.post('/pokemon', pokemon);
        const createdPokemon = {
            id: data._id,
            ...data
        }
        return createdPokemon;
    } catch (error) {
        console.error('Error creating Pokémon:', error)
        throw error;
    }
}

export const getPokemonById = async (id: string) => {
    try {
        const { data } = await axios.get(`/pokemon/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error)
        throw error;
    }
}