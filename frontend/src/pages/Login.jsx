import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  
  // استیت برای نمایش/مخفی کردن رمز عبور
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LOGIN DATA:", form);
    alert("ورود انجام شد (دمو) ✅");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>ورود به حساب کاربری</h1>
          <p>برای ثبت سفارش و دریافت مشاوره وارد شوید</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          {/* فیلد ایمیل */}
          <div className="input-group">
            <label>ایمیل</label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FaEnvelope className="input-icon" />
            </div>
          </div>

          {/* فیلد رمز عبور */}
          <div className="input-group">
            <label>رمز عبور</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="رمز عبور خود را وارد کنید"
                value={form.password}
                onChange={handleChange}
                required
              />
              <FaLock className="input-icon" />
              
              {/* دکمه تغییر وضعیت نمایش رمز */}
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="نمایش رمز عبور"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* تنظیمات ورود */}
          <div className="login-options">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              مرا به خاطر بسپار
            </label>

            <Link to="/forgot-password" className="forgot">
              رمز عبور را فراموش کردید؟
            </Link>
          </div>

          <button type="submit" className="login-btn">
            ورود به سایت
          </button>

        </form>

        <div className="login-footer">
          <span>حساب کاربری ندارید؟</span>
          <Link to="/register">ثبت‌نام کنید</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
