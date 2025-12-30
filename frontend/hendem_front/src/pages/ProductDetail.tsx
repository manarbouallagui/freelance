import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { LoadingSpinner } from '../components/Loading';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await productService.getById(parseInt(id));
          setProduct(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        addToast('Erreur lors du chargement du produit', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, addToast]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: Math.random(),
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
        coverUrl: product.images[0],
      });
      addToast(`${quantity} ${product.title} ajouté(s) au panier!`, 'success');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center animate-fadeIn">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-xl text-red-500 mb-4">Produit non trouvé</p>
        <Link to="/products" className="text-primary hover:underline font-bold">
          ← Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <Link to="/products" className="text-primary hover:underline mb-8 inline-block font-bold">
        ← Retour aux produits
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="animate-slideLeft">
          <div className="bg-gray-200 rounded-lg mb-4 h-96 flex items-center justify-center overflow-hidden product-image">
            {product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-2xl">Pas d'image</div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition hover-scale ${
                    selectedImage === idx ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.title} ${idx}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="animate-slideRight">
          <h1 className="text-4xl font-bold text-dark mb-4">{product.title}</h1>
          
          <p className="text-primary text-3xl font-bold mb-4">
            {product.price.toFixed(3)} TND
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className={`text-lg font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 
                ? `✓ ${product.stock} article(s) en stock` 
                : '✕ Actuellement indisponible'}
            </p>
          </div>

          {product.stock > 0 && (
            <>
              <div className="mb-6">
                <label className="block text-dark font-bold mb-3">Quantité:</label>
                <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-white px-4 py-2 rounded hover:bg-gray-200 transition font-bold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value), product.stock)))}
                    className="w-16 text-center border rounded py-2 bg-white font-bold"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-white px-4 py-2 rounded hover:bg-gray-200 transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-lg transition hover:bg-opacity-90 hover-lift btn-primary"
                >
                  🛒 Ajouter au Panier ({quantity})
                </button>
                <Link
                  to="/cart"
                  className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition hover-lift"
                >
                  Voir Panier
                </Link>
              </div>
            </>
          )}

          {product.stock === 0 && (
            <Link
              to="/products"
              className="w-full block bg-gray-300 text-gray-500 py-3 rounded-lg font-bold text-center"
            >
              Voir d'autres produits
            </Link>
          )}
        </div>
      </div>

      {/* Related Section */}
      <div className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold text-dark mb-4">Vous pourriez aimer</h2>
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 text-center">
          <p className="mb-4">Découvrez d'autres produits de notre collection</p>
          <Link to="/products" className="inline-block border-2 border-white px-8 py-2 rounded-lg hover:bg-white hover:text-primary transition font-bold">
            Voir tous les produits
          </Link>
        </div>
      </div>
    </div>
  );
};
