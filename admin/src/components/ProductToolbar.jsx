export default function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
  onClear,
}) {
  const hasFilters = search || category !== "All" || sort !== "newest";

  return (
    <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-page py-2.5 pl-10 pr-4 text-sm text-dark outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-gray-200 bg-page px-4 py-2.5 text-sm text-dark outline-none focus:border-primary"
        >
          <option value="All">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-xl border border-gray-200 bg-page px-4 py-2.5 text-sm text-dark outline-none focus:border-primary"
        >
          <option value="newest">Newest</option>
          <option value="name">Name A–Z</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-secondary transition hover:bg-page hover:text-dark"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}