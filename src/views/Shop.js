import "../style/Shop.css";
import Icon from "../components/Icon";
import { useShopCart } from "../hooks/useShopCart";
import useCatalog from "../hooks/useCatalog";
import { Select } from "../components/Forms";

export default function Shop() {
  const { catalog, orderOptions, orderBy } = useCatalog();
  const { products: cartProducts, addCart } = useShopCart();

  const onOrderByChanged = (event) => orderBy(event.target.value);

  const hasCart = (sku) => cartProducts.find((p) => p.sku === sku);

  return (
    <div className={`shop`}>
      <div className="shop__filter-bar">
        <Select onChange={onOrderByChanged} label="Ordene por:" id="orderBy">
          {orderOptions.map((o, index) => (
            <option value={o.field} key={index}>
              {o.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="row cols-4 product-list">
        {catalog.map((product) => (
          <div
            key={product.sku}
            className={`product ${hasCart(product.sku) ? "in-cart" : ""}`}
            refs={`prod_${product.sku}`}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
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
