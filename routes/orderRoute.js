import express from 'express';
import { placeOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// Place an Order (POST /api/orders/place)
router.post('/place', placeOrder);

// View Orders (POST /api/orders/view)
router.post('/', getOrders);

export default router;
