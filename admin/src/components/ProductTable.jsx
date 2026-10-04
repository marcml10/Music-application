export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-secondary">
                Product
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-secondary">
                Category
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-secondary">
                Price
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-secondary">
                Rating
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-secondary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const hasDiscount =
                product.original_price &&
                Number(product.original_price) > Number(product.price);

              const discount = hasDiscount
                ? Math.round(
                    ((Number(product.original_price) -
                      Number(product.price)) /
                      Number(product.original_price)) *
                      100
                  )
                : 0;

              return (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-page/60"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-page text-lg text-secondary">
                          ♪
                        </div>
                      )}

                      {/* Name + Tag */}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-dark">
                          {product.name}
                        </p>

                        {product.tag && (
                          <span className="mt-1 inline-flex rounded-full bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-primary">
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-page px-2.5 py-1 text-xs font-medium text-secondary">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-dark">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>

                      {hasDiscount && (
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-xs text-gray-400 line-through">
                            ₹
                            {Number(product.original_price).toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          <span className="text-xs font-medium text-green-600">
                            {discount}% off
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-yellow-500">
                          ★
                        </span>

                        <span className="text-sm font-medium text-dark">
                          {Number(product.rating || 0).toFixed(1)}
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-secondary">
                        {Number(product.reviews || 0).toLocaleString(
                          "en-IN"
                        )}{" "}
                        reviews
                      </p>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-primary transition hover:bg-purple-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-page text-xl text-secondary">
            ♪
          </div>

          <h3 className="mt-4 font-medium text-dark">
            No products found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-secondary">
            Try adjusting your search or filters, or add a new product.
          </p>
        </div>
      )}
    </div>
  );
}