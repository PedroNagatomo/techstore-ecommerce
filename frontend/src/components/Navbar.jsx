import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { getCartItemsCount } = useCart();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">TechStore</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">Products</Link>
            <Link to="/categories" className="text-gray-600 hover:text-blue-600 transition">Categories</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to="/login" className="p-2">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;