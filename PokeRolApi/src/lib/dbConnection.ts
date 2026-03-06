import mongoose from 'mongoose';

// Cache for database connection to reuse in serverless functions
let cachedConnection: typeof mongoose | null = null;

export const connectToDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    // Return cached connection if available
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const db = (await mongoose.connect(mongoURI)).connection;
        console.log('Connected to MongoDB');
        cachedConnection = mongoose; // Cache the connection
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}