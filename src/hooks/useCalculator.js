import { useContext } from "react";
import { CalcStore } from "../store/Calculator";

export default function useCalculator() {
  const [state, dispatch] = useContext(CalcStore);

  if (!state) throw new Error("OPAAAA");

  const addCount = (value) => dispatch({ type: "add", payload: value });
  const reset = () => dispatch({ type: "reset" });

  return {
    ...state,
    addCount,
    reset,
  };
}
