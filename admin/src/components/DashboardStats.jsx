export default function DashboardStats({ products }) {
  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (total, product) =>
              total + Number(product.rating || 0),
            0
          ) / products.length
        ).toFixed(1)
      : "0.0";

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
    },
    {
      label: "Categories",
      value: totalCategories,
    },
    {
      label: "Average Rating",
      value: averageRating,
      suffix: "★",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-gray-200 bg-white p-5"
        >
          <p className="text-sm text-secondary">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-semibold text-dark">
            {stat.value}

            {stat.suffix && (
              <span className="ml-1 text-base text-secondary">
                {stat.suffix}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}