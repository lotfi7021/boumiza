import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Eye,
  Calendar,
  Clock,
  User,
  Tag,
  AlertTriangle,
  CheckCircle,
  FileText,
  X,
  Filter,
  Search,
  Check,
  GripVertical
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  status: 'À faire' | 'En cours' | 'En révision' | 'Terminé';
  dueDate: string;
  tags: string[];
  estimatedHours: number;
  actualHours: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export default function EmployeeKanban() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [selectedProject, setSelectedProject] = useState(projectId || '1');
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('Tous');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const currentUser = 'Marie Dubois'; // L'employé connecté

  // FAKE DATA - Projets disponibles
  const projects = [
    { id: '1', name: 'Système CRM' },
    { id: '2', name: 'Application Mobile' },
    { id: '3', name: 'Site Web Corporate' },
    { id: '4', name: 'Plateforme E-commerce' },
    { id: '5', name: 'API Gateway' }
  ];

  // FAKE DATA - Tâches par projet (seulement celles assignées à l'employé)
  const getMyTasks = (projectId: string): Task[] => {
    const allTasks = {
      '1': [ // Système CRM
        {
          id: '1',
          title: 'Développer API utilisateurs',
          description: 'Créer les endpoints pour la gestion des utilisateurs avec authentification JWT',
          assignedTo: 'Marie Dubois',
          priority: 'Haute' as const,
          status: 'En cours' as const,
          dueDate: '2024-02-15',
          tags: ['API', 'Backend', 'JWT'],
          estimatedHours: 20,
          actualHours: 13
        },
        {
          id: '4',
          title: 'Documentation technique API',
          description: 'Rédiger la documentation technique pour l\'API REST',
          assignedTo: 'Marie Dubois',
          priority: 'Basse' as const,
          status: 'À faire' as const,
          dueDate: '2024-02-20',
          tags: ['Documentation', 'API'],
          estimatedHours: 6,
          actualHours: 0
        }
      ],
      '2': [ // Application Mobile
        {
          id: '3',
          title: 'Tests unitaires module auth',
          description: 'Écrire les tests unitaires pour le module d\'authentification',
          assignedTo: 'Marie Dubois',
          priority: 'Moyenne' as const,
          status: 'En révision' as const,
          dueDate: '2024-02-18',
          tags: ['Tests', 'Auth', 'Jest'],
          estimatedHours: 8,
          actualHours: 7
        }
      ],
      '3': [ // Site Web Corporate
        {
          id: '5',
          title: 'Correction bugs interface',
          description: 'Corriger les bugs d\'affichage sur mobile et améliorer la responsivité',
          assignedTo: 'Marie Dubois',
          priority: 'Haute' as const,
          status: 'Terminé' as const,
          dueDate: '2024-02-12',
          tags: ['Frontend', 'CSS', 'Mobile'],
          estimatedHours: 12,
          actualHours: 10
        }
      ]
    };

    return allTasks[projectId as keyof typeof allTasks] || [];
  };

  // Initialiser les tâches quand le projet change
  useState(() => {
    setTasks(getMyTasks(selectedProject));
  });

  const handleProjectChange = (newProjectId: string) => {
    setSelectedProject(newProjectId);
    setTasks(getMyTasks(newProjectId));
  };

  // Organiser les tâches par colonnes
  const getColumns = (): Column[] => {
    return [
      {
        id: 'todo',
        title: 'À faire',
        color: 'bg-gray-100 border-gray-300',
        tasks: tasks.filter(task => task.status === 'À faire')
      },
      {
        id: 'in-progress',
        title: 'En cours',
        color: 'bg-blue-50 border-blue-200',
        tasks: tasks.filter(task => task.status === 'En cours')
      },
      {
        id: 'review',
        title: 'En révision',
        color: 'bg-yellow-50 border-yellow-200',
        tasks: tasks.filter(task => task.status === 'En révision')
      },
      {
        id: 'done',
        title: 'Terminé',
        color: 'bg-green-50 border-green-200',
        tasks: tasks.filter(task => task.status === 'Terminé')
      }
    ];
  };

  const columns = getColumns();
  const selectedProjectName = projects.find(p => p.id === selectedProject)?.name || 'Projet';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-700';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-700';
      case 'Basse': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Haute': return <AlertTriangle className="h-3 w-3" />;
      case 'Moyenne': return <Clock className="h-3 w-3" />;
      case 'Basse': return <CheckCircle className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const markTaskAsCompleted = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'Terminé' as const }
          : task
      )
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const taskId = active.id as string;
    const overId = over.id as string;

    // Déterminer la nouvelle colonne
    let newStatus: Task['status'];
    
    // Si on drop sur une colonne directement
    if (['todo', 'in-progress', 'review', 'done'].includes(overId)) {
      const statusMap = {
        'todo': 'À faire' as const,
        'in-progress': 'En cours' as const,
        'review': 'En révision' as const,
        'done': 'Terminé' as const,
      };
      newStatus = statusMap[overId as keyof typeof statusMap];
    } else {
      // Si on drop sur une autre tâche, trouver sa colonne
      const targetTask = tasks.find(t => t.id === overId);
      if (targetTask) {
        newStatus = targetTask.status;
      } else {
        setActiveId(null);
        return;
      }
    }

    // Mettre à jour le statut de la tâche
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    setActiveId(null);
  };

  // Composant de colonne droppable
  const DroppableColumn = ({ column }: { column: Column }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: column.id,
    });

    return (
      <div 
        ref={setNodeRef}
        className={`rounded-xl border-2 ${column.color} p-4 min-h-[200px] transition-colors ${
          isOver ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
            {column.tasks.length}
          </span>
        </div>

        <SortableContext
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <DraggableTaskCard key={task.id} task={task} />
            ))}

            {column.tasks.length === 0 && (
              <div className={`text-center py-8 text-gray-500 transition-colors ${
                isOver ? 'text-indigo-600' : ''
              }`}>
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune tâche</p>
                <p className="text-xs">Glissez une tâche ici</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    );
  };

  // Composant de tâche draggable
  const DraggableTaskCard = ({ task }: { task: Task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
            {task.title}
          </h4>
          <div className="flex items-center gap-1 ml-2">
            <GripVertical className="h-4 w-4 text-gray-400" />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openTaskDetail(task);
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <Eye className="h-4 w-4" />
            </button>
            {task.status !== 'Terminé' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markTaskAsCompleted(task.id);
                }}
                className="p-1 text-green-600 hover:text-green-700"
                title="Marquer comme terminé"
              >
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
            {getPriorityIcon(task.priority)}
            {task.priority}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {task.dueDate}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <User className="h-3 w-3" />
            Moi
          </div>
          <div className="text-xs text-gray-500">
            {task.actualHours}h / {task.estimatedHours}h
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {task.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{task.tags.length - 2}</span>
          )}
        </div>
      </div>
    );
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === 'Tous' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
  }));

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Terminé').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes Tâches - Vue Kanban</h1>
        <p className="text-gray-600">Visualisez et gérez vos tâches assignées avec drag & drop</p>
      </div>

      {/* Sélecteur de projet et filtres */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Projet</label>
            <select
              value={selectedProject}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Recherche</label>
            <Search className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Priorité</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Tous">Toutes</option>
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <p className="font-semibold">{totalTasks} mes tâches</p>
              <p>{completedTasks} terminées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredColumns.map((column) => (
          <div key={column.id} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <span className="text-2xl font-bold text-gray-900">{column.tasks.length}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">{selectedProjectName}</h2>
            <p className="text-gray-600">Mes tâches assignées - Glissez-déposez pour changer le statut</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredColumns.map((column) => (
              <DroppableColumn key={column.id} column={column} />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 rotate-3 opacity-90">
              <div className="font-semibold text-gray-900 text-sm">
                {tasks.find(task => task.id === activeId)?.title}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Note d'information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <GripVertical className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Drag & Drop Activé</h3>
            <p className="text-sm text-blue-700">
              Glissez-déposez vos tâches entre les colonnes pour changer leur statut. 
              Vous ne pouvez gérer que vos propres tâches.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Détails de la Tâche */}
      {showTaskDetail && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Ma Tâche</h2>
              <button
                onClick={() => setShowTaskDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedTask.title}</h3>
                <p className="text-gray-600">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedTask.status === 'Terminé' ? 'bg-green-100 text-green-700' :
                    selectedTask.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                    selectedTask.status === 'En révision' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedTask.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Priorité</label>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(selectedTask.priority)}`}>
                    {getPriorityIcon(selectedTask.priority)}
                    {selectedTask.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date d'échéance</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedTask.dueDate}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Temps</label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedTask.actualHours}h / {selectedTask.estimatedHours}h</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedTask.status !== 'Terminé' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900">Marquer comme terminé</h4>
                      <p className="text-sm text-blue-700">
                        Cliquez pour indiquer que cette tâche est terminée
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        markTaskAsCompleted(selectedTask.id);
                        setShowTaskDetail(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      <Check className="h-5 w-5" />
                      Terminé
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowTaskDetail(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}