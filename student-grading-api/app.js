import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './src/models/db';
import userRouter from './src/routes/userRouter';
import courseRouter from './src/routes/courseRouter';


const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//define routes
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);


app.listen(port, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});

