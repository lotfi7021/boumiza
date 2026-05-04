import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, User, MoreVertical, Trash2 } from 'lucide-react';
import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  tags: string[];
}

interface KanbanCardProps {
  task: Task;
  columnId: string;
  onDelete: (taskId: string, columnId: string) => void;
  onViewDetails: (task: Task) => void;
}

export default function KanbanCard({ task, columnId, onDelete, onViewDetails }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const [showMenu, setShowMenu] = React.useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getTagColor = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('trello tips')) return 'bg-cyan-500 text-white';
    if (tagLower.includes('achieved') || tagLower.includes('réussi')) return 'bg-green-500 text-white';
    if (tagLower.includes('on track') || tagLower.includes('en cours')) return 'bg-blue-500 text-white';
    if (tagLower.includes('at risk') || tagLower.includes('risque')) return 'bg-red-500 text-white';
    if (tagLower.includes('in progress') || tagLower.includes('progress')) return 'bg-purple-500 text-white';
    if (tagLower.includes('template')) return 'bg-gray-400 text-white';
    return 'bg-yellow-500 text-white';
  };

  // Générer des initiales pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Générer une couleur d'avatar basée sur le nom
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-indigo-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onViewDetails(task)}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all cursor-pointer ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        {/* Tags en haut */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-0.5 rounded font-semibold ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Titre avec menu */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-medium text-gray-900 text-sm leading-snug flex-1">
            {task.title}
          </h4>
          <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
            >
              <MoreVertical className="h-3 w-3" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-6 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id, columnId);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="h-3 w-3" />
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description si présente */}
        {task.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer avec avatars et date */}
        <div className="flex items-center justify-between mt-3">
          {/* Avatar */}
          <div className="flex -space-x-2">
            <div
              className={`h-7 w-7 rounded-full ${getAvatarColor(task.assignedTo)} flex items-center justify-center text-white text-xs font-semibold border-2 border-white`}
              title={task.assignedTo}
            >
              {getInitials(task.assignedTo)}
            </div>
          </div>

          {/* Date et icônes */}
          <div className="flex items-center gap-2 text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span>{new Date(task.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
