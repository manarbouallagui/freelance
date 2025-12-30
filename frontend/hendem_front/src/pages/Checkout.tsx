import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { orderService } from '../services/api';

export const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      await orderService.create(items);
      clearCart();
      addToast('Commande créée avec succès! 🎉', 'success');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Erreur lors de la création de la commande');
      addToast('Erreur lors de la création de la commande', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-3xl font-bold mb-4">Panier vide</p>
        <Link
          to="/products"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Continuer les achats
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-dark">Passer la Commande</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-dark">Informations de Livraison</h2>

          {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-dark font-bold mb-2">Nom Complet</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-dark font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-dark font-bold mb-2">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="+216 XX XXX XXX"
            />
          </div>

          <div className="mb-4">
            <label className="block text-dark font-bold mb-2">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Votre adresse complète"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-dark font-bold mb-2">Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder="Votre ville"
              />
            </div>
            <div>
              <label className="block text-dark font-bold mb-2">Code Postal</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder="Code postal"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded mb-6">
            <h3 className="font-bold text-dark mb-2">💳 Paiement à la Livraison</h3>
            <p className="text-gray-600 text-sm">
              Vous paierez lors de la réception de votre commande. Nous acceptons les espèces et les cartes bancaires.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg transition ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-opacity-90'
            }`}
          >
            {loading ? 'Traitement...' : 'Confirmer la Commande'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-dark mb-6">Résumé de la Commande</h2>
          
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.title} x{item.quantity}
                </span>
                <span className="font-bold">
                  {(item.price * item.quantity).toFixed(3)} TND
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Sous-total:</span>
              <span className="font-bold">{total.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison:</span>
              <span className="font-bold">Gratuite</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary">
              <span>Total:</span>
              <span>{total.toFixed(3)} TND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
