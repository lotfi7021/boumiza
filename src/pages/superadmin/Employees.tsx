import { useState } from 'react';
import { Plus } from 'lucide-react';
import { EmployeesList, EmployeeStats, EmployeeForm, EmployeeDetails, DeleteConfirmation } from '../../components/superadmin';

// Type pour les employés du super admin (avec company et salary)
interface SuperAdminEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: string;
  company: string;
  hireDate: string;
  salary: number;
  employeeId?: string;
}

export default function SuperAdminEmployees() {
  const [employees, setEmployees] = useState<SuperAdminEmployee[]>([
    {
      id: 'emp-1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@company.com',
      phone: '+33 6 12 34 56 78',
      role: 'developer',
      department: 'Développement',
      status: 'active',
      company: 'Tech Solutions SA',
      hireDate: '2022-01-15',
      salary: 45000
    },
    {
      id: 'emp-2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@company.com',
      phone: '+33 6 23 45 67 89',
      role: 'team_leader',
      department: 'Développement',
      status: 'active',
      company: 'Tech Solutions SA',
      hireDate: '2021-03-10',
      salary: 55000
    },
    {
      id: 'emp-3',
      firstName: 'Pierre',
      lastName: 'Bernard',
      email: 'pierre.bernard@company.com',
      phone: '+33 6 34 56 78 90',
      role: 'designer',
      department: 'Design',
      status: 'active',
      company: 'Digital Agency',
      hireDate: '2022-06-01',
      salary: 42000
    },
    {
      id: 'emp-4',
      firstName: 'Sophie',
      lastName: 'Laurent',
      email: 'sophie.laurent@company.com',
      phone: '+33 6 45 67 89 01',
      role: 'manager',
      department: 'Direction',
      status: 'active',
      company: 'Tech Solutions SA',
      hireDate: '2020-01-05',
      salary: 65000
    },
   
   
   
   
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<SuperAdminEmployee | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<SuperAdminEmployee | null>(null);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleViewEmployee = (employee: SuperAdminEmployee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleEditEmployee = (employee: SuperAdminEmployee) => {
    setEditingEmployee(employee);
    setShowDetails(false);
    setShowForm(true);
  };

  const handleDeleteEmployee = (employee: SuperAdminEmployee) => {
    setSelectedEmployee(employee);
    setShowDeleteConfirm(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingEmployee) {
      // Modification
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id
          ? { ...emp, ...formData }
          : emp
      ));
    } else {
      // Ajout
      const newEmployee: SuperAdminEmployee = {
        id: `emp-${Date.now()}`,
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setShowDeleteConfirm(false);
      setShowDetails(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Employés</h1>
          <p className="text-gray-600">Gérez tous les employés de toutes les entreprises</p>
        </div>
        <button
          onClick={handleAddEmployee}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nouvel Employé
        </button>
      </div>

      {/* Stats */}
      <EmployeeStats employees={employees as any} showInactive={false} />

      {/* List */}
      <EmployeesList
        employees={employees as any}
        showCompany={true}
        showSalary={true}
        showActions={{ view: true, edit: true, delete: true }}
        onViewEmployee={(emp) => handleViewEmployee(emp as any)}
        onEditEmployee={(emp) => handleEditEmployee(emp as any)}
        onDeleteEmployee={(emp) => handleDeleteEmployee(emp as any)}
        itemsPerPage={10}
      />

      {/* Modals */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee as any}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        />
      )}

      {showDetails && selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee as any}
          onClose={() => {
            setShowDetails(false);
            setSelectedEmployee(null);
          }}
        />
      )}

      {showDeleteConfirm && selectedEmployee && (
        <DeleteConfirmation
          title="Supprimer l'employé"
          message={`Êtes-vous sûr de vouloir supprimer ${selectedEmployee.firstName} ${selectedEmployee.lastName} ? Cette action est irréversible.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
