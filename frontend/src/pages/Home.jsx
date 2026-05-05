import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <div className="container hero-inner">
          <div className="hero-text-box">
            <span className="hero-badge">مراقبت و زیبایی</span>
            <h1>فروشگاه محصولات آرایشی و مشاوره پوست</h1>
            <p>
              خرید محصولات اورجینال به همراه دریافت مشاوره تخصصی پوست از بهترین متخصصین زیبایی.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">
                مشاهده محصولات
              </Link>
              <Link to="/consult" className="btn-outline">
                دریافت مشاوره
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* دسته بندی */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">دسته‌بندی محصولات</h2>
            <p className="section-subtitle">دنیای زیبایی خود را کشف کنید</p>
          </div>

          <div className="categories-grid">
            <Link to="/products?cat=skin" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://i.imgur.com/H7MLG8J.jpg" alt="مراقبت پوست" />
              </div>
              <span>مراقبت پوست</span>
            </Link>

            <Link to="/products?cat=hair" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://i.imgur.com/ghh0WgC.jpg" alt="مراقبت مو" />
              </div>
              <span>مراقبت مو</span>
            </Link>

            <Link to="/products?cat=cosmetics" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://i.imgur.com/V7JNNLt.jpg" alt="لوازم آرایشی" />
              </div>
              <span>لوازم آرایشی</span>
            </Link>

            <Link to="/products?cat=electrical" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://i.imgur.com/tRKw5Lr.jpg" alt="دستگاه‌های برقی" />
              </div>
              <span>دستگاه‌های برقی</span>
            </Link>
          </div>
        </div>
      </section>

      {/* پرفروش ها */}
      <section className="home-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">پرفروش‌ترین‌ها</h2>
            <p className="section-subtitle">محبوب‌ترین محصولات از نگاه مشتریان</p>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-img-wrapper">
                <img src="https://i.imgur.com/HRH2sLN.jpg" alt="سرم ویتامین C" />
              </div>
              <div className="product-info">
                <h3>سرم ویتامین C</h3>
                <p className="price">۲۴۵٬۰۰۰ <span>تومان</span></p>
                <Link to="/product/1" className="btn-text">مشاهده و خرید</Link>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img-wrapper">
                <img src="https://i.imgur.com/RzyCSpF.jpg" alt="ضدآفتاب SPF50" />
              </div>
              <div className="product-info">
                <h3>ضدآفتاب SPF50</h3>
                <p className="price">۳۲۰٬۰۰۰ <span>تومان</span></p>
                <Link to="/product/2" className="btn-text">مشاهده و خرید</Link>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img-wrapper">
                <img src="https://i.imgur.com/9SNKxzz.jpg" alt="شامپو تقویت مو" />
              </div>
              <div className="product-info">
                <h3>شامپو تقویت مو</h3>
                <p className="price">۱۸۰٬۰۰۰ <span>تومان</span></p>
                <Link to="/product/3" className="btn-text">مشاهده و خرید</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مشاوره */}
      <section className="consult-banner">
        <div className="container">
          <div className="consult-inner">
            <div className="consult-content">
              <h2>نیاز به مشاوره تخصصی دارید؟</h2>
              <p>
                عکس پوست خود را ارسال کنید تا بهترین روتین پوستی منحصراً برای شما پیشنهاد شود. کارشناسان ما آماده پاسخگویی هستند.
              </p>
            </div>
            <div className="consult-action">
              <Link to="/consult" className="btn-primary shadow">
                شروع مشاوره رایگان
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
