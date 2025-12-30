import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary pour capturer les erreurs React
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-dark mb-2">Quelque chose s'est mal passé</h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Une erreur inattendue s\'est produite'}
            </p>
            <div className="flex gap-4 justify-center flex-col md:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition"
              >
                Actualiser la page
              </button>
              <Link
                to="/"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Composant d'affichage d'erreur simple
 */
export const ErrorAlert: React.FC<{ message: string; onClose?: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4 animate-slideUp">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl">❌</span>
          <div>
            <h3 className="font-bold text-red-700">Erreur</h3>
            <p className="text-red-600 text-sm mt-1">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Composant de succès
 */
export const SuccessAlert: React.FC<{ message: string; onClose?: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4 animate-slideUp">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl">✓</span>
          <div>
            <h3 className="font-bold text-green-700">Succès</h3>
            <p className="text-green-600 text-sm mt-1">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-600 hover:text-green-800 font-bold"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Composant d'avertissement
 */
export const WarningAlert: React.FC<{ message: string; onClose?: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4 animate-slideUp">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-yellow-700">Avertissement</h3>
            <p className="text-yellow-600 text-sm mt-1">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-yellow-600 hover:text-yellow-800 font-bold"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
