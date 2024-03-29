import express from 'express';
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.delete('/:id', protect, isAdmin, deleteUser);
router.get('/:id', protect, isAdmin, getUserById);
router.put('/:id', protect, isAdmin, updateUser);

export default router;
