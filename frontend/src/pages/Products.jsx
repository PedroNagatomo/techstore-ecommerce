import { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products] = useState([
    {
      id: 1,
      name: "MacBook Pro 14",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "Laptops",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      category: "Phones",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "Audio",
      rating: 4.7,
      reviews: 203
    },
    {
      id: 4,
      name: "iPad Air",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      category: "Tablets",
      rating: 4.6,
      reviews: 67
    },
    {
      id: 5,
      name: "Samsung Galaxy S23",
      price: 849.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      category: "Phones",
      rating: 4.5,
      reviews: 156
    },
    {
      id: 6,
      name: "Dell XPS 13",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
      category: "Laptops",
      rating: 4.4,
      reviews: 98
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Laptops', 'Phones', 'Audio', 'Tablets'];

  const filteredProducts = selectedCategory === 'All'
  ? products
  : products.filter(products => products.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <div className="flex space-x-2">
                      <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition">
                        <i className="fas fa-heart"></i>
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;