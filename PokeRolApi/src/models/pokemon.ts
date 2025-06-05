import mongoose from 'mongoose';
import { IPokemon } from '../types/pokemon';

// Define move schema
const moveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    power: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    description: { type: String, required: false },
    damage_class: { type: String, required: false }
});

// Define stats schema
const statsSchema = new mongoose.Schema({
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    specialAttack: { type: Number, required: true },
    specialDefense: { type: Number, required: true },
    speed: { type: Number, required: true },
});

// Define ability schema
const abilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

// Define pokemon schema
const pokemonSchema = new mongoose.Schema({
    pokeApiId: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: [String], required: true },
    ability: { type: abilitySchema, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    level: { type: Number, required: true },
    experience: { type: Number, required: true },
    nature: { type: String },
    stats: { type: statsSchema, required: true },
    ivs: { type: statsSchema, required: true },
    evs: { type: statsSchema, required: true },
    moves: { type: [moveSchema] },
    description: { type: String },
    isShiny: { type: Boolean, required: true }
});

export default mongoose.model<IPokemon>('Pokemon', pokemonSchema);