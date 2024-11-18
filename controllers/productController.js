import Books from "../models/productModel.js";

// Get a single product by name
export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Treat the id as a string
    console.log('Searching for product with id:', productId);

    const productList = await Books.find(); // Fetch all products
    if (!productList.length) {
      console.log('Product list is empty.');
      return res.status(404).json({ message: 'Product list is empty' });
    }

    // Find the product by its id (assuming id is a string in your product schema)
    const product = productList.find(product => product.id === productId);
    if (!product) {
      console.log('Product not found.');
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product found:', product);
    res.json(product);
  } catch (error) {
    console.error('Error finding product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get all products
export const getProducts = async (req, res) => {
  console.log('Received request to get products');
  try {
    console.log('Fetching products from the database...');
    const products = await Books.find();
    console.log('Products fetched successfully:', products);
    console.log(`Total number of products fetched: ${products.length}`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, image_url, availability } = req.body;

    console.log('Received request to add a product.');

    // Create a new product object
    console.log('Creating a new product object...');
    const product = new Books({
      id,
      title,
      author,
      genre,
      category,
      price,
      published_year,
      language,
      image_link,
      pdf_link,
      description
    });

    // Save the product to the database
    console.log('Saving the product to the database...');
    await product.save();

    // Send success response with the added product
    console.log('Product added successfully!');
    res.status(201).json({ message: 'Product added successfully!', product });
  } catch (error) {
    // If any error occurs, log the error and send an error response
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Oops! Something went wrong while adding the product.', error });
  }
};

