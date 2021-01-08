import { useReducer, createContext } from "react";

const calcInitial = { count: 0 };
export const CalcStore = createContext();

export const CalcProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add": {
        const newState = { count: state.count + action.payload };
        return newState;
      }
      case "reset": {
        return calcInitial;
      }
      default: {
        throw new Error("Ação requerida!");
      }
    }
  }, calcInitial);

  return <CalcStore.Provider value={[state, dispatch]} {...props} />;
};
