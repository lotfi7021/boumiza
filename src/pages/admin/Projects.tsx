import { useState } from 'react';
import { Search, FolderOpen, Clock, CheckCircle, XCircle, Calendar, User, Eye, Edit, Trash2, Users, FileText, Download } from 'lucide-react';
import { useClientProjectContext } from '../../contexts/ClientProjectContext';
import { ClientProject, CLIENT_PROJECT_STATUS_LABELS, CLIENT_PROJECT_STATUS_COLORS, ClientProjectStatus } from '../../types/clientProject';
import ProjectAssignmentForm from '../../components/admin/ProjectAssignmentForm';
import Pagination from '../../components/Pagination';

export default function Projects() {
  const { projects, loading, updateProjectStatus, deleteProject, assignProject } = useClientProjectContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<ClientProjectStatus>('submitted');
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);
  const [assigningProject, setAssigningProject] = useState<ClientProject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrage des projets
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (projectId: string) => {
    const success = await updateProjectStatus(projectId, newStatus);
    if (success) {
      setEditingStatusId(null);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      await deleteProject(projectId);
    }
  };

  const handleAssignProject = async (projectId: string, teamId: string, employeeIds: string[]): Promise<boolean> => {
    const success = await assignProject(projectId, { assignedTeamId: teamId });
    return success;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <FolderOpen className="h-5 w-5 text-blue-500" />;
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Projets Clients</h1>
        <p className="text-gray-600">Liste des projets proposés par les clients</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par titre ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="submitted">Soumis</option>
            <option value="under_review">En révision</option>
            <option value="approved">Approuvé</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun projet trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Échéance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <div>
                          <p className="font-medium text-gray-900">{project.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{project.clientName}</p>
                          {project.clientCompany && (
                            <p className="text-sm text-gray-500">{project.clientCompany}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.budget ? (
                        <span className="font-medium text-gray-900">
                          {project.budget.toLocaleString('fr-FR')} €
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.deadline ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(project.deadline).toLocaleDateString('fr-FR')}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatusId === project.id ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as ClientProjectStatus)}
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="submitted">Soumis</option>
                            <option value="under_review">En révision</option>
                            <option value="approved">Approuvé</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminé</option>
                            <option value="rejected">Rejeté</option>
                          </select>
                          <button
                            onClick={() => handleStatusChange(project.id)}
                            className="px-2 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            OK
                          </button>
                          <button
                            onClick={() => setEditingStatusId(null)}
                            className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          CLIENT_PROJECT_STATUS_COLORS[project.status]
                        }`}>
                          {CLIENT_PROJECT_STATUS_LABELS[project.status]}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* Assigner l'équipe */}
                        <button
                          onClick={() => setAssigningProject(project)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Assigner une équipe"
                        >
                          <Users className="h-5 w-5" />
                        </button>

                        {/* Voir les détails */}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="h-5 w-5" />
                        </button>

                        {/* Modifier le statut */}
                        <button
                          onClick={() => {
                            setEditingStatusId(project.id);
                            setNewStatus(project.status);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Modifier le statut"
                        >
                          <Edit className="h-5 w-5" />
                        </button>

                        {/* Supprimer */}
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProjects.length}
          />
        )}
      </div>

      {/* Modal pour modifier le statut */}
      {editingStatusId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modifier le statut du projet</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau statut
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ClientProjectStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="submitted">Soumis</option>
                <option value="under_review">En révision</option>
                <option value="approved">Approuvé</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditingStatusId(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleStatusChange(editingStatusId)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour voir les détails */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Détails du projet</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{selectedProject.title}</h4>
                <p className="text-gray-600 mt-1">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                    CLIENT_PROJECT_STATUS_COLORS[selectedProject.status]
                  }`}>
                    {CLIENT_PROJECT_STATUS_LABELS[selectedProject.status]}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium text-gray-900">
                    {selectedProject.budget?.toLocaleString('fr-FR')} €
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium text-gray-900">{selectedProject.clientName}</p>
                  <p className="text-sm text-gray-600">{selectedProject.clientEmail}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Entreprise</p>
                  <p className="font-medium text-gray-900">{selectedProject.clientCompany || '-'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date de soumission</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedProject.submittedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Échéance</p>
                  <p className="font-medium text-gray-900">
                    {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString('fr-FR') : '-'}
                  </p>
                </div>
              </div>

              {selectedProject.requirements && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Exigences</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedProject.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section Cahier des charges */}
              {selectedProject.attachments && selectedProject.attachments.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-3">Cahier des charges et documents</p>
                  <div className="space-y-2">
                    {selectedProject.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <FileText className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{attachment.fileName}</p>
                            <p className="text-xs text-gray-500">
                              {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB • 
                              Déposé le {new Date(attachment.uploadedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(attachment.fileUrl, '_blank')}
                          className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.clientFeedback && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Feedback client</p>
                  <p className="text-gray-700">{selectedProject.clientFeedback}</p>
                </div>
              )}

              {selectedProject.progress !== undefined && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Progression</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedProject.progress}%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour affecter une équipe */}
      {assigningProject && (
        <ProjectAssignmentForm
          project={assigningProject}
          onClose={() => setAssigningProject(null)}
          onAssign={handleAssignProject}
        />
      )}
    </div>
  );
}
