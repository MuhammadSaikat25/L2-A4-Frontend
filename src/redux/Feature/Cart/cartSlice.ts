// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

type CartState = CartItem[];

const initialState: CartState = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.find(item => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ id: productId, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    setCart: (_, action: PayloadAction<CartState>) => {
      localStorage.setItem('cart', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
