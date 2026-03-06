import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../src/lib/dbConnection';
import app from '../src/index';

// Ensure the Express app is listening in serverless mode
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('Serverless function called:', req.method, req.url);
        console.log('Environment check - JWT_SECRET:', !!process.env.JWT_SECRET, 'MONGODB_URI:', !!process.env.MONGODB_URI, 'NODE_ENV:', process.env.NODE_ENV);

        // Ensure database is connected before handling request
        await connectToDB();
        console.log('Database connected');

        // Use the Express app to handle the request
        return app(req as any, res as any);
    } catch (error) {
        console.error('Serverless function error:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
        }
    }
}
