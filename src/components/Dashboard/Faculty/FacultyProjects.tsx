import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  Users, 
  Calendar, 
  Clock,
  BookOpen,
  Filter,
  Search,
  MoreVertical,
  X
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';
import CreateProject from './CreateProject';

export default function FacultyProjects() {
  const { user } = useAuth();
  const { projects, applications } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myProjects = projects.filter(p => p.facultyId === user?.id);
  const filteredProjects = myProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProjectApplications = (projectId: string) => {
    return applications.filter(app => app.projectId === projectId);
  };

  const stats = [
    {
      name: 'Total Projects',
      value: myProjects.length,
      description: 'All time projects',
      color: 'bg-blue-500'
    },
    {
      name: 'Active Projects',
      value: myProjects.filter(p => p.status === 'open' || p.status === 'in_progress').length,
      description: 'Currently running',
      color: 'bg-green-500'
    },
    {
      name: 'Total Applications',
      value: applications.filter(app => myProjects.some(p => p.id === app.projectId)).length,
      description: 'From students',
      color: 'bg-purple-500'
    },
    {
      name: 'Active Collaborators',
      value: myProjects.reduce((sum, p) => sum + p.currentStudents, 0),
      description: 'Working with you',
      color: 'bg-orange-500'
    }
  ];

  const ProjectCard = ({ project }: { project: any }) => {
    const projectApplications = getProjectApplications(project.id);
    const pendingApplications = projectApplications.filter(app => app.status === 'pending').length;

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <div className="flex items-center space-x-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {project.department}
                </span>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowDropdown(showDropdown === project.id ? null : project.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              
              {showDropdown === project.id && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-gray-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-gray-700">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Project
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Project
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.slice(0, 4).map((skill: string) => (
              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                {skill}
              </span>
            ))}
            {project.skills.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                +{project.skills.length - 4} more
              </span>
            )}
          </div>

          {/* Project Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500">Team</div>
              <div className="text-sm font-semibold text-gray-900">
                {project.currentStudents}/{project.maxStudents}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500">Duration</div>
              <div className="text-sm font-semibold text-gray-900">{project.duration}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <BookOpen className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500">Applications</div>
              <div className="text-sm font-semibold text-gray-900">{projectApplications.length}</div>
            </div>
          </div>

          {/* Alerts */}
          {pendingApplications > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800 font-medium">
                  {pendingApplications} application{pendingApplications !== 1 ? 's' : ''} pending review
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Created {new Date(project.createdAt).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors">
                View Analytics
              </button>
              {pendingApplications > 0 && (
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors">
                  Review Applications
                </button>
              )}
              {project.currentStudents > 0 && (
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg transition-colors">
                  Collaboration Hub
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600 mt-1">Manage your research projects and collaborations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          {myProjects.length === 0 ? (
            <>
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">Create your first research project to start collaborating with students</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center mx-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </button>
            </>
          ) : (
            <>
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </>
          )}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" key="create-project-modal">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setShowCreateModal(false)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">Create New Project</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <CreateProject onComplete={() => setShowCreateModal(false)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}