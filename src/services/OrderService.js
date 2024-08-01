import { ApiConfig } from '../utils/ApiConfig';

const getUserIdFromLocalStorage = () => {
  return localStorage.getItem('userId');
};

const getCartItemsFromLocalStorage = () => {
  const cartData = localStorage.getItem('backend-cart');
  return cartData ? JSON.parse(cartData).items : [];
};

export const createOrder = async () => {
  try {
    const userId = getUserIdFromLocalStorage();
    const cartItems = getCartItemsFromLocalStorage();

    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await fetch(`${ApiConfig.API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        items: cartItems,
      }),
    });

    const data = await response.json();

    if (data.status === 1) {
      return data;
    } else {
      throw new Error(data.message || 'Error creating order.');
    }
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
