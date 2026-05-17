import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // اصلاح discount به off
  const finalPrice = item.off
    ? item.price - (item.price * item.off) / 100
    : item.price;

  return (
    <div className="cart-item">
      {/* اصلاح image به img و name به title */}
      <img src={item.img} alt={item.title} />

      <div className="cart-info">
        <h3>{item.title}</h3>
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
