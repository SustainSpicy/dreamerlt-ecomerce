import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import globalReducer from "./state";
import cartReducer from "./state/cart";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AlertContextProvider from "./providers/alert/AlertProvider";

const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </Provider>
  </React.StrictMode>
);
