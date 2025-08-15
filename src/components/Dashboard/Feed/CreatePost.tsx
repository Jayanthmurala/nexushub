
import React, { useState } from 'react';
import {
  X,
  Camera,
  FileText,
  Link as LinkIcon,
  Award,
  Calendar,
  Users,
  Hash,
  Image as ImageIcon,
  Type,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface CreatePostProps {
  onClose: () => void;
  onSubmit: (post: {
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
    timestamp: Date;
  }) => void;
}

export default function CreatePost({ onClose, onSubmit }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'text' | 'project_update' | 'achievement' | 'event' | 'collaboration'>('text');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const postTypes = [
    { value: 'text', label: 'General Update', icon: Type, color: 'bg-blue-100 text-blue-700' },
    { value: 'project_update', label: 'Project Update', icon: FileText, color: 'bg-green-100 text-green-700' },
    { value: 'achievement', label: 'Achievement', icon: Award, color: 'bg-yellow-100 text-yellow-700' },
    { value: 'event', label: 'Event', icon: Calendar, color: 'bg-purple-100 text-purple-700' },
    { value: 'collaboration', label: 'Collaboration', icon: Users, color: 'bg-orange-100 text-orange-700' }
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    onSubmit({
      authorId: user?.id || '',
      authorName: user?.name || '',
      authorRole: user?.role || 'student',
      authorDepartment: user?.department || '',
      content: content.trim(),
      type: postType,
      tags: tags.length > 0 ? tags : undefined,
      timestamp: new Date()
    });
  };

  const selectedType = postTypes.find(type => type.value === postType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{user?.name}</div>
              <div className="text-sm text-gray-500">{user?.department}</div>
            </div>
          </div>

          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Post Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {postTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setPostType(type.value as any)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    postType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-2 rounded-lg ${type.color}`}>
                      <type.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {type.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Share your ${selectedType?.label.toLowerCase()}...`}
              className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Add to your post</span>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FileText className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
