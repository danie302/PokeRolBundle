import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './lib/dbConnection';
import teamRoutes from './routes/team';
import userRoutes from './routes/users';
import pokemonRoutes from './routes/pokemon';
import authRoutes from './routes/auth';
import cors from 'cors';
import { verifyEmailConfig } from './services/emailService';

// Load environment variables
dotenv.config({
  path: '.env'
});

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to database
connectToDB();

// Verify email configuration
try {
    verifyEmailConfig();
    console.log('Email configuration verified successfully');
} catch (error) {
    console.warn('Warning: Email configuration is incomplete:', (error as Error).message);
    console.warn('Password reset emails will not be sent until email configuration is complete');
}

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PokeRol API! new version 1.0' });
});

// Use routes 
app.use('/users', userRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/team', teamRoutes);
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 