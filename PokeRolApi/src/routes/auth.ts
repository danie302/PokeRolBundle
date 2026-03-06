import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { ErrorResponse, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../types/request';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../services/emailService';

// Define router
const router = express.Router();

// Login a user
router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response<{ token: string } | ErrorResponse>) => {
    const { email, password } = req.body;

    // Check if JWT_SECRET is available
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET environment variable is not set');
        res.status(500).json({ message: 'Server configuration error' });
        return;
    }

    console.log('Login attempt for email:', email);

    const user = await User.findOne({ email });
    if(!user) {
        console.log('User not found for email:', email);
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        console.log('Invalid password for email:', email);
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '24h' });
    console.log('JWT token generated successfully for user ID:', user._id);
    res.json({ token });
});

// Forgot password - request reset token
router.post('/forgot-password', async (req: Request<{}, {}, ForgotPasswordRequest>, res: Response<{ message: string } | ErrorResponse>) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Don't reveal if email exists or not for security
    if (!user) {
        res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
        return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Send password reset email
    try {
        await sendPasswordResetEmail(email, resetToken);
    } catch (error) {
        // Log error but don't fail the request to prevent email enumeration
        console.error('Failed to send password reset email:', error);
    }

    res.json({
        message: 'If an account exists with that email, a password reset link has been sent.'
    });
});

// Reset password
router.post('/reset-password', async (req: Request<{}, {}, ResetPasswordRequest>, res: Response<{ message: string } | ErrorResponse>) => {
    const { token, password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400).json({ message: 'Invalid or expired reset token' });
        return;
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
});

// Verify token alive
router.get('/alive', verifyToken, (req: Request, res: Response) => {
    res.json({ message: 'Token is alive' });
});

export default router;


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization") || "";

    // Safely extract token from Authorization header
    const parts = header.split(" ");
    if (parts.length !== 2) {
      console.log('Invalid Authorization header format:', header);
      res.status(401).json({ message: "Token not provided or invalid format" });
      return;
    }

    const token = parts[1];
    if (!token) {
      console.log('No token found in Authorization header');
      res.status(401).json({ message: "Token not provided" });
      return;
    }

    // Check if JWT_SECRET is available
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable is not set');
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      console.log('Token verified successfully for user ID:', (decoded as any).userId);
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(403).json({ message: "Token not valid" });
      return;
    }
  }