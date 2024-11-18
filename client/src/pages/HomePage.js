import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import '../styles/HomePage.css';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa'; // Import heart icon

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState(new Set()); // Use a Set for wishlist items
  const { auth } = useAuth();
  const isAuthenticated = !!auth.user;

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/products/products')
      .then(response => response.json())
      .then(data => {
        const shuffledProducts = data.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
    
    if (isAuthenticated) {
      fetchWishlist(); // Fetch wishlist on component mount
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/wishlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: auth.user.email }),
      });

      if (response.ok) {
        const data = await response.json();
        const wishlistItems = new Set(data.items.map(item => item.productId));
        setWishlist(wishlistItems);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Login required to add items to cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: auth.user.email, productId, quantity: 1 }),
      });

      if (response.ok) {
        toast.success('Item added to cart');
      } else {
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Login required to add items to wishlist');
      return;
    }

    try {
      const method = wishlist.has(productId) ? 'DELETE' : 'POST';
      const response = await fetch(`http://localhost:8080/api/v1/wishlist/${method === 'DELETE' ? 'remove' : 'add'}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: auth.user.email, productId }),
      });

      if (response.ok) {
        if (method === 'DELETE') {
          wishlist.delete(productId);
          toast.success('Removed from wishlist');
        } else {
          wishlist.add(productId);
          toast.success('Added to wishlist');
        }
        setWishlist(new Set(wishlist)); // Update state
      } else {
        toast.error('Failed to update wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout showHeader={true} showFooter={false}>
      <div className="container">
        <div className="welcome-container">
          <h1 className='welcome'>Welcome to Hastavem!</h1><br/>
          <p className="welcome-message">Experience the beauty of India's finest handloom textiles, crafted sustainably by skilled artisans.</p>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchbar"
          />
          <br/>
        </div>

        <h2 className="explore-heading">
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Explore Products'}
        </h2>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                
                <div className="product-image-container">
                <Link to={`/product/${product.id}`} className='details_card'>
                  <img className="product-image" src={product.image_link} alt={product.title} />
                  </Link>
                  <button
                    className={`wishlist-button ${wishlist.has(product.id) ? 'in-wishlist' : ''}`}
                    onClick={() => handleToggleWishlist(product.id)}
                  >
                    <FaHeart />
                  </button>
                </div>
                <div className="product-details">
                  <h5 className="product-name">{product.title}</h5>
                  <p className="product-price">{product.price}</p>
                  <div className="buttons">
                    <button className="cart" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                  </div>
                </div>
                
              </div>
            ))
          ) : (
            <p>No Products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
