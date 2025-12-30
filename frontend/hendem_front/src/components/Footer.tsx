import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-secondary mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold font-display">HENDEM</h3>
            <p className="text-ivory/85">
              La boutique en ligne de mode premium avec les plus belles collections.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gold">Liens Rapides</h4>
            <ul className="space-y-2 text-ivory/85">
              <li><a href="/" className="hover:text-gold transition">Accueil</a></li>
              <li><a href="/products" className="hover:text-gold transition">Produits</a></li>
              <li><a href="/about" className="hover:text-gold transition">À Propos</a></li>
              <li><a href="/contact" className="hover:text-gold transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gold">Contact</h4>
            <ul className="space-y-2 text-ivory/85">
              <li>Email: info@hendem.tn</li>
              <li>Tél: +216 XX XXX XXX</li>
              <li>Adresse: Tunis, Tunisie</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/20 pt-8 text-center text-ivory/75">
          <p>&copy; 2025 HENDEM. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
