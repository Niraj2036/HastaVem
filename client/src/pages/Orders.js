import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Orders.css'; // Import your CSS file
import { useAuth } from "../context/auth.js";
import Layout from "../components/Layout/Layout.js";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    const [productDetails, setProductDetails] = useState({}); // Store product details by productId

    useEffect(() => {
        const fetchOrders = async () => {
            const email = auth?.user?.email;
            try {
                console.log({email})
                const response = await axios.post('/api/v1/orders/', { email });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [auth]);

    // Function to fetch product details
    const fetchProductDetails = async (productId) => {
        if (!productDetails[productId]) { // Check if product details are already fetched
            try {
                const response = await axios.get(`/api/v1/products/product/${productId}`);
                setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    [productId]: response.data, // Store fetched product details
                }));
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
    };
    const cleanPrice = (price) => {
        // Remove any non-digit characters, including currency symbols, spaces, and commas
        const cleanedPrice = price.replace(/[^\d.-]/g, '');
        return Number(cleanedPrice); // Convert the cleaned string to a number
    };

    // Effect to fetch product details for all orders
    useEffect(() => {
        orders.forEach(order => {
            order.items.forEach(item => {
                fetchProductDetails(item.productId);
            });
        });
    }, [orders]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout showHeader={true} showFooter={false}>
            <div className="container">
                <h1>Your Orders</h1>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div className="order-card" key={index}>
                            
                            {order.items.map((item, itemIndex) => {
                                const details = productDetails[item.productId];
                                const total = details ? details.price * item.quantity : 0;

                                return (
                                    <div key={itemIndex} className="order-item">
                                        {details && (
                                            <>
                                            <div className='order'>
                                                <div className='image-order'>
                                                <img src={details.image_link} alt={details.title} className="product-image1" />
                                                </div><div className='details-order'>
                                                <p className='order-title'>{details.title}</p>
                                                <p className='order-quantity'>Quantity: {item.quantity}</p>
                                                <p className='order-price'>Price: ₹{cleanPrice(details.price).toFixed(2)}</p>
                                                <p className='order-total'>
                                                    Total: ₹{(cleanPrice(details.price) * item.quantity).toFixed(2)}
                                                </p>
                                                </div><div className='dateadr'>
                                                <p className='order-date'>Date: {new Date(item.date).toLocaleDateString('en-GB')}</p>
                                                <p className='order-addr'>
                                                    Shipping Address: {`${item.shippingAddress.address}, ${item.shippingAddress.city}, ${item.shippingAddress.postalCode}, ${item.shippingAddress.country}`}
                                                </p>
                                                </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <p>You have no orders.</p>
                )}
            </div>
        </Layout>
    );
};

export default Orders;
