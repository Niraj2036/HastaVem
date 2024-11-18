import Artisan from '../models/artisanModel.js'; // Import the Artisan model

// Function to get artisan details by ID
export const getArtisanById = async (req, res) => {
    const { id } = req.params; // Extract the artisan_id from the request params
    console.log(id); // This confirms that the ID is being received properly
  
    try {
      // Find artisan by artisan_id using Mongoose syntax
      const artisan = await Artisan.findOne({ artisan_id: id });
  
      if (!artisan) {
        return res.status(404).json({ message: 'Artisan not found' });
      }
  
      // Return the artisan details in JSON format
      res.status(200).json(artisan);
    } catch (error) {
      // Handle errors
      console.error('Error fetching artisan details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Function to get total number of artisans
export const getTotalArtisans = async (req, res) => {
  try {
    const count = await Artisan.countDocuments(); // Use countDocuments for Mongoose
// Use your ORM method to count artisans
    res.status(200).json({ totalArtisans: count });
  } catch (error) {
    console.error('Error fetching total number of artisans:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
