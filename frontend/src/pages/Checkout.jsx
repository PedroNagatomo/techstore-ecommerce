import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  // Calcular totais baseado nos itens reais do carrinho
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: 'Shipping', active: step === 1 },
    { number: 2, title: 'Payment', active: step === 2 },
    { number: 3, title: 'Confirmation', active: step === 3 }
  ];

  const handlePlaceOrder = () => {
    // Gerar número de pedido aleatório
    const newOrderNumber = 'TS' + Date.now().toString().slice(-8);
    setOrderNumber(newOrderNumber);
    setOrderCompleted(true);
    clearCart();
    setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShippingStep onNext={() => setStep(2)} />;
      case 2:
        return <PaymentStep onNext={handlePlaceOrder} onBack={() => setStep(1)} />;
      case 3:
        return <ConfirmationStep orderNumber={orderNumber} />;
      default:
        return null;
    }
  };

  // Se o carrinho estiver vazio, mostrar mensagem
  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-shopping-cart text-gray-400 text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart before checkout</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-8">
          {steps.map((stepItem, index) => (
            <React.Fragment key={stepItem.number}>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  stepItem.active || step > stepItem.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step > stepItem.number ? (
                    <i className="fas fa-check text-xs"></i>
                  ) : (
                    stepItem.number
                  )}
                </div>
                <span className={`ml-3 font-semibold ${
                  stepItem.active || step > stepItem.number
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ${
                  step > stepItem.number ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {renderStep()}
        </div>

        {/* Order Summary - COM PRODUTOS REAIS DO CARRINHO */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            {/* Cart Items REAIS */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {subtotal < 50 && shipping > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-yellow-800 text-sm">
                  <i className="fas fa-shipping-fast mr-2"></i>
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Shipping Step Component
const ShippingStep = ({ onNext }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📦 Dados de envio:', formData);
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="BR">Brazil</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

// Payment Step Component
const PaymentStep = ({ onNext, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('💳 Método de pagamento:', paymentMethod);
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Payment Method Selection */}
        <div className="mb-6">
          <div className="space-y-3">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3">
                <span className="font-medium text-gray-800">Credit/Debit Card</span>
                <div className="flex space-x-2 mt-1">
                  <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                  <i className="fab fa-cc-mastercard text-2xl text-red-600"></i>
                  <i className="fab fa-cc-amex text-2xl text-blue-800"></i>
                </div>
              </div>
            </label>

            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex items-center">
                <i className="fab fa-paypal text-2xl text-blue-600 mr-2"></i>
                <span className="font-medium text-gray-800">PayPal</span>
              </div>
            </label>
          </div>
        </div>

        {/* Card Details (shown only when card is selected) */}
        {paymentMethod === 'card' && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Back to Shipping
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

// Confirmation Step Component
const ConfirmationStep = ({ orderNumber }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="fas fa-check text-green-600 text-3xl"></i>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
      <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
      <p className="text-gray-600 mb-6">
        Your order <strong>#{orderNumber}</strong> has been confirmed and will be shipped soon.
      </p>
      
      <div className="space-y-4">
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
        <br />
        <Link
          to="/"
          className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Checkout;