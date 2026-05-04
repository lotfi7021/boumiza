import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Phone, Briefcase, Building2, CheckCircle, Clock, Plus, Trash2, UserPlus } from 'lucide-react';
import { TeamMemberCard } from '../../components/chef_projet';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatar?: string;
  tasksAssigned: number;
  tasksCompleted: number;
  hoursThisWeek: number;
  performance: number;
}

export default function ChefProjetTeam() {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showProjectSelectModal, setShowProjectSelectModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: ''
  });

  // Liste des projets disponibles
  const projects = [
    { id: '1', name: 'Refonte Site E-commerce', description: 'Modernisation complète du site' },
    { id: '2', name: 'Application Mobile Banking', description: 'App mobile pour services bancaires' },
    { id: '3', name: 'Dashboard Analytics', description: 'Tableau de bord analytique' },
    { id: '4', name: 'Système de Gestion RH', description: 'Plateforme RH complète' },
    { id: '5', name: 'Portail Client', description: 'Interface client pour suivi' }
  ];

  // FAKE DATA
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie.dubois@company.com',
      phone: '+33 6 12 34 56 78',
      role: 'Développeur Frontend',
      department: 'Développement',
      tasksAssigned: 8,
      tasksCompleted: 6,
      hoursThisWeek: 38,
      performance: 92
    },
    {
      id: '2',
      name: 'Jean Martin',
      email: 'jean.martin@company.com',
      phone: '+33 6 23 45 67 89',
      role: 'Développeur Backend',
      department: 'Développement',
      tasksAssigned: 10,
      tasksCompleted: 7,
      hoursThisWeek: 42,
      performance: 88
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      email: 'sophie.laurent@company.com',
      phone: '+33 6 34 56 78 90',
      role: 'Designer UX/UI',
      department: 'Design',
      tasksAssigned: 6,
      tasksCompleted: 5,
      hoursThisWeek: 35,
      performance: 95
    },
    {
      id: '4',
      name: 'Pierre Durand',
      email: 'pierre.durand@company.com',
      phone: '+33 6 45 67 89 01',
      role: 'Développeur Full Stack',
      department: 'Développement',
      tasksAssigned: 12,
      tasksCompleted: 9,
      hoursThisWeek: 40,
      performance: 85
    },
    {
      id: '5',
      name: 'Luc Bernard',
      email: 'luc.bernard@company.com',
      phone: '+33 6 56 78 90 12',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      tasksAssigned: 5,
      tasksCompleted: 4,
      hoursThisWeek: 37,
      performance: 90
    },
    {
      id: '6',
      name: 'Emma Petit',
      email: 'emma.petit@company.com',
      phone: '+33 6 67 89 01 23',
      role: 'QA Tester',
      department: 'Qualité',
      tasksAssigned: 7,
      tasksCompleted: 6,
      hoursThisWeek: 36,
      performance: 93
    },
    {
      id: '7',
      name: 'Thomas Roux',
      email: 'thomas.roux@company.com',
      phone: '+33 6 78 90 12 34',
      role: 'Développeur Mobile',
      department: 'Développement',
      tasksAssigned: 9,
      tasksCompleted: 7,
      hoursThisWeek: 39,
      performance: 87
    },
    {
      id: '8',
      name: 'Julie Moreau',
      email: 'julie.moreau@company.com',
      phone: '+33 6 89 01 23 45',
      role: 'Business Analyst',
      department: 'Analyse',
      tasksAssigned: 6,
      tasksCompleted: 5,
      hoursThisWeek: 35,
      performance: 91
    }
  ]);

  const stats = {
    totalMembers: teamMembers.length,
    avgPerformance: Math.round(teamMembers.reduce((acc, m) => acc + m.performance, 0) / teamMembers.length),
    totalTasks: teamMembers.reduce((acc, m) => acc + m.tasksAssigned, 0),
    completedTasks: teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0)
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceBarColor = (performance: number) => {
    if (performance >= 90) return 'bg-green-600';
    if (performance >= 75) return 'bg-blue-600';
    if (performance >= 60) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const handleAssignTask = (member: TeamMember) => {
    setSelectedMember(member);
    setShowProjectSelectModal(true);
  };

  const handleSelectProject = (projectId: string) => {
    // Rediriger vers le Kanban avec l'ID du projet
    navigate(`/chef-projet/kanban?project=${projectId}`);
  };

  const handleSubmitTask = () => {
    if (!taskTitle.trim() || !selectedMember) return;
    
    // Simuler l'assignation de tâche
    alert(`Tâche "${taskTitle}" assignée à ${selectedMember.name}`);
    
    // Reset form
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    setTaskDueDate('');
    setShowAssignTaskModal(false);
    setSelectedMember(null);
  };

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) return;

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone || '+33 6 00 00 00 00',
      role: newMember.role || 'Non défini',
      department: newMember.department || 'Non défini',
      tasksAssigned: 0,
      tasksCompleted: 0,
      hoursThisWeek: 0,
      performance: 0
    };

    setTeamMembers([...teamMembers, member]);
    
    // Reset form
    setNewMember({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: ''
    });
    setShowAddMemberModal(false);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!memberToDelete) return;
    
    setTeamMembers(teamMembers.filter(m => m.id !== memberToDelete.id));
    setShowDeleteConfirm(false);
    setMemberToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mon Équipe</h1>
          <p className="text-gray-600">Gérez et suivez les performances de votre équipe</p>
        </div>
        <button 
          onClick={() => setShowAddMemberModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          Ajouter un membre
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Membres d'Équipe</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Performance Moyenne</p>
          <p className="text-2xl font-bold text-green-600">{stats.avgPerformance}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Tâches Totales</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Tâches Complétées</p>
          <p className="text-2xl font-bold text-indigo-600">{stats.completedTasks}</p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard 
            key={member.id} 
            member={member}
            onViewProfile={() => handleViewProfile(member)}
            onAssignTask={() => handleAssignTask(member)}
            onDelete={() => handleDeleteMember(member)}
          />
        ))}
      </div>

      {/* Modal Profil */}
      {showProfileModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Profil du Membre</h2>
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  setSelectedMember(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Avatar et Info de base */}
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                  <p className="text-gray-600">{selectedMember.role}</p>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Rôle</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Département</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.department}</p>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Statistiques</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{selectedMember.tasksAssigned}</p>
                    <p className="text-xs text-gray-600">Tâches assignées</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{selectedMember.tasksCompleted}</p>
                    <p className="text-xs text-gray-600">Tâches complétées</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{selectedMember.hoursThisWeek}h</p>
                    <p className="text-xs text-gray-600">Heures cette semaine</p>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">{selectedMember.performance}%</p>
                    <p className="text-xs text-gray-600">Performance</p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Performance globale</span>
                  <span className={`text-sm font-bold ${getPerformanceColor(selectedMember.performance)}`}>
                    {selectedMember.performance}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getPerformanceBarColor(selectedMember.performance)}`}
                    style={{ width: `${selectedMember.performance}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  setSelectedMember(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Assigner une tâche */}
      {showAssignTaskModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Assigner une Tâche</h2>
              <button
                onClick={() => {
                  setShowAssignTaskModal(false);
                  setSelectedMember(null);
                  setTaskTitle('');
                  setTaskDescription('');
                  setTaskPriority('medium');
                  setTaskDueDate('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Membre sélectionné */}
              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-indigo-600">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedMember.name}</p>
                  <p className="text-xs text-gray-600">{selectedMember.role}</p>
                </div>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre de la tâche <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Développer la page d'accueil"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez la tâche..."
                />
              </div>

              {/* Priorité */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>

              {/* Date d'échéance */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAssignTaskModal(false);
                  setSelectedMember(null);
                  setTaskTitle('');
                  setTaskDescription('');
                  setTaskPriority('medium');
                  setTaskDueDate('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitTask}
                disabled={!taskTitle.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assigner la tâche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajouter un Membre */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Ajouter un Membre</h2>
              <button
                onClick={() => {
                  setShowAddMemberModal(false);
                  setNewMember({
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    department: ''
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Marie Dubois"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="marie.dubois@company.com"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Rôle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rôle
                </label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Développeur Frontend"
                />
              </div>

              {/* Département */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Département
                </label>
                <select
                  value={newMember.department}
                  onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un département</option>
                  <option value="Développement">Développement</option>
                  <option value="Design">Design</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Qualité">Qualité</option>
                  <option value="Analyse">Analyse</option>
                  <option value="Marketing">Marketing</option>
                  <option value="RH">RH</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddMemberModal(false);
                  setNewMember({
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    department: ''
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleAddMember}
                disabled={!newMember.name.trim() || !newMember.email.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation de Suppression */}
      {showDeleteConfirm && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirmer la suppression</h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir retirer <span className="font-semibold">{memberToDelete.name}</span> de l'équipe ?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Cette action ne supprimera pas l'employé de la base de données, mais le retirera uniquement de votre équipe projet.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMemberToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Retirer de l'équipe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sélection de Projet pour Gérer les Tâches */}
      {showProjectSelectModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Sélectionner un Projet</h2>
              <button
                onClick={() => {
                  setShowProjectSelectModal(false);
                  setSelectedMember(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Choisissez un projet pour gérer les tâches de <span className="font-semibold">{selectedMember.name}</span>
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(project.id)}
                    className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{project.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowProjectSelectModal(false);
                  setSelectedMember(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
