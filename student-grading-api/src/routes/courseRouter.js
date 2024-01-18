import express from 'express';
import {
  create_course_controller,
  get_course_controller,
  edit_course_controller,
  update_course_controller,
  delete_course_controller,
} from '../controllers/courseController.js';

const router = express.Router();

// Create course route
router.post('/create', create_course_controller);

// Get course details route
router.get('/:course_id', get_course_controller);

// Edit course details route
router.put('/:course_id/edit', edit_course_controller);

// Update course details route
router.patch('/:course_id/update', update_course_controller);

// Delete course route
router.delete('/:course_id/delete', delete_course_controller);

export default router;
