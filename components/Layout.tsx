
import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Home, User, BookOpen, Users, Settings, LogOut, BarChart2 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const navItems = {
  [UserRole.STUDENT]: [
    { name: 'Dashboard', path: '/student', icon: Home },
  ],
  [UserRole.TEACHER]: [
    { name: 'Dashboard', path: '/teacher', icon: Home },
  ],
  [UserRole.PARENT]: [
    { name: 'Dashboard', path: '/parent', icon: Home },
  ],
  [UserRole.ADMIN]: [
    { name: 'Dashboard', path: '/admin', icon: Home },
  ],
};

const Sidebar: React.FC = () => {
    const { user } = useAuth();

    if (!user) return null;

    const items = navItems[user.role];

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 shadow-md hidden md:block">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">EDUVYN</h1>
            </div>
            <nav className="mt-6">
                {items.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            isActive ? 'bg-gray-200 dark:bg-gray-700 border-r-4 border-indigo-500 font-semibold' : ''
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

const Header: React.FC<{ title: string }> = ({ title }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    <LogOut className="h-5 w-5 mr-2" /> Logout
                </button>
            </div>
        </header>
    );
};


const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
