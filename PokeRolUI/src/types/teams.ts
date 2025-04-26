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