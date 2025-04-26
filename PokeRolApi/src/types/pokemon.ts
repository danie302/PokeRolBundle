import { Document } from 'mongoose';
import { IUser } from './user';

// Define ITeam interface
export interface ITeam extends Document {
    name: string;
    description: string;
    owner: IUser;
    pokemons: IPokemon[];
    createdAt: Date;
    updatedAt: Date;
}

// Define stats interface
export interface stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

// Define move interface
export interface move {
    name: string;
    type: string;
    power: number;
    accuracy: number;
    description: string;
}

// Define IPokemon interface
export interface IPokemon extends Document {
    pokeApiId: number;
    userId: IUser;
    name: string;
    type: string[];
    level: number;
    stats: stats;
    ivs: stats;
    evs: stats;
    moves: move[];
    description: string;
    ability: string;
    createdAt: Date;
    updatedAt: Date;
}