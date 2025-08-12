import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp,
  Clock,
  Award,
  Star,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { projects, applications, events } = useData();

  const myApplications = applications.filter(app => app.studentId === user?.id);
  const pendingApplications = myApplications.filter(app => app.status === 'pending');
  const acceptedApplications = myApplications.filter(app => app.status === 'accepted');

  const upcomingEvents = events.slice(0, 3);
  const recommendedProjects = projects.filter(p => p.status === 'open').slice(0, 3);

  const stats = [
    {
      name: 'Active Applications',
      value: pendingApplications.length,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+12%'
    },
    {
      name: 'Accepted Projects',
      value: acceptedApplications.length,
      icon: Award,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      name: 'Skills Gained',
      value: user?.skills?.length || 0,
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+23%'
    },
    {
      name: 'Network Score',
      value: '4.8',
      icon: Star,
      color: 'bg-purple-500',
      change: '+5%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-blue-100 mb-4">
              Ready to discover new opportunities and collaborate on exciting projects?
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {user?.department}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Year {user?.year}
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
                  <span className="text-gray-500 text-sm ml-1">vs last month</span>
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
                <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Browse Projects</div>
                  <div className="text-sm text-gray-500">Find your next collaboration</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Upcoming Events</div>
                  <div className="text-sm text-gray-500">Workshops & seminars</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Network</div>
                  <div className="text-sm text-gray-500">Connect with peers</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600" />
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
          
          {myApplications.length > 0 ? (
            <div className="space-y-3">
              {myApplications.slice(0, 3).map((application) => {
                const project = projects.find(p => p.id === application.projectId);
                if (!project) return null;

                return (
                  <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{project.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{project.facultyName}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No applications yet</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                Explore Projects
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Projects */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recommended Projects</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              See All
            </button>
          </div>
          
          <div className="space-y-4">
            {recommendedProjects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {project.department}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{project.skills.length - 2}
                      </span>
                    )}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                    Apply
                  </button>
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
            {upcomingEvents.map((event) => (
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
    </div>
  );
}