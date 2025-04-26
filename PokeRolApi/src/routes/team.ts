import express, { Request, Response } from 'express';
import Team from '../models/team';
import { ErrorResponse } from '../types/request';
import { ITeam } from '../types/pokemon';
import { verifyToken } from './auth';

// Define router
const router = express.Router();

// Get all teams
router.get('/', verifyToken, async (req: Request, res: Response<ITeam[] | ErrorResponse>) => {
    const teams = await Team.find();
    if(!teams) {
        res.status(404).json({ message: 'No teams found' });
        return;
    }
    res.json(teams);
});

// Get a team by ID
router.get(':id', verifyToken, async (req: Request<{ id: string }>, res: Response<ITeam | ErrorResponse>) => {
    const team = await Team.findById(req.params.id);
    if(!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});

// Get a teams by user ID
router.get('/user/:id', verifyToken, async (req: Request<{ id: string }>, res: Response<ITeam[] | ErrorResponse>) => {
    const teams = await Team.find({ userId: req.params.id });
    if(!teams) {
        res.status(404).json({ message: 'No teams found' });
        return;
    }
    res.json(teams);
});

// Create a new team
router.post('/', verifyToken, async (req: Request<{}, {}, ITeam>, res: Response<ITeam | ErrorResponse>) => {
    const team = new Team(req.body);
    try {
        await team.save();  
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team' });
    }
});

// Update a team
router.put('/:id', verifyToken, async (req: Request<{ id: string }, {}, ITeam>, res: Response<ITeam | ErrorResponse>) => {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});

// Delete a team
router.delete('/:id', verifyToken, async (req: Request<{ id: string }>, res: Response<ITeam | ErrorResponse>) => {
    const team = await Team.findByIdAndDelete(req.params.id);
    if(!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});

export default router;