import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-300 skeleton animate-pulse"></div>
          <div className="p-4 space-y-4">
            <div className="h-4 bg-gray-300 skeleton rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 skeleton rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="flex-1 h-10 bg-gray-300 skeleton rounded"></div>
              <div className="flex-1 h-10 bg-gray-300 skeleton rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    </div>
  );
};
