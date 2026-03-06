import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../src/lib/dbConnection';
import User from '../src/models/user';
import bcrypt from 'bcrypt';

// Vercel serverless function for user registration
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('Register endpoint called with method:', req.method);

        // Ensure database is connected
        await connectToDB();
        console.log('Database connected');

        // Handle different HTTP methods
        if (req.method === 'POST') {
            console.log('Processing POST request with body:', JSON.stringify(req.body));

            const { username, name, email, password } = req.body;

            if (!username || !name || !email || !password) {
                console.log('Missing required fields');
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Password hashed');

            // Create user
            const user = new User({ username, name, email, password: hashedPassword });
            await user.save();
            console.log('User registered successfully:', email);

            // Return user without password
            const userResponse = user.toObject();
            delete (userResponse as any).password;

            res.status(201).json(userResponse);
        } else {
            console.log('Method not allowed:', req.method);
            res.status(405).json({ message: 'Method not allowed', method: req.method });
        }
    } catch (error) {
        console.error('Error in register endpoint:', error);
        res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
    }
}