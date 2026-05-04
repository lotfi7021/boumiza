import { useState } from 'react';

interface ErrorState {
  message: string;
  code?: string;
  timestamp: Date;
}

// Hook pour la gestion centralisée des erreurs
export const useError = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = (error: Error, code?: string) => {
    console.error('Error occurred:', error);
    
    setError({
      message: error.message || 'Une erreur inattendue s\'est produite',
      code,
      timestamp: new Date(),
    });

    // Auto-clear error after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError,
  };
};