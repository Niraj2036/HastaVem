import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
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
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
