import { useState } from "react";

export default function ProductCard({ product, onAddToCart, onViewProduct }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent clicking Add to Cart from navigating
    onAddToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="group cursor-pointer" onClick={() => onViewProduct?.(product)}>

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-white aspect-square mb-3 border border-[#4B5563]/10">

        <img
          src={product.image_url || product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-sm font-medium transition-colors ${
              added
                ? "bg-[#2D1B69] text-white"
                : "bg-[#111827] text-white hover:bg-[#2D1B69]"
            }`}
          >
            {added ? "Added to cart ✓" : "Add to Cart"}
          </button>
        </div>

      </div>

      {/* Product Info */}
      <div className="space-y-1">

        <h3 className="text-sm font-medium text-[#111827] leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                fill={
                  i < Math.floor(product.rating || 4)
                    ? "#FCA5A5"
                    : "#D1D5DB"
                }
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <span className="text-xs text-[#4B5563]">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#111827]">
            ₹{product.price}
          </span>

          {(product.original_price || product.originalPrice) && (
            <span className="text-xs text-[#4B5563] line-through">
              ₹{product.original_price || product.originalPrice}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}