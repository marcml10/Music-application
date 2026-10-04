export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-6 py-6">
        <h1 className="text-lg font-bold tracking-tight text-dark">
          Luma
        </h1>

        <p className="mt-1 text-xs text-secondary">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
          Management
        </p>

        <div className="space-y-1">
          <button
            onClick={() => onNavigate("dashboard")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              currentPage === "dashboard"
                ? "bg-primary text-white"
                : "text-secondary hover:bg-page hover:text-dark"
            }`}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            onClick={() => onNavigate("products")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              currentPage === "products"
                ? "bg-primary text-white"
                : "text-secondary hover:bg-page hover:text-dark"
            }`}
          >
            <span>□</span>
            Products
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-page hover:text-dark">
            <span>◷</span>
            Orders
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-page hover:text-dark">
            <span>♙</span>
            Customers
          </button>
        </div>

        <p className="mb-3 mt-10 px-3 text-[11px] font-semibold uppercase tracking-wider text-secondary">
          System
        </p>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-page hover:text-dark">
          <span>⚙</span>
          Settings
        </button>
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-xl px-3 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-dark">
              Administrator
            </p>

            <p className="truncate text-xs text-secondary">
              Store Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}