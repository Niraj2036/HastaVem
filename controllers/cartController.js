import Cart from '../models/cartModel.js';

export const getOrCreateCart = async (email) => {
  console.log(`getOrCreateCart called for email: ${email}`);
  let cart = await Cart.findOne({ email });
  if (!cart) {
    console.log('No cart found, creating a new cart');
    cart = new Cart({ email, items: [] });
    await cart.save();
  }
  console.log(`Cart found or created: ${JSON.stringify(cart)}`);
  return cart;
};

export const addToCart = async (req, res) => {
  const { email, productId, quantity } = req.body;

  if (!email) {
    console.log('email', email)
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`addToCart called with email: ${email}, productId: ${productId}, quantity: ${quantity}`);

  try {
    let cart = await getOrCreateCart(email);

    const itemIndex = cart.items.findIndex(item => item.producId === productId);
    if (itemIndex > -1) {
      console.log('Product already in cart, updating quantity');
      cart.items[itemIndex].quantity += quantity;
    } else {
      console.log('Product not in cart, adding new item');
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    console.log(`Cart updated: ${JSON.stringify(cart)}`);
    return res.status(201).json(cart);
  } catch (error) {
    console.error('Error in addToCart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getCart = async (req, res) => {
  console.log(`hello bro`)
  const { email } = req.body;

  if (!email) {
    console.log('email', email)
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`getCart called for email: ${email}`);

  try {
    const cart = await getOrCreateCart(email);
    console.log(`Cart retrieved: ${JSON.stringify(cart)}`);
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error in getCart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const removeFromCart = async (req, res) => {
  const { email, productId } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`removeFromCart called with email: ${email}, productId: ${productId}`);

  try {
    let cart = await Cart.findOne({ email });
    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    console.log(`Cart updated after removal: ${JSON.stringify(cart)}`);

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const updateCartItem = async (req, res) => {
  const { email, productId, quantity } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`updateCartItem called with email: ${email}, productId: ${productId}, quantity: ${quantity}`);

  try {
    let cart = await Cart.findOne({ email });
    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      console.log('Product found in cart, updating quantity');
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      console.log(`Cart updated: ${JSON.stringify(cart)}`);
      return res.status(200).json(cart);
    } else {
      console.log('Product not found in cart');
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const initializeCart = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  console.log(`initializeCart called for email: ${email}`);

  try {
    const cart = await getOrCreateCart(email);
    console.log(`Cart initialized: ${JSON.stringify(cart)}`);
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error in initializeCart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
