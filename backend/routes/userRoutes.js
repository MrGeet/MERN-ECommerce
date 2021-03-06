import express from 'express';
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
