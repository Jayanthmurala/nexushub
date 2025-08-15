import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  Star, 
  Crown, 
  Medal,
  Target,
  Zap,
  Sparkles,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  Gift
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import BadgeDisplay from './BadgeDisplay';

export default function BadgeCenter() {
  const { user } = useAuth();
  const { badges, studentBadges } = useData();
  const [activeTab, setActiveTab] = useState<'earned' | 'available' | 'leaderboard'>('earned');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const myBadges = studentBadges.filter(sb => sb.studentId === user?.id);
  const earnedBadgeIds = myBadges.map(sb => sb.badgeId);
  const availableBadges = badges.filter(b => !earnedBadgeIds.includes(b.id));

  const categories = ['all', 'skill', 'achievement', 'leadership', 'participation', 'innovation'];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-purple-600 bg-purple-100';
      case 'epic': return 'text-orange-600 bg-orange-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'common': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'epic': return <Trophy className="w-4 h-4" />;
      case 'rare': return <Star className="w-4 h-4" />;
      case 'common': return <Medal className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const filteredBadges = (badgeList: typeof badges) => {
    return badgeList.filter(badge => {
      const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
      const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const progressPercentage = Math.round((myBadges.length / badges.length) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🏆 Badge Center</h1>
            <p className="text-blue-100 mb-4">Track your achievements and unlock new opportunities</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">{myBadges.length} Earned</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span className="font-medium">{availableBadges.length} Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">{progressPercentage}% Complete</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
              <span className="text-3xl font-bold">{myBadges.length}</span>
            </div>
            <p className="text-sm text-blue-100">Total Badges</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Badge Collection Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('earned')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'earned' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>My Badges ({myBadges.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'available' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Available ({availableBadges.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'leaderboard' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>Leaderboard</span>
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search badges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'earned' && (
          <div className="space-y-6">
            {myBadges.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No badges earned yet</h3>
                <p className="text-gray-500 mb-6">Start participating in projects and activities to earn your first badge!</p>
                <button 
                  onClick={() => setActiveTab('available')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Explore Available Badges
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBadges.map((studentBadge) => {
                  const badge = badges.find(b => b.id === studentBadge.badgeId);
                  if (!badge) return null;

                  return (
                    <div key={studentBadge.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center text-3xl`}>
                          {badge.icon}
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${getRarityColor(badge.rarity)} flex items-center space-x-1`}>
                          {getRarityIcon(badge.rarity)}
                          <span>{badge.rarity}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Awarded by {studentBadge.awardedByName}</span>
                          <span>{new Date(studentBadge.awardedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 italic">"{studentBadge.reason}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges(availableBadges).map((badge) => (
              <div key={badge.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow opacity-75 hover:opacity-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 ${badge.color} opacity-50 rounded-full flex items-center justify-center text-3xl`}>
                    {badge.icon}
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${getRarityColor(badge.rarity)} flex items-center space-x-1`}>
                    {getRarityIcon(badge.rarity)}
                    <span>{badge.rarity}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-600 mb-2">
                    <strong>How to earn:</strong> {badge.criteria}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    badge.category === 'skill' ? 'bg-blue-100 text-blue-800' :
                    badge.category === 'achievement' ? 'bg-green-100 text-green-800' :
                    badge.category === 'leadership' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {badge.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Top Badge Collectors</h3>
              <p className="text-gray-600">See who's leading in badge achievements</p>
            </div>
            <div className="p-6">
              {/* Mock leaderboard data */}
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Alex Chen', badges: myBadges.length, total: badges.length },
                  { rank: 2, name: 'Sarah Kim', badges: 8, total: badges.length },
                  { rank: 3, name: 'Michael Rodriguez', badges: 6, total: badges.length },
                  { rank: 4, name: 'Emma Johnson', badges: 5, total: badges.length },
                  { rank: 5, name: 'David Liu', badges: 4, total: badges.length }
                ].map((entry) => (
                  <div key={entry.rank} className={`flex items-center justify-between p-4 rounded-lg ${
                    entry.name === user?.name ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        entry.rank === 1 ? 'bg-yellow-500 text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{entry.name}</p>
                        <p className="text-sm text-gray-500">{Math.round((entry.badges / entry.total) * 100)}% complete</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="font-bold text-lg">{entry.badges}</span>
                      <span className="text-sm text-gray-500">/ {entry.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
