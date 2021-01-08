import "../style/Shop.css";
import Icon from "../components/Icon";
import { useShopCart } from "../hooks/useShopCart";
import useCatalog from "../hooks/useCatalog";

export default function Shop() {
  const { catalog, orderOptions, orderBy } = useCatalog();
  const { products: cartProducts, addCart } = useShopCart();

  const hasCart = (sku) => cartProducts.find((p) => p.sku === sku);

  return (
    <div className={`shop`}>
      <div>
        <select onChange={(event) => orderBy(event.target.value)}>
          {orderOptions.map((o, index) => (
            <option value={o.field} key={index}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row cols-4 product-list">
        {catalog.map((product) => (
          <div
            key={product.sku}
            className="product"
            refs={`prod_${product.sku}`}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div class="product-info">
              <p>{product.name}</p>
            </div>
            <div className="row space-between items-center product-actions">
              <div>
                <p>R$ {product.price.toFixed(2)}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                {hasCart(product.sku) && (
                  <Icon className="product-in-cart" icon="check" />
                )}
                <button onClick={() => addCart(product, 1)}>
                  <Icon icon="cart-plus" /> adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
