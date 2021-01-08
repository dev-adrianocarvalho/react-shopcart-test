import { createContext, useReducer } from "react";

export const ShopCartContext = createContext();

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { payload } = action;
      let products = state.products;
      let product = payload;
      const existingItem = products.find((p) => p.id === payload.id);
      if (existingItem) {
        product.quantity = existingItem.quantity + product.quantity;
        products[products.indexOf(existingItem)] = product;
      } else {
        products = [...products, payload];
      }

      return { ...state, products };
    }

    case "REMOVE_ITEM": {
      const products = state.products.filter((p) => p.id != action.payload);
      return { ...state, products };
    }

    case "CLEAR": {
      return {
        products: [],
        errors: [],
        isShowing: false,
      };
    }

    case "TOGGLE_MINICART": {
      return { ...state, isShowing: !state.isShowing };
    }

    case "SHOW_MINICART": {
      return { ...state, isShowing: true };
    }

    default: {
      return state;
    }
    //throw new Error("Action não informada");
  }
};

export const ShopCartProvider = ({ children }) => {
  const initialCart = {
    products: [],
    isShowing: false,
    errors: [],
  };
  const [state, dispatch] = useReducer(reducer, initialCart);

  return (
    <ShopCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopCartContext.Provider>
  );
};
