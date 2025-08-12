import React, { useState } from 'react';
import { Save, X, Plus, Minus, Calendar, Users, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

interface CreateProjectProps {
  onComplete: () => void;
}

export default function CreateProject({ onComplete }: CreateProjectProps) {
  const { user } = useAuth();
  const { addProject } = useData();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: user?.department || '',
    skills: [''],
    duration: '',
    maxStudents: 2,
    deadline: '',
    tags: [''],
    requirements: [''],
    outcomes: ['']
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const departments = [
    'Computer Science', 'Electronics', 'Mechanical', 'Civil', 
    'Electrical', 'Chemical', 'Biotechnology', 'Mathematics', 'Physics', 'Chemistry'
  ];

  const durationOptions = [
    '1 month', '2 months', '3 months', '4 months', '5 months', '6 months',
    '1 semester', '2 semesters', '1 year', 'Flexible'
  ];

  const commonSkills = [
    'React', 'Python', 'JavaScript', 'Machine Learning', 'Data Analysis',
    'Node.js', 'Java', 'C++', 'Database Design', 'API Development',
    'UI/UX Design', 'Mobile Development', 'Cloud Computing', 'DevOps'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxStudents' ? parseInt(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Project description is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (formData.maxStudents < 1) newErrors.maxStudents = 'At least 1 student position is required';
    
    // Validate arrays have at least one non-empty item
    if (formData.skills.every(skill => !skill.trim())) {
      newErrors.skills = 'At least one skill is required';
    }
    if (formData.requirements.every(req => !req.trim())) {
      newErrors.requirements = 'At least one requirement is required';
    }
    if (formData.outcomes.every(outcome => !outcome.trim())) {
      newErrors.outcomes = 'At least one expected outcome is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        facultyId: user!.id,
        facultyName: user!.name,
        department: formData.department,
        skills: formData.skills.filter(skill => skill.trim()),
        duration: formData.duration,
        status: 'open' as const,
        maxStudents: formData.maxStudents,
        currentStudents: 0,
        deadline: formData.deadline ? new Date(formData.deadline) : undefined,
        tags: formData.tags.filter(tag => tag.trim()),
        requirements: formData.requirements.filter(req => req.trim()),
        outcomes: formData.outcomes.filter(outcome => outcome.trim())
      };

      addProject(projectData);
      onComplete();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const ArrayInput = ({ 
    label, 
    field, 
    placeholder, 
    suggestions = [] 
  }: { 
    label: string; 
    field: keyof typeof formData; 
    placeholder: string; 
    suggestions?: string[];
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {(formData[field] as string[]).map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              placeholder={placeholder}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-lg shadow-lg hidden group-hover:block">
                {suggestions.filter(s => s.toLowerCase().includes(item.toLowerCase())).slice(0, 5).map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleArrayChange(field, index, suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          {(formData[field] as string[]).length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Minus className="w-4 h-4" />
            </button>
          )}
          {index === (formData[field] as string[]).length - 1 && (
            <button
              type="button"
              onClick={() => addArrayItem(field)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600 mt-1">Post a research opportunity for students to collaborate</p>
        </div>
        <button
          onClick={onComplete}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Basic Information
            </h2>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a clear, descriptive project title"
                className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Provide a detailed description of the project, its objectives, methodology, and scope"
                className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.department ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.duration ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
                {errors.duration && <p className="text-red-600 text-sm mt-1">{errors.duration}</p>}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Project Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Students *
                </label>
                <input
                  id="maxStudents"
                  name="maxStudents"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.maxStudents ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.maxStudents && <p className="text-red-600 text-sm mt-1">{errors.maxStudents}</p>}
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <ArrayInput
              label="Required Skills *"
              field="skills"
              placeholder="e.g., React, Python, Machine Learning"
              suggestions={commonSkills}
            />

            <ArrayInput
              label="Project Tags"
              field="tags"
              placeholder="e.g., AI, Research, Innovation"
            />
          </div>

          {/* Requirements and Outcomes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Requirements & Outcomes
            </h2>

            <ArrayInput
              label="Requirements *"
              field="requirements"
              placeholder="e.g., Strong Python programming skills"
            />

            <ArrayInput
              label="Expected Outcomes *"
              field="outcomes"
              placeholder="e.g., Research paper publication"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex items-center justify-between">
          <div className="text-sm text-gray-500">
            * Required fields
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onComplete}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Create Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}