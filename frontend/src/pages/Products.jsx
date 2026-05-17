import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext"; 
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("همه");
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const categories = ["همه", "پوست", "مو", "آرایشی"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        // ارتباط مستقیم با API بک‌اند PHP شما
        const response = await fetch('http://localhost/skin-care-project/beauty-api/get_products.php');
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError("دریافت محصولات با مشکل مواجه شد.");
        }
      } catch (err) {
        console.error("Products fetch error:", err);
        setError("خطایی در ارتباط با سرور رخ داد. لطفا از روشن بودن XAMPP مطمئن شوید.");
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
      const matchesPrice = Number(product.price) <= maxPrice;
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
              filteredProducts.map((product, index) => {
                // اگر فیلد تخفیف در دیتابیس ندارید، مقدار پیش‌فرض صفر در نظر می‌گیریم
                const discount = product.off || 0; 
                const price = Number(product.price);
                const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

                return (
                  <div className="product-card" key={product.id || index}>
                    <Link
                      to={`/product/${product.id}`}
                      className="product-image-link"
                    >
                      {/* اینجا img را به image تغییر دادیم تا با دیتابیس مچ شود */}
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
                        {discount > 0 ? (
                          <>
                            <span className="new-price">
                              {Math.round(finalPrice).toLocaleString()} تومان
                            </span>
                            <span className="old-price">
                              {price.toLocaleString()} تومان
                            </span>
                            <span className="off-badge">
                              {discount}% تخفیف
                            </span>
                          </>
                        ) : (
                          <span className="new-price">
                            {price.toLocaleString()} تومان
                          </span>
                        )}
                      </div>

                      <div className="product-actions">
                        <button 
                          className="add-btn"
                          onClick={() => {
                            addToCart(product);
                            alert('به سبد خرید اضافه شد!');
                          }}
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
