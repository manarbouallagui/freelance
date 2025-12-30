import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MobileNav } from './MobileNav';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const { items } = useCart();
  const { isLogged, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-primary text-secondary shadow-md animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-2xl font-bold text-ivory hover:opacity-90 transition flex items-center gap-3">
            <span className="text-gold">✦</span>
            <span className="font-display">HENDEM</span>
          </Link>

          <SearchBar />

          <div className="flex items-center space-x-4">
            {isLogged ? (
              <>
                <button 
                  onClick={logout} 
                  className="text-sm hover:text-gold transition hidden md:inline"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:text-gold transition hidden md:inline">Connexion</Link>
                <Link to="/register" className="text-sm hover:text-gold transition hidden md:inline">Inscription</Link>
              </>
            )}
            
            <Link to="/cart" className="relative group">
              <span className="text-2xl hover:scale-110 transition">�️</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                  {items.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 justify-center">
          <Link to="/" className="hover:text-primary transition font-medium">Accueil</Link>
          <Link to="/products" className="hover:text-primary transition font-medium">Produits</Link>
          <Link to="/about" className="hover:text-primary transition font-medium">À Propos</Link>
          <Link to="/contact" className="hover:text-primary transition font-medium">Contact</Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
};
