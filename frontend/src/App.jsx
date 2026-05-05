import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Consult from "./pages/Consult";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart"; // اضافه شدن سبد خرید

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} /> {/* مسیر سبد خرید */}

          <Route path="/consult" element={<Consult />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
