import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  Plus,
  MessageSquare,
  Award,
  Clock,
  CheckCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import AwardBadge from './AwardBadge';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const { projects, applications, events } = useData();
  const [showAwardBadge, setShowAwardBadge] = useState(false);

  const myProjects = projects.filter(p => p.facultyId === user?.id);
  const myApplications = applications.filter(app => 
    myProjects.some(project => project.id === app.projectId)
  );
  const pendingApplications = myApplications.filter(app => app.status === 'pending');

  const stats = [
    {
      name: 'Active Projects',
      value: myProjects.filter(p => p.status === 'open' || p.status === 'in_progress').length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      name: 'Total Collaborators',
      value: myProjects.reduce((sum, p) => sum + p.currentStudents, 0),
      icon: Users,
      color: 'bg-green-500',
      change: '+5 new students'
    },
    {
      name: 'Pending Applications',
      value: pendingApplications.length,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Needs review'
    },
    {
      name: 'Success Rate',
      value: '92%',
      icon: Award,
      color: 'bg-purple-500',
      change: '+3% improvement'
    }
  ];

  const recentProjects = myProjects.slice(0, 3);
  const recentApplications = myApplications.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-green-100 mb-4">
              Manage your research projects, review applications, and collaborate with talented students.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {user?.department}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Faculty Member
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Plus className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Create New Project</div>
                  <div className="text-sm text-gray-500">Post a research opportunity</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Review Applications</div>
                  <div className="text-sm text-gray-500">{pendingApplications.length} pending review</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Collaboration Hub</div>
                  <div className="text-sm text-gray-500">Manage active projects</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Create Event</div>
                  <div className="text-sm text-gray-500">Host workshops & seminars</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-600" />
            </button>

            <button 
              onClick={() => setShowAwardBadge(true)}
              className="w-full flex items-center justify-between p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Award Badge</div>
                  <div className="text-sm text-gray-500">Recognize student achievements</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-yellow-600" />
            </button>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          {recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.map((application) => {
                const project = projects.find(p => p.id === application.projectId);
                if (!project) return null;

                return (
                  <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{application.studentName}</div>
                      <div className="text-xs text-gray-500 mt-1">{project.title}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {application.status}
                      </span>
                      {application.status === 'pending' && (
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent applications</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                Create Project to Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Projects */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Projects</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    project.status === 'open' ? 'bg-green-100 text-green-800' :
                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{project.currentStudents}/{project.maxStudents} students</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-xs font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Calendar
            </button>
          </div>
          
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{event.title}</div>
                  <div className="text-xs text-gray-500">
                    {event.date.toLocaleDateString()} • {event.location}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  event.type === 'workshop' ? 'bg-green-100 text-green-800' :
                  event.type === 'seminar' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'competition' ? 'bg-orange-100 text-orange-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Award Badge Modal */}
      {showAwardBadge && (
        <AwardBadge
          onClose={() => setShowAwardBadge(false)}
        />
      )}
    </div>
  );
}