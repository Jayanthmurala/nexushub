import React from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp,
  Award,
  Target,
  Building,
  ArrowUp,
  ArrowDown,
  Settings,
  Shield,
  Globe,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

export default function HeadAdminDashboard() {
  const { user } = useAuth();
  const { projects, applications, events } = useData();

  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up',
      description: 'Across all departments'
    },
    {
      name: 'Active Students',
      value: '2,847',
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up',
      description: 'Enrolled students'
    },
    {
      name: 'Faculty Engagement',
      value: '89%',
      icon: Award,
      color: 'bg-purple-500',
      change: '+5%',
      trend: 'up',
      description: 'Platform adoption'
    },
    {
      name: 'Success Rate',
      value: '94%',
      icon: Target,
      color: 'bg-orange-500',
      change: '-2%',
      trend: 'down',
      description: 'Project completion'
    }
  ];

  const departmentStats = [
    {
      name: 'Computer Science',
      projects: 15,
      students: 245,
      engagement: 92,
      color: 'bg-blue-500'
    },
    {
      name: 'Electronics',
      projects: 8,
      students: 180,
      engagement: 87,
      color: 'bg-green-500'
    },
    {
      name: 'Mechanical',
      projects: 6,
      students: 165,
      engagement: 78,
      color: 'bg-purple-500'
    },
    {
      name: 'Civil',
      projects: 4,
      students: 140,
      engagement: 74,
      color: 'bg-orange-500'
    },
    {
      name: 'Electrical',
      projects: 5,
      students: 155,
      engagement: 81,
      color: 'bg-red-500'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'project_created',
      title: 'New AI Research Project Created',
      description: 'Dr. Sarah Wilson created a new machine learning project',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'user_registered',
      title: 'New Faculty Member Joined',
      description: 'Prof. Michael Chen joined the Computer Science department',
      time: '4 hours ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'event_scheduled',
      title: 'Innovation Challenge 2024 Scheduled',
      description: 'Annual innovation competition scheduled for March 1st',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'milestone',
      title: '1000+ Applications Milestone',
      description: 'Platform reached 1000+ student applications',
      time: '2 days ago',
      icon: Award,
      color: 'text-orange-600'
    }
  ];

  const systemHealth = [
    {
      metric: 'System Uptime',
      value: '99.9%',
      status: 'excellent',
      color: 'text-green-600'
    },
    {
      metric: 'Response Time',
      value: '245ms',
      status: 'good',
      color: 'text-blue-600'
    },
    {
      metric: 'Storage Usage',
      value: '67%',
      status: 'warning',
      color: 'text-yellow-600'
    },
    {
      metric: 'Active Sessions',
      value: '1,247',
      status: 'excellent',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Executive Dashboard
            </h1>
            <p className="text-indigo-100 mb-4">
              Welcome back, {user?.name}. Here's your institution's innovation overview.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Chief Administrator
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                System Oversight
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium flex items-center ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Department Performance</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Details
            </button>
          </div>

          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{dept.engagement}% engagement</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Projects</div>
                    <div className="font-semibold text-gray-900">{dept.projects}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Students</div>
                    <div className="font-semibold text-gray-900">{dept.students}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Avg. Rating</div>
                    <div className="font-semibold text-gray-900">4.{Math.floor(dept.engagement/10)}</div>
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${dept.color}`}
                      style={{ width: `${dept.engagement}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">System Health</h2>
            <Settings className="w-5 h-5 text-gray-500" />
          </div>

          <div className="space-y-4">
            {systemHealth.map((item) => (
              <div key={item.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{item.metric}</div>
                  <div className={`text-xs ${item.color}`}>{item.status}</div>
                </div>
                <div className={`font-bold ${item.color}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">All Systems Operational</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">Last updated: 2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{activity.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{activity.description}</div>
                  <div className="text-gray-500 text-xs mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Growth */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Growth</h2>
          
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">2,847</div>
              <div className="text-gray-600">Total Active Users</div>
              <div className="flex items-center justify-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+15.3% this month</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{applications.length}</div>
                <div className="text-gray-600 text-sm">Applications</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                <div className="text-gray-600 text-sm">Events</div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-orange-900">Innovation Index</span>
                <span className="font-bold text-orange-600">8.7/10</span>
              </div>
              <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}