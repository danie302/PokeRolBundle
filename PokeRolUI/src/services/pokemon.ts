import axios from 'axios'

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