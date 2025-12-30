import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { addToast } = useToast();

  const handleRemove = (id: number) => {
    removeItem(id);
    addToast('Article supprimé du panier', 'info');
  };

  const handleClear = () => {
    clearCart();
    addToast('Panier vidé', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-dark mb-2">Panier Vide</h1>
          <p className="text-gray-600 mb-8">Vous n'avez pas encore ajouté de produits</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition animate-slideUp"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8 text-dark">Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 border-b flex gap-4 items-center hover:bg-gray-50 transition animate-slideUp"
              >
                {item.coverUrl && (
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded hover-scale"
                  />
                )}
                
                <div className="flex-1">
                  <h3 className="font-bold text-dark mb-2 hover:text-primary transition">{item.title}</h3>
                  <p className="text-primary font-bold">{item.price.toFixed(3)} TND</p>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-white px-3 py-1 rounded hover:bg-gray-200 transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-white px-3 py-1 rounded hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-dark w-24 text-right">
                  {(item.price * item.quantity).toFixed(3)} TND
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold hover:scale-110 transition"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 h-fit sticky top-24 animate-slideRight shadow-lg">
          <h2 className="text-2xl font-bold text-dark mb-6">Résumé</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Sous-total:</span>
              <span className="font-bold text-dark">{total.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Livraison:</span>
              <span className="font-bold text-green-600">Gratuite ✓</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span className="text-dark">Total:</span>
              <span className="text-primary text-2xl">{total.toFixed(3)} TND</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition block text-center mb-4 btn-primary"
          >
            Procéder au Paiement
          </Link>

          <button
            onClick={handleClear}
            className="w-full bg-red-100 text-red-600 py-3 rounded-lg font-bold hover:bg-red-200 transition mb-4"
          >
            Vider le panier
          </button>

          <Link
            to="/products"
            className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition block text-center"
          >
            Continuer les achats
          </Link>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              💳 Paiement à la livraison disponible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
