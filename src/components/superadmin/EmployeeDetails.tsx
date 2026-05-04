import { X } from 'lucide-react';
import { Employee } from '../../types/employee';

interface EmployeeDetailsProps {
  employee: Employee & { company?: string; salary?: number };
  onClose: () => void;
}

export default function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Détails de l'employé</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-xl">
                {employee.firstName[0]}{employee.lastName[0]}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Rôle</p>
              <p className="text-base font-medium text-gray-900">{employee.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Département</p>
              <p className="text-base font-medium text-gray-900">{employee.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Statut</p>
              <p className="text-base font-medium text-gray-900">{employee.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="text-base font-medium text-gray-900">{employee.phone || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date d'embauche</p>
              <p className="text-base font-medium text-gray-900">{employee.hireDate}</p>
            </div>
            {(employee as any).company && (
              <div>
                <p className="text-sm text-gray-600">Entreprise</p>
                <p className="text-base font-medium text-gray-900">{(employee as any).company}</p>
              </div>
            )}
            {(employee as any).salary && (
              <div>
                <p className="text-sm text-gray-600">Salaire</p>
                <p className="text-base font-medium text-gray-900">
                  {((employee as any).salary).toLocaleString('fr-FR')}€
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
