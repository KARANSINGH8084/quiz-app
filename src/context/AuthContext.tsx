import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, QuizResult } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  quizHistory: QuizResult[];
  addQuizResult: (result: QuizResult) => void;
  loading: boolean;
  isAdmin: boolean;
  getAllUsers: () => User[];
  getUserResults: (userId: string) => QuizResult[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// LocalStorage keys
const STORAGE_KEYS = {
  USERS: 'quiz_app_users',
  CURRENT_USER: 'quiz_app_current_user',
  RESULTS: 'quiz_app_results',
  ADMIN_DATA: 'quiz_app_admin',
};

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  data: {
    id: 'admin_001',
    name: 'Admin User',
    email: 'admin@quizapp.com',
    joined_date: '2024-01-01',
    total_quizzes: 0,
    average_score: 0,
    total_attempts: 0,
    not_attempted: 0,
    role: 'admin' as const,
  }
};

// Helper functions for localStorage
const getStoredUsers = (): Record<string, { password: string; userData: User }> => {
  const stored = localStorage.getItem(STORAGE_KEYS.USERS);
  return stored ? JSON.parse(stored) : {};
};

const saveStoredUsers = (users: Record<string, { password: string; userData: User }>) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getStoredResults = (): Record<string, QuizResult[]> => {
  const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
  return stored ? JSON.parse(stored) : {};
};

const saveStoredResults = (results: Record<string, QuizResult[]>) => {
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
};

const getCurrentUserEmail = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
};

const setCurrentUserEmail = (email: string | null) => {
  if (email) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, email);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const initAuth = () => {
      try {
        const currentEmail = getCurrentUserEmail();
        if (currentEmail) {
          // Check if it's admin
          if (currentEmail === ADMIN_CREDENTIALS.username) {
            setUser(ADMIN_CREDENTIALS.data);
            setQuizHistory([]);
          } else {
            // Regular user
            const users = getStoredUsers();
            const userRecord = users[currentEmail];
            if (userRecord) {
              setUser(userRecord.userData);
              
              // Load quiz history
              const allResults = getStoredResults();
              const userResults = allResults[userRecord.userData.id] || [];
              setQuizHistory(userResults);
            } else {
              // User not found, clear session
              setCurrentUserEmail(null);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Check if it's admin login
    if (email === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_CREDENTIALS.data);
      setCurrentUserEmail(ADMIN_CREDENTIALS.username);
      setQuizHistory([]);
      return;
    }

    // Regular user login
    const users = getStoredUsers();
    const userRecord = users[email.toLowerCase()];
    
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid email or password');
    }

    setUser(userRecord.userData);
    setCurrentUserEmail(email.toLowerCase());
    
    // Load quiz history
    const allResults = getStoredResults();
    const userResults = allResults[userRecord.userData.id] || [];
    setQuizHistory(userResults);
  };

  const signup = async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    const emailLower = email.toLowerCase();
    
    if (users[emailLower]) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email: emailLower,
      joined_date: new Date().toISOString().split('T')[0],
      total_quizzes: 0,
      average_score: 0,
      total_attempts: 0,
      not_attempted: 4, // Total number of quizzes available
      role: 'user',
    };

    users[emailLower] = {
      password,
      userData: newUser,
    };
    
    saveStoredUsers(users);
    setUser(newUser);
    setCurrentUserEmail(emailLower);
    setQuizHistory([]);
  };

  const logout = () => {
    setUser(null);
    setQuizHistory([]);
    setCurrentUserEmail(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    const users = getStoredUsers();
    const userRecord = users[user.email];
    
    if (userRecord) {
      // If email is being changed, we need to move the user record
      if (data.email && data.email !== user.email) {
        const emailLower = data.email.toLowerCase();
        if (users[emailLower] && emailLower !== user.email) {
          throw new Error('Email already in use');
        }
        
        // Move user record to new email key
        delete users[user.email];
        users[emailLower] = {
          password: userRecord.password,
          userData: updatedUser,
        };
        setCurrentUserEmail(emailLower);
      } else {
        userRecord.userData = updatedUser;
      }
      
      saveStoredUsers(users);
      setUser(updatedUser);
    }
  };

  const addQuizResult = (result: QuizResult) => {
    if (!user || user.role === 'admin') return;

    // Update quiz history
    const updatedHistory = [result, ...quizHistory];
    setQuizHistory(updatedHistory);
    
    // Save to localStorage
    const allResults = getStoredResults();
    allResults[user.id] = updatedHistory;
    saveStoredResults(allResults);
    
    // Update user stats
    const totalAttempts = (user.total_attempts || 0) + 1;
    
    // Count unique quizzes
    const uniqueQuizIds = new Set(updatedHistory.map(r => r.quizId));
    const totalQuizzes = uniqueQuizIds.size;
    
    // Calculate average score
    const averageScore = Math.round(
      updatedHistory.reduce((sum, r) => sum + r.percentage, 0) / updatedHistory.length
    );
    
    // Calculate not attempted (total available quizzes - unique attempted quizzes)
    const totalAvailableQuizzes = 4; // We have 4 quizzes in total
    const notAttempted = Math.max(0, totalAvailableQuizzes - totalQuizzes);
    
    const updatedUser = {
      ...user,
      total_quizzes: totalQuizzes,
      total_attempts: totalAttempts,
      average_score: averageScore,
      not_attempted: notAttempted,
    };
    
    setUser(updatedUser);
    
    // Update user in storage
    const users = getStoredUsers();
    const userRecord = users[user.email];
    if (userRecord) {
      userRecord.userData = updatedUser;
      saveStoredUsers(users);
    }
  };

  // Admin-only functions
  const getAllUsers = (): User[] => {
    const users = getStoredUsers();
    return Object.values(users).map(u => u.userData);
  };

  const getUserResults = (userId: string): QuizResult[] => {
    const allResults = getStoredResults();
    return allResults[userId] || [];
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        signup, 
        logout, 
        updateProfile, 
        quizHistory, 
        addQuizResult, 
        loading,
        isAdmin,
        getAllUsers,
        getUserResults
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};