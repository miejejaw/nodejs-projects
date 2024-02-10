import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import connectToDatabase from './src/models/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT; 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to MongoDB when the server starts
connectToDatabase().catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
