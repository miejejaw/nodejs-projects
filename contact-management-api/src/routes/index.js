import express from 'express';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';

const routes = express.Router();

routes.use("/api/user", userRouter);
routes.use("/api/auth", authRouter);

export default routes;
