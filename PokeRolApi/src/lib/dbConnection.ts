import mongoose from 'mongoose';

// Cache for database connection to reuse in serverless functions
let cachedConnection: typeof mongoose | null = null;

export const connectToDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    // Return cached connection if available
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached MongoDB connection');
        return cachedConnection;
    }

    try {
        // Configure mongoose for serverless environment
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            socketTimeoutMS: 45000, // 45 second socket timeout
            maxPoolSize: 10, // Connection pool size
            minPoolSize: 2, // Minimum pool size
        });

        const db = mongoose.connection;
        console.log('Connected to MongoDB');
        cachedConnection = mongoose; // Cache the connection
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}