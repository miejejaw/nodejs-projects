import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db_name = process.env.DB_NAME
const MONGODB_URI = `mongodb://localhost:27017/${db_name}`; 

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;
