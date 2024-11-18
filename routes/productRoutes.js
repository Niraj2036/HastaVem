import express from 'express';
import { getProduct, getProducts, addProduct } from '../controllers/productController.js';

const router = express.Router();

// Route to get a single product by name
router.get('/product/:id', getProduct);

// Route to get all products
router.get('/products', getProducts);


export default router;
