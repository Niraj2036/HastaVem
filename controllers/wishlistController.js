import Wishlist from '../models/wishlistModel.js';

export const getOrCreateWishlist = async (email) => {
  console.log(`getOrCreateWishlist called for email: ${email}`);
  let wishlist = await Wishlist.findOne({ email });
  if (!wishlist) {
    console.log('No wishlist found, creating a new wishlist');
    wishlist = new Wishlist({ email, items: [] });
    await wishlist.save();
  }
  console.log(`Wishlist found or created: ${JSON.stringify(wishlist)}`);
  return wishlist;
};

export const addToWishlist = async (req, res) => {
  const { email, productId } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`addToWishlist called with email: ${email}, productId: ${productId}`);

  try {
    let wishlist = await getOrCreateWishlist(email);

    const itemIndex = wishlist.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      console.log('Product already in wishlist');
      return res.status(400).json({ message: 'Product already in wishlist' });
    } else {
      console.log('Product not in wishlist, adding new item');
      wishlist.items.push({ productId });
    }

    await wishlist.save();
    console.log(`Wishlist updated: ${JSON.stringify(wishlist)}`);
    return res.status(201).json(wishlist);
  } catch (error) {
    console.error('Error in addToWishlist:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getWishlist = async (req, res) => {
    const { email } = req.body; // Still using req.body to get the email
    console.log("getWishlist called");
  
    if (!email) {
      return res.status(400).json({ message: 'User email is required' });
    }
  
    console.log(`getWishlist called for email: ${email}`);
  
    try {
      const wishlist = await getOrCreateWishlist(email);
      console.log(`Wishlist retrieved: ${JSON.stringify(wishlist)}`);
      return res.status(200).json(wishlist);
    } catch (error) {
      console.error('Error in getWishlist:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  

export const removeFromWishlist = async (req, res) => {
  const { email, productId } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`removeFromWishlist called with email: ${email}, productId: ${productId}`);

  try {
    let wishlist = await Wishlist.findOne({ email });
    if (!wishlist) {
      console.log('Wishlist not found');
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(item => item.productId !== productId);
    await wishlist.save();
    console.log(`Wishlist updated after removal: ${JSON.stringify(wishlist)}`);

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
