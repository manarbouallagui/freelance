import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MobileNav } from './MobileNav';
import { SearchBar } from './SearchBar';
import hendemLogo from '../assets/hendem.jpg';
import arabeLogo from '../assets/arabe.png';

export const Header: React.FC = () => {
  const { items } = useCart();
  const { isLogged, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-cream to-rose-nude text-secondary shadow-lg animate-slideDown border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <Link to="/" className="logo-container hover:opacity-90 transition group">
            <img 
              src={hendemLogo} 
              alt="HENDEM Logo" 
              className="logo-img h-12 w-12 object-cover rounded-sm group-hover:shadow-lg transition"
            />
            <img 
              src={arabeLogo} 
              alt="HENDEM Arabic Logo" 
              className="logo-arabic h-12 object-contain transition"
            />
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
            
            <Link 
              to="/cart" 
              className="relative group bg-gradient-to-r from-gold-primary to-gold-light hover:from-gold-dark hover:to-gold-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 uppercase tracking-wide"
            >
              <span className="text-lg">🛒</span>
              <span>Panier</span>
              {items.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-bold border-2 border-white">
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
        <nav className="hidden md:flex space-x-8 justify-center border-t border-gold/10 pt-3">
          <Link to="/" className="text-sm font-medium hover:text-gold transition uppercase tracking-wide">Accueil</Link>
          <Link to="/products" className="text-sm font-medium hover:text-gold transition uppercase tracking-wide">Produits</Link>
          <Link to="/about" className="text-sm font-medium hover:text-gold transition uppercase tracking-wide">À Propos</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-gold transition uppercase tracking-wide">Contact</Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
};
