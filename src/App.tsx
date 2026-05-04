import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Complaints from './pages/admin/Complaints';
import Employees from './pages/admin/Employees';
import Team from './pages/admin/Team';
import Projects from './pages/admin/Projects';
import AdminProfile from './pages/admin/Profile';
import AdminKanban from './pages/admin/Kanban';

// Super Admin Pages
import { Dashboard as SuperAdminDashboard, Employees as SuperAdminEmployees, Admins as SuperAdminAdmins, Departments as SuperAdminDepartments, Positions, Levels, Roles, Complaints as SuperAdminComplaints, Profile as SuperAdminProfile } from './pages/superadmin';

// Chef de Projet Pages
import { Dashboard as ChefProjetDashboard, Projects as ChefProjetProjects, Tasks as ChefProjetTasks, Team as ChefProjetTeam, Complaints as ChefProjetComplaints, Kanban as ChefProjetKanban, Profile as ChefProjetProfile } from './pages/chef_projet';

// Employee Pages
import { EmployeeDashboard, EmployeeTasks, EmployeeProjects, EmployeeProfile, EmployeeKanban } from './pages/employee';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import ChefProjetLayout from './layouts/ChefProjetLayout';
import EmployeeLayout from './layouts/EmployeeLayout';

// Context & Protection
import { AuthProvider } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import { ComplaintProvider } from './contexts/ComplaintContext';
import { TeamProvider } from './contexts/TeamContext';
import { ClientProjectProvider } from './contexts/ClientProjectContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import HandScrollController from './components/HandScrollController';

function App() {
  return (
    <ErrorBoundary>
      <HandScrollController />
      <AuthProvider>
        <EmployeeProvider>
          <ComplaintProvider>
            <TeamProvider>
              <ClientProjectProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/app" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route 
                        path="projects" 
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <Projects />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="kanban" 
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <AdminKanban />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="complaints" 
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <Complaints />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="employees" element={<Employees />} />
                      <Route path="team" element={<Team />} />
                      <Route 
                        path="profile" 
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <AdminProfile />
                          </ProtectedRoute>
                        } 
                      />
                    </Route>

                    {/* Super Admin Routes */}
                    <Route path="/superadmin" element={<SuperAdminLayout />}>
                      <Route 
                        index 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <SuperAdminDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="employees" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <SuperAdminEmployees />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="admins" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <SuperAdminAdmins />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="departments" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <SuperAdminDepartments />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="positions" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <Positions />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="levels" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <Levels />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="roles" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <Roles />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="complaints" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <SuperAdminComplaints />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="profile" 
                        element={
                          <ProtectedRoute requiredRole="super_admin">
                            <SuperAdminProfile />
                          </ProtectedRoute>
                        } 
                      />
                    </Route>

                    {/* Chef de Projet Routes */}
                    <Route path="/chef-projet" element={<ChefProjetLayout />}>
                      <Route 
                        index 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="projects" 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetProjects />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="kanban" 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetKanban />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="tasks" 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetTasks />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="team" 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetTeam />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="complaints" 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetComplaints />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="profile" 
                        element={
                          <ProtectedRoute requiredRole="project_manager">
                            <ChefProjetProfile />
                          </ProtectedRoute>
                        } 
                      />
                    </Route>

                    {/* Employee Routes */}
                    <Route path="/employee" element={<EmployeeLayout />}>
                      <Route 
                        index 
                        element={
                          <ProtectedRoute requiredRole="employee">
                            <EmployeeDashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="tasks" 
                        element={
                          <ProtectedRoute requiredRole="employee">
                            <EmployeeTasks />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="projects" 
                        element={
                          <ProtectedRoute requiredRole="employee">
                            <EmployeeProjects />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="kanban" 
                        element={
                          <ProtectedRoute requiredRole="employee">
                            <EmployeeKanban />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="profile" 
                        element={
                          <ProtectedRoute requiredRole="employee">
                            <EmployeeProfile />
                          </ProtectedRoute>
                        } 
                      />
                    </Route>
                  </Routes>
                </Router>
              </ClientProjectProvider>
            </TeamProvider>
          </ComplaintProvider>
        </EmployeeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
