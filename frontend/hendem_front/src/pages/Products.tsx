import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { LoadingSkeleton } from '../components/Loading';
import { productService } from '../services/api';
import { useToast } from '../context/ToastContext';

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  cover_url?: string;
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll();
        setProducts(response.data);
        addToast('Produits chargés avec succès', 'success');
      } catch (error) {
        console.error('Failed to fetch products:', error);
        addToast('Erreur lors du chargement des produits', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [addToast]);

  const filteredProducts = products.filter((p) =>
    filter === 'available' ? p.stock > 0 : true
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-dark">Notre Collection</h1>
        <p className="text-gray-600">Découvrez nos produits haut de gamme</p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 flex gap-4 flex-wrap animate-slideDown">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full transition hover-lift ${
            filter === 'all'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-200 text-dark hover:bg-gray-300'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`px-6 py-2 rounded-full transition hover-lift ${
            filter === 'available'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-200 text-dark hover:bg-gray-300'
          }`}
        >
          ✓ En Stock
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSkeleton count={8} />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} style={{ animationDelay: `${idx * 0.1}s` }} className="animate-slideUp">
              <ProductCard
                id={product.id}
                title={product.title}
                price={parseFloat(String(product.price))}
                coverUrl={product.cover_url}
                stock={product.stock}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 animate-fadeIn">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-xl">Aucun produit trouvé</p>
          <p className="text-gray-400">Essayez de modifier vos filtres</p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-16 bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 text-center animate-slideUp">
        <h2 className="text-2xl font-bold mb-2">Vous ne trouvez pas ce que vous cherchez?</h2>
        <p className="mb-4">Contactez-nous pour connaître les nouveaux produits disponibles</p>
        <a href="/contact" className="inline-block border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition">
          Nous Contacter
        </a>
      </div>
    </div>
  );
};
