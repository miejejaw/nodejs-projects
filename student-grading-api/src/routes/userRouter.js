import express from 'express';
import {
  user_register_controller,
  user_get_controller,
  user_edit_controller,
  user_update_controller,
  user_delete_controller,
} from './controllers/userController.js';

const router = express.Router();

// Registration route
router.post('/register', user_register_controller);

// Get user details route
router.get('/:user_id', user_get_controller);

// Edit user details route
router.put('/:user_id/edit', user_edit_controller);

// Update user details route
router.patch('/:user_id/update', user_update_controller);

// Delete user route
router.delete('/:user_id/delete', user_delete_controller);

export default router;
