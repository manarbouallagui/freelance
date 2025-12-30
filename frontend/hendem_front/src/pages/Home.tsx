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
            Découvrez notre collection exclusive de vêtements et accessoires haut de gamme
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison en 24-48h dans toute la Tunisie</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">Tous les moyens de paiement acceptés</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-bold text-lg mb-2">Retours Faciles</h3>
              <p className="text-gray-600">30 jours pour retourner votre produit</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-bold text-lg mb-2">Support Client</h3>
              <p className="text-gray-600">Disponible 24/7 pour vous aider</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-secondary text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Prêt à Faire du Shopping?</h2>
          <p className="mb-8 text-lg">Inscrivez-vous pour obtenir 10% de réduction sur votre première commande</p>
          <div className="flex gap-4 justify-center flex-col md:flex-row">
            <Link
              to="/register"
              className="btn-gold px-8 py-3 rounded-full font-bold hover:opacity-95 transition"
            >
              S'inscrire
            </Link>
            <Link
              to="/contact"
              className="border-2 border-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-ivory transition"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
