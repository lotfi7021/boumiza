import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import React from 'react';
import KanbanCard from './KanbanCard.tsx';

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

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string) => void;
  onDeletePhase: (columnId: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onViewTaskDetails: (task: Task) => void;
}

export default function KanbanColumn({ column, onAddTask, onDeletePhase, onDeleteTask, onViewTaskDetails }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded-xl transition-all ${
        isOver ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''
      }`}
    >
      {/* Column Header */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">{column.title}</h3>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-200 rounded"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-48">
                  <button
                    onClick={() => {
                      onDeletePhase(column.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer la phase
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-2 min-h-[100px]">
          <SortableContext
            items={column.tasks.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map(task => (
              <KanbanCard 
                key={task.id} 
                task={task} 
                columnId={column.id}
                onDelete={onDeleteTask}
                onViewDetails={onViewTaskDetails}
              />
            ))}
          </SortableContext>

          {column.tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-xs">
              Glissez une carte ici
            </div>
          )}
        </div>

        {/* Add Card Button */}
        <button 
          onClick={() => onAddTask(column.id)}
          className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter une tache</span>
        </button>
      </div>
    </div>
  );
}
