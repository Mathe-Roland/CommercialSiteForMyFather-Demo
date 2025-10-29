import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  transportCost: 0,
  loginLogOut: false,
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const calculateTransport = (totalPrice) => {
  if (totalPrice === 0) return 0;        
  return totalPrice > 1000 ? 0 : 35;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = calculateTotal(state.items);
      state.transportCost = calculateTransport(state.totalPrice);
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = calculateTotal(state.items);
      state.transportCost = calculateTransport(state.totalPrice);
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && quantity >= 0) {
        existingItem.quantity = quantity;
        state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalPrice = calculateTotal(state.items);
        state.transportCost = calculateTransport(state.totalPrice);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.transportCost = 0;
    },

    setLoginLogOut: (state, action) => {
      state.loginLogOut = action.payload;
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, setLoginLogOut } = cartSlice.actions;
export default cartSlice.reducer;
