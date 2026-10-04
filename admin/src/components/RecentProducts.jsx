export default function RecentProducts({ products }) {
  const recentProducts = [...products]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-dark">
          Recently Added Products
        </h3>

        <p className="mt-1 text-sm text-secondary">
          The latest products added to your store.
        </p>
      </div>

      {recentProducts.length === 0 ? (
        <p className="text-sm text-secondary">
          No products available.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-11 w-11 rounded-xl border border-gray-200 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-page text-lg text-secondary">
                  ♪
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-dark">
                  {product.name}
                </p>

                <p className="mt-0.5 text-xs text-secondary">
                  {product.category}
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium text-dark">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}