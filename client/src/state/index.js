import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  products: [
    {
      id: "1",
      name: "Product A",
      description: "This is Product A",
      price: "10.99",
      category: "Category 1",
      seller: "Seller 1",
    },
    {
      id: "2",
      name: "Product B",
      description: "This is Product B",
      price: "5.99",
      category: "Category 1",
      seller: "Seller 1",
    },
    {
      id: "3",
      name: "Product C",
      description: "This is Product C",
      price: "15.99",
      category: "Category 2",
      seller: "Seller 1",
    },
    {
      id: "4",
      name: "Product D",
      description: "This is Product D",
      price: "20.99",
      category: "Category 2",
      seller: "Seller 1",
    },
    {
      id: "5",
      name: "Product E",
      description: "This is Product E",
      price: "8.99",
      category: "Category 1",
      seller: "Seller 5",
    },
    {
      id: "6",
      name: "Product F",
      description: "This is Product F",
      price: "12.99",
      category: "Category 2",
      seller: "Seller 6",
    },
    {
      id: "7",
      name: "Product G",
      description: "This is Product G",
      price: "25.99",
      category: "Category 3",
      seller: "Seller 7",
    },
    {
      id: "8",
      name: "Product H",
      description: "This is Product H",
      price: "19.99",
      category: "Category 3",
      seller: "Seller 8",
    },
    {
      id: "9",
      name: "Product I",
      description: "This is Product I",
      price: "6.99",
      category: "Category 1",
      seller: "Seller 9",
    },
    {
      id: "10",
      name: "Product J",
      description: "This is Product J",
      price: "14.99",
      category: "Category 2",
      seller: "Seller 10",
    },
  ],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateProduct: (state, action) => {
      const selectedProduct = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (selectedProduct > -1) {
        state.products[selectedProduct] = action.payload;
      }
    },
    addProduct: (state, action) => {
      const id = state.products.length + 1;
      const seller = state.user.name;
      state.products = [...state.products, { id, seller, ...action.payload }];
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setMode,
  setUser,
  updateUser,
  addProduct,
  updateProduct,
  deleteProduct,
} = globalSlice.actions;

export default globalSlice.reducer;
