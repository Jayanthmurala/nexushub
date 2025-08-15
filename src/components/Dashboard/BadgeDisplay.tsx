
import React from 'react';
import { Award, Calendar, User } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface BadgeDisplayProps {
  studentId: string;
  showDetails?: boolean;
  limit?: number;
}

export default function BadgeDisplay({ studentId, showDetails = false, limit }: BadgeDisplayProps) {
  const { badges, studentBadges } = useData();

  const userBadges = studentBadges
    .filter(sb => sb.studentId === studentId)
    .sort((a, b) => new Date(b.awardedAt).getTime() - new Date(a.awardedAt).getTime())
    .slice(0, limit);

  const getBadgeDetails = (badgeId: string) => {
    return badges.find(b => b.id === badgeId);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-300';
    }
  };

  if (userBadges.length === 0) {
    return (
      <div className="text-center py-8">
        <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No badges earned yet</p>
        <p className="text-sm text-gray-400 mt-1">Keep working on projects to earn your first badge!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Badges ({userBadges.length})
        </h3>
      </div>

      <div className={`grid gap-4 ${showDetails ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
        {userBadges.map((studentBadge) => {
          const badge = getBadgeDetails(studentBadge.badgeId);
          if (!badge) return null;

          return (
            <div
              key={studentBadge.id}
              className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${getRarityColor(badge.rarity)} bg-gradient-to-br from-white to-gray-50`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-2xl p-2 rounded-lg ${badge.color} text-white flex-shrink-0`}>
                  {badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{badge.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                      badge.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                      badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {badge.rarity}
                    </span>
                  </div>
                  
                  {showDetails && (
                    <>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>Awarded by {studentBadge.awardedByName}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{studentBadge.awardedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 p-2 bg-gray-100 rounded text-gray-700">
                          <strong>Reason:</strong> {studentBadge.reason}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {limit && userBadges.length >= limit && (
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Badges ({studentBadges.filter(sb => sb.studentId === studentId).length})
          </button>
        </div>
      )}
    </div>
  );
}
