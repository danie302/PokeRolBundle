import axios from 'axios';
import { Team, TeamResponse, TeamRequest } from '../types/teams';
import { Pokemon } from '../types/pokemon';
import { getPokemonById } from './pokemon';

// Function to fetch user teams
export const fetchUserTeams = async (userId: string) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(`/team/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Map teams and resolve all Pokemon data
    const teams = await Promise.all(
      response.data.map(async (team: TeamResponse) => {
        const pokemons = await Promise.all(
          team.pokemons.map(async (pokemonId: string) => {
            const pokemonData = await getPokemonById(pokemonId);
            return {
              id: pokemonData._id,
              ...pokemonData
            }
          })
        );
        
        return {
          id: team._id,
          name: team.name,
          description: team.description,
          owner: team.owner,
          pokemons: pokemons
        };
      })
    );
    
    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

// Function to create a new team
export const createTeam = async (teamData: TeamRequest) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('/team', teamData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const team = {
      id: response.data._id,
      name: response.data.name,
      description: response.data.description,
      owner: response.data.owner,
      pokemons: response.data.pokemons
    };
    return team;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

// Function to update an existing team
export const updateTeam = async (teamId: string, teamData: Team) => {
  const token = localStorage.getItem('token');
  console.log('TEAM DATA', teamData);

  const teamRequest: TeamRequest = {
    owner: teamData.owner,
    name: teamData.name,
    description: teamData.description,
    pokemons: teamData.pokemons.map((pokemon: Pokemon) => pokemon.id)
  };
  
  try {
    const response = await axios.put(`/team/${teamId}`, teamRequest, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

// Function to delete a team
export const deleteTeam = async (teamId: string) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.delete(`/team/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
}; 