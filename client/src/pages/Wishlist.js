import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Cart.css'; // Assuming you'll reuse the same style for the wishlist
import { useAuth } from "../context/auth";
import Layout from "../components/Layout/Layout";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    document.body.classList.add("WishlistBody");
    return () => {
      document.body.classList.remove("WishlistBody");
    };
  }, []);

  // Fetch Wishlist Data
  const fetchWishlist = async () => {
    const email = auth?.user?.email;
    try {
      const response = await axios.post('/api/v1/wishlist', { email }); // Assuming wishlist endpoint
      const wishlistData = response.data;

      // Fetch product details for each wishlist item by productId
      const productPromises = wishlistData.items.map(item =>
        axios.get(`/api/v1/products/product/${item.productId}`)
      );
      const productResponses = await Promise.all(productPromises);
      const productData = productResponses.reduce((acc, response) => {
        acc[response.data.id] = response.data;
        return acc;
      }, {});

      setProducts(productData);
      setWishlist(wishlistData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/v1/wishlist/remove`, { data: { email: auth?.user?.email, productId } });
      fetchWishlist(); // Refresh the wishlist after removing the item
    } catch (error) {
      setError(error.message);
    }
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
        <h1>Your Wishlist</h1>
        <section className="bg-light my-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="card border shadow-0">
                  <div className="m-4">
                    <h4 className="card-title mb-4">Items in your wishlist</h4>
                    {wishlist.items.length > 0 ? (
                      wishlist.items.map((wishlist_item, index) => {
                        const product = products[wishlist_item.productId];
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
                            <div className="col-lg-3 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                              <div className="float-md-end">
                                <button type="button" className="btn btn-light border text-danger icon-hover-danger" onClick={() => removeFromWishlist(wishlist_item.productId)}>Remove</button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>Your wishlist is empty</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Wishlist;
