import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__container">
        
        {/* لوگو */}
        <div className="navbar__logo">
          <Link to="/">DermaBeauty</Link>
        </div>

        {/* سرچ بار */}
        <div className="navbar__search">
          <input type="text" placeholder="جستجوی محصولات..." />
          <button>جستجو</button>
        </div>

        {/* لینک‌های دسکتاپ */}
        <nav className="navbar__links">
          <Link to="/">خانه</Link>

          {/* منوی دسته‌بندی */}
          <div
            className="navbar__dropdown"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <span className="dropdown__title">دسته‌بندی‌ها ▾</span>

            {categoriesOpen && (
              <div className="dropdown__menu">
                <Link to="/products?cat=skin">مراقبت پوست</Link>
                <Link to="/products?cat=hair">مراقبت مو</Link>
                <Link to="/products?cat=cosmetics">لوازم آرایشی</Link>
                <Link to="/products?cat=electrical">دستگاه‌های برقی</Link>
                <div className="dropdown__divider"></div>
                <Link to="/products?cat=sale" className="highlight-link">تخفیف‌های ویژه</Link>
                <Link to="/products?cat=best-seller">پرفروش‌ها</Link>
              </div>
            )}
          </div>

          <Link to="/consult">مشاوره پوست</Link>
          <Link to="/contact">پشتیبانی</Link>
        </nav>

        {/* دکمه‌های اکشن */}
        <div className="navbar__actions">
          <Link to="/login" className="login-btn">
            ورود / ثبت‌نام
          </Link>
          <Link to="/cart" className="cart-btn">
            <span className="cart-icon">🛒</span>
          </Link>

          {/* دکمه منوی موبایل */}
          <div
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>
      </div>

      {/* منوی موبایل (با افکت تاریک کننده پس‌زمینه) */}
      {menuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}></div>
          <div className="navbar__mobile-menu">
            <Link to="/" onClick={() => setMenuOpen(false)}>خانه</Link>

            <details>
              <summary>دسته‌بندی‌ها</summary>
              <div className="mobile-submenu">
                <Link to="/products?cat=skin" onClick={() => setMenuOpen(false)}>مراقبت پوست</Link>
                <Link to="/products?cat=hair" onClick={() => setMenuOpen(false)}>مراقبت مو</Link>
                <Link to="/products?cat=cosmetics" onClick={() => setMenuOpen(false)}>لوازم آرایشی</Link>
                <Link to="/products?cat=electrical" onClick={() => setMenuOpen(false)}>دستگاه‌های برقی</Link>
                <Link to="/products?cat=sale" onClick={() => setMenuOpen(false)} className="highlight-link">تخفیف‌ها</Link>
              </div>
            </details>

            <Link to="/consult" onClick={() => setMenuOpen(false)}>مشاوره پوست</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>تماس و پشتیبانی</Link>
            
            <div className="mobile-menu-bottom">
              <Link to="/login" className="login-btn-mobile" onClick={() => setMenuOpen(false)}>ورود / ثبت‌نام</Link>
              <Link to="/cart" className="cart-btn-mobile" onClick={() => setMenuOpen(false)}>🛒 سبد خرید</Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
