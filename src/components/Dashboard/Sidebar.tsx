import React from 'react';
import { 
  Home, 
  Search, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  BookOpen,
  MessageSquare,
  Plus,
  Eye,
  BarChart3,
  Shield,
  User,
  Rss,
  Menu,
  GraduationCap,
  X,
  FolderOpen,
  Award,
  Database
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ActiveView } from './Dashboard';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ activeView, setActiveView, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: Home },
      { id: 'profile' as ActiveView, label: 'Profile', icon: User }
    ];

    switch (user?.role) {
      case 'student':
        return [
          { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: Home },
          { id: 'feed', label: 'Feed', icon: Rss },
          { id: 'marketplace' as ActiveView, label: 'Project Marketplace', icon: Search },
          { id: 'applications' as ActiveView, label: 'My Applications', icon: FileText },
          { id: 'events' as ActiveView, label: 'Events', icon: Calendar },
          { id: 'badges' as ActiveView, label: 'Badge Center', icon: Award },
          { id: 'profile' as ActiveView, label: 'Profile', icon: User }
        ];

      case 'faculty':
        return [
          { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: Home },
          { id: 'feed', label: 'Feed', icon: Rss },
          { id: 'projects' as ActiveView, label: 'My Projects', icon: FolderOpen },
          { id: 'create-project' as ActiveView, label: 'Create Project', icon: Plus },
          { id: 'review' as ActiveView, label: 'Review Applications', icon: Users },
          { id: 'collaboration' as ActiveView, label: 'Collaboration Hub', icon: MessageSquare },
          { id: 'badges' as ActiveView, label: 'Badge Center', icon: Award },
          { id: 'events' as ActiveView, label: 'Events', icon: Calendar },
          { id: 'profile' as ActiveView, label: 'Profile', icon: User }
        ];

      case 'dept_admin':
        return [
          ...baseItems.slice(0, 1),
          { id: 'projects' as ActiveView, label: 'Department Projects', icon: FolderOpen },
          { id: 'applications' as ActiveView, label: 'Manage Students', icon: Users },
          { id: 'events' as ActiveView, label: 'Events', icon: Calendar },
          ...baseItems.slice(1)
        ];

      case 'placements_admin':
        return [
          ...baseItems.slice(0, 1),
          { id: 'applications' as ActiveView, label: 'Student Database', icon: Users },
          { id: 'events' as ActiveView, label: 'Events', icon: Calendar },
          ...baseItems.slice(1)
        ];

      case 'head_admin':
        return [
          ...baseItems.slice(0, 1),
          { id: 'analytics' as ActiveView, label: 'Analytics', icon: BarChart3 },
          { id: 'projects' as ActiveView, label: 'All Projects', icon: FolderOpen },
          { id: 'events' as ActiveView, label: 'Events', icon: Calendar },
          { id: 'admin-management' as ActiveView, label: 'Admin Management', icon: Settings },
          ...baseItems.slice(1)
        ];

      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Project Nexus</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg border border-gray-200"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0
        w-80 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}