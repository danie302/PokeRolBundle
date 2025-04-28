export interface Stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface Ability {
    name: string;
    description: string;
}

export interface Move {
    name: string;
    type: string;
    power: number;
    accuracy: number;
}

export interface Pokemon {
    id: string;
    pokeApiId: string;
    userId: string;
    name: string;
    type: string[];
    level: number;
    experience: number;
    nature?: string;
    ability: Ability;
    weight: number;
    height: number;
    stats: Stats;
    ivs: Stats;
    evs: Stats;
    moves: Move[];
    description: string;    
    isShiny: boolean;
}