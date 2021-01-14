import { ShopCartProvider } from "./store/ShopCart";
import "./App.css";

import Shop from "./views/Shop";
import ShopCart from "./components/ShopCart";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingBasket,
  faTruck,
  faCartPlus,
  faCheck,
  faTrash,
  faFrown,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faShoppingBasket,
  faTruck,
  faCartPlus,
  faCheck,
  faTrash,
  faFrown,
  faAngleDown,
  faAngleUp
);

const App = () => {
  return (
    <div className="App">
      <ShopCartProvider>
        <ShopCart />
        <Shop />
      </ShopCartProvider>
    </div>
  );
};

export default App;
