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
          <div className="mini-shopcart__header">
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
              <div key={product.sku} className="shopcart-item">
                <div className="row space-between items-center">
                  <div className="shopcart-item__image">
                    <img src={product.image} width="64" alt={product.name} />
                  </div>
                  <div className="shopcart-item__info">
                    <p>{product.name}</p>
                    <p className="shopcart-item__price-unit">
                      <span className="shopcart-item__quantity">
                        {product.quantity}x
                      </span>{" "}
                      R$ {formatNumber(product.price)}
                    </p>
                  </div>
                  <div className="shopcart-item__totals">
                    <div className="shopcart-item__price">
                      <strong>
                        R${" "}
                        {formatNumber(
                          parseInt(product.price) * product.quantity
                        )}
                      </strong>
                    </div>

                    <button
                      className="shopcart-item__remove-button button--mini"
                      onClick={() => removeItemCart(product.id)}
                    >
                      <Icon icon="trash" /> remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cartCount > 0 && (
            <div className="mini-shopcart__footer">
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
                <button className="button--primary">Concluir comprar</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button className="floating-shopcart" onClick={toggleMiniCart}>
          <Icon icon="shopping-basket" />
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </button>
      )}
    </>
  );
}
