import mongoose from 'mongoose';

const artisanSchema = new mongoose.Schema({
  artisan_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  image_link: {
    type: String,
    required: true,
  },
});

// Export the model
export default mongoose.model('Artisan', artisanSchema);

