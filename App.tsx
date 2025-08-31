
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { UserRole } from './types';
import StudySession from './pages/student/StudySession';

const PrivateRoute: React.FC<{ roles: UserRole[]; children: React.ReactElement }> = ({ roles, children }) => {
  const { user } = useAuth();
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <LoginPage /> : <Navigate to={`/${user.role.toLowerCase()}`} />} />
      <Route path="/student" element={<PrivateRoute roles={[UserRole.STUDENT]}><StudentDashboard /></PrivateRoute>} />
      <Route path="/student/study/:id" element={<PrivateRoute roles={[UserRole.STUDENT]}><StudySession /></PrivateRoute>} />
      <Route path="/teacher" element={<PrivateRoute roles={[UserRole.TEACHER]}><TeacherDashboard /></PrivateRoute>} />
      <Route path="/parent" element={<PrivateRoute roles={[UserRole.PARENT]}><ParentDashboard /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute roles={[UserRole.ADMIN]}><AdminDashboard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <AppRoutes />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
