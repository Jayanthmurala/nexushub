import React, { useState } from 'react';
import { 
  MessageSquare, 
  FolderOpen, 
  Users, 
  Calendar,
  CheckSquare,
  Plus,
  Send,
  Paperclip,
  MoreVertical,
  Clock
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';

export default function CollaborationHub() {
  const { user } = useAuth();
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'tasks' | 'files'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [newTask, setNewTask] = useState('');

  const activeProjects = projects.filter(p => 
    p.facultyId === user?.id && 
    (p.status === 'in_progress' || p.currentStudents > 0)
  );

  const selectedProjectData = selectedProject ? 
    projects.find(p => p.id === selectedProject) : 
    activeProjects[0];

  // Mock data for demonstration
  const mockMessages = [
    {
      id: '1',
      sender: 'Dr. Sarah Wilson',
      message: 'Great work on the data preprocessing module! The results look promising.',
      timestamp: new Date('2024-01-25T10:30:00'),
      isMe: true
    },
    {
      id: '2',
      sender: 'Alex Chen',
      message: 'Thank you! I\'ve uploaded the updated dataset. Should I proceed with the model training?',
      timestamp: new Date('2024-01-25T14:45:00'),
      isMe: false
    },
    {
      id: '3',
      sender: 'Dr. Sarah Wilson',
      message: 'Yes, please proceed. Also, let\'s schedule a meeting to discuss the next phase.',
      timestamp: new Date('2024-01-25T15:20:00'),
      isMe: true
    }
  ];

  const mockTasks = [
    {
      id: '1',
      title: 'Complete data preprocessing',
      assignedTo: 'Alex Chen',
      status: 'completed',
      dueDate: new Date('2024-01-20'),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Train initial ML model',
      assignedTo: 'Alex Chen',
      status: 'in_progress',
      dueDate: new Date('2024-01-30'),
      priority: 'high'
    },
    {
      id: '3',
      title: 'Literature review update',
      assignedTo: 'Maria Garcia',
      status: 'pending',
      dueDate: new Date('2024-02-05'),
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Prepare interim report',
      assignedTo: 'Both',
      status: 'pending',
      dueDate: new Date('2024-02-15'),
      priority: 'high'
    }
  ];

  const mockFiles = [
    {
      id: '1',
      name: 'dataset_v2.csv',
      size: '2.3 MB',
      uploadedBy: 'Alex Chen',
      uploadedAt: new Date('2024-01-25'),
      type: 'csv'
    },
    {
      id: '2',
      name: 'project_proposal.pdf',
      size: '1.2 MB',
      uploadedBy: 'Dr. Sarah Wilson',
      uploadedAt: new Date('2024-01-15'),
      type: 'pdf'
    },
    {
      id: '3',
      name: 'model_architecture.py',
      size: '15 KB',
      uploadedBy: 'Alex Chen',
      uploadedAt: new Date('2024-01-24'),
      type: 'python'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      // In a real app, this would add the task via API
      console.log('Adding task:', newTask);
      setNewTask('');
    }
  };

  if (activeProjects.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collaboration Hub</h1>
          <p className="text-gray-600 mt-1">Collaborate with your project teams</p>
        </div>

        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Collaborations</h3>
          <p className="text-gray-600 mb-6">
            Once students join your projects, you'll be able to collaborate with them here.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            View My Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Collaboration Hub</h1>
        <p className="text-gray-600 mt-1">Collaborate and manage your active project teams</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Active Projects</h2>
            <div className="space-y-2">
              {activeProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedProject === project.id || (!selectedProject && project === activeProjects[0])
                      ? 'bg-blue-100 border border-blue-200 text-blue-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{project.title}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.currentStudents} student{project.currentStudents !== 1 ? 's' : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Collaboration Area */}
        <div className="lg:col-span-3">
          {selectedProjectData && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {selectedProjectData.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{selectedProjectData.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {selectedProjectData.currentStudents} collaborator{selectedProjectData.currentStudents !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'chat', label: 'Chat', icon: MessageSquare },
                    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
                    { id: 'files', label: 'Files', icon: FolderOpen }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'chat' && (
                  <div className="space-y-4">
                    {/* Messages */}
                    <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-4">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isMe
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <div className="text-sm font-medium mb-1">{message.sender}</div>
                            <div className="text-sm">{message.message}</div>
                            <div className={`text-xs mt-1 ${
                              message.isMe ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                      </div>
                      <button
                        onClick={sendMessage}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'tasks' && (
                  <div className="space-y-4">
                    {/* Add Task */}
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          placeholder="Add a new task..."
                          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        />
                      </div>
                      <button
                        onClick={addTask}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-3">
                      {mockTasks.map((task) => (
                        <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-medium text-gray-900">{task.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                                  {task.status.replace('_', ' ')}
                                </span>
                                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                  {task.priority} priority
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {task.assignedTo}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Due {task.dueDate.toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'files' && (
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Drag and drop files here, or click to browse</p>
                      <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Choose Files
                      </button>
                    </div>

                    {/* Files List */}
                    <div className="space-y-3">
                      {mockFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FolderOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-500">
                                {file.size} • Uploaded by {file.uploadedBy} on {file.uploadedAt.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}