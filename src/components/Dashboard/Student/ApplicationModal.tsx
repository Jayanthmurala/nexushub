
import React, { useState } from 'react';
import { X, Send, User, FileText, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface ApplicationModalProps {
  project: {
    id: string;
    title: string;
    facultyName: string;
    department: string;
    skills: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectId: string, motivation: string, skills: string) => void;
}

export default function ApplicationModal({ project, isOpen, onClose, onSubmit }: ApplicationModalProps) {
  const { user } = useAuth();
  const [motivation, setMotivation] = useState('');
  const [skills, setSkills] = useState('');
  const [errors, setErrors] = useState<{ motivation?: string; skills?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { motivation?: string; skills?: string } = {};

    if (!motivation.trim() || motivation.trim().length < 50) {
      newErrors.motivation = 'Please provide at least 50 characters explaining your interest';
    }

    if (!skills.trim() || skills.trim().length < 30) {
      newErrors.skills = 'Please describe your relevant skills and experience (minimum 30 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      onSubmit(project.id, motivation, skills);
      setMotivation('');
      setSkills('');
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Apply for Project</h2>
              <div className="space-y-1 text-blue-100">
                <h3 className="text-lg font-medium text-white">{project.title}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {project.facultyName}
                  </span>
                  <span>{project.department}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Info Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Applicant Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{user?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Department:</span>
                <span className="ml-2 font-medium">{user?.department}</span>
              </div>
              {user?.year && (
                <div>
                  <span className="text-gray-600">Year:</span>
                  <span className="ml-2 font-medium">Year {user.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Required Skills Display */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Required Skills for this Project</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Why are you interested in this project? *
            </label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Explain your motivation and what you hope to learn from this project. Be specific about how this aligns with your academic goals and interests."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.motivation ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.motivation && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.motivation}
                </div>
              )}
              <div className="text-xs text-gray-500 ml-auto">
                {motivation.length}/200+ characters
              </div>
            </div>
          </div>

          {/* Skills and Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Relevant Skills & Experience *
            </label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Describe your relevant skills, projects, coursework, and experience. How do they align with the project requirements? Include any programming languages, tools, or technologies you've worked with."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.skills ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.skills && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.skills}
                </div>
              )}
              <div className="text-xs text-gray-500 ml-auto">
                {skills.length}/100+ characters
              </div>
            </div>
          </div>

          {/* Additional Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <strong>Note:</strong> Your application will be reviewed by the faculty member. Make sure to highlight how your background aligns with the project requirements. You'll be notified of the application status via email.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
