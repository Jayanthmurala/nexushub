import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  MoreHorizontal,
  Award,
  Trophy,
  Star,
  Clock
} from 'lucide-react';

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'faculty' | 'admin';
  authorDepartment: string;
  content: string;
  type: 'text' | 'project_update' | 'achievement' | 'event' | 'collaboration' | 'badge_award';
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
  badgeData?: {
    badgeName: string;
    badgeIcon: string;
    badgeColor: string;
    recipientName: string;
    reason: string;
  };
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export default function PostCard({ post, onLike, onBookmark }: PostCardProps) {
  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-green-100 text-green-800';
      case 'project_update': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'collaboration': return 'bg-orange-100 text-orange-800';
      case 'badge_award': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'badge_award': return <Award className="w-4 h-4" />;
      case 'project_update': return <Star className="w-4 h-4" />;
      default: return null;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {post.authorName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPostTypeColor(post.type)} flex items-center space-x-1`}>
                {getPostTypeIcon(post.type)}
                <span>{post.type.replace('_', ' ')}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{post.authorRole} • {post.authorDepartment}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(post.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Badge Announcement Special Layout */}
      {post.type === 'badge_award' && post.badgeData && (
        <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${post.badgeData.badgeColor} rounded-full flex items-center justify-center text-3xl`}>
              {post.badgeData.badgeIcon}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">
                🎉 Badge Awarded: {post.badgeData.badgeName}
              </h4>
              <p className="text-sm text-gray-600">
                Recipient: <span className="font-medium">{post.badgeData.recipientName}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">{post.badgeData.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Attachments */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4">
          {post.attachments.map((attachment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  {attachment.type === 'image' && <img src="/api/placeholder/32/32" alt="" className="w-6 h-6 rounded" />}
                  {attachment.type === 'document' && <div className="w-6 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center">PDF</div>}
                  {attachment.type === 'link' && <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">🔗</div>}
                </div>
                <span className="text-sm font-medium text-gray-700">{attachment.title || attachment.url}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-100 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              post.isLiked 
                ? 'bg-red-50 text-red-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>
        <button
          onClick={() => onBookmark(post.id)}
          className={`p-2 rounded-lg transition-colors ${
            post.isBookmarked 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}
