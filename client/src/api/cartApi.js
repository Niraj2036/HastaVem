export const fetchCart = async (email) => {
    const response = await fetch(`http://localhost:8080/api/v1/cart?email=${email}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch cart');
    }
  };
  
  export const updateCart = async (email, productName, quantity) => {
    const response = await fetch('http://localhost:8080/api/v1/cart/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, productName, quantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
  };
  
  export const removeFromCart = async (email, productName) => {
    const response = await fetch('http://localhost:8080/api/v1/cart/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, productName }),
    });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
  };
  
  export const makePurchase = async (email) => {
    const response = await fetch('http://localhost:8080/api/v1/cart/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to make purchase');
    }
  };
  