import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRegClock, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // اینجا بعداً به بک‌اند وصل می‌کنیم
    alert("پیام شما با موفقیت ارسال شد ✅");
    
    // پاک کردن فرم بعد از ارسال موفق
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">

      {/* هدر */}
      <div className="contact-header">
        <h1>تماس با ما</h1>
        <p>
          اگر سوالی درباره محصولات یا نیاز به مشاوره دارید، با کمال میل در خدمت شما هستیم.
        </p>
      </div>

      <div className="contact-container">

        {/* فرم تماس */}
        <form className="contact-form" onSubmit={handleSubmit}>

          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="مثال: سارا محمدی"
            required
          />

          <label>ایمیل</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />

          <label>شماره تماس</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09120000000"
          />

          <label>موضوع پیام</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">لطفاً یک مورد را انتخاب کنید...</option>
            <option value="مشاوره">مشاوره پوست و مو</option>
            <option value="سفارش">پیگیری سفارشات</option>
            <option value="همکاری">درخواست همکاری</option>
            <option value="سایر">سایر موارد</option>
          </select>

          <label>متن پیام شما</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="پیام خود را اینجا بنویسید..."
            required
          ></textarea>

          <button type="submit">ارسال پیام</button>
        </form>

        {/* اطلاعات تماس */}
        <div className="contact-info">
          <h3>راه‌های ارتباطی</h3>

          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <span><strong>شماره تماس:</strong> 021-12345678</span>
          </div>

          <div className="info-item">
            <FaWhatsapp className="info-icon" />
            <span><strong>پشتیبانی واتساپ:</strong> 0912-0000000</span>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <span><strong>ایمیل:</strong> info@skincare.com</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span><strong>آدرس:</strong> تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
          </div>

          <div className="info-item">
            <FaRegClock className="info-icon" />
            <span><strong>ساعات پاسخگویی:</strong> شنبه تا پنجشنبه ۹ الی ۱۸</span>
          </div>

          <div className="social-links">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
