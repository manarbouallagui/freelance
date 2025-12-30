import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/products' },
    { label: 'À Propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="text-2xl font-bold text-dark mb-6"
          >
            ✕
          </button>

          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="block py-2 text-dark hover:text-primary transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t mt-6 pt-6 space-y-3">
            <Link
              to="/login"
              onClick={onClose}
              className="block py-2 text-primary font-bold"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="block py-2 bg-primary text-white text-center rounded-lg"
            >
              Inscription
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
