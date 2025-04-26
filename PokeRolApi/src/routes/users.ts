import express, { Request, Response } from 'express';
import User from '../models/user';
import { RegisterRequest, ErrorResponse } from '../types/request';
import { IUser } from '../types/user';
import { verifyToken } from './auth';
// Define router
const router = express.Router();

// Get a user by ID without password
router.get('/:id', verifyToken, async (req: Request<{ id: string }>, res: Response<IUser | ErrorResponse>) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
});

// get all users
router.get('/', verifyToken, async (req: Request, res: Response<IUser[] | ErrorResponse>) => {
    const users = await User.find().select('-password');
    if(!users) {
        res.status(404).json({ message: 'No users found' });
        return;
    }
    res.json(users);
});

// Register user
router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response<IUser | ErrorResponse>) => {
    const { username, name, email, password } = req.body;
    const user = new User({ username, name, email, password });
    await user.save();
    try {
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

export default router;