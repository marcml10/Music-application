import { categories } from "../data/products";

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  selectedTag,
  onTagChange,
}) {
  return (
    <aside className="w-56 shrink-0">
      <div className="space-y-8">

        {/* Category */}
        <div>
          <p className="text-sm font-semibold text-[#4B5563] uppercase tracking-widest mb-3">
            Category
          </p>

          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onCategoryChange(cat)}
                  className={`text-sm w-full text-left py-1 transition-colors ${
                    selectedCategory === cat
                      ? "text-[#2D1B69] font-semibold"
                      : "text-[#4B5563] hover:text-[#111827]"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm font-semibold text-[#4B5563] uppercase tracking-widest mb-3">
            Price
          </p>

          <ul className="space-y-1">
            {priceRanges.map((range) => (
              <li key={range.label}>
                <button
                  onClick={() =>
                    onPriceChange(
                      selectedPrice?.label === range.label
                        ? null
                        : range
                    )
                  }
                  className={`text-sm w-full text-left py-1 transition-colors ${
                    selectedPrice?.label === range.label
                      ? "text-[#2D1B69] font-semibold"
                      : "text-[#4B5563] hover:text-[#111827]"
                  }`}
                >
                  {range.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <p className="text-sm font-semibold text-[#4B5563] uppercase tracking-widest mb-3">
            Filter
          </p>

          <div className="flex flex-col gap-1">
            {["Sale", "New"].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  onTagChange(
                    selectedTag === tag ? null : tag
                  )
                }
                className={`text-sm text-left py-1 transition-colors ${
                  selectedTag === tag
                    ? "text-[#2D1B69] font-semibold"
                    : "text-[#4B5563] hover:text-[#111827]"
                }`}
              >
                {tag} items only
              </button>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}