import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                  <span className="text-xl font-bold">TechStore</span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Your trusted destination for the latest technology and electronics. 
                  We bring you the best products with amazing deals and excellent customer service.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-facebook text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
                  <li><a href="/products" className="text-gray-300 hover:text-white transition">Products</a></li>
                  <li><a href="/about" className="text-gray-300 hover:text-white transition">About Us</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2">
                  <li><a href="/shipping" className="text-gray-300 hover:text-white transition">Shipping Info</a></li>
                  <li><a href="/returns" className="text-gray-300 hover:text-white transition">Returns</a></li>
                  <li><a href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                © 2024 TechStore. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <i className="fab fa-cc-visa text-2xl text-gray-300"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-300"></i>
                <i className="fab fa-cc-amex text-2xl text-gray-300"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-300"></i>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;