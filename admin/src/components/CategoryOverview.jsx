import { useMemo } from "react";

export default function CategoryOverview({ products }) {
  const categoryData = useMemo(() => {
    const counts = {};

    products.forEach((product) => {
      const category = product.category || "Uncategorized";

      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [products]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-dark">
          Category Overview
        </h3>

        <p className="mt-1 text-sm text-secondary">
          Products grouped by category.
        </p>
      </div>

      {categoryData.length === 0 ? (
        <p className="text-sm text-secondary">
          No category data available.
        </p>
      ) : (
        <div className="space-y-4">
          {categoryData.map(([category, count]) => {
            const percentage =
              products.length > 0
                ? (count / products.length) * 100
                : 0;

            return (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-dark">
                    {category}
                  </span>

                  <span className="text-sm text-secondary">
                    {count}{" "}
                    {count === 1 ? "product" : "products"}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-page">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}