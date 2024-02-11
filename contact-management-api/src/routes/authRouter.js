import express from 'express';
import { loginUser, refreshAccessToken, logoutUser, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

router.get('/verify-email/:token', verifyEmail);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
export default router;
