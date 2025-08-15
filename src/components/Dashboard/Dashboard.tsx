import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import StudentDashboard from './Student/StudentDashboard';
import FacultyDashboard from './Faculty/FacultyDashboard';
import DeptAdminDashboard from './Admin/DeptAdminDashboard';
import PlacementsAdminDashboard from './Admin/PlacementsAdminDashboard';
import HeadAdminDashboard from './Admin/HeadAdminDashboard';
import ProjectMarketplace from './Student/ProjectMarketplace';
import ApplicationTracker from './Student/ApplicationTracker';
import EventCalendar from './Student/EventCalendar';
import FacultyProjects from './Faculty/FacultyProjects';
import ApplicationReview from './Faculty/ApplicationReview';
import CreateProject from './Faculty/CreateProject';
import CollaborationHub from './Faculty/CollaborationHub';
import Profile from './Profile';
// Assuming Feed, CreatePost, and PostCard components are in './Feed'
import Feed from './Feed/Feed'; 
// Assuming BadgeCenter component is in './BadgeCenter'
import BadgeCenter from './BadgeCenter';

export type ActiveView = 
  | 'dashboard' 
  | 'marketplace' 
  | 'applications' 
  | 'events' 
  | 'projects' 
  | 'review' 
  | 'create-project'
  | 'collaboration'
  | 'profile'
  | 'feed'
  | 'badges'
  | 'analytics'
  | 'admin-management';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return null;

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        switch (user.role) {
          case 'student':
            return <StudentDashboard />;
          case 'faculty':
            return <FacultyDashboard />;
          case 'dept_admin':
            return <DeptAdminDashboard />;
          case 'placements_admin':
            return <PlacementsAdminDashboard />;
          case 'head_admin':
            return <HeadAdminDashboard />;
        }
        break;
      case 'marketplace':
        return <ProjectMarketplace />;
      case 'applications':
        return <ApplicationTracker />;
      case 'events':
        return <EventCalendar />;
      case 'projects':
        return <FacultyProjects />;
      case 'review':
        return <ApplicationReview />;
      case 'create-project':
        return <CreateProject onComplete={() => setActiveView('projects')} />;
      case 'collaboration':
        return <CollaborationHub />;
      case 'profile':
        return <Profile />;
      case 'feed': // Added case for feed
        return <Feed />;
      case 'badges': // Added case for badges
        return <BadgeCenter />;
      case 'analytics':
        return <HeadAdminDashboard />;
      case 'admin-management':
        return <div className="p-6"><h1 className="text-2xl font-bold">Admin Management</h1><p className="text-gray-600 mt-2">Manage system administrators and permissions.</p></div>;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}