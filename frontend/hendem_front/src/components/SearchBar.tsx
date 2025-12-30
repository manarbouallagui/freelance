import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Implémentation de la recherche - vous pouvez ajouter des paramètres d'URL
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden md:block">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher des produits..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
        >
          🔍
        </button>
      </div>
    </form>
  );
};
