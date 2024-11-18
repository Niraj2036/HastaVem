import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js';
console.log("reached routes");
const router = express.Router();

// Route to get the wishlist
router.post('/', getWishlist); // Use a route parameter for the email

// Route to add an item to the wishlist
router.post('/add', addToWishlist);

// Route to remove an item from the wishlist
router.delete('/remove', removeFromWishlist);

export default router;
