import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Award,
  TrendingUp,
  Clock,
  Target,
  Edit2,
  Save,
  X,
  Camera,
  Shield,
  Star,
  CheckCircle,
  Users,
  FolderKanban
} from 'lucide-react';

export default function ChefProjetProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@entreprise.com',
    phone: '+33 6 98 76 54 32',
    address: '456 Avenue des Projets, 75002 Paris',
    birthDate: '1985-08-22',
    hireDate: '2020-06-15',
    position: 'Chef de Projet Senior',
    department: 'Gestion de Projets',
    level: 'Manager',
    bio: 'Chef de projet expérimenté avec 8 ans d\'expérience dans la gestion d\'équipes et de projets complexes. Spécialisé dans les méthodologies agiles et la coordination d\'équipes multidisciplinaires.'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // FAKE DATA - Statistiques de performance
  const performanceStats = {
    projectsManaged: 28,
    teamMembers: 15,
    successRate: 96,
    onTimeDelivery: 92,
    budgetCompliance: 98,
    clientSatisfaction: 4.8,
    tasksCompleted: 342,
    yearsExperience: 8
  };

  const managementSkills = [
    { name: 'Gestion d\'équipe', level: 95, category: 'Management' },
    { name: 'Planification projet', level: 92, category: 'Gestion' },
    { name: 'Méthodologies Agiles', level: 88, category: 'Méthodologie' },
    { name: 'Gestion budgétaire', level: 85, category: 'Finance' },
    { name: 'Communication client', level: 90, category: 'Relation client' },
    { name: 'Résolution de conflits', level: 87, category: 'Management' },
    { name: 'Analyse des risques', level: 83, category: 'Gestion' },
    { name: 'Leadership', level: 94, category: 'Management' }
  ];

  const certifications = [
    { name: 'PMP - Project Management Professional', issuer: 'PMI', date: '2022-03-15', status: 'Valide' },
    { name: 'Certified ScrumMaster', issuer: 'Scrum Alliance', date: '2021-09-20', status: 'Valide' },
    { name: 'PRINCE2 Practitioner', issuer: 'AXELOS', date: '2020-11-10', status: 'Valide' }
  ];

  const recentAchievements = [
    { title: 'Projet ERP livré en avance', date: '2024-02-05', type: 'project' },
    { title: 'Équipe de l\'année 2023', date: '2024-01-15', type: 'team' },
    { title: 'Certification PMP renouvelée', date: '2023-03-15', type: 'certification' },
    { title: '100% satisfaction client Q4', date: '2023-12-31', type: 'performance' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Mot de passe modifié avec succès');
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'project': return <Target className="h-5 w-5 text-blue-600" />;
      case 'team': return <Users className="h-5 w-5 text-green-600" />;
      case 'certification': return <Award className="h-5 w-5 text-purple-600" />;
      case 'performance': return <TrendingUp className="h-5 w-5 text-orange-600" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil Chef de Projet</h1>
        <p className="text-gray-600">Gérez vos informations et paramètres de gestion de projet</p>
      </div>

      {/* Profil Principal */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header avec photo */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                <Briefcase className="h-12 w-12 text-indigo-600" />
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 text-white">
              <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
              <p className="text-indigo-100 mb-2">{profileData.position}</p>
              <p className="text-indigo-200 text-sm">{profileData.department}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30 transition-colors font-semibold"
            >
              {isEditing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse</label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.address}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date de naissance</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.birthDate}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date d'embauche</label>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{profileData.hireDate}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Niveau</label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">
                  <FolderKanban className="h-4 w-4 mr-1" />
                  {profileData.level}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.bio}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
              >
                <Save className="h-5 w-5" />
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Statistiques de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets Gérés</p>
              <p className="text-2xl font-bold text-gray-900">{performanceStats.projectsManaged}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Membres d'Équipe</p>
              <p className="text-2xl font-bold text-gray-900">{performanceStats.teamMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux de Réussite</p>
              <p className="text-2xl font-bold text-gray-900">{performanceStats.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Satisfaction Client</p>
              <p className="text-2xl font-bold text-gray-900">{performanceStats.clientSatisfaction}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compétences et Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compétences de Management */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Compétences de Management</h2>
          <div className="space-y-4">
            {managementSkills.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({skill.category})</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {cert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Réalisations Récentes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Réalisations Récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 rounded-xl bg-white">
                {getAchievementIcon(achievement.type)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{achievement.title}</p>
                <p className="text-sm text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Sécurité</h2>
          <Shield className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Mot de passe</p>
              <p className="text-sm text-gray-600">Dernière modification il y a 1 mois</p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
            >
              Modifier
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div>
              <p className="font-semibold text-green-900">Accès sécurisé</p>
              <p className="text-sm text-green-600">Niveau de sécurité élevé</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Modal Changement de Mot de Passe */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Changer le mot de passe</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
              >
                Changer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}