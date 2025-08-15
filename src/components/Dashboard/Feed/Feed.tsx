
import React, { useState } from 'react';
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  Camera,
  FileText,
  Link as LinkIcon,
  Award,
  TrendingUp,
  Clock,
  Users,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

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

const samplePosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    authorName: 'Dr. Sarah Chen',
    authorRole: 'faculty',
    authorDepartment: 'Computer Science',
    content: 'Excited to share that our AI research project has been accepted at NeurIPS 2024! Looking for passionate graduate students to join our team. 🚀',
    type: 'achievement',
    tags: ['AI', 'Research', 'NeurIPS', 'Opportunity'],
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '2',
    authorId: '2',
    authorName: 'Alex Rodriguez',
    authorRole: 'student',
    authorDepartment: 'Mechanical Engineering',
    content: 'Just finished building a robotic arm prototype! This project taught me so much about control systems and 3D printing. Special thanks to Prof. Johnson for the guidance.',
    type: 'project_update',
    attachments: [
      {
        type: 'image',
        url: '/api/placeholder/400/300',
        title: 'Robotic Arm Prototype'
      }
    ],
    tags: ['Robotics', '3D Printing', 'Engineering'],
    likes: 18,
    comments: 12,
    shares: 2,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    authorId: '3',
    authorName: 'Prof. Michael Kumar',
    authorRole: 'faculty',
    authorDepartment: 'Data Science',
    content: 'Hosting a workshop on "Machine Learning in Healthcare" next Friday at 2 PM in Room 205. Open to all students interested in the intersection of AI and medicine!',
    type: 'event',
    tags: ['Workshop', 'Machine Learning', 'Healthcare', 'Open to All'],
    likes: 31,
    comments: 15,
    shares: 7,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isLiked: false,
    isBookmarked: true
  }
];

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState<'all' | 'following' | 'trending'>('all');

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'shares' | 'isLiked' | 'isBookmarked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false
    };
    setPosts([post, ...posts]);
    setShowCreatePost(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Feed</h1>
            <p className="text-gray-600 mt-1">Share your journey, discover opportunities</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === 'all' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setFilter('trending')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === 'trending' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-1 inline" />
                Trending
              </button>
            </div>
          </div>
        </div>

        {/* Quick Create Post */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-500 hover:border-gray-300 transition-colors"
            >
              Share an update, achievement, or opportunity...
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <button className="bg-white border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
}
