import { ApiConfig } from '../utils/ApiConfig';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/product`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const calculateCartTotal = async (cartItems) => {
  try {
    const response = await fetch(`${ApiConfig.API_BASE_URL}/product/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });
    const data = await response.json();
    return data.total;
  } catch (error) {
    console.error('Error calculating cart total:', error);
    throw error;
  }
};
