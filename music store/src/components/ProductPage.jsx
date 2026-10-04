import { useState, useEffect } from "react";
import ProductReviews from "./ProductReviews";

export default function ProductPage({ product, onAddToCart, onNavigate, isLoggedIn, onLoginClick }) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAdd = () => {
    // Add the specific quantity
    for (let i = 0; i < qty; i++) {
      onAddToCart(product);
    }
    
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className="bg-[#F3F4F6] min-h-screen pt-28 pb-16 px-6 md:px-10 animate-page-enter">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Breadcrumb / Back button */}
        <button 
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm w-max"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Gear
        </button>

        {/* Main Product Card */}
        <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="bg-slate-50 rounded-2xl aspect-square flex items-center justify-center p-8 border border-slate-100 overflow-hidden relative group">
              <img 
                src={product.image_url || product.image} 
                alt={product.name} 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Tag overlay */}
              {product.tag && (
                <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.tag}
                </div>
              )}
            </div>
            
            {/* Thumbnail placeholders for future multi-image support */}
            <div className="flex gap-4 mt-4">
              <div className="w-20 h-20 bg-slate-50 rounded-xl border-2 border-indigo-500 p-2 cursor-pointer">
                 <img src={product.image_url || product.image} alt="thumb" className="w-full h-full object-contain" />
              </div>
              <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-200 p-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-xs text-slate-400 font-medium">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill={i < Math.floor(product.rating || 4) ? "#FCA5A5" : "#E5E7EB"}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500 underline cursor-pointer hover:text-slate-900 transition-colors">
                {product.reviews || 24} Verified Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-black text-slate-900 tracking-tight">₹{product.price.toLocaleString()}</span>
              {(product.original_price || product.originalPrice) && (
                <span className="text-lg text-slate-400 line-through mb-1">
                  ₹{(product.original_price || product.originalPrice).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description placeholder */}
            <p className="text-slate-600 leading-relaxed mb-10">
              Experience unparalleled audio quality with the {product.name}. Designed for professionals and enthusiasts alike, this premium piece of gear delivers crystal clear performance, exceptional durability, and precision engineering that you can rely on in the studio or on the stage.
            </p>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto border-t border-slate-100 pt-8">
              {/* Qty Selector */}
              <div className="flex items-center justify-between border-2 border-slate-200 rounded-full bg-slate-50 px-2 sm:w-32 flex-shrink-0 h-14">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 font-bold text-xl rounded-full hover:bg-slate-200 transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-slate-800">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 font-bold text-xl rounded-full hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 h-14 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  added
                    ? "bg-indigo-600 text-white scale-105"
                    : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 hover:shadow-xl"
                }`}
              >
                {added ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart — ₹{(product.price * qty).toLocaleString()}
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 flex items-center gap-6 text-xs font-medium text-slate-500 justify-center sm:justify-start">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Stock
              </div>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ships in 24 hours
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specs Card */}
        <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12">
            {[
              { label: "Brand", value: product.brand || "Premium Audio" },
              { label: "Category", value: product.category },
              { label: "Model Number", value: `LMA-${product.id || Math.floor(Math.random() * 10000)}` },
              { label: "Warranty", value: "2 Years Manufacturer" },
              { label: "Condition", value: "Brand New" },
              { label: "Connectivity", value: "Wired / Wireless (Bluetooth 5.3)" },
              { label: "Weight", value: "1.2 kg" },
              { label: "Color", value: "Studio Black" }
            ].map((spec, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{spec.label}</span>
                <span className="text-slate-900 font-semibold text-right max-w-[60%]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Card */}
        <ProductReviews 
          rating={product.rating || 4} 
          reviewCount={product.reviews || 24} 
          isLoggedIn={isLoggedIn}
          onLoginRequest={onLoginClick}
        />

      </div>
    </div>
  );
}
