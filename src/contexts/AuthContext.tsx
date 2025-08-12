import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'faculty' | 'dept_admin' | 'placements_admin' | 'head_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  year?: number;
  skills?: string[];
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - in production this would call your API
    const demoUsers: User[] = [
      {
        id: '1',
        name: 'Alex Chen',
        email: 'alex@student.edu',
        role: 'student',
        department: 'Computer Science',
        year: 3,
        skills: ['React', 'Python', 'Machine Learning'],
        bio: 'Passionate about AI and web development',
        avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Dr. Sarah Wilson',
        email: 'sarah@faculty.edu',
        role: 'faculty',
        department: 'Computer Science',
        skills: ['Research', 'AI', 'Data Science'],
        bio: 'Professor specializing in artificial intelligence and machine learning',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2020-08-10')
      },
      {
        id: '3',
        name: 'Prof. Michael Johnson',
        email: 'michael@admin.edu',
        role: 'dept_admin',
        department: 'Computer Science',
        bio: 'Head of Computer Science Department',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2018-05-20')
      },
      {
        id: '4',
        name: 'Lisa Rodriguez',
        email: 'lisa@placements.edu',
        role: 'placements_admin',
        department: 'Administration',
        bio: 'Head of Placements and Career Services',
        avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2019-03-12')
      },
      {
        id: '5',
        name: 'Dr. Robert Thompson',
        email: 'robert@admin.edu',
        role: 'head_admin',
        bio: 'Dean of Engineering',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date('2015-09-01')
      }
    ];

    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('nexus_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      department: userData.department,
      year: userData.year,
      skills: userData.skills || [],
      bio: userData.bio,
      createdAt: new Date()
    };

    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('nexus_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}