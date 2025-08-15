import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Plus,
  Award,
  BookOpen,
  Star,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import BadgeDisplay from './BadgeDisplay';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { projects, applications } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    phone: '',
    location: '',
    website: '',
    github: '',
    linkedin: ''
  });
  const [newSkill, setNewSkill] = useState('');

  const myApplications = applications.filter(app => app.studentId === user?.id);
  const acceptedApplications = myApplications.filter(app => app.status === 'accepted');
  const myProjects = projects.filter(p => p.facultyId === user?.id);

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      skills: formData.skills
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const stats = user?.role === 'student' ? [
    {
      name: 'Applications Sent',
      value: myApplications.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Projects Joined',
      value: acceptedApplications.length,
      icon: Award,
      color: 'bg-green-500'
    },
    {
      name: 'Skills Listed',
      value: user?.skills?.length || 0,
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      name: 'Profile Views',
      value: 47,
      icon: User,
      color: 'bg-orange-500'
    }
  ] : [
    {
      name: 'Projects Created',
      value: myProjects.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Applications',
      value: applications.filter(app => myProjects.some(p => p.id === app.projectId)).length,
      icon: User,
      color: 'bg-green-500'
    },
    {
      name: 'Active Students',
      value: myProjects.reduce((sum, p) => sum + p.currentStudents, 0),
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      name: 'Success Rate',
      value: '92%',
      icon: Star,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your profile information and showcase your achievements</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            isEditing 
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5 mr-2" />
              Edit Profile
            </>
          )}
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
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center py-3 px-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user?.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center py-3 px-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <div className="flex items-center py-3 px-4 bg-gray-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user?.department}</span>
                </div>
              </div>

              {user?.year && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                  <div className="flex items-center py-3 px-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">Year {user.year}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="py-3 px-4 bg-gray-50 rounded-lg min-h-[100px]">
                    <span className="text-gray-900">
                      {user?.bio || 'No bio added yet. Click edit to add your bio.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              )) || (
                <p className="text-gray-500">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Badges Section */}
          {user?.role === 'student' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <BadgeDisplay studentId={user.id} showDetails={true} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-2xl">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-gray-600 text-sm capitalize">{user?.role?.replace('_', ' ')}</p>
            <p className="text-gray-500 text-sm mt-1">{user?.department}</p>

            {isEditing && (
              <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                Change Photo
              </button>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">{user?.email}</span>
              </div>

              {isEditing ? (
                <>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span className="text-sm">{formData.phone || 'Add phone number'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span className="text-sm">{formData.location || 'Add location'}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Social Links</h3>
            <div className="space-y-3">
              {isEditing ? (
                <>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="Website URL"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <Github className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="GitHub username"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="LinkedIn profile"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-3" />
                    <span className="text-sm">{formData.website || 'Add website'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Github className="w-4 h-4 mr-3" />
                    <span className="text-sm">{formData.github || 'Add GitHub'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Linkedin className="w-4 h-4 mr-3" />
                    <span className="text-sm">{formData.linkedin || 'Add LinkedIn'}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-2">
                Change Password
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-2">
                Privacy Settings
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-2">
                Notification Preferences
              </button>
              <button className="w-full text-left text-sm text-red-600 hover:text-red-700 py-2">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button for Edit Mode */}
      {isEditing && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => {
              setIsEditing(false);
              setFormData({
                name: user?.name || '',
                email: user?.email || '',
                bio: user?.bio || '',
                skills: user?.skills || [],
                phone: '',
                location: '',
                website: '',
                github: '',
                linkedin: ''
              });
            }}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}