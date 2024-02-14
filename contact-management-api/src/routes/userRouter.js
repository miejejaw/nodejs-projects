import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Register a new user
router.post('/create', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/update', userController.updateUserById);

// Delete user by ID
router.delete('/delete/:id', userController.deleteUserById);

export default router;
