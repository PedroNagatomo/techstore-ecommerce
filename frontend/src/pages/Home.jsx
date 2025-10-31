import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 14\"",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "Laptops"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 5.999,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      category: "Phones"
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "Audio"
    },
    {
      id: 4,
      name: "iPad Air",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      category: "Tablets"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to TechStore</h1>
            <p className="text-xl mb-8 opacity-90">Discover the latest in technology with amazing deals</p>
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-gray-600">Check out our most popular items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shipping-fast text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe with us</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-headset text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;