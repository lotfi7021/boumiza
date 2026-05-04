import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Complaint, ComplaintFormData, CLIENT_COMPLAINT_CATEGORIES, EMPLOYEE_COMPLAINT_CATEGORIES } from '../../types/complaint';
import { useComplaintContext } from '../../contexts/ComplaintContext';

interface ComplaintFormProps {
  complaint?: Complaint | null;
  onClose: () => void;
}

export default function ComplaintForm({ complaint, onClose }: ComplaintFormProps) {
  const { createComplaint, updateComplaint } = useComplaintContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ComplaintFormData>({
    type: 'client',
    title: '',
    description: '',
    category: 'service_quality',
    priority: 'medium',
    complainantId: '',
    complainantName: '',
    complainantEmail: '',
    complainantPhone: ''
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        type: complaint.type,
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        priority: complaint.priority,
        complainantId: complaint.complainantId,
        complainantName: complaint.complainantName,
        complainantEmail: complaint.complainantEmail,
        complainantPhone: complaint.complainantPhone
      });
    }
  }, [complaint]);

  // Réinitialiser la catégorie quand le type change
  useEffect(() => {
    if (formData.type === 'client') {
      setFormData(prev => ({ ...prev, category: 'service_quality' }));
    } else {
      setFormData(prev => ({ ...prev, category: 'workplace_harassment' }));
    }
  }, [formData.type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = complaint 
        ? await updateComplaint(complaint.id, formData)
        : await createComplaint(formData);

      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableCategories = () => {
    return formData.type === 'client' ? CLIENT_COMPLAINT_CATEGORIES : EMPLOYEE_COMPLAINT_CATEGORIES;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {complaint ? 'Modifier la réclamation' : 'Nouvelle réclamation'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type and Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de réclamation *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'client' | 'employee' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="client">Client</option>
                  <option value="employee">Employé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité *
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {Object.entries(getAvailableCategories()).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Résumé de la réclamation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Description détaillée de la réclamation"
              />
            </div>
          </div>

          {/* Complainant Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informations du plaignant</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID du plaignant *
                </label>
                <input
                  type="text"
                  required
                  value={formData.complainantId}
                  onChange={(e) => setFormData({ ...formData, complainantId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={formData.type === 'client' ? 'ID Client' : 'ID Employé'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.complainantName}
                  onChange={(e) => setFormData({ ...formData, complainantName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nom et prénom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.complainantEmail}
                  onChange={(e) => setFormData({ ...formData, complainantEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="email@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.complainantPhone || ''}
                  onChange={(e) => setFormData({ ...formData, complainantPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+216 XX XXX XXX"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : (complaint ? 'Modifier' : 'Créer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}