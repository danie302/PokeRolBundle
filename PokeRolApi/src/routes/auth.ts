import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { ErrorResponse, LoginRequest } from '../types/request';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define router
const router = express.Router();

// Login a user
router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response<{ token: string } | ErrorResponse>) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '24h' });
    res.json({ token });
});

export default router;


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not provied" });
      return;
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || '');
      next();
    } catch (error) {
      res.status(403).json({ message: "Token not valid" });
      return;
    }
  }