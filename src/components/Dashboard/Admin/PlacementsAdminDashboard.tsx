import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Briefcase,
  Download,
  Filter,
  Search,
  Star,
  ArrowRight,
  Building,
  GraduationCap,
  Target
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function PlacementsAdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Students',
      value: 1247,
      icon: Users,
      color: 'bg-blue-500',
      change: '+45 this semester',
      description: 'Across all departments'
    },
    {
      name: 'Placement Ready',
      value: 342,
      icon: GraduationCap,
      color: 'bg-green-500',
      change: '+18% from last year',
      description: 'Final year students'
    },
    {
      name: 'Industry Connections',
      value: 87,
      icon: Building,
      color: 'bg-purple-500',
      change: '+12 new partners',
      description: 'Partner companies'
    },
    {
      name: 'Success Rate',
      value: '94%',
      icon: Target,
      color: 'bg-orange-500',
      change: '+3% improvement',
      description: 'Placement success'
    }
  ];

  const topStudents = [
    {
      id: '1',
      name: 'Alex Chen',
      department: 'Computer Science',
      year: 3,
      gpa: 9.2,
      skills: ['React', 'Python', 'ML'],
      projects: 4,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Priya Sharma',
      department: 'Electronics',
      year: 4,
      gpa: 8.9,
      skills: ['IoT', 'Embedded Systems', 'C++'],
      projects: 3,
      rating: 4.8
    },
    {
      id: '3',
      name: 'David Kim',
      department: 'Computer Science',
      year: 4,
      gpa: 9.0,
      skills: ['Full Stack', 'DevOps', 'AWS'],
      projects: 5,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Maria Garcia',
      department: 'Biotechnology',
      year: 3,
      gpa: 8.7,
      skills: ['Research', 'Data Analysis', 'Python'],
      projects: 2,
      rating: 4.6
    }
  ];

  const upcomingDrives = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      date: new Date('2024-02-15'),
      positions: 15,
      package: '12-18 LPA',
      type: 'Full-time',
      requirements: ['CS', 'IT', 'Electronics']
    },
    {
      id: '2',
      company: 'InnovateLabs',
      date: new Date('2024-02-20'),
      positions: 8,
      package: '8-12 LPA',
      type: 'Internship',
      requirements: ['All Branches']
    },
    {
      id: '3',
      company: 'Global Systems Inc',
      date: new Date('2024-02-25'),
      positions: 25,
      package: '10-15 LPA',
      type: 'Full-time',
      requirements: ['CS', 'IT', 'Mechanical']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-orange-100 mb-4">
              Connect top talent with industry opportunities and drive successful career outcomes.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Placements & Career Services
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Administrator
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12" />
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
                <Search className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Search Students</div>
                  <div className="text-sm text-gray-500">Find candidates by skills & criteria</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Download className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Export Student Data</div>
                  <div className="text-sm text-gray-500">Generate CSV reports</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Schedule Drive</div>
                  <div className="text-sm text-gray-500">Add new placement drive</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Analytics Report</div>
                  <div className="text-sm text-gray-500">View placement statistics</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-600" />
            </button>
          </div>
        </div>

        {/* Upcoming Placement Drives */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Drives</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{drive.company}</h3>
                    <p className="text-sm text-gray-600">{drive.date.toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    drive.type === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {drive.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Positions:</span> {drive.positions}
                  </div>
                  <div>
                    <span className="font-medium">Package:</span> {drive.package}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {drive.requirements.map((req) => (
                    <span key={req} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Students */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Top Performing Students</h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topStudents.map((student) => (
              <div key={student.id} className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{student.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{student.name}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <div>{student.department}</div>
                  <div>Year {student.year} • GPA: {student.gpa}</div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {student.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {student.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{student.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{student.projects} projects</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}