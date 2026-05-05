import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // گرفتن سبد از localStorage با مدیریت خطا
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("خطا در خواندن سبد خرید:", error);
      return [];
    }
  });

  // ذخیره در localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // محاسبه مقادیر با useMemo برای پرفورمنس بهتر
  const { totalPrice, totalItems } = useMemo(() => {
    return cartItems.reduce(
      (totals, item) => {
        const price = item.discount
          ? item.price - (item.price * item.discount) / 100
          : item.price;

        totals.totalPrice += price * item.quantity;
        totals.totalItems += item.quantity;
        return totals;
      },
      { totalPrice: 0, totalItems: 0 }
    );
  }, [cartItems]);

  // ممو کردن مقدار Context برای جلوگیری از رندر اضافی کامپوننت‌های فرزند
  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalPrice,
      totalItems,
    }),
    [cartItems, totalPrice, totalItems]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
