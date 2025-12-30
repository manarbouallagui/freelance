import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="text-center text-white px-4">
        <div className="text-9xl font-bold mb-4 animate-bounce">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Non Trouvée</h1>
        <p className="text-xl mb-8 opacity-90">
          Oups! La page que vous recherchez n'existe pas ou a été supprimée.
        </p>
        
        <div className="flex gap-4 justify-center flex-col md:flex-row">
          <Link
            to="/"
            className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition animate-slideUp"
          >
            Retour à l'Accueil
          </Link>
          <Link
            to="/products"
            className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition animate-slideUp"
          >
            Voir les Produits
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm opacity-75">
            Besoin d'aide? <Link to="/contact" className="underline hover:opacity-80">Nous contacter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
