import DashboardStats from "./DashboardStats";
import CategoryOverview from "./CategoryOverview";
import RecentProducts from "./RecentProducts";

export default function Dashboard({ products }) {
  return (
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-dark">
          Dashboard
        </h3>

        <p className="mt-1 text-sm text-secondary">
          Overview of your music store.
        </p>
      </div>

      <DashboardStats products={products} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <CategoryOverview products={products} />
        <RecentProducts products={products} />
      </div>
    </main>
  );
}