import express from 'express';
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/', protect, isAdmin, getOrders);
router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered);

export default router;
