import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      // console.log("state, action", state, action);
      let product = state.products.find((elem) => {
        return elem._id === action.payload._id
      })
      // console.log("state.products, action.payload", state.products, action.payload);
      if (product) {
        if (product.soluong <= product.quantity + action.payload.quantity) {
          // console.log("product.soluong, product.quantity, action.payload.quantity", product.soluong, product.quantity, action.payload.quantity);
          return
        }
        let idx = state.products.findIndex((elem) => elem._id === product._id);
        state.products[idx].quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      // console.log("state.products, action.payload", state.products, action.payload);
      state.total += action.payload.gia * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      let product = state.products.find((elem) => {
        return elem._id === action.payload._id
      })
      if (product) {
        let idx = state.products.findIndex((elem) => elem._id === product._id);
        if (product.quantity > 1) {
          state.products[idx].quantity -= action.payload.quantity;
        } else { // product.quantity <= 1
          state.quantity -= 1;
          state.products.splice(idx, 1);
        }
        state.total -= action.payload.gia * action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;