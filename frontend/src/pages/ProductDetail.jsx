import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Buscar produto da API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(`🔄 Buscando produto ID: ${id}`);
        
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }
        
        const productData = await response.json();
        console.log('✅ Produto carregado:', productData);
        setProduct(productData);

        // Buscar produtos relacionados
        const relatedResponse = await fetch(`http://localhost:5000/api/products/category/${productData.category}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filtrar o produto atual
          const filteredRelated = relatedData.filter(p => p.id !== productData.id).slice(0, 3);
          setRelatedProducts(filteredRelated);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar produto:', error);
        // Redirecionar para página de produtos se não encontrar
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    console.log('🎯 Adicionando ao carrinho:', product);
    addToCart(product, quantity);
    alert(`✅ ${quantity} ${product.name} adicionado ao carrinho!`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-lg">Carregando produto...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Voltar para Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <i className="fas fa-chevron-right text-xs"></i>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
          </li>
          <li>
            <i className="fas fa-chevron-right text-xs"></i>
          </li>
          <li>
            <Link
              to={`/products?category=${product.category}`}
              className="hover:text-blue-600"
            >
              {product.category}
            </Link>
          </li>
          <li>
            <i className="fas fa-chevron-right text-xs"></i>
          </li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <img
              src={product.images && product.images[selectedImage] ? product.images[selectedImage] : product.image}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex space-x-2">
            {(product.images && product.images.length > 0 ? product.images : [product.image]).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-blue-600 font-semibold">{product.brand}</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating || 0} ({product.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-semibold">
                <i className="fas fa-check-circle mr-2"></i>In Stock
                {product.stockQuantity && (
                  <span className="text-green-500 ml-2">
                    ({product.stockQuantity} available)
                  </span>
                )}
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-gray-700 font-semibold">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </button>
              <button
                onClick={toggleWishlist}
                className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition"
              >
                {isWishlisted ? (
                  <HeartIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartOutline className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-blue-600 font-semibold text-blue-600">
              Description
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700 font-semibold">
              Specifications
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700 font-semibold">
              Reviews ({product.reviewCount || 0})
            </button>
          </nav>
        </div>

        <div className="py-6">
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <span className="font-semibold text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-blue-600 font-semibold">
                    {relatedProduct.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-gray-900">
                      ${relatedProduct.price}
                    </span>
                    <Link
                      to={`/product/${relatedProduct.id}`}
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
      )}
    </div>
  );
};

export default ProductDetail;