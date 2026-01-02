import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number | string;
  stock: number;
  category_id: number;
  category?: { id: number; name: string };
  cover_url?: string;
  images?: any[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { isLogged, user } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
  });

  // Check auth
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
      return;
    }
    fetchProducts();
    fetchCategories();
  }, [isLogged, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      showToast('Erreur lors du chargement des produits', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('category_id', formData.category_id);
      if (image) {
        formDataToSend.append('image', image);
      }

      const url = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : 'http://localhost:5000/api/products';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend
      });

      if (response.ok) {
        showToast(editingId ? 'Produit mis à jour' : 'Produit créé', 'success');
        resetForm();
        fetchProducts();
      } else {
        const error = await response.json();
        showToast(error.msg || 'Erreur lors de la sauvegarde', 'error');
      }
    } catch (error) {
      showToast('Erreur serveur', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category_id: product.category_id.toString(),
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.ok) {
        showToast('Produit supprimé', 'success');
        fetchProducts();
      } else {
        showToast('Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      showToast('Erreur serveur', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
    });
    setImage(null);
    setEditingId(null);
    setShowForm(false);
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gold-primary">📦 Gestion des Produits</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-gold-primary to-gold-light text-white font-semibold rounded-lg hover:from-gold-dark hover:to-gold-primary transition-all duration-300 shadow-md hover:shadow-lg"
            >
              + Ajouter un produit
            </button>
          )}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-12 border-l-4 border-gold-primary">
            <h2 className="text-2xl font-semibold mb-6 text-secondary">
              {editingId ? '✏️ Modifier le produit' : '➕ Ajouter un nouveau produit'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-secondary mb-2">Titre du produit *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold-primary transition"
                  placeholder="Ex: Robe élégante"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-secondary mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold-primary transition resize-none"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Prix (DT) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold-primary transition"
                  placeholder="0.00"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold-primary transition"
                  placeholder="0"
                />
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-secondary mb-2">Catégorie *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold-primary transition"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-secondary mb-2">Image du produit</label>
                <div className="border-2 border-dashed border-gold-primary rounded-lg p-6 text-center hover:bg-gray-50 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input" className="cursor-pointer">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm text-gray-600">Cliquez pour télécharger une image</p>
                  </label>
                  {image && <p className="text-sm text-green-600 mt-2">✓ {image.name}</p>}
                </div>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gold-primary to-gold-light text-white font-semibold rounded-lg hover:from-gold-dark hover:to-gold-primary transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? '⏳ En cours...' : editingId ? '💾 Mettre à jour' : '✅ Ajouter le produit'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-gray-300 text-secondary font-semibold rounded-lg hover:border-gold-primary hover:text-gold-primary transition-all duration-300"
                >
                  ❌ Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        {!showForm && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gold-primary transition"
            />
          </div>
        )}

        {/* Products Table */}
        {!showForm && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gold-primary to-gold-light text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Titre</th>
                    <th className="px-6 py-4 text-left font-semibold">Catégorie</th>
                    <th className="px-6 py-4 text-right font-semibold">Prix</th>
                    <th className="px-6 py-4 text-center font-semibold">Stock</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <div className="text-5xl mb-2">📭</div>
                        {searchTerm ? 'Aucun produit trouvé' : 'Aucun produit. Commencez par ajouter un produit!'}
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-secondary">{product.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{product.description}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{product.category?.name || '—'}</td>
                        <td className="px-6 py-4 text-right font-bold text-gold-primary text-lg">{product.price} DT</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            product.stock > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xs font-semibold"
                          >
                            ✏️ Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs font-semibold"
                          >
                            🗑️ Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filteredProducts.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 font-semibold">
                📊 Total: {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}

        {loading && !showForm && <div className="mt-4 text-center text-gold-primary font-semibold">⏳ Chargement...</div>}
      </div>
    </div>
  );
};
