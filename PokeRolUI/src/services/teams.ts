import axios from 'axios';
import { Team, TeamResponse, TeamRequest } from '../types/teams';
import { Pokemon } from '../types/pokemon';

// Function to fetch user teams
export const fetchUserTeams = async (userId: string) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(`/team/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const teams = response.data.map((team: TeamResponse) => ({
      id: team._id,
      name: team.name,
      description: team.description,
      pokemons: team.pokemons
    }));
    console.log('teams', teams);
    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

// Function to create a new team
export const createTeam = async (teamData: Team) => {
  const token = localStorage.getItem('token');
  const teamRequest: TeamRequest = {
    owner: teamData.owner,
    name: teamData.name,
    description: teamData.description,
    pokemons: teamData.pokemons.map((pokemon: Pokemon) => pokemon.id)
  };

  try {
    const response = await axios.post('/team', teamRequest, {
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
export const updateTeam = async (teamId: number, teamData: Team) => {
  const token = localStorage.getItem('token');

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