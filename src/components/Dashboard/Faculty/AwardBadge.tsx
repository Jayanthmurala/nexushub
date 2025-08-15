
import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Search, 
  Users,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

interface AwardBadgeProps {
  onClose: () => void;
  studentId?: string;
  studentName?: string;
  projectId?: string;
}

export default function AwardBadge({ onClose, studentId, studentName, projectId }: AwardBadgeProps) {
  const { user } = useAuth();
  const { badges, awardBadge } = useData();
  const [selectedStudent, setSelectedStudent] = useState(studentId || '');
  const [selectedStudentName, setSelectedStudentName] = useState(studentName || '');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [reason, setReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample students for selection (in real app, this would come from API)
  const sampleStudents = [
    { id: '1', name: 'Alex Johnson', department: 'Computer Science', year: 3 },
    { id: '2', name: 'Maria Garcia', department: 'Computer Science', year: 2 },
    { id: '3', name: 'David Chen', department: 'Computer Science', year: 4 },
    { id: '4', name: 'Sarah Kim', department: 'Electronics', year: 3 }
  ];

  const filteredBadges = badges.filter(badge =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !selectedBadge || !reason.trim()) return;

    setIsSubmitting(true);
    try {
      awardBadge(
        selectedStudent,
        selectedBadge,
        reason.trim(),
        user?.id || '',
        user?.name || '',
        projectId
      );
      onClose();
    } catch (error) {
      console.error('Error awarding badge:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="w-6 h-6 mr-3" />
              <h2 className="text-xl font-bold">Award Badge</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-purple-100 mt-2">
            Recognize student achievements with badges
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Selection */}
            {!studentId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student *
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    const student = sampleStudents.find(s => s.id === e.target.value);
                    setSelectedStudentName(student?.name || '');
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose a student...</option>
                  {sampleStudents.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.department} (Year {student.year})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Badge Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Badges
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search badges by name or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Badge Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Badge *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {filteredBadges.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedBadge === badge.id
                        ? 'border-blue-500 bg-blue-50'
                        : `${getRarityColor(badge.rarity)} hover:border-blue-300`
                    }`}
                    onClick={() => setSelectedBadge(badge.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`text-2xl p-2 rounded-lg ${badge.color} text-white`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            badge.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                            badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                            badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {badge.rarity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                        <p className="text-xs text-gray-500">
                          <strong>Criteria:</strong> {badge.criteria}
                        </p>
                      </div>
                      {selectedBadge === badge.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Award *
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe why this student deserves this badge..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedStudent || !selectedBadge || !reason.trim() || isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Awarding...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Award Badge
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
