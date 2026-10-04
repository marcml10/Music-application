import { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated",
  "Newest",
];

export default function ProductsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("http://localhost:8787/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState("Featured");
  const [search, setSearch] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice) {
      list = list.filter(
        (p) =>
          p.price >= selectedPrice.min &&
          p.price < selectedPrice.max
      );
    }

    if (selectedTag) {
      list = list.filter((p) => p.tag === selectedTag);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Top Rated") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    selectedCategory,
    selectedPrice,
    selectedTag,
    sortBy,
    search,
  ]);

  const hasFilters =
    selectedCategory !== "All" ||
    selectedPrice ||
    selectedTag ||
    search;

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPrice(null);
    setSelectedTag(null);
    setSearch("");
  };

  return (
    <main className="w-full px-6 py-10">
      {/* Hero Strip */}
      <div className="mb-10 border-b border-slate-100 pb-8">
        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">
          All Products
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Thoughtfully made.
            <br />
            <span className="text-slate-400 font-normal">
              For everyday living.
            </span>
          </h1>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-indigo-400 bg-white text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Sidebar + Products */}
      <div className="flex gap-8">
        {/* Sidebar — Desktop */}
        {/* <div className="hidden md:block shrink-0">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
          />
        </div> */}
      
        {/* Main Product Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">
                {filtered.length} products
              </span>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-indigo-500 hover:text-indigo-700 underline underline-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filters */}
              <button
                onClick={() => setMobileFilters(!mobileFilters)}
                className="md:hidden text-sm text-slate-600 border border-slate-200 px-3 py-1.5 hover:bg-slate-50"
              >
                Filters
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-slate-200 text-slate-600 py-1.5 px-3 focus:outline-none focus:border-indigo-400 bg-white cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {mobileFilters && (
            <div className="md:hidden mb-6 p-5 border border-slate-100 bg-slate-50">
              <Sidebar
                selectedCategory={selectedCategory}
                onCategoryChange={(category) => {
                  setSelectedCategory(category);
                  setMobileFilters(false);
                }}
                selectedPrice={selectedPrice}
                onPriceChange={setSelectedPrice}
                selectedTag={selectedTag}
                onTagChange={setSelectedTag}
              />
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 text-sm animate-pulse">Syncing live inventory from external stores...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-slate-200 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p className="text-[#4B5563] text-sm">
                No products match your filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-3 text-sm text-[#2D1B69] hover:text-[#FCA5A5] underline underline-offset-2 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}