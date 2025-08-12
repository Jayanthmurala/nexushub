import React, { useState } from 'react';
import { GraduationCap, Users, BarChart3, Building2, Shield } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    {
      icon: Users,
      title: 'Collaborative Marketplace',
      description: 'Connect faculty and students for meaningful research projects and academic collaboration.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track progress, measure impact, and gain insights into campus innovation metrics.'
    },
    {
      icon: Building2,
      title: 'Department Management',
      description: 'Streamlined administrative tools for managing projects, users, and institutional resources.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with role-based access control and data protection.'
    }
  ];

  const roleDescriptions = [
    { role: 'Students', description: 'Discover projects, build portfolios, and connect with faculty mentors', color: 'bg-blue-500' },
    { role: 'Faculty', description: 'Post research projects, find talented collaborators, and manage teams', color: 'bg-green-500' },
    { role: 'Administrators', description: 'Oversee campus innovation, manage resources, and track outcomes', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <GraduationCap className="h-12 w-12 mr-4 text-blue-200" />
              <h1 className="text-4xl font-bold">Project Nexus</h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              The ultimate platform for campus collaboration, connecting ambitious minds 
              to drive innovation and academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                <feature.icon className="h-6 w-6 text-blue-200 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-blue-200 font-medium">Designed for:</p>
            {roleDescriptions.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="font-medium">{item.role}</span>
                <span className="text-blue-200">-</span>
                <span className="text-blue-100 text-sm">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Authentication Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-10 w-10 mr-3 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Project Nexus</h1>
            </div>
            <p className="text-gray-600">Campus collaboration platform</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Project Nexus'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account to continue' : 'Create your account to get started'}
            </p>
          </div>

          {/* Auth Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Student:</strong> alex@student.edu</div>
              <div><strong>Faculty:</strong> sarah@faculty.edu</div>
              <div><strong>Dept Admin:</strong> michael@admin.edu</div>
              <div><strong>Placements:</strong> lisa@placements.edu</div>
              <div><strong>Head Admin:</strong> robert@admin.edu</div>
              <div className="text-blue-700 mt-2"><em>Password: any text</em></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}