import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, MoreVertical, X, User, Calendar, Tag, AlertCircle, UserPlus, FolderKanban } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanColumn from '../../components/chef_projet/KanbanColumn';
import KanbanCard from '../../components/chef_projet/KanbanCard';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Project {
  id: string;
  name: string;
  description: string;
}

export default function Kanban() {
  const [searchParams] = useSearchParams();
  const projectIdFromUrl = searchParams.get('project');
  
  const [selectedProject, setSelectedProject] = useState<string>(projectIdFromUrl || '1');
  
  // Mettre à jour le projet sélectionné si l'URL change
  useEffect(() => {
    if (projectIdFromUrl) {
      setSelectedProject(projectIdFromUrl);
    }
  }, [projectIdFromUrl]);
  
  // Liste des projets disponibles
  const projects: Project[] = [
    { id: '1', name: 'Refonte Site E-commerce', description: 'Modernisation complète du site' },
    { id: '2', name: 'Application Mobile Banking', description: 'App mobile pour services bancaires' },
    { id: '3', name: 'Dashboard Analytics', description: 'Tableau de bord analytique' },
    { id: '4', name: 'Système de Gestion RH', description: 'Plateforme RH complète' },
    { id: '5', name: 'Portail Client', description: 'Interface client pour suivi' }
  ];

  // Données des tâches par projet
  const getProjectColumns = (projectId: string): Column[] => {
    // Retourner les colonnes spécifiques au projet
    // Pour l'instant, on retourne les mêmes colonnes pour tous les projets
    // Dans une vraie application, ces données viendraient d'une API
    
    const baseColumns: Column[] = [
    {
      id: 'goal1',
      title: `Objectif 1: ${projects.find(p => p.id === projectId)?.name || 'Projet'}`,
      tasks: [
        {
          id: '1',
          title: 'Définir les objectifs S.M.A.R.T',
          description: 'Établir des objectifs Spécifiques, Mesurables, Atteignables, Réalistes et Temporels',
          priority: 'high',
          assignedTo: 'Marie Dubois',
          dueDate: '2026-05-15',
          tags: ['Trello Tips', 'Planification']
        },
        {
          id: '2',
          title: 'Progression actuelle vers "Augmenter les clients de 25%"',
          description: 'Suivi des métriques et KPIs pour atteindre l\'objectif',
          priority: 'medium',
          assignedTo: 'Jean Martin',
          dueDate: '2026-06-01',
          tags: ['At Risk', 'Suivi']
        },
        {
          id: '3',
          title: 'Lancer le programme de parrainage client',
          description: 'Mettre en place un système de récompenses pour les parrainages',
          priority: 'critical',
          assignedTo: 'Sophie Laurent',
          dueDate: '2026-05-20',
          tags: ['On Track', 'Marketing']
        },
        {
          id: '4',
          title: 'Astuce Trello: Les cartes peuvent résumer des projets spécifiques',
          description: 'Utilisez les cartes pour organiser vos projets et efforts',
          priority: 'low',
          assignedTo: 'Pierre Durand',
          dueDate: '2026-05-10',
          tags: ['Trello Tips']
        }
      ]
    },
    {
      id: 'goal2',
      title: 'Objectif 2: Réduire les coûts de bureau de 15%',
      tasks: [
        {
          id: '5',
          title: 'Progression actuelle vers "Réduire les coûts de 15%"',
          description: 'Analyse des dépenses et identification des économies possibles',
          priority: 'high',
          assignedTo: 'Luc Bernard',
          dueDate: '2026-05-18',
          tags: ['On Track', 'Finance']
        },
        {
          id: '6',
          title: 'Réduire le volume d\'impression de l\'équipe de 20%',
          description: 'Encourager l\'utilisation de documents numériques',
          priority: 'medium',
          assignedTo: 'Marie Dubois',
          dueDate: '2026-05-25',
          tags: ['In Progress', 'Écologie']
        },
        {
          id: '7',
          title: 'Négocier une remise de fidélité avec le fournisseur',
          description: 'Renégocier les contrats pour la nouvelle année fiscale',
          priority: 'high',
          assignedTo: 'Jean Martin',
          dueDate: '2026-06-05',
          tags: ['Achieved!', 'Achats']
        }
      ]
    },
    {
      id: 'goal_template',
      title: 'Modèle d\'Objectif',
      tasks: [
        {
          id: '8',
          title: 'Astuce Trello: Gardez une liste "modèle"',
          description: 'Créez un modèle que vous pouvez copier et renommer pour chaque nouvel objectif',
          priority: 'low',
          assignedTo: 'Sophie Laurent',
          dueDate: '2026-05-12',
          tags: ['Trello Tips']
        },
        {
          id: '9',
          title: 'Parties prenantes de l\'objectif',
          description: 'Identifiez toutes les personnes impliquées dans cet objectif',
          priority: 'medium',
          assignedTo: 'Pierre Durand',
          dueDate: '2026-05-15',
          tags: ['Template']
        },
        {
          id: '10',
          title: 'Progression actuelle vers l\'objectif',
          description: 'Suivez régulièrement l\'avancement de votre objectif',
          priority: 'medium',
          assignedTo: 'Luc Bernard',
          dueDate: '2026-05-20',
          tags: ['On Track', 'Template']
        },
        {
          id: '11',
          title: 'Astuce Trello: Essayez ces 5 exercices de team-building',
          description: 'Renforcez la cohésion d\'équipe pour atteindre vos objectifs',
          priority: 'low',
          assignedTo: 'Marie Dubois',
          dueDate: '2026-05-18',
          tags: ['Trello Tips', 'Team']
        }
      ]
    },
    {
      id: 'done_q1',
      title: 'Terminé (T1 2019)',
      tasks: [
        {
          id: '12',
          title: 'Astuce Trello: Placez les projets terminés et objectifs clos ici',
          description: 'Gardez un historique de vos réalisations',
          priority: 'low',
          assignedTo: 'Jean Martin',
          dueDate: '2019-03-31',
          tags: ['Trello Tips', 'Archive']
        },
        {
          id: '13',
          title: 'Recruter 5 nouvelles personnes pour 2019!',
          description: 'Objectif de recrutement atteint avec succès',
          priority: 'high',
          assignedTo: 'Sophie Laurent',
          dueDate: '2019-03-15',
          tags: ['Achieved!', 'RH']
        }
      ]
    },
    {
      id: 'done_q4',
      title: 'Terminé (T4 2018)',
      tasks: [
        {
          id: '14',
          title: 'Astuce Trello: Créez de nouvelles listes "Terminé"',
          description: 'Une liste par trimestre pour garder un historique des objectifs accomplis',
          priority: 'low',
          assignedTo: 'Pierre Durand',
          dueDate: '2018-12-31',
          tags: ['Trello Tips']
        }
      ]
    }
  ];
  
    return baseColumns;
  };

  const [columns, setColumns] = useState<Column[]>(getProjectColumns(selectedProject));
  
  // Recharger les colonnes quand le projet change
  useEffect(() => {
    setColumns(getProjectColumns(selectedProject));
  }, [selectedProject]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [showAssignEmployeeModal, setShowAssignEmployeeModal] = useState(false);
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'phase' | 'task', id: string, columnId?: string } | null>(null);
  const [newPhaseName, setNewPhaseName] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<string>('goal1');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    assignedTo: '',
    dueDate: '',
    tags: ''
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap(col => col.tasks)
      .find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTaskId = active.id as string;
    let overColumnId = over.id as string;

    // Vérifier si on a déposé sur une tâche plutôt que sur une colonne
    // Si c'est le cas, trouver la colonne qui contient cette tâche
    const overTask = columns.flatMap(col => col.tasks).find(t => t.id === overColumnId);
    if (overTask) {
      // Trouver la colonne qui contient cette tâche
      const columnWithTask = columns.find(col => col.tasks.some(t => t.id === overColumnId));
      if (columnWithTask) {
        overColumnId = columnWithTask.id;
      }
    }

    // Trouver la colonne source et la tâche
    let sourceColumn: Column | undefined;
    let task: Task | undefined;

    for (const col of columns) {
      const foundTask = col.tasks.find(t => t.id === activeTaskId);
      if (foundTask) {
        sourceColumn = col;
        task = foundTask;
        break;
      }
    }

    if (!task || !sourceColumn) {
      setActiveTask(null);
      return;
    }

    // Si on déplace vers une autre colonne
    if (sourceColumn.id !== overColumnId) {
      setColumns(prevColumns => {
        const newColumns = prevColumns.map(col => {
          // Retirer la tâche de la colonne source
          if (col.id === sourceColumn!.id) {
            return {
              ...col,
              tasks: col.tasks.filter(t => t.id !== activeTaskId)
            };
          }
          // Ajouter la tâche à la colonne destination
          if (col.id === overColumnId) {
            return {
              ...col,
              tasks: [...col.tasks, task!]
            };
          }
          return col;
        });
        return newColumns;
      });
    }

    setActiveTask(null);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignedTo: newTask.assignedTo || 'Non assigné',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      tags: newTask.tags ? newTask.tags.split(',').map(t => t.trim()) : []
    };

    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === selectedColumn
          ? { ...col, tasks: [...col.tasks, task] }
          : col
      )
    );

    // Reset form
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
      tags: ''
    });
    setShowModal(false);
  };

  const handleOpenModal = (columnId?: string) => {
    if (columnId) {
      setSelectedColumn(columnId);
    }
    setShowModal(true);
  };

  const handleAddPhase = () => {
    if (!newPhaseName.trim()) return;

    const newColumn: Column = {
      id: `phase_${Date.now()}`,
      title: newPhaseName,
      tasks: []
    };

    setColumns([...columns, newColumn]);
    setNewPhaseName('');
    setShowPhaseModal(false);
  };

  const handleDeletePhase = (columnId: string) => {
    setDeleteTarget({ type: 'phase', id: columnId });
    setShowDeleteConfirm(true);
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    setDeleteTarget({ type: 'task', id: taskId, columnId });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'phase') {
      setColumns(columns.filter(col => col.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'task' && deleteTarget.columnId) {
      setColumns(columns.map(col => {
        if (col.id === deleteTarget.columnId) {
          return {
            ...col,
            tasks: col.tasks.filter(t => t.id !== deleteTarget.id)
          };
        }
        return col;
      }));
    }

    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleViewTaskDetails = (task: Task) => {
    setSelectedTaskForDetail(task);
    setShowTaskDetailModal(true);
  };

  const handleAssignEmployee = (employeeName: string) => {
    if (!selectedTaskForDetail) return;

    // Mettre à jour la tâche avec le nouvel employé
    setColumns(columns.map(col => ({
      ...col,
      tasks: col.tasks.map(t => 
        t.id === selectedTaskForDetail.id 
          ? { ...t, assignedTo: employeeName }
          : t
      )
    })));

    setSelectedTaskForDetail({ ...selectedTaskForDetail, assignedTo: employeeName });
    setShowAssignEmployeeModal(false);
  };

  // Liste des employés disponibles
  const availableEmployees = [
    'Marie Dubois',
    'Jean Martin',
    'Sophie Laurent',
    'Pierre Durand',
    'Luc Bernard',
    'Emma Petit',
    'Thomas Roux',
    'Julie Moreau'
  ];

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="p-6 space-y-6">
        {/* Header avec sélecteur de projet */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">Tableau Kanban - Objectifs</h1>
            <p className="text-blue-100">Gérez vos objectifs et tâches avec drag & drop</p>
          </div>
          
          {/* Sélecteur de projet */}
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-1 flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-white ml-2" />
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-transparent text-white font-semibold px-3 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id} className="bg-indigo-600 text-white">
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Info du projet sélectionné */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {projects.find(p => p.id === selectedProject)?.name}
              </h3>
              <p className="text-sm text-blue-100">
                {projects.find(p => p.id === selectedProject)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map(column => (
              <div key={column.id} className="flex-shrink-0 w-80">
                <KanbanColumn 
                  column={column} 
                  onAddTask={handleOpenModal}
                  onDeletePhase={handleDeletePhase}
                  onDeleteTask={handleDeleteTask}
                  onViewTaskDetails={handleViewTaskDetails}
                />
              </div>
            ))}
            
            {/* Add Phase Button */}
            <div className="flex-shrink-0 w-80">
              <button 
                onClick={() => setShowPhaseModal(true)}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-xl p-3 flex items-center gap-2 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span className="font-semibold">Ajouter une phase</span>
              </button>
            </div>
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-3 opacity-80">
                <KanbanCard 
                  task={activeTask} 
                  columnId="" 
                  onDelete={() => {}}
                  onViewDetails={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Modal Ajouter une tâche */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouvelle Tâche</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Phase */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phase
                </label>
                <select
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {columns.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Révision du design UI"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
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
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="critical">Critique</option>
                </select>
              </div>

              {/* Assigné à */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assigné à
                </label>
                <input
                  type="text"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Marie Dubois"
                />
              </div>

              {/* Date d'échéance */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Design, UI, Urgent"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Ajouter la tâche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajouter une phase */}
      {showPhaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouvelle Phase</h2>
              <button
                onClick={() => setShowPhaseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de la phase <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPhaseName}
                  onChange={(e) => setNewPhaseName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPhase()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Objectif 3: Améliorer la satisfaction client"
                  autoFocus
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPhaseModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleAddPhase}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Ajouter la phase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Confirmer la suppression
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600">
                {deleteTarget.type === 'phase' 
                  ? 'Êtes-vous sûr de vouloir supprimer cette phase ? Toutes les tâches qu\'elle contient seront également supprimées.'
                  : 'Êtes-vous sûr de vouloir supprimer cette tâche ?'
                }
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails de la Tâche */}
      {showTaskDetailModal && selectedTaskForDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Détails de la Tâche</h2>
              <button
                onClick={() => {
                  setShowTaskDetailModal(false);
                  setSelectedTaskForDetail(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Titre */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedTaskForDetail.title}</h3>
              </div>

              {/* Tags */}
              {selectedTaskForDetail.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTaskForDetail.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {selectedTaskForDetail.description || 'Aucune description fournie'}
                </p>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assigné à */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Assigné à</span>
                  </div>
                  <p className="font-semibold text-gray-900">{selectedTaskForDetail.assignedTo}</p>
                  <button
                    onClick={() => setShowAssignEmployeeModal(true)}
                    className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                  >
                    <UserPlus className="h-3 w-3" />
                    Réassigner
                  </button>
                </div>

                {/* Date d'échéance */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Date d'échéance</span>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedTaskForDetail.dueDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Priorité */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Priorité</span>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedTaskForDetail.priority === 'critical' ? 'bg-red-100 text-red-700' :
                    selectedTaskForDetail.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    selectedTaskForDetail.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedTaskForDetail.priority === 'critical' ? 'Critique' :
                     selectedTaskForDetail.priority === 'high' ? 'Haute' :
                     selectedTaskForDetail.priority === 'medium' ? 'Moyenne' : 'Faible'}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowTaskDetailModal(false);
                  setSelectedTaskForDetail(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Assigner un Employé */}
      {showAssignEmployeeModal && selectedTaskForDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Assigner un Employé</h2>
              <button
                onClick={() => setShowAssignEmployeeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Sélectionnez un employé pour la tâche : <span className="font-semibold">{selectedTaskForDetail.title}</span>
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableEmployees.map((employee) => (
                  <button
                    key={employee}
                    onClick={() => handleAssignEmployee(employee)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                      selectedTaskForDetail.assignedTo === employee
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">
                          {employee.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{employee}</p>
                        {selectedTaskForDetail.assignedTo === employee && (
                          <p className="text-xs text-indigo-600">Actuellement assigné</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAssignEmployeeModal(false)}
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
