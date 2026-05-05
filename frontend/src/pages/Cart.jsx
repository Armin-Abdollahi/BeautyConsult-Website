import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem"; // ایمپورت کامپوننت جدید
import "./Cart.css";

function Cart() {
  const { cartItems, clearCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>سبد خرید شما خالی است</h2>
        <p>محصولی به سبد اضافه نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">سبد خرید شما ({cartItems.length} کالا)</h2>

      <div className="cart-container">
        {/* بخش لیست آیتم‌ها */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* بخش خلاصه سفارش */}
        <aside className="cart-summary">
          <h3>خلاصه سفارش</h3>
          <div className="summary-row">
            <span>جمع کل سبد خرید</span>
            <span>{totalPrice.toLocaleString()} تومان</span>
          </div>
          {/* میتوانید موارد دیگر مثل تخفیف و هزینه ارسال را اینجا اضافه کنید */}
          <button className="checkout-btn">ادامه فرایند خرید</button>
          <button className="clear-btn" onClick={clearCart}>
            خالی کردن سبد
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
