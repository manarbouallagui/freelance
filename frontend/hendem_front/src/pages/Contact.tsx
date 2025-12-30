import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-dark text-center mb-4">Nous Contacter</h1>
      <p className="text-center text-gray-600 mb-12">
        Des questions? Nous serions heureux d'avoir de vos nouvelles!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="font-bold text-lg text-dark mb-2">Adresse</h3>
          <p className="text-gray-600">
            Tunis<br/>
            Tunisie
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl mb-4">📞</div>
          <h3 className="font-bold text-lg text-dark mb-2">Téléphone</h3>
          <p className="text-gray-600">
            +216 XX XXX XXX<br/>
            Lun - Dim: 8h-20h
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl mb-4">📧</div>
          <h3 className="font-bold text-lg text-dark mb-2">Email</h3>
          <p className="text-gray-600">
            info@hendem.tn<br/>
            support@hendem.tn
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-dark mb-6">Envoyez-nous un Message</h2>

        {submitted && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
            ✓ Merci! Nous avons reçu votre message et vous répondrons rapidement.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-dark font-bold mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <label className="block text-dark font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-dark font-bold mb-2">Téléphone (optionnel)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="+216 XX XXX XXX"
            />
          </div>

          <div className="mb-4">
            <label className="block text-dark font-bold mb-2">Sujet</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="product">Question sur un produit</option>
              <option value="order">Suivi de commande</option>
              <option value="return">Retour ou échange</option>
              <option value="complaint">Réclamation</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-dark font-bold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="Votre message..."
              rows={5}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Envoyer le Message
          </button>
        </form>
      </div>
    </div>
  );
};
