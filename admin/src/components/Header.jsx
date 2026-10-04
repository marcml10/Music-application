export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <p className="text-sm font-medium text-secondary">
          Welcome back
        </p>

        <h2 className="text-lg font-semibold text-dark">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm text-secondary transition hover:bg-page hover:text-dark">
          ?
        </button>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-dark">
              Administrator
            </p>

            <p className="text-xs text-secondary">
              Store Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}