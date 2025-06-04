import express, { Request, Response } from 'express';
import Pokemon from '../models/pokemon';
import { IPokemon } from '../types/pokemon';
import { ErrorResponse } from '../types/request';
import { verifyToken } from './auth';

// Define router
const router = express.Router();

// Get all pokemons
router.get('/', verifyToken, async (req: Request, res: Response<IPokemon[] | ErrorResponse>) => {
    const pokemons = await Pokemon.find();
    if(!pokemons) {
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

// Delete a pokemon by ID
router.delete('/:id', verifyToken, async (req: Request<{ id: string }>, res: Response<IPokemon | ErrorResponse>) => {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if(!pokemon) {
        res.status(404).json({ message: 'Pokemon not found' });
        return;
    }
    res.json(pokemon);
});

export default router;