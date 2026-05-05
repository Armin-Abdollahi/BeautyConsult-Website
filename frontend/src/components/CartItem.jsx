import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";

// کامپوننت هر آیتم در سبد خرید
function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const finalPrice = item.discount
    ? item.price - (item.price * item.discount) / 100
    : item.price;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-info">
        <h3>{item.name}</h3>
        <p>{finalPrice.toLocaleString()} تومان</p>
      </div>

      <div className="cart-quantity">
        <button onClick={() => decreaseQuantity(item.id)} aria-label="کاهش تعداد">
          <FaMinus />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)} aria-label="افزایش تعداد">
          <FaPlus />
        </button>
      </div>

      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
        <FaTrash style={{ marginLeft: '5px' }} />
        حذف
      </button>
    </div>
  );
}

export default CartItem;
