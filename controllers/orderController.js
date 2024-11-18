import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

// Place Order Controller
export const placeOrder = async (req, res) => {
  const { email, shippingAddress } = req.body;

  try {
      // Step 1: Get the customer's cart
      const cart = await Cart.findOne({ email });

      if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty!" });
      }

      // Step 2: Convert all cart items into individual orders
      const orderItems = cart.items.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          paymentMode: "Cash on Delivery", // Default payment mode
          shippingAddress: {
              address: shippingAddress.address,
              city: shippingAddress.city,
              postalCode: shippingAddress.postalCode,
              country: shippingAddress.country,
          },
      }));

      // Step 3: Check if there's an existing order for this email
      const existingOrder = await Order.findOne({ email });

      if (existingOrder) {
          // If order exists, add new items to the existing order's items array
          existingOrder.items.push(...orderItems);
          await existingOrder.save();
      } else {
          // If no existing order, create a new one
          const newOrder = new Order({
              email,
              items: orderItems,
          });
          await newOrder.save();
      }

      // Step 4: Empty the cart after placing the order
      await Cart.updateOne({ email }, { $set: { items: [] } });

      return res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
};

// View Orders Controller
export const getOrders = async (req, res) => {
  const { email } = req.body;

  try {
    // Step 1: Fetch all orders for the customer
    const orders = await Order.find({ email });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer!" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
