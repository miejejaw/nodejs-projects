import express from 'express';
import * as authController from '../controllers/authController.js';
import limiter from '../middlewares/rateLimitMiddleware.js';
// import bruteforce from '../middlewares/accountLockoutMiddleware.js';


const router = express.Router();
// Apply Rate Limiting Middleware
router.use(limiter);

// Apply Account Lockout Middleware
// router.post('/login', bruteforce.prevent, loginUser);

router.post('/login', authController.loginUser);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/logout', authController.logoutUser);


export default router;
