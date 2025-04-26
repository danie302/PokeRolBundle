import mongoose from 'mongoose';
import { ITeam } from '../types/pokemon';

// Define team schema
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pokemons: { type: [mongoose.Schema.Types.ObjectId], ref: 'Pokemon' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITeam>('Team', teamSchema);