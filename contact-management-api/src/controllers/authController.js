import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

const generateAccessToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

const generateRefreshToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { _id: userId, role } = user;

    const accessToken = generateAccessToken(userId, username, role); 
    const refreshToken = generateRefreshToken(userId, username, role); 

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.json({ username: user.username, userId, role });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized: Missing refresh token' });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid refresh token' });
    }

    const accessToken = generateAccessToken(user.userId, user.username, user.role); 
    
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.json({ username: user.username, userId: user.userId, role: user.role });
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie('accessToken'); 
  res.clearCookie('refreshToken'); 
  res.status(204).json({ message: 'Logout successful' });
};


export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token });
    
    if (!user || user.isVerified) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verification successful.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'An error occurred while verifying email.' });
  }
};
