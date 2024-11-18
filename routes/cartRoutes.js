// routes/cart.js
import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartItem, initializeCart } from '../controllers/cartController.js';
import { requireSignIn  } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', addToCart);
router.post('/', getCart);
router.delete('/remove', removeFromCart);
router.put('/update', updateCartItem);
router.post('/initialize', initializeCart); // This route does not require protection as it can be called during login

export default router;
