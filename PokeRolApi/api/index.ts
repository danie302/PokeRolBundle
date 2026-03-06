import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../src/lib/dbConnection';
import app from '../src/index';

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Ensure database is connected before handling request
    await connectToDB();

    // Use the Express app to handle the request
    return app(req, res);
}
