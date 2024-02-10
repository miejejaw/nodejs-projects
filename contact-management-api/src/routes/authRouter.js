import express from 'express';
import { loginUser, refreshAccessToken, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
export default router;
