import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const secretKey = process.env.SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized: Missing refresh token' });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid refresh token' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie('refreshToken'); 
  res.json({ message: 'Logout successful' });
};
