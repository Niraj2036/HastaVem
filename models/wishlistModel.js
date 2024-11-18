import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      }
    },
  ],
}, { timestamps: true });


export default mongoose.model('Wishlist', WishlistSchema);


