import express, { Request, Response } from 'express';
import Pokemon from '../models/pokemon';
import Team from '../models/team'; // Import Team model
import { IPokemon } from '../types/pokemon';
import { ErrorResponse } from '../types/request';
import { verifyToken } from './auth';

// Define router
const router = express.Router();

// Get all pokemons
router.get('/', verifyToken, async (req: Request, res: Response<IPokemon[] | ErrorResponse>) => {
    const pokemons = await Pokemon.find();
    if(!pokemons || pokemons.length === 0) { // check for empty array too
        res.status(404).json({ message: 'No pokemons found' });
        return;
    }
    res.json(pokemons);
});

// Get a pokemon by ID
router.get('/:id', verifyToken, async (req: Request<{ id: string }>, res: Response<IPokemon | ErrorResponse>) => {
    const pokemon = await Pokemon.findById(req.params.id);
    if(!pokemon) {
        res.status(404).json({ message: 'Pokemon not found' });
        return;
    }
    res.json(pokemon);
});

// Create a new pokemon
router.post('/', verifyToken, async (req: Request<{}, {}, IPokemon>, res: Response<IPokemon | ErrorResponse>) => {
    const pokemon = new Pokemon(req.body);
    try {
        await pokemon.save();
        res.status(201).json(pokemon);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update a pokemon
router.put('/:id', verifyToken, async (req: Request<{ id: string }, {}, IPokemon>, res: Response<IPokemon | ErrorResponse>) => {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!pokemon) {
        res.status(404).json({ message: 'Pokemon not found' });
        return;
    }
    res.json(pokemon);
});

// Delete a pokemon by ID and remove from all teams
router.delete('/:id', verifyToken, async (req: Request<{ id: string }>, res: Response<ErrorResponse | { message: string }>): Promise<void> => {
    const pokemonId = req.params.id;
    try {
        // 1. Delete the Pokemon
        const deletedPokemon = await Pokemon.findByIdAndDelete(pokemonId);
        
        if(!deletedPokemon) {
            res.status(404).json({ message: 'Pokemon not found' });
            return; // Corrected: return void after sending response
        }

        // 2. Remove the Pokemon's ID from all teams that contain it
        await Team.updateMany(
            { pokemons: pokemonId }, 
            { $pull: { pokemons: pokemonId } } 
        );

        res.status(200).json({ message: 'Pokemon deleted successfully and removed from all teams.' });

    } catch (error: any) {
        console.error(`Error deleting pokemon ${pokemonId}:`, error);
        // Ensure response is sent and function effectively returns void
        res.status(500).json({ message: `Error deleting pokemon: ${error.message}` });
    }
});

export default router;