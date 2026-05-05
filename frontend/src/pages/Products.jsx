import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
// مسیر کانتکست سبد خرید خود را در صورت نیاز اصلاح کنید
import { useCart } from "../context/CartContext"; 
import { getProducts } from "../services/api";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("همه");
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart(); // هوک سبد خرید

  const categories = ["همه", "پوست", "مو", "آرایشی"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await getProducts();
        if (res.ok) {
          setProducts(res.data);
        } else {
          setError("دریافت محصولات با مشکل مواجه شد.");
        }
      } catch (err) {
        console.error("Products fetch error:", err);
        setError("خطایی در دریافت اطلاعات رخ داد.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCat === "همه" ? true : product.category === selectedCat;
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [products, selectedCat, maxPrice]);

  if (loading) {
    return (
      <div className="products-page">
        <p className="products-message">در حال بارگذاری محصولات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <p className="products-message error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="title">فروشگاه محصولات زیبایی</h1>
        <p className="subtitle">
          بهترین محصولات مراقبت از پوست، مو و آرایشی را انتخاب کنید
        </p>
      </div>

      <div className="products-container">
        <aside className="sidebar">
          <div className="filter-box">
            <h3>دسته‌بندی</h3>
            <div className="category-list">
              {categories.map((cat) => (
                <label key={cat} className="cat-filter">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCat === cat}
                    onChange={() => setSelectedCat(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-box">
            <h3>محدوده قیمت</h3>
            <input
              className="price-range"
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <p className="price-val">
              تا: <strong>{maxPrice.toLocaleString()}</strong> تومان
            </p>
          </div>
        </aside>

        <section className="products-content">
          <div className="products-topbar">
            <p>
              محصولات یافت‌شده: <strong>{filteredProducts.length}</strong>
            </p>
          </div>

          <div className="products-list">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <p>محصولی با فیلترهای انتخاب‌شده یافت نشد.</p>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const finalPrice =
                  product.off > 0
                    ? product.price - (product.price * product.off) / 100
                    : product.price;

                return (
                  <div className="product-card" key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      className="product-image-link"
                    >
                      <img src={product.img} alt={product.title} />
                    </Link>

                    <div className="product-body">
                      <span className="product-category">{product.category}</span>

                      <Link
                        to={`/product/${product.id}`}
                        className="product-title-link"
                      >
                        <h4>{product.title}</h4>
                      </Link>

                      <div className="price-box">
                        {product.off > 0 ? (
                          <>
                            <span className="new-price">
                              {Math.round(finalPrice).toLocaleString()} تومان
                            </span>
                            <span className="old-price">
                              {product.price.toLocaleString()} تومان
                            </span>
                            <span className="off-badge">
                              {product.off}% تخفیف
                            </span>
                          </>
                        ) : (
                          <span className="new-price">
                            {product.price.toLocaleString()} تومان
                          </span>
                        )}
                      </div>

                      <div className="product-actions">
                        {/* اتصال به کانتکست سبد خرید */}
                        <button 
                          className="add-btn"
                          onClick={() => addToCart(product)}
                        >
                          <FaShoppingCart size={14} /> خرید
                        </button>

                        <Link
                          to={`/product/${product.id}`}
                          className="details-btn"
                        >
                          <FaInfoCircle size={14} /> جزئیات
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Products;
