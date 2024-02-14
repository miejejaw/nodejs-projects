import express from 'express';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
import otpRouter from './otpRouter.js';
import contactRouter from './contactRouter.js'

const routes = express.Router();

routes.use("/api/user", userRouter);
routes.use("/api/auth", authRouter);
routes.use("/api/otp", otpRouter);
routes.use("/api/contact", contactRouter);

export default routes;
