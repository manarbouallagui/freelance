import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  coverUrl?: string;
  stock: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  coverUrl,
  stock,
}) => {
  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: Math.random(),
      productId: id,
      title,
      price,
      quantity: 1,
      coverUrl,
    });
    addToast(`${title} ajouté au panier!`, 'success');
  };

  return (
    <div className="bg-ivory rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 product-card card-hover-lift card-accent">
      <div className="h-48 bg-gray-200 overflow-hidden product-image">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm text-gray-400">Pas d'image</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-text-dark truncate hover:text-gold transition">{title}</h3>
        <p className="text-gold text-2xl font-bold mt-3 tracking-wide">{price.toFixed(3)} TND</p>
        
        <div className="mt-6 flex gap-3">
          <Link
            to={`/products/${id}`}
            className="flex-1 btn-primary py-3 rounded-sm text-center hover:opacity-95 transition flex items-center justify-center gap-2 text-sm font-semibold"
            aria-label={`Voir les détails de ${title}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-text-dark">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Détails
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`flex-1 py-3 rounded-sm transition flex items-center justify-center gap-2 text-sm font-semibold ${
              stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary text-text-dark hover:shadow-lg'
            }`}
            aria-label={`Ajouter ${title} au panier`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-text-dark">
              <path d="M6 6h15l-1.5 9h-11L6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
            </svg>
            Ajouter
          </button>
        </div>
        
        {stock === 0 && <p className="text-red-500 text-sm mt-3 font-semibold">Indisponible</p>}
      </div>
    </div>
  );
};
