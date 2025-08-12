import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  facultyId: string;
  facultyName: string;
  department: string;
  skills: string[];
  duration: string;
  status: 'open' | 'in_progress' | 'completed';
  maxStudents: number;
  currentStudents: number;
  createdAt: Date;
  deadline?: Date;
  tags: string[];
  requirements: string[];
  outcomes: string[];
}

export interface Application {
  id: string;
  projectId: string;
  studentId: string;
  studentName: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
  message?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  department: string;
  type: 'workshop' | 'seminar' | 'competition' | 'networking';
  capacity: number;
  registered: number;
}

interface DataContextType {
  projects: Project[];
  applications: Application[];
  events: Event[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  applyToProject: (projectId: string, studentId: string, message?: string) => void;
  updateApplication: (applicationId: string, status: 'accepted' | 'rejected') => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Initialize with demo data
    const demoProjects: Project[] = [
      {
        id: '1',
        title: 'AI-Powered Student Performance Prediction',
        description: 'Develop a machine learning model to predict student academic performance based on various factors including attendance, assignment scores, and engagement metrics.',
        facultyId: '2',
        facultyName: 'Dr. Sarah Wilson',
        department: 'Computer Science',
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
        duration: '4 months',
        status: 'open',
        maxStudents: 3,
        currentStudents: 1,
        createdAt: new Date('2024-01-20'),
        deadline: new Date('2024-02-15'),
        tags: ['AI', 'ML', 'Education', 'Research'],
        requirements: ['Strong Python skills', 'Basic ML knowledge', 'Statistical analysis experience'],
        outcomes: ['Published research paper', 'ML model deployment', 'Portfolio project']
      },
      {
        id: '2',
        title: 'Sustainable Campus Energy Management System',
        description: 'Create an IoT-based system to monitor and optimize energy consumption across campus buildings using smart sensors and data analytics.',
        facultyId: '2',
        facultyName: 'Dr. Sarah Wilson',
        department: 'Computer Science',
        skills: ['IoT', 'React', 'Node.js', 'Data Visualization'],
        duration: '6 months',
        status: 'open',
        maxStudents: 4,
        currentStudents: 0,
        createdAt: new Date('2024-01-18'),
        deadline: new Date('2024-02-20'),
        tags: ['IoT', 'Sustainability', 'Full Stack', 'Innovation'],
        requirements: ['Web development experience', 'Interest in IoT', 'Problem-solving skills'],
        outcomes: ['Working prototype', 'Conference presentation', 'Industry connections']
      },
      {
        id: '3',
        title: 'Blockchain-Based Student Credential System',
        description: 'Design and implement a secure, decentralized system for storing and verifying student academic credentials using blockchain technology.',
        facultyId: '2',
        facultyName: 'Dr. Sarah Wilson',
        department: 'Computer Science',
        skills: ['Blockchain', 'Smart Contracts', 'Cryptography', 'Web3'],
        duration: '5 months',
        status: 'in_progress',
        maxStudents: 2,
        currentStudents: 2,
        createdAt: new Date('2024-01-10'),
        tags: ['Blockchain', 'Security', 'Innovation', 'Fintech'],
        requirements: ['Understanding of blockchain concepts', 'Programming experience', 'Security mindset'],
        outcomes: ['Deployed blockchain application', 'Research publication', 'Industry partnerships']
      }
    ];

    const demoEvents: Event[] = [
      {
        id: '1',
        title: 'Introduction to Machine Learning Workshop',
        description: 'A hands-on workshop covering the fundamentals of ML algorithms, practical applications, and career opportunities.',
        date: new Date('2024-02-10T14:00:00'),
        location: 'CS Auditorium',
        organizer: 'Dr. Sarah Wilson',
        department: 'Computer Science',
        type: 'workshop',
        capacity: 50,
        registered: 32
      },
      {
        id: '2',
        title: 'Tech Industry Career Panel',
        description: 'Industry leaders share insights on career paths, skills demand, and networking strategies.',
        date: new Date('2024-02-15T16:00:00'),
        location: 'Main Hall',
        organizer: 'Placements Cell',
        department: 'All Departments',
        type: 'networking',
        capacity: 100,
        registered: 67
      },
      {
        id: '3',
        title: 'Innovation Challenge 2024',
        description: 'Annual competition for innovative project ideas with prizes and mentorship opportunities.',
        date: new Date('2024-03-01T09:00:00'),
        location: 'Innovation Center',
        organizer: 'Innovation Cell',
        department: 'All Departments',
        type: 'competition',
        capacity: 80,
        registered: 45
      }
    ];

    setProjects(demoProjects);
    setEvents(demoEvents);

    // Load from localStorage if available
    const savedApplications = localStorage.getItem('nexus_applications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const applyToProject = (projectId: string, studentId: string, message?: string) => {
    const newApplication: Application = {
      id: Date.now().toString(),
      projectId,
      studentId,
      studentName: 'Current Student', // In real app, get from user context
      status: 'pending',
      appliedAt: new Date(),
      message
    };
    
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('nexus_applications', JSON.stringify(updatedApplications));
  };

  const updateApplication = (applicationId: string, status: 'accepted' | 'rejected') => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('nexus_applications', JSON.stringify(updatedApplications));
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString()
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      projects,
      applications,
      events,
      addProject,
      applyToProject,
      updateApplication,
      addEvent
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}