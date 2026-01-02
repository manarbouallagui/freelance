import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="theme-hero py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 font-display">
            <span className="text-gold mr-3">✦</span>Bienvenue à <span className="text-ivory">HENDEM</span>
          </h1>
          <p className="text-lg mb-8 text-ivory/90">
            Découvrez notre collection exclusive de vêtements haut de gamme — abayas, kaftans et prêt-à-porter
          </p>
          <Link
            to="/products"
            className="inline-block btn-gold px-8 py-3 rounded-full font-bold hover:opacity-95 transition"
          >
            Découvrir les Produits
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Pourquoi Nous Choisir</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-slideUp">
              <div className="text-4xl mb-4">�</div>
              <h3 className="font-bold text-lg mb-2">Collections Vêtements</h3>
              <p className="text-ivory/85">Abayas, kaftans et prêt-à-porter confectionnés avec soin</p>
            </div>
            
            <div className="text-center animate-slideUp">
              <div className="text-4xl mb-4">🧵</div>
              <h3 className="font-bold text-lg mb-2">Finitions Artisanales</h3>
              <p className="text-ivory/85">Détails et broderies haut de gamme</p>
            </div>
            
            <div className="text-center animate-slideUp">
              <div className="text-4xl mb-4">�</div>
              <h3 className="font-bold text-lg mb-2">Livraison Soignée</h3>
              <p className="text-ivory/85">Emballage soigné et expédition fiable</p>
            </div>
            
            <div className="text-center animate-slideUp">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-lg mb-2">Service Client</h3>
              <p className="text-ivory/85">Conseils personnalisés et suivi de commande</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-secondary text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Prêt à Faire du Shopping?</h2>
          <p className="mb-8 text-lg">Inscrivez-vous pour obtenir 10% de réduction sur votre première commande</p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row items-center sm:items-stretch">
            <Link
              to="/register"
              className="w-full sm:w-auto btn-gold px-8 py-3 rounded-full font-bold hover:opacity-95 transition flex items-center justify-center gap-3 text-base sm:text-lg"
            >
              <span className="text-lg">🛍️</span>
              <span>S'inscrire</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto border-2 border-gold px-6 py-3 rounded-full font-medium hover:bg-gold hover:text-ivory transition flex items-center justify-center gap-3 text-sm sm:text-base"
            >
              <span className="text-lg">✉️</span>
              <span>Contactez-nous</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
