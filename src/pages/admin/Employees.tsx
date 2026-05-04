import { useState } from 'react';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { Employee } from '../../types/employee';
import EmployeeDetails from '../../components/admin/EmployeeDetails';
import { EmployeesList, EmployeeStats } from '../../components/superadmin';

export default function Employees() {
  const { employees, loading } = useEmployeeContext();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Employés</h1>
        <p className="text-gray-600">Gérez votre équipe et les informations des employés</p>
      </div>

      {/* Stats */}
      <EmployeeStats employees={employees} showInactive={true} />

      {/* List */}
      <EmployeesList
        employees={employees}
        showCompany={false}
        showSalary={false}
        showActions={{ view: true, edit: false, delete: false }}
        onViewEmployee={setSelectedEmployee}
        itemsPerPage={10}
      />

      {/* Modals */}
      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={handleCloseDetails}
          onEdit={() => {}}
        />
      )}
    </div>
  );
}