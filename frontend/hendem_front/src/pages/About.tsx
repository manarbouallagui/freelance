import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 rounded-lg mb-12">
        <h1 className="text-4xl font-bold text-center">À Propos de HENDEM</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-dark mb-4">Notre Histoire</h2>
          <p className="text-gray-600 mb-4">
            HENDEM est une boutique en ligne de mode créée avec passion et dévouement. 
            Nous nous spécialisons dans la vente de vêtements et d'accessoires de haute qualité 
            pour tous les styles et occasions.
          </p>
          <p className="text-gray-600 mb-4">
            Notre mission est de rendre la mode accessible à tous, en offrant des produits 
            premium à des prix justes, avec un service client exceptionnel.
          </p>
          <p className="text-gray-600">
            Depuis notre lancement, nous avons servi des milliers de clients satisfaits 
            à travers la Tunisie et au-delà.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-dark mb-4">Nos Valeurs</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h3 className="font-bold text-dark">Qualité</h3>
                <p className="text-gray-600">Tous nos produits sont rigoureusement sélectionnés</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">❤️</span>
              <div>
                <h3 className="font-bold text-dark">Authenticité</h3>
                <p className="text-gray-600">100% produits authentiques et originaux</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-bold text-dark">Confiance</h3>
                <p className="text-gray-600">Transparence dans toutes nos transactions</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-dark mb-8 text-center">L'Équipe HENDEM</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-dark">Fondatrice & Directrice</h3>
            <p className="text-gray-600 text-sm">Passionnée par la mode et le service</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-dark">Responsable Produits</h3>
            <p className="text-gray-600 text-sm">Curateuse de nos collections</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-dark">Service Client</h3>
            <p className="text-gray-600 text-sm">À votre écoute 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};
