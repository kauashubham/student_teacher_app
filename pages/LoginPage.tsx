
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { User, Briefcase, Shield, Home } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (role: UserRole) => {
    login(role);
  };

  const roleConfig = [
    { role: UserRole.STUDENT, label: 'Student Login', icon: <User className="h-8 w-8 mb-2" /> },
    { role: UserRole.TEACHER, label: 'Teacher Login', icon: <Briefcase className="h-8 w-8 mb-2" /> },
    { role: UserRole.PARENT, label: 'Parent Login', icon: <Home className="h-8 w-8 mb-2" /> },
    { role: UserRole.ADMIN, label: 'Administrator Login', icon: <Shield className="h-8 w-8 mb-2" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">EDUVYN</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">Your AI-Powered Learning Partner</p>
      </div>
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">Select Your Role to Login</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleConfig.map(({ role, label, icon }) => (
            <button
              key={role}
              onClick={() => handleLogin(role)}
              className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-indigo-500 dark:text-indigo-300">{icon}</div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-200">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} EDUVYN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
