import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('Debug endpoint called');
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
        console.log('JWT_SECRET value:', process.env.JWT_SECRET ? '*** SET ***' : 'NOT SET');
        console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('VERCEL:', process.env.VERCEL);
        console.log('All env vars:', Object.keys(process.env).filter(k => k.includes('JWT') || k.includes('MONGO')));

        res.json({
            jwtSecretSet: !!process.env.JWT_SECRET,
            mongoUriSet: !!process.env.MONGODB_URI,
            nodeEnv: process.env.NODE_ENV,
            vercel: process.env.VERCEL,
            message: 'Environment variables loaded successfully'
        });
    } catch (error) {
        console.error('Error in debug endpoint:', error);
        res.status(500).json({ error: (error as Error).message });
    }
}