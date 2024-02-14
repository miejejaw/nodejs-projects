import crypto from 'crypto';import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

export const generateAccessToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

export const generateRefreshToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex'); 
};
