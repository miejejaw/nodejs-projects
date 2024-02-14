import express from 'express';
import * as contactsController from '../controllers/contactController.js';
import {authenticateToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', contactsController.createContact);
router.get('/all', contactsController.getAllContactsOfUser);
router.get('/single', contactsController.getContactByIdOfUser);
router.put('/update', contactsController.updateContact);
router.delete('/delete', contactsController.deleteContact);

export default router;
