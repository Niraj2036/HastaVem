import mongoose from 'mongoose';

// Define the schema for the book model
const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String, // You can also use Number if you want to store price as a number
    required: true
  },
  category: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_link: {
    type: String,
    required: true
  },
  artisan_id: {
    type: String,
    required: true
  }
});

// Create the model from the schema
export default mongoose.model('Books', bookSchema, 'products');
