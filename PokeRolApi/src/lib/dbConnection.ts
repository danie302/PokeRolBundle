import mongoose from 'mongoose';

export const connectToDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error('MONGO_URI is not defined in the environment variables');
    } 
    try {
        const db = (await mongoose.connect(mongoURI)).connection;
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}