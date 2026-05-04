import { useState } from 'react';
import { X, Mail, Phone, Calendar, Clock, User, MessageSquare, FileText, Send, Eye, EyeOff } from 'lucide-react';
import { Complaint, COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS, COMPLAINT_PRIORITY_LABELS, COMPLAINT_PRIORITY_COLORS, ALL_COMPLAINT_CATEGORIES } from '../../types/complaint';
import { useComplaintContext } from '../../contexts/ComplaintContext';
import { useError } from '../../hooks/useError';

interface ComplaintDetailsProps {
  complaint: Complaint;
  onClose: () => void;
  onEdit: () => void;
}

export default function ComplaintDetails({ complaint, onClose, onEdit }: ComplaintDetailsProps) {
  const { updateComplaintStatus, assignComplaint, resolveComplaint, rejectComplaint, addComment, deleteComplaint } = useComplaintContext();
  const { error, handleError } = useError();
  const [newComment, setNewComment] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [showResolutionForm, setShowResolutionForm] = useState(false);
  const [resolution, setResolution] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleStatusChange = async (newStatus: 'pending' | 'in_progress' | 'resolved' | 'rejected') => {
    await updateComplaintStatus(complaint.id, newStatus);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const success = await addComment(complaint.id, newComment, isInternalComment);
      if (success) {
        setNewComment('');
        setIsInternalComment(false);
      }
    }
  };

  const handleResolve = async () => {
    if (resolution.trim()) {
      const success = await resolveComplaint(complaint.id, resolution, resolutionNotes);
      if (success) {
        setShowResolutionForm(false);
        setResolution('');
        setResolutionNotes('');
      }
    }
  };

  const handleReject = async () => {
    if (rejectReason.trim()) {
      const success = await rejectComplaint(complaint.id, rejectReason);
      if (success) {
        setShowRejectForm(false);
        setRejectReason('');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) {
      const success = await deleteComplaint(complaint.id);
      if (success) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Détails de la réclamation</h2>
            <p className="text-sm text-gray-500">ID: {complaint.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Titre</p>
                    <p className="font-medium text-gray-900">{complaint.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="text-gray-900">{ALL_COMPLAINT_CATEGORIES[complaint.category]}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        complaint.type === 'client' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {complaint.type === 'client' ? 'Client' : 'Employé'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Priorité</p>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        COMPLAINT_PRIORITY_COLORS[complaint.priority]
                      }`}>
                        {COMPLAINT_PRIORITY_LABELS[complaint.priority]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Statut</p>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        COMPLAINT_STATUS_COLORS[complaint.status]
                      }`}>
                        {COMPLAINT_STATUS_LABELS[complaint.status]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du plaignant</h3>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Nom</p>
                    <p className="text-sm font-medium text-gray-900">{complaint.complainantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{complaint.complainantEmail}</p>
                  </div>
                </div>
                {complaint.complainantPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <p className="text-sm font-medium text-gray-900">{complaint.complainantPhone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap">{complaint.description}</p>
            </div>
          </div>

          {/* Resolution */}
          {complaint.resolution && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Résolution</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-gray-900 whitespace-pre-wrap">{complaint.resolution}</p>
                {complaint.resolutionNotes && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600">Notes: {complaint.resolutionNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Commentaires</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {complaint.comments?.map((comment) => (
                <div key={comment.id} className={`p-3 rounded-lg ${
                  comment.isInternal ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm text-gray-900">{comment.authorName}</span>
                    <span className="text-xs text-gray-500">{comment.authorRole}</span>
                    {comment.isInternal && (
                      <span className="inline-flex items-center gap-1 text-xs text-yellow-700">
                        <EyeOff className="h-3 w-3" />
                        Interne
                      </span>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isInternalComment}
                    onChange={(e) => setIsInternalComment(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Commentaire interne</span>
                </label>
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  Envoyer
                </button>
              </div>
            </div>
          </div>

          {/* Resolution Form */}
          {showResolutionForm && (
            <div className="bg-green-50 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-gray-900">Résoudre la réclamation</h4>
              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="Description de la résolution..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <textarea
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Notes internes (optionnel)..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleResolve}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Résoudre
                </button>
                <button
                  onClick={() => setShowResolutionForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Reject Form */}
          {showRejectForm && (
            <div className="bg-red-50 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-gray-900">Rejeter la réclamation</h4>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Raison du rejet..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Rejeter
                </button>
                <button
                  onClick={() => setShowRejectForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
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
          {complaint.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusChange('in_progress')}
                className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Prendre en charge
              </button>
              <button
                onClick={() => setShowResolutionForm(true)}
                className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Résoudre
              </button>
              <button
                onClick={() => setShowRejectForm(true)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Rejeter
              </button>
            </>
          )}
          
          {complaint.status === 'in_progress' && (
            <>
              <button
                onClick={() => setShowResolutionForm(true)}
                className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Résoudre
              </button>
              <button
                onClick={() => setShowRejectForm(true)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Rejeter
              </button>
            </>
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