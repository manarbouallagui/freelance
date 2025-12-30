import React from 'react';

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slideUp">
      <h3 className="text-lg font-bold text-dark mb-4">Catégories</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            selectedCategory === null
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-dark hover:bg-gray-200'
          }`}
        >
          Tous les produits
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-dark hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
