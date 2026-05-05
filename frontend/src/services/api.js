// src/services/api.js

// آدرس بک‌اند (بعداً که Node.js راه افتاد اینو عوض می‌کنی)
const BASE_URL = "http://localhost:5000/api";

// شبیه‌ساز درخواست HTTP (فعلاً Mock)
async function mockRequest(responseData, delay = 700) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        data: responseData,
      });
    }, delay);
  });
}

// اگر خواستی مستقیماً به بک‌اند وصل بشی اینو فعال می‌کنی:
/*
async function realRequest(path, method = "GET", body, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
*/

// ------------ توابع Auth ------------

// ثبت‌نام کاربر
export async function registerUser(payload) {
  // payload = { name, email, phone, password }

  // نسخه MOCK:
  console.log("REGISTER API CALLED:", payload);

  return mockRequest({
    message: "ثبت‌نام موفق",
    user: {
      id: 1,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    },
  });

  // نسخه واقعی (بعداً):
  // return realRequest("/auth/register", "POST", payload);
}

// لاگین کاربر
export async function loginUser(payload) {
  // payload = { email, password }

  console.log("LOGIN API CALLED:", payload);

  // MOCK:
  return mockRequest({
    message: "ورود موفق",
    token: "FAKE_JWT_TOKEN",
    user: {
      id: 1,
      name: "کاربر تست",
      email: payload.email,
    },
  });

  // واقعی:
  // return realRequest("/auth/login", "POST", payload);
}

// ------------ توابع Products ------------

// لیست محصولات
export async function getProducts() {
  // این دیتا می‌تونه همون‌هایی باشه که تو Products.jsx گذاشتیم
  const products = [
    { id: 1, title: "کرم آبرسان لاروش پوزای", price: 820000, off: 10, category: "پوست", img: "/images/hydra.jpg" },
    { id: 2, title: "سرم ویتامین C اوردینری", price: 1250000, off: 20, category: "پوست", img: "/images/serum.jpg" },
    { id: 3, title: "شامپو ضدریزش فولیکا", price: 450000, off: 0, category: "مو", img: "/images/shampoo.jpg" },
    { id: 4, title: "ریمل بورژوا", price: 390000, off: 15, category: "آرایشی", img: "/images/mascara.jpg" },
    { id: 5, title: "کرم مو نرم‌کننده", price: 270000, off: 5, category: "مو", img: "/images/cream.jpg" },
    { id: 6, title: "کرم ضدآفتاب آردن", price: 580000, off: 12, category: "پوست", img: "/images/sunscreen.jpg" },
  ];

  return mockRequest(products);

  // واقعی:
  // return realRequest("/products", "GET");
}

// جزئیات یک محصول
export async function getProductById(id) {
  const all = await getProducts();
  const product = all.data.find((p) => p.id === Number(id)) || null;
  return mockRequest(product);

  // واقعی:
  // return realRequest(`/products/${id}`, "GET");
}

// ------------ فرم مشاوره پوست ------------

export async function submitConsultForm(payload) {
  // payload = { name, issueType, description, imageUrl/… }

  console.log("CONSULT FORM API:", payload);

  return mockRequest({
    message: "فرم مشاوره دریافت شد. کارشناسان در اسرع وقت پاسخ خواهند داد.",
  });

  // واقعی:
  // return realRequest("/consult", "POST", payload);
}

// ------------ فرم تماس با ما ------------

export async function submitContactForm(payload) {
  // payload = { name, email, phone, subject, message }

  console.log("CONTACT FORM API:", payload);

  return mockRequest({
    message: "پیام شما ثبت شد. تیم پشتیبانی به زودی پاسخ می‌دهد.",
  });

  // واقعی:
  // return realRequest("/contact", "POST", payload);
}
