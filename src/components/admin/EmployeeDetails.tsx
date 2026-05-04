import { X, Mail, Phone, MapPin, Calendar, Clock, User, Building, DollarSign, Users } from 'lucide-react';
import { Employee, EMPLOYEE_ROLE_LABELS, EMPLOYEE_ROLE_COLORS, EMPLOYEE_STATUS_LABELS, EMPLOYEE_STATUS_COLORS, CONTRACT_TYPE_LABELS, CONTRACT_TYPE_COLORS } from '../../types/employee';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { useError } from '../../hooks/useError';

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
  onEdit: () => void;
}

export default function EmployeeDetails({ employee, onClose, onEdit }: EmployeeDetailsProps) {
  const { deleteEmployee, updateEmployeeStatus } = useEmployeeContext();
  const { error, handleError } = useError();

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      const success = await deleteEmployee(employee.id);
      if (success) {
        onClose();
      }
    }
  };

  const handleStatusChange = async (newStatus: 'active' | 'inactive' | 'on_leave' | 'terminated') => {
    await updateEmployeeStatus(employee.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-3xl">
                {employee.firstName[0]}{employee.lastName[0]}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">ID: {employee.employeeId}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  EMPLOYEE_ROLE_COLORS[employee.role]
                }`}>
                  <User className="h-4 w-4" />
                  {EMPLOYEE_ROLE_LABELS[employee.role]}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  EMPLOYEE_STATUS_COLORS[employee.status]
                }`}>
                  {EMPLOYEE_STATUS_LABELS[employee.status]}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  CONTRACT_TYPE_COLORS[employee.contractType]
                }`}>
                  {CONTRACT_TYPE_LABELS[employee.contractType]}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Informations de contact</h4>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <p className="text-sm font-medium text-gray-900">{employee.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Adresse</p>
                    <p className="text-sm font-medium text-gray-900">{employee.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Informations professionnelles</h4>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Département</p>
                    <p className="text-sm font-medium text-gray-900">{employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date d'embauche</p>
                    <p className="text-sm font-medium text-gray-900">{employee.hireDate}</p>
                  </div>
                </div>
                {employee.salary && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Salaire</p>
                      <p className="text-sm font-medium text-gray-900">{employee.salary.toLocaleString()} TND</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact d'urgence</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Nom</p>
                  <p className="text-sm font-medium text-gray-900">{employee.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="text-sm font-medium text-gray-900">{employee.emergencyContact.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Relation</p>
                  <p className="text-sm font-medium text-gray-900">{employee.emergencyContact.relationship}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          {employee.skills.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Compétences</h4>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          {error && (
            <div className="flex-1 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error.message}
            </div>
          )}
          
          {/* Status Actions */}
          {employee.status === 'active' && (
            <>
              <button
                onClick={() => handleStatusChange('on_leave')}
                className="px-4 py-2 border border-yellow-300 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Mettre en congé
              </button>
              <button
                onClick={() => handleStatusChange('inactive')}
                className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Désactiver
              </button>
            </>
          )}
          
          {employee.status === 'inactive' && (
            <button
              onClick={() => handleStatusChange('active')}
              className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Activer
            </button>
          )}
          
          {employee.status === 'on_leave' && (
            <button
              onClick={() => handleStatusChange('active')}
              className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Retour de congé
            </button>
          )}

          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Supprimer
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}