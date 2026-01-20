import { ArrowLeft, Minus, Package, Plus, ShoppingBag, Tag, Trash2, TrendingUp, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTaxAmount,
    getFinalTotal,
    isCartEmpty
  } = useContext(CartContext);

  const [hoveredItem, setHoveredItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout');
  };

  if (isCartEmpty()) {
    return (
      <div className="cart-container min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <ShoppingBag size={96} className="mx-auto text-indigo-400 relative" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Discover our delicious menu and add your favorite dishes to get started!
          </p>
          <a
            href="/menu"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Package className="group-hover:rotate-12 transition-transform" size={20} />
            Explore Menu
          </a>
        </div>
      </div>
    );
  }

  const deliveryFee = 50;
  const discount = 0; // Can be dynamic

  return (
    <div className="cart-container min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 pt-20">
      {/* Header Section */}
      <div className="cart-header bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-16 z-40 shadow-md">
        <div className="cart-header-content container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="cart-header-inner flex items-center justify-between gap-2 sm:gap-4">
            {/* Back Button - Hidden on mobile, visible on sm and up */}
            <a
              href="/menu"
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group flex-shrink-0"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium hidden md:inline">Continue Shopping</span>
            </a>
            
            {/* Title - Centered on mobile */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex-1 text-center sm:text-left">
              Shopping Cart
            </h1>
            
            {/* Badge */}
            <div className="flex items-center gap-2 bg-indigo-100 px-3 sm:px-4 py-2 rounded-full flex-shrink-0">
              <ShoppingBag size={18} className="text-indigo-600" />
              <span className="font-bold text-indigo-600 text-sm sm:text-base">{cartItems.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-main container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="cart-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items Section - Takes 2 cols on lg */}
          <section className="cart-items-section lg:col-span-2 order-2 lg:order-1">
            <div className="cart-items-card bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Items ({cartItems.length})
                </h2>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-red-50 transition-all"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Clear All</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group relative bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-indigo-200 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 ${hoveredItem === item.id ? 'ring-2 ring-indigo-200' : ''}`}
                  >
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {/* Header with name and remove btn */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {item.name}
                            </h3>
                            {item.quantity > 1 && (
                              <span className="inline-flex items-center text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                                x{item.quantity}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Price and Quantity Controls - Stacked on mobile */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-2 sm:mt-0">
                        {/* Price */}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-xs sm:text-sm text-gray-500">
                              (₹{item.price} each)
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl p-1 shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-lg transition-all duration-300"
                          >
                            <Minus size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <span className="w-10 text-center font-bold text-gray-900 text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-lg transition-all duration-300"
                          >
                            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <Tag className="text-indigo-600 flex-shrink-0" size={18} />
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Have a promo code?</h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="text"
                    placeholder="Enter code here"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg transform hover:scale-105 transition-all whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Order Summary Section */}
          <aside className="cart-summary-section order-1 lg:order-2">
            <div className="cart-summary-sticky sticky top-24 lg:top-32">
              <div className="cart-summary-card bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <TrendingUp className="text-indigo-600 flex-shrink-0" size={22} />
                  <span className="hidden sm:inline">Order Summary</span>
                  <span className="sm:hidden">Summary</span>
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full flex-shrink-0"></div>
                      Subtotal
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      Tax (5%)
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{getTaxAmount().toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                      Delivery
                    </span>
                    <span className="font-semibold text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm sm:text-base text-green-600">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                        Discount
                      </span>
                      <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-dashed border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{(getFinalTotal() + deliveryFee).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="checkout-btn group w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Checkout</span>
                  <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={18} />
                </button>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-200">
                  <p className="text-xs sm:text-sm text-green-700 text-center font-medium">
                    🎉 Save ₹{(getTotalPrice() * 0.1).toFixed(2)} on this order!
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Free cancellation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>30-45 min delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transform scale-100 animate-in">
            <div className="text-center mb-6">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Clear Cart?</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Are you sure? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;