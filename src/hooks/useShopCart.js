import { useContext } from "react";
import { ShopCartContext } from "../store/ShopCart";

export const useShopCart = () => {
  const { state, dispatch } = useContext(ShopCartContext);

  const addCart = async (product, quantity) => {
    await dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
    //setTimeout(async () => await dispatch({ type: "SHOW_MINICART" }), 1000);
  };

  const clearCart = () => dispatch({ type: "CLEAR" });
  const removeItemCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });

  const toggleMiniCart = () => dispatch({ type: "TOGGLE_MINICART" });
  const showMiniCart = () => dispatch({ type: "SHOW_MINICART" });

  return {
    ...state,
    addCart,
    removeItemCart,
    clearCart,
    toggleMiniCart,
    showMiniCart,
  };
};
