import express from 'express';
import { requestOTP, verifyOTP } from '../controllers/otpController.js';

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

export default router;
