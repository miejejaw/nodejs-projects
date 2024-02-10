import express from 'express';
import userRouter from './userRouter.js';

const routes = express.Router();

routes.use("/api/user", userRouter);

export default routes;
