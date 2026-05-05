import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* درباره فروشگاه */}
        <div className="footer-col brand-col">
          <h3>فروشگاه زیبایی</h3>
          <p>
            فروشگاه آنلاین محصولات آرایشی و بهداشتی با ارائه
            بهترین برندهای دنیا. هدف ما ارائه محصولات اصل
            با بهترین قیمت و مشاوره تخصصی پوست و مو است.
          </p>
        </div>

        {/* لینک صفحات */}
        <div className="footer-col">
          <h4>لینک‌های مفید</h4>
          <ul>
            <li><Link to="/">صفحه اصلی</Link></li>
            <li><Link to="/products">فروشگاه</Link></li>
            <li><Link to="/consult">مشاوره پوست</Link></li>
            <li><Link to="/contact">تماس با ما</Link></li>
            <li><Link to="/login">ورود به حساب</Link></li>
          </ul>
        </div>

        {/* دسته بندی */}
        <div className="footer-col">
          <h4>دسته‌بندی‌ها</h4>
          <ul>
            <li><Link to="/products?cat=skin">مراقبت از پوست</Link></li>
            <li><Link to="/products?cat=hair">مراقبت از مو</Link></li>
            <li><Link to="/products?cat=makeup">لوازم آرایشی</Link></li>
            <li><Link to="/products?discount=true">محصولات تخفیف‌دار</Link></li>
          </ul>
        </div>

        {/* تماس */}
        <div className="footer-col">
          <h4>ارتباط با ما</h4>
          <ul className="contact-info">
            <li><span className="icon">📞</span> ۰۹۱۲۳۴۵۶۷۸۹</li>
            <li><span className="icon">✉️</span> support@beautyshop.com</li>
            <li><span className="icon">📍</span> تهران، خیابان زیبایی، پلاک ۱</li>
          </ul>

          <div className="socials">
            <a href="#instagram" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#telegram" target="_blank" rel="noreferrer">Telegram</a>
            <a href="#whatsapp" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© ۲۰۲۶ تمامی حقوق برای <span>فروشگاه زیبایی</span> محفوظ است.</p>
      </div>
    </footer>
  );
}

export default Footer;
