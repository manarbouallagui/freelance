import React from 'react';
import { useLazyLoad } from '../hooks/useCustom';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

/**
 * Composant image optimisé avec lazy loading
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3C/svg%3E',
  width,
  height,
}) => {
  const { ref, isLoaded } = useLazyLoad();
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <img
        ref={ref}
        src={isLoaded ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-50'
        } ${imageError ? 'opacity-0' : ''}`}
      />
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
          <span className="text-gray-600">❌ Erreur image</span>
        </div>
      )}
    </div>
  );
};
