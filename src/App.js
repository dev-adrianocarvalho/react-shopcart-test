import { ShopCartProvider } from "./store/ShopCart";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingBasket,
  faTruck,
  faCartPlus,
  faCheck,
  faTrash,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";

import Shop from "./views/Shop";
import ShopCart from "./components/ShopCart";

library.add(faShoppingBasket, faTruck, faCartPlus, faCheck, faTrash, faFrown);

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
