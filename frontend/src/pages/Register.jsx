import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaLock, 
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    if (form.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setError("");

    // اینجا بعداً به API وصل می‌شود
    console.log("REGISTER DATA:", form);

    alert("ثبت‌نام با موفقیت انجام شد ✅");
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-card">
        
        <div className="register-header">
          <h1>ایجاد حساب کاربری</h1>
          <p>برای خرید و دریافت مشاوره ثبت‌نام کنید</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>نام و نام خانوادگی</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="مثال: سارا محمدی"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>ایمیل</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="input-group">
            <label>شماره موبایل</label>
            <div className="input-wrapper">
              <FaPhoneAlt className="input-icon" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="09120000000"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="input-group">
            <label>رمز عبور</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="حداقل ۶ کاراکتر"
                required
                dir="ltr"
              />
              <div 
                className="eye-icon" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>تکرار رمز عبور</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="تکرار رمز عبور"
                required
                dir="ltr"
              />
              <div 
                className="eye-icon" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="register-btn">
            ثبت‌نام
          </button>
        </form>

        <div className="register-footer">
          قبلاً ثبت‌نام کرده‌اید؟
          <Link to="/login">وارد شوید</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
