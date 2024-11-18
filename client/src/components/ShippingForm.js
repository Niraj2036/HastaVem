import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "./../context/auth.js";
import '../styles/ShippingForm.css';
const ShippingForm = ({ onClose, onSubmit }) => {
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
        paymentMethod: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const email = auth?.user?.email;
            const address = `${shippingAddress.fullName}, ${shippingAddress.address}`; // Concatenate fullname and address
            await axios.post('/api/v1/orders/place', { email, shippingAddress: { ...shippingAddress, address } });
            onSubmit(); // Call onSubmit to refresh cart or perform actions after successful submission
            onClose(); // Close the shipping form
        } catch (error) {
            setError("There was an error placing your order. Please try again.");
            console.error("Error placing order:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="shippingFormModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="shippingFormModal">Enter Shipment Details</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <h6 className='shipingaddr'>Enter Shipping address</h6>
                            <div className="form-group">
                                <input type="text" name="fullName" className="form-control" id="fullName" placeholder=" " value={shippingAddress.fullName} onChange={handleChange} required />
                                <label htmlFor="fullName">Full Name</label>
                            </div>
                            <div className="form-group">
                                <input type="text" name="address" className="form-control" id="address" placeholder=" " value={shippingAddress.address} onChange={handleChange} required />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-group">
                                <input type="text" name="city" className="form-control" id="city" placeholder=" " value={shippingAddress.city} onChange={handleChange} required />
                                <label htmlFor="city">City</label>
                            </div>
                            <div className="form-group">
                                <input type="text" name="postalCode" className="form-control" id="postalCode" placeholder=" " value={shippingAddress.postalCode} onChange={handleChange} required />
                                <label htmlFor="postalCode">Postal Code</label>
                            </div>
                            <div className="form-group">
                                <h6>Payment Method</h6>
                                <select name="paymentMethod" className="custom-select" id="paymentMethod" value={shippingAddress.paymentMethod} onChange={handleChange} required>
                                    <option value="" disabled>Select Payment Method</option>
                                    <option value="cashOnDelivery">Cash on Delivery</option>
                                    <option value="creditCard" disabled>Credit Card (Currently Unavailable)</option>
                                    <option value="paypal" disabled>UPI (Currently Unavailable)</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" id="shippingButton" disabled={loading}>
                                {loading ? 'Processing...' : 'Submit Shipping Address'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingForm;
