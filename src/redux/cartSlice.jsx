import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, stock, name, price } = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.productId === productId);

      if (quantity > stock) {
        return;
      }

      if (existingProductIndex > -1) {
        state.items[existingProductIndex].quantity = quantity;
      } else {
        state.items.push({ productId, quantity, name, price });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));

      const simplifiedCart = state.items.map(({ productId, quantity }) => ({ productId, quantity }));
      localStorage.setItem('backend-cart', JSON.stringify({ items: simplifiedCart }));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload.productId);

      localStorage.setItem('cart', JSON.stringify(state.items));

      const simplifiedCart = state.items.map(({ productId, quantity }) => ({ productId, quantity }));
      localStorage.setItem('backend-cart', JSON.stringify({ items: simplifiedCart }));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cart');
      localStorage.removeItem('backend-cart');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
