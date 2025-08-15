
import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Award,
  Calendar,
  Users,
  FileText,
  Hash,
  Clock,
  Eye
} from 'lucide-react';

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'faculty' | 'admin';
  authorDepartment: string;
  content: string;
  type: 'text' | 'project_update' | 'achievement' | 'event' | 'collaboration';
  attachments?: Array<{
    type: 'image' | 'document' | 'link';
    url: string;
    title?: string;
  }>;
  tags?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export default function PostCard({ post, onLike, onBookmark }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'collaboration':
        return <Users className="w-4 h-4" />;
      case 'project_update':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'event':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'collaboration':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'project_update':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'faculty':
        return 'bg-green-500';
      case 'admin':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`w-12 h-12 ${getRoleColor(post.authorRole)} rounded-full flex items-center justify-center`}>
              <span className="text-white font-medium">
                {post.authorName.charAt(0)}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{post.authorDepartment}</span>
                {post.type !== 'text' && (
                  <>
                    <span className="text-sm text-gray-500">•</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(post.type)}`}>
                      {getTypeIcon(post.type)}
                      <span className="ml-1 capitalize">{post.type.replace('_', ' ')}</span>
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {formatTimeAgo(post.timestamp)}
              </div>
            </div>
          </div>
          
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs cursor-pointer transition-colors"
              >
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Attachments */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="px-6 pb-4">
          {post.attachments.map((attachment, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              {attachment.type === 'image' && (
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions Bar */}
      <div className="border-t border-gray-100">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                post.isLiked 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              <Share className="w-5 h-5" />
              <span>{post.shares}</span>
            </button>
          </div>
          
          <button
            onClick={() => onBookmark(post.id)}
            className={`p-2 rounded-lg transition-colors ${
              post.isBookmarked 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <div className="text-sm text-gray-500 text-center">
            Comments feature coming soon...
          </div>
        </div>
      )}
    </div>
  );
}
