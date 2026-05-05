import { useState } from "react";
import "./Consult.css";

function Consult() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [problem, setProblem] = useState("لکه و تیرگی پوست");
  const [description, setDescription] = useState("");

  // هندل انتخاب عکس
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // هندل ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("لطفاً ابتدا عکس پوست خود را آپلود کنید.");
      return;
    }
    // اینجا می‌توانید اطلاعات را به بک‌اند ارسال کنید
    console.log({ image, problem, description });
    alert("درخواست شما با موفقیت ثبت شد!");
  };

  return (
    <div className="consult-page">
      {/* هدر صفحه */}
      <div className="consult-header">
        <h1>مشاوره تخصصی پوست</h1>
        <p>
          عکس پوست خود را ارسال کنید تا پزشکان متخصص، نوع پوست و بهترین روتین
          مراقبتی را برای شما پیشنهاد دهند.
        </p>
      </div>

      <div className="consult-container">
        {/* بخش سمت راست: فرم */}
        <form className="consult-form" onSubmit={handleSubmit}>
          {/* آپلود عکس */}
          <label className="form-label">آپلود عکس پوست (الزامی)</label>
          <div className="upload-box">
            {preview ? (
              <img src={preview} alt="preview" className="preview-image" />
            ) : (
              <span className="upload-text">برای انتخاب عکس کلیک کنید</span>
            )}
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>

          {/* نوع مشکل پوستی */}
          <label className="form-label">نوع مشکل پوستی شما چیست؟</label>
          <select 
            className="form-select"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          >
            <option>لکه و تیرگی پوست</option>
            <option>جوش و آکنه</option>
            <option>خشکی پوست</option>
            <option>چربی بیش از حد</option>
            <option>چین‌وچروک و پیری</option>
            <option>حساسیت پوستی</option>
            <option>مشکل دیگر…</option>
          </select>

          {/* توضیحات تکمیلی */}
          <label className="form-label">توضیحات خود را وارد کنید</label>
          <textarea
            className="form-textarea"
            placeholder="مثلاً: هنگام استفاده از ضدآفتاب صورتم قرمز می‌شود..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* ارسال */}
          <button type="submit" className="consult-btn">
            ارسال برای پزشک
          </button>
        </form>

        {/* بخش سمت چپ: نکات مهم */}
        <aside className="consult-info">
          <h3>نکات مهم قبل از ارسال</h3>
          <ul>
            <li>عکس کاملاً واضح و در نور کافی باشد.</li>
            <li>بدون آرایش و بدون روتوش عکس بگیرید.</li>
            <li>اگر دارویی مصرف می‌کنید در توضیحات بنویسید.</li>
            <li>پاسخ پزشک معمولاً بین ۳۰ دقیقه تا ۲ ساعت ارسال می‌شود.</li>
            <li>پیشنهاد روتین بر اساس نوع پوست + بودجه شما خواهد بود.</li>
          </ul>

          <div className="consult-note">
            💡 برای تجربه بهترین مشاوره، عکس را از فاصله ۳۰ سانتی‌متری بگیرید.
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Consult;
