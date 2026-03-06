import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { ErrorResponse, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../types/request';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Define router
const router = express.Router();

// Login a user
router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response<{ token: string } | ErrorResponse>) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '24h' });
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

    // In production, send email here
    // For now, return the token for testing purposes
    console.log(`Password reset token for ${email}: ${resetToken}`);

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
    const token = header.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not provied" });
      return;
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || '');
      next();
    } catch (error) {
      res.status(403).json({ message: "Token not valid" });
      return;
    }
  }