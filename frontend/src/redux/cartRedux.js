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
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;