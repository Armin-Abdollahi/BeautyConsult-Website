import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // اضافه شدن آیکون
import { getProductById } from "../services/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await getProductById(id);

      if (res.ok) {
        setProduct(res.data);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="loading">در حال بارگذاری...</p>;
  }

  if (!product) {
    return <p className="loading">محصول یافت نشد</p>;
  }

  const finalPrice = product.off
    ? product.price - (product.price * product.off) / 100
    : product.price;

  return (
    <div className="product-details">
      <div className="product-container">
        
        <div className="product-image">
          <img src={product.img} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>

          <p className="category">
            دسته‌بندی: {product.category}
          </p>

          <div className="price-box">
            {product.off > 0 && (
              <span className="old-price">
                {product.price.toLocaleString()} تومان
              </span>
            )}

            <span className="final-price">
              {finalPrice.toLocaleString()} تومان
            </span>

            {product.off > 0 && (
              <span className="discount">
                {product.off}% تخفیف
              </span>
            )}
          </div>

          <p className="description">
            این محصول یکی از بهترین محصولات مراقبت از پوست است
            که برای انواع پوست مناسب بوده و باعث افزایش
            لطافت و شادابی پوست می‌شود. فرمولاسیون ویژه این محصول تضمین‌کننده زیبایی شماست.
          </p>

          <button className="add-cart">
            <FaShoppingCart />
            افزودن به سبد خرید
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
