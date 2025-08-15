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

// New interfaces for badges
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  rarity: string;
  criteria: string;
}

export interface StudentBadge {
  id: string;
  studentId: string;
  badgeId: string;
  awardedBy: string;
  awardedByName: string;
  awardedAt: Date;
  reason: string;
  projectId?: string;
  eventId?: string;
}

// Interface for event registrations
export interface EventRegistration {
  id: string;
  eventId: string;
  studentId: string;
  registeredAt: Date;
}

interface DataContextType {
  projects: Project[];
  applications: Application[];
  events: Event[];
  badges: Badge[];
  studentBadges: StudentBadge[];
  eventRegistrations: EventRegistration[];
  awardBadge: (studentId: string, badgeId: string, reason: string, awardedBy: string, awardedByName: string, projectId?: string, eventId?: string) => void;
  registerForEvent: (eventId: string, studentId: string) => void;
  unregisterFromEvent: (eventId: string, studentId: string) => void;
  addEvent: (eventData: Omit<Event, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [studentBadges, setStudentBadges] = useState<StudentBadge[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);

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

    // Load badges data
    setBadges(sampleBadges);
    const savedStudentBadges = localStorage.getItem('nexus_student_badges');
    if (savedStudentBadges) {
      setStudentBadges(JSON.parse(savedStudentBadges));
    } else {
      setStudentBadges(sampleStudentBadges);
    }

    // Load event registrations from localStorage
    const savedEventRegistrations = localStorage.getItem('nexus_event_registrations');
    if (savedEventRegistrations) {
      setEventRegistrations(JSON.parse(savedEventRegistrations));
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

  const awardBadge = (studentId: string, badgeId: string, reason: string, awardedBy: string, awardedByName: string, projectId?: string, eventId?: string) => {
    const newStudentBadge: StudentBadge = {
      id: Date.now().toString(),
      studentId,
      badgeId,
      awardedBy,
      awardedByName,
      awardedAt: new Date(),
      reason,
      projectId,
      eventId
    };
    setStudentBadges(prev => [...prev, newStudentBadge]);
    // Persist student badges to localStorage
    localStorage.setItem('nexus_student_badges', JSON.stringify([...studentBadges, newStudentBadge]));
  };

  const registerForEvent = (eventId: string, studentId: string) => {
    // Check if already registered
    if (eventRegistrations.some(reg => reg.eventId === eventId && reg.studentId === studentId)) {
      console.log("Already registered for this event.");
      return;
    }

    // Check capacity
    const event = events.find(e => e.id === eventId);
    if (event && event.registered >= event.capacity) {
      console.log("Event is full.");
      return;
    }

    const newRegistration: EventRegistration = {
      id: Date.now().toString(),
      eventId,
      studentId,
      registeredAt: new Date()
    };
    const updatedRegistrations = [...eventRegistrations, newRegistration];
    setEventRegistrations(updatedRegistrations);
    localStorage.setItem('nexus_event_registrations', JSON.stringify(updatedRegistrations));

    // Update event registered count
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, registered: event.registered + 1 }
        : event
    ));
  };

  const unregisterFromEvent = (eventId: string, studentId: string) => {
    const updatedRegistrations = eventRegistrations.filter(
      reg => !(reg.eventId === eventId && reg.studentId === studentId)
    );
    setEventRegistrations(updatedRegistrations);
    localStorage.setItem('nexus_event_registrations', JSON.stringify(updatedRegistrations));

    // Update event registered count
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, registered: Math.max(0, event.registered - 1) }
        : event
    ));
  };

  return (
    <DataContext.Provider value={{
      projects,
      applications,
      events,
      badges,
      studentBadges,
      eventRegistrations,
      awardBadge,
      registerForEvent,
      unregisterFromEvent,
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

// Sample badge data
const sampleBadges: Badge[] = [
  {
    id: '1',
    name: 'Innovation Pioneer',
    description: 'Awarded for exceptional innovative thinking and creative problem-solving',
    icon: '🚀',
    color: 'bg-purple-500',
    category: 'innovation',
    rarity: 'legendary',
    criteria: 'Create a groundbreaking project or solution'
  },
  {
    id: '2',
    name: 'Code Master',
    description: 'Demonstrated exceptional programming skills and code quality',
    icon: '💻',
    color: 'bg-blue-500',
    category: 'skill',
    rarity: 'epic',
    criteria: 'Complete a complex programming project with excellent code quality'
  },
  {
    id: '3',
    name: 'Team Leader',
    description: 'Excellent leadership skills in team projects',
    icon: '👑',
    color: 'bg-yellow-500',
    category: 'leadership',
    rarity: 'rare',
    criteria: 'Successfully lead a team project to completion'
  },
  {
    id: '4',
    name: 'Research Scholar',
    description: 'Outstanding contribution to research projects',
    icon: '🔬',
    color: 'bg-green-500',
    category: 'achievement',
    rarity: 'epic',
    criteria: 'Publish research or present at conferences'
  },
  {
    id: '5',
    name: 'Quick Learner',
    description: 'Rapidly acquired new skills and technologies',
    icon: '⚡',
    color: 'bg-orange-500',
    category: 'skill',
    rarity: 'common',
    criteria: 'Learn and apply new technology in a project'
  },
  {
    id: '6',
    name: 'Event Organizer',
    description: 'Successfully organized or participated in events',
    icon: '🎯',
    color: 'bg-pink-500',
    category: 'participation',
    rarity: 'rare',
    criteria: 'Organize or actively participate in department events'
  },
  {
    id: '7',
    name: 'Problem Solver',
    description: 'Exceptional analytical and problem-solving abilities',
    icon: '🧩',
    color: 'bg-indigo-500',
    category: 'skill',
    rarity: 'rare',
    criteria: 'Solve complex technical challenges'
  },
  {
    id: '8',
    name: 'Mentor',
    description: 'Helped and guided fellow students',
    icon: '🤝',
    color: 'bg-teal-500',
    category: 'leadership',
    rarity: 'common',
    criteria: 'Mentor junior students or peers'
  }
];

const sampleStudentBadges: StudentBadge[] = [
  {
    id: '1',
    studentId: '1',
    badgeId: '2',
    awardedBy: '2',
    awardedByName: 'Dr. Sarah Wilson',
    awardedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    reason: 'Excellent work on the blockchain credential system project',
    projectId: '3'
  },
  {
    id: '2',
    studentId: '1',
    badgeId: '5',
    awardedBy: '2',
    awardedByName: 'Dr. Sarah Wilson',
    awardedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    reason: 'Quickly mastered React and TypeScript for the project'
  }
];