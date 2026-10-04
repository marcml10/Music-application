import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import CartPage from "./components/CartPage";
import ProductPage from "./components/ProductPage";
import AuthModal from "./components/AuthModal";
import { supabase } from "./supabaseClient";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleNavigateToProduct = (product) => {
    setSelectedProduct(product);
    setPage("product");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#111827]">
      {/* Floating Dock Navbar */}
      <Navbar 
        cartCount={cartCount} 
        onNavigate={setPage} 
        currentPage={page} 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={() => supabase.auth.signOut()}
      />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {page === "home" ? (
        <HomePage onNavigate={setPage} onAddToCart={addToCart} onViewProduct={handleNavigateToProduct} />
      ) : page === "products" ? (
        <ProductsPage onAddToCart={addToCart} />
      ) : page === "cart" ? (
        <CartPage cart={cart} setCart={setCart} onNavigate={setPage} />
      ) : page === "product" && selectedProduct ? (
        <ProductPage 
          product={selectedProduct} 
          onAddToCart={addToCart} 
          onNavigate={setPage} 
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setShowAuthModal(true)}
        />
      ) : null}
    </div>
  );
}