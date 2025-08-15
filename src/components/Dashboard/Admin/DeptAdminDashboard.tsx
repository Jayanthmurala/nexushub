import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  Award,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import CreateEvent from '../Faculty/CreateEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

export default function DeptAdminDashboard() {
  const { user } = useAuth();
  const { projects, applications, events } = useData();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const departmentProjects = projects.filter(p => p.department === user?.department);
  const departmentApplications = applications.filter(app => 
    departmentProjects.some(project => project.id === app.projectId)
  );

  const stats = [
    {
      name: 'Department Projects',
      value: departmentProjects.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+3 this month',
      description: 'Active and completed'
    },
    {
      name: 'Faculty Members',
      value: 8,
      icon: Users,
      color: 'bg-green-500',
      change: '+1 new hire',
      description: 'In department'
    },
    {
      name: 'Student Applications',
      value: departmentApplications.length,
      icon: FileCheck,
      color: 'bg-purple-500',
      change: '+12 this week',
      description: 'Total applications'
    },
    {
      name: 'Success Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5% improvement',
      description: 'Project completion'
    }
  ];

  const recentProjects = departmentProjects.slice(0, 4);
  const pendingApprovals = departmentProjects.filter(p => p.status === 'open').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-purple-100 mb-4">
              Manage department resources, oversee projects, and ensure quality standards.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {user?.department} Department
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Administrator
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12" />
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
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
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
                <FileCheck className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Approve Projects</div>
                  <div className="text-sm text-gray-500">3 projects pending approval</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <UserCheck className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Manage Students</div>
                  <div className="text-sm text-gray-500">View student profiles & activity</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Department Analytics</div>
                  <div className="text-sm text-gray-500">View performance metrics</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Faculty Management</div>
                  <div className="text-sm text-gray-500">Oversee faculty projects</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-600" />
            </button>

            {user?.role === 'FACULTY' || user?.role === 'ADMIN' ? (
              <button
                onClick={() => setShowCreateEvent(true)}
                className="w-full flex items-center justify-between p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center">
                  <Plus className="w-5 h-5 text-cyan-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Create New Event</div>
                    <div className="text-sm text-gray-500">Add a new event for students</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-cyan-600" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>

          {pendingApprovals.length > 0 ? (
            <div className="space-y-3">
              {pendingApprovals.map((project) => (
                <div key={project.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{project.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>by {project.facultyName}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                        Reject
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1 rounded">
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-500">All projects approved!</p>
              <p className="text-sm text-gray-400 mt-1">No pending approvals at this time</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Department Projects */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Department Projects</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
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
                  <div className="text-xs text-gray-500">
                    by {project.facultyName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Department Performance</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Detailed Report
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Project Success Rate</div>
                  <div className="text-xs text-gray-500">Last quarter performance</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">87%</div>
                <div className="text-xs text-green-500">+5%</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Student Engagement</div>
                  <div className="text-xs text-gray-500">Average applications per project</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">4.2</div>
                <div className="text-xs text-blue-500">+12%</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Faculty Participation</div>
                  <div className="text-xs text-gray-500">Active faculty members</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-purple-600">75%</div>
                <div className="text-xs text-purple-500">+8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCreateEvent && (
        <CreateEvent onClose={() => setShowCreateEvent(false)} />
      )}
    </div>
  );
}