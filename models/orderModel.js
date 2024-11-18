import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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
      paymentMode: {
        type: String,
        required: true,
        enum: ['Cash on Delivery', 'Credit Card', 'Debit Card', 'UPI'],  // Add more options as needed
        default: 'Cash on Delivery',
      },
      shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      date: {
        type: Date,
        default: Date.now, // Automatically set the current date when the item is added
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
