import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  Edit3, 
  Save, 
  X,
  Award,
  BookOpen,
  Star,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin,
  Plus,
  ExternalLink,
  Image as ImageIcon,
  Code,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import BadgeDisplay from './BadgeDisplay';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  githubLink?: string;
  demoLink?: string;
  imageUrl?: string;
  createdAt: Date;
}

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { projects: allProjects, applications } = useData(); // Renamed to avoid conflict with local projects state
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

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce React App',
      description: 'A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
      githubLink: 'https://github.com/student/ecommerce-app',
      demoLink: 'https://ecommerce-demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Machine Learning Image Classifier',
      description: 'A Python-based image classification system using TensorFlow and Keras. Trained on custom dataset with 95% accuracy for recognizing different types of vehicles.',
      skills: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      githubLink: 'https://github.com/student/ml-classifier',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      createdAt: new Date('2024-02-10')
    }
  ]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    skills: [],
    githubLink: '',
    demoLink: '',
    imageUrl: ''
  });

  const myApplications = applications.filter(app => app.studentId === user?.id);
  const acceptedApplications = myApplications.filter(app => app.status === 'accepted');
  const myProjects = allProjects.filter(p => p.facultyId === user?.id);

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      skills: formData.skills
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
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
    setIsEditing(false);
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title!,
        description: newProject.description!,
        skills: newProject.skills || [],
        githubLink: newProject.githubLink,
        demoLink: newProject.demoLink,
        imageUrl: newProject.imageUrl,
        createdAt: new Date()
      };

      setProjects([...projects, project]);
      setNewProject({
        title: '',
        description: '',
        skills: [],
        githubLink: '',
        demoLink: '',
        imageUrl: ''
      });
      setShowAddProject(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !newProject.skills?.includes(skill.trim())) {
      setNewProject({
        ...newProject,
        skills: [...(newProject.skills || []), skill.trim()]
      });
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setNewProject({
      ...newProject,
      skills: newProject.skills?.filter(skill => skill !== skillToRemove) || []
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleNewProjectSkillAdd = () => {
    const skillInput = document.getElementById('new-project-skill') as HTMLInputElement;
    const skill = skillInput.value.trim();
    if (skill && !newProject.skills?.includes(skill)) {
      setNewProject(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
      skillInput.value = '';
    }
  };

  const handleNewProjectSkillRemove = (skillToRemove: string) => {
    setNewProject(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
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
            {isEditing ? (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a new skill"
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
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
            )}
          </div>

          {/* Projects Showcase */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Projects Showcase</h3>
              {isEditing && (
                <button onClick={() => setShowAddProject(true)} className="text-blue-600 hover:text-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-1" /> Add Project
                </button>
              )}
            </div>

            {projects.length === 0 && !showAddProject && (
              <p className="text-gray-500">No projects added yet.</p>
            )}

            {projects.map((project) => (
              <div key={project.id} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-semibold text-gray-900">{project.title}</h4>
                  {isEditing && (
                    <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">{skill}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                      <Github className="w-4 h-4 mr-1" /> GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" /> Demo
                    </a>
                  )}
                  {project.imageUrl && (
                    <a href={project.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                      <ImageIcon className="w-4 h-4 mr-1" /> Image
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Add Project Modal */}
            {showAddProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Add New Project</h3>
                    <button onClick={() => setShowAddProject(false)} className="text-gray-500 hover:text-gray-700">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newProject.title}
                        onChange={handleNewProjectInputChange}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleNewProjectInputChange}
                        rows={4}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Describe your project"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills Used</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {newProject.skills?.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                            {skill}
                            <button onClick={() => handleNewProjectSkillRemove(skill)} className="ml-2 text-blue-600 hover:text-blue-800">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          id="new-project-skill"
                          type="text"
                          className="w-full py-2 px-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Add skill and press Enter or Add"
                          onKeyPress={(e) => e.key === 'Enter' && handleNewProjectSkillAdd()}
                        />
                        <button onClick={handleNewProjectSkillAdd} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Link</label>
                      <input
                        type="url"
                        name="githubLink"
                        value={newProject.githubLink}
                        onChange={handleNewProjectInputChange}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., https://github.com/yourusername/yourrepo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Demo Link</label>
                      <input
                        type="url"
                        name="demoLink"
                        value={newProject.demoLink}
                        onChange={handleNewProjectInputChange}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., https://yourprojectdemo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={newProject.imageUrl}
                        onChange={handleNewProjectInputChange}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="URL for a project image"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleAddProject}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mr-4"
                    >
                      Add Project
                    </button>
                    <button
                      onClick={() => setShowAddProject(false)}
                      className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
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
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="Website URL"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <Github className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="GitHub username"
                      className="flex-1 text-sm border-0 focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
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
        <div className="fixed bottom-6 right-6 z-10">
          <button
            onClick={handleCancel}
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