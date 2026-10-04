export default function FilterSidebar({
  uniqueTags,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  selectedTags,
  setSelectedTags,
}) {
  return (
    <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-[30px] self-start h-screen overflow-y-auto pb-8">
      <div className="bg-white p-6 rounded-[8px] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900">Filters</h3>
          <button 
            onClick={() => { setMinPrice(""); setMaxPrice(""); setMinRating(0); setSelectedTags([]); }}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear All
          </button>
        </div>
        
        {/* Price Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Price Range (₹)</h4>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-colors"
            />
            <span className="text-slate-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Minimum Rating</h4>
          <div className="space-y-3">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="rating" 
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{rating} Stars & Up</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags / Sellers */}
        {uniqueTags.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Sellers / Tags</h4>
            <div className="space-y-3">
              {uniqueTags.map(tag => (
                <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedTags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedTags([...selectedTags, tag]);
                      else setSelectedTags(selectedTags.filter(t => t !== tag));
                    }}
                    className="w-4 h-4 rounded-[2px] text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
