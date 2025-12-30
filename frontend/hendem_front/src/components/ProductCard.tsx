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
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-primary truncate">{title}</h3>
        <p className="text-gold text-xl font-bold mt-2">{price.toFixed(3)} TND</p>
        
        <div className="mt-4 flex gap-2">
          <Link
            to={`/products/${id}`}
            className="flex-1 btn-gold py-2 rounded text-center hover:opacity-95 transition"
          >
            Détails
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`flex-1 py-2 rounded transition ${
              stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gold text-ivory hover:opacity-95'
            }`}
          >
            🛒 Ajouter
          </button>
        </div>
        
        {stock === 0 && <p className="text-red-500 text-sm mt-2">Indisponible</p>}
      </div>
    </div>
  );
};
