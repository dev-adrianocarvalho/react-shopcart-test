import { useShopCart } from "../hooks/useShopCart";
import Icon from "../components/Icon";

export default function ShopCart(props) {
  const {
    products,
    isShowing,
    clearCart,
    toggleMiniCart,
    removeItemCart,
  } = useShopCart();
  const totalCart = products.reduce(
    (v, p) => v + parseInt(p.price) * p.quantity,
    0
  );
  const cartCount = products.reduce((c, p) => c + parseInt(p.quantity), 0);

  const formatNumber = (value) => Number(value).toFixed(2);

  return (
    <>
      {isShowing ? (
        <div className="mini-shopcart">
          <div class="mini-shopcart__header">
            <h2>Seu carrinho</h2>
            <button
              onClick={toggleMiniCart}
              className="mini-shopcart__close-button"
            >
              &times;
            </button>
          </div>
          <div
            className={`mini-shopcart__list ${
              !cartCount ? "mini-shopcart__empty" : ""
            }`}
          >
            {!cartCount && (
              <div className="mini-shopcart__empty-message">
                <h3 style={{ textAlign: "center" }}>
                  <Icon icon="frown" />
                  Seu pedido está vazio!
                </h3>
              </div>
            )}
            {products.map((product) => (
              <div key={product.sku} class="shopcart-item">
                <div className="row space-between">
                  <div className="row items-center">
                    <div>
                      <span class="shopcart-item__quantity">
                        {product.quantity}x
                      </span>
                    </div>
                    <div>
                      <p>{product.name}</p>
                      <p className="shopcart-item__price-unit">
                        R$ {formatNumber(product.price)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <strong>
                        R${" "}
                        {formatNumber(
                          parseInt(product.price) * product.quantity
                        )}
                      </strong>
                    </div>

                    <div>
                      <button
                        className="button--mini"
                        onClick={() => removeItemCart(product.id)}
                      >
                        <Icon icon="trash" /> remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cartCount > 0 && (
            <div class="mini-shopcart__footer">
              <div className="row space-between items-center mini-shopcart__totals">
                <div>
                  <h4>Total:</h4>
                </div>
                <div>
                  <h4>R$ {formatNumber(totalCart)}</h4>
                </div>
              </div>
              <div className="row space-between">
                <button onClick={clearCart}>Limpar carrinho</button>
                <button class="button--primary">Concluir comprar</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button className="floating-shopcart" onClick={toggleMiniCart}>
          <Icon icon="truck" />
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </button>
      )}
    </>
  );
}
