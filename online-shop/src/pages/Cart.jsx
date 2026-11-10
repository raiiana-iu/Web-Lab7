import { Link } from "react-router";
import { useCartStore } from "../store/cartStore";
function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div>
        <h1>Your cart is empty</h1>
        <Link to="/products">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <p>Price: ${item.price}</p>

          <p>
            Quantity: {item.quantity}
          </p>

          <button
            onClick={() =>
              setQuantity(item.id, item.quantity - 1)
            }
          >
            -
          </button>

          <button
            onClick={() =>
              setQuantity(item.id, item.quantity + 1)
            }
          >
            +
          </button>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <button onClick={clear}>Clear cart</button>
    </div>
  );
}

export default Cart;
