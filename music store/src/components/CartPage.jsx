import React, { useEffect } from "react";

export default function CartPage({ cart, setCart, onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.18; // 18% GST (standard in India, since we use ₹)
  const total = subtotal + tax;

  return (
    <div className="bg-[#F3F4F6] min-h-screen pt-32 pb-16 px-6 md:px-10 animate-page-enter">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => onNavigate("home")}
            className="text-slate-500 hover:text-slate-900 transition-colors p-2 bg-white rounded-full shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            Your Cart
            <div className="relative flex items-center justify-center overflow-visible ml-1">
              <style>{`
                @keyframes drive-cart {
                  0% { transform: translateX(0) scale(1); }
                  25% { transform: translateX(4px) scale(1.05) rotate(-3deg); }
                  50% { transform: translateX(8px) scale(1); }
                  75% { transform: translateX(4px) scale(0.95) rotate(3deg); }
                  100% { transform: translateX(0) scale(1); }
                }
              `}</style>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-7 h-7 text-indigo-500" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                style={{ animation: 'drive-cart 2s ease-in-out infinite' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-slate-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added any gear to your cart yet. Discover your next favorite piece of equipment on our homepage.</p>
            <button 
              onClick={() => onNavigate("home")}
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-slate-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
                <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Items ({cart.reduce((s, i) => s + i.qty, 0)})</h2>
                  <button 
                    onClick={() => setCart([])}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 sm:gap-6 items-start sm:items-center py-4 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">{item.tag}</p>
                          <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{item.name}</h3>
                          <p className="text-sm text-slate-500 mb-4">{item.category}</p>
                          <p className="text-lg font-bold text-slate-900 sm:hidden">₹{item.price.toLocaleString()}</p>
                        </div>

                        <div className="flex flex-col sm:items-end justify-between gap-4">
                          <p className="text-xl font-bold text-slate-900 hidden sm:block">₹{item.price.toLocaleString()}</p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-slate-200 rounded-full bg-slate-50">
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-indigo-600 font-bold"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold text-slate-800 text-sm">{item.qty}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-indigo-600 font-bold"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-2"
                              title="Remove item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-24">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm font-medium text-slate-600 border-b border-slate-100 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-900">₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (18%)</span>
                    <span className="text-slate-900">₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-bold text-indigo-600">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                
                <button className="w-full bg-slate-900 text-white py-4 rounded-[8px] font-bold shadow-md hover:bg-slate-800 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Encrypted and safe checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
