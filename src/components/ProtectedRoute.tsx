import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AdminRole } from '../types/admin';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AdminRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, hasPermission } = useAuth();

  // Si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/app" replace />;
  }

  // Si un rôle spécifique est requis et l'utilisateur ne l'a pas
  if (requiredRole && !hasPermission(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            Cette section est réservée aux {requiredRole === 'super_admin' ? 'Super Administrateurs' : 'Administrateurs'}.
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <p>Votre rôle actuel : <span className="font-semibold text-gray-900">{user.role}</span></p>
            <p>Rôle requis : <span className="font-semibold text-gray-900">{requiredRole}</span></p>
          </div>
          <a
            href="/app"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retour au Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
