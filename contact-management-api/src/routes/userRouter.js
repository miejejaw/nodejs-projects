import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from '../controllers/userController.js';

const router = express.Router();

// Register a new user
router.post('/register', createUser);

// Get all users
router.get('/users', getAllUsers);

// Get user by ID
router.get('/user/:id', getUserById);

// Update user
router.put('/update', updateUserById);

// Delete user by ID
router.delete('/delete/:id', deleteUserById);

export default router;
