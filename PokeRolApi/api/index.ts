import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/index';

// Vercel serverless function handler
export default function handler(req: VercelRequest, res: VercelResponse) {
    // Use the Express app to handle the request
    return app(req, res);
}
