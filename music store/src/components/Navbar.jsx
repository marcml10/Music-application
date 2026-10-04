export default function Navbar({ cartCount, onNavigate, currentPage, isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <>
      {/* Left Dock - Brand Logo */}
      {currentPage !== "cart" && (
        <nav className="absolute top-[15px] left-[15px] z-50 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md shadow-lg rounded-full px-5 border border-white/40">
          <button
            onClick={() => onNavigate?.("home")}
            className="text-[#111827] font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            LUMA<span className="text-[#FCA5A5]">.</span>
          </button>
        </nav>
      )}



      {/* Right Dock - Cart and Auth */}
      <nav className="absolute top-[15px] right-[15px] z-50 h-12 flex items-center gap-3 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-5 border border-white/40">
        
        {/* Cart */}
        <button
          onClick={() => onNavigate?.("cart")}
          className="relative text-[#4B5563] hover:text-[#2D1B69] transition-colors flex items-center justify-center p-1"
          aria-label="Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1.5 bg-[#FCA5A5] text-[#111827] rounded-full flex items-center justify-center font-bold"
              style={{ fontSize: "10px", width: "16px", height: "16px" }}
            >
              {cartCount}
            </span>
          )}
        </button>

        <div className="w-px h-5 bg-gray-300/80 mx-1"></div>

        {/* Auth State */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onLoginClick}
              className="text-xs font-medium text-[#4B5563] hover:text-[#2D1B69] transition-colors px-2 py-1"
            >
              Sign In
            </button>
            <button
              onClick={onLoginClick}
              className="text-xs font-medium bg-[#111827] text-white px-4 py-1.5 rounded-full hover:bg-[#2D1B69] transition-colors"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <button
            onClick={onLogoutClick}
            className="text-xs font-medium text-[#4B5563] hover:text-[#2D1B69] transition-colors px-2 py-1 flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        )}
      </nav>
    </>
  );
}