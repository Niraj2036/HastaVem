import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShippingForm from './../components/ShippingForm.js'; // Import the shipping form
import '../styles/Cart.css';
import { useAuth } from "../context/auth";
import Layout from "../components/Layout/Layout";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState({});
    const { auth } = useAuth();
    const [showShippingForm, setShowShippingForm] = useState(false); // State to control shipping form visibility

    useEffect(() => {
        document.body.classList.add("CartBody");
        return () => {
            document.body.classList.remove("CartBody");
        };
    }, []);

    const fetchCart = async () => {
        const email = auth?.user?.email;
        try {
            const response = await axios.post('/api/v1/cart', { email });
            const cartData = response.data;

            const productPromises = cartData.items.map(item =>
                axios.get(`/api/v1/products/product/${item.productId}`)
            );
            const productResponses = await Promise.all(productPromises);
            const productData = productResponses.reduce((acc, response) => {
                acc[response.data.id] = response.data;
                return acc;
            }, {});

            setProducts(productData);
            setCart(cartData);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/api/v1/cart/remove`, { data: { email: auth?.user?.email , productId } });
            fetchCart();
        } catch (error) {
            setError(error.message);
        }
    };

    const updateCartItem = async (productId, newQuantity) => {
        try {
            await axios.put(`/api/v1/cart/update`, { email: auth?.user?.email, productId, quantity: newQuantity });
            fetchCart();
        } catch (error) {
            setError(error.message);
        }
    };

    const cleanPrice = (priceString) => {
        // Remove non-numeric characters like '₹' and commas, then convert to a number
        return parseFloat(priceString.replace(/[^0-9.-]+/g,""));
    };
    
    const calculateSubtotal = (item) => {
        const product = products[item.productId];
        if (!product || typeof product.price !== 'string') {
            return 0; // Return 0 if the product or its price is missing or not a string
        }
        const price = cleanPrice(product.price); // Convert price string to a number
        return price * item.quantity;
    };
    
    const calculateTotal = () => {
        if (!cart || !cart.items || Object.keys(products).length === 0) {
            return 0; // Return 0 if cart or products aren't fully loaded yet
        }
    
        return cart.items.reduce((total, item) => {
            const subtotal = calculateSubtotal(item);
            return subtotal > 0 ? total + subtotal : total; // Only add valid subtotals
        }, 0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout showHeader={true} showFooter={false}>
            <div className="container">
                <h1>Welcome, {auth?.user?.name}!</h1>
                <section className="bg-light my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">Your shopping cart</h4>
                                        {cart.items.length > 0 ? (
                                            cart.items.map((cart_item, index) => {
                                                const product = products[cart_item.productId];
                                                return (
                                                    <div className="row gy-3 mb-4" key={index}>
                                                        <div className="col-lg-5">
                                                            <div className="me-lg-5">
                                                                <div className="d-flex">
                                                                    <img src={product?.image_link} className="border rounded me-3" style={{ width: 96, height: 96 }} alt={product?.title} />
                                                                    <div>
                                                                        <a href="#" className="nav-link">{product?.title}</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-sm-6 col-6 d-flex flex-column align-items-start justify-content-center text-nowrap">
                                                            <label className="mb-2 d-block">Quantity:</label>
                                                            <div className="quantity-controls">
                                                                <input 
                                                                    type="number" 
                                                                    id="quantity" 
                                                                    name="quantity" 
                                                                    defaultValue={cart_item.quantity} 
                                                                    min={1} 
                                                                    className="form-control" 
                                                                    style={{ width: 50, textAlign: 'center' }} 
                                                                    onChange={(e) => updateCartItem(cart_item.productId, e.target.value)} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                            <div className="float-md-end">
                                                                <p className="h6">₹{calculateSubtotal(cart_item)}</p>
                                                                <small className="text-muted"> ₹{product?.price} / per item </small>
                                                                <div className="mt-3">
                                                                    <button className="btn btn-danger" onClick={() => removeFromCart(cart_item.productId)}>Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p>Your cart is empty.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="m-4">
                    <h4 className="card-title mb-4">Order Summary</h4>
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>₹{calculateTotal()}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Tax</p>
                      <p>₹0.00</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Shipping</p>
                      <p>₹0.00</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h5>Total</h5>
                      <h5>₹{calculateTotal()}</h5>
                    </div>
                    <div className="text-center mt-4">
                      {calculateTotal() > 0 ? (
                        <a  onClick={() => setShowShippingForm(true)} className="btn btn-primary">Make Purchase</a>
                      ) : (
                        <p>Your cart is empty.</p>
                      )}
                    </div>
                  </div>
                            </div>
                        </div>
                    </div>
                </section>
                {showShippingForm && (
                    <ShippingForm 
                        onClose={() => setShowShippingForm(false)} 
                        onSubmit={() => {
                            fetchCart(); // Refresh the cart or perform any action after order placement
                            setShowShippingForm(false); // Close the form
                        }} 
                    />
                )}
            </div>
        </Layout>
    );
};

export default Cart;
