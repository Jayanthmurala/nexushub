import React from 'react';
import { Clock, CheckCircle, XCircle, Calendar, User, FileText, MessageSquare } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

export default function ApplicationTracker() {
  const { user } = useAuth();
  const { applications, projects } = useData();

  const myApplications = applications.filter(app => app.studentId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = [
    {
      name: 'Total Applications',
      value: myApplications.length,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Pending Review',
      value: myApplications.filter(app => app.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      name: 'Accepted',
      value: myApplications.filter(app => app.status === 'accepted').length,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      name: 'Under Review',
      value: myApplications.filter(app => app.status === 'rejected').length,
      icon: MessageSquare,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
        <p className="text-gray-600 mt-1">Monitor the status of all your project applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Applications</h2>
          <p className="text-gray-600 text-sm mt-1">Track the progress of your project applications</p>
        </div>

        {myApplications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {myApplications.map((application) => {
              const project = projects.find(p => p.id === application.projectId);
              if (!project) return null;

              return (
                <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {project.title}
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <User className="w-4 h-4 mr-1" />
                            <span className="font-medium">{project.facultyName}</span>
                            <span className="mx-2">•</span>
                            <span>{project.department}</span>
                          </div>
                          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                            {project.description}
                          </p>
                          
                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.skills.slice(0, 3).map((skill: string) => (
                              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                                {skill}
                              </span>
                            ))}
                            {project.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                +{project.skills.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Applied on {new Date(application.appliedAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center justify-end mb-2">
                            {getStatusIcon(application.status)}
                            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                          
                          {application.status === 'accepted' && (
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Join Project
                            </button>
                          )}
                          
                          {application.status === 'pending' && (
                            <div className="text-sm text-gray-500">
                              Review in progress
                            </div>
                          )}
                          
                          {application.status === 'rejected' && (
                            <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                              View Feedback
                            </button>
                          )}
                        </div>
                      </div>

                      {application.message && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">Your Application Message</h4>
                          <p className="text-gray-700 text-sm">{application.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring the project marketplace to find opportunities that match your interests and skills.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Browse Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}