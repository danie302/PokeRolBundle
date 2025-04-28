import { Pokemon } from "./pokemon";

export interface Team {
    id: string;
    name: string;
    description: string;
    owner: string;
    pokemons: Pokemon[];
}

export interface Teams {
    teams: Team[];
}

export interface TeamRequest {
    owner: string;
    name: string;
    description: string;
    pokemons: string[];
  }
  
  export interface TeamResponse {
    _id: string;
    name: string;
    description: string;
    pokemons: string[];
  }