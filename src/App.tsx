import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage'; // ✅ NEW: Landing page import
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { QuizPage } from './components/QuizPage';
import { QuizResult } from './components/QuizResult';
import { QuizHistory } from './components/QuizHistory';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/admin/Dashboard';
import { UsersList } from './components/admin/UsersList';
import { UserDetails } from './components/admin/UserDetails';
import { ManageQuestions } from './components/admin/ManageQuestions';
import { AdminProfile } from './components/admin/AdminProfile';
import { AdminNavbar } from './components/admin/AdminNavbar';
import { quizzes } from './data/quizzes';
import { QuizResult as QuizResultType } from './types';

type Page = 'home' | 'quiz' | 'result' | 'history' | 'profile';
type AdminPage = 'dashboard' | 'users' | 'user-details' | 'questions' | 'profile';
type AuthPage = 'landing' | 'login' | 'signup'; // ✅ MODIFIED: Added 'landing' to AuthPage type

function AppContent() {
  const { user, loading, isAdmin } = useAuth();
  const [authPage, setAuthPage] = useState<AuthPage>('landing'); // ✅ MODIFIED: Start with 'landing' instead of 'login'
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-3xl">🧠</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ MODIFIED: Show landing page, then auth pages if not logged in
  if (!user) {
    if (authPage === 'landing') {
      return (
        <LandingPage 
          onNavigateToLogin={() => setAuthPage('login')}
          onNavigateToSignup={() => setAuthPage('signup')}
        />
      );
    } else if (authPage === 'login') {
      return (
        <Login 
          onSwitchToSignup={() => setAuthPage('signup')}
          onLoginSuccess={() => {
            // Will be handled by useEffect below
          }}
          onBackToHome={() => setAuthPage('landing')} // ✅ NEW: Back to landing page
        />
      );
    } else {
      return (
        <Signup 
          onSwitchToLogin={() => setAuthPage('login')}
          onSignupSuccess={() => setCurrentPage('home')}
          onBackToHome={() => setAuthPage('landing')} // ✅ NEW: Back to landing page
        />
      );
    }
  }

  // Handle Admin Routing
  if (isAdmin) {
    const handleAdminNavigate = (page: string) => {
      setAdminPage(page as AdminPage);
      if (page !== 'user-details') {
        setSelectedUserId(null);
      }
    };

    const handleViewUser = (userId: string) => {
      setSelectedUserId(userId);
      setAdminPage('user-details');
    };

    const handleBackToUsers = () => {
      setSelectedUserId(null);
      setAdminPage('users');
    };

    const renderAdminPage = () => {
      switch (adminPage) {
        case 'users':
          return <UsersList onViewUser={handleViewUser} />;
        case 'user-details':
          if (selectedUserId) {
            return <UserDetails userId={selectedUserId} onBack={handleBackToUsers} />;
          }
          return <UsersList onViewUser={handleViewUser} />;
        case 'questions':
          return <ManageQuestions />;
        case 'profile':
          return <AdminProfile />;
        case 'dashboard':
        default:
          return <Dashboard />;
      }
    };

    return (
      <>
        <AdminNavbar currentPage={adminPage} onNavigate={handleAdminNavigate} />
        {renderAdminPage()}
      </>
    );
  }

  // Handle starting a quiz
  const handleStartQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentPage('quiz');
  };

  // Handle quiz completion
  const handleQuizComplete = (result: QuizResultType) => {
    setQuizResult(result);
    setCurrentPage('result');
  };

  // Handle quiz exit
  const handleQuizExit = () => {
    setSelectedQuizId(null);
    setCurrentPage('home');
  };

  // Handle retaking quiz
  const handleRetakeQuiz = () => {
    if (quizResult) {
      setSelectedQuizId(quizResult.quizId);
      setCurrentPage('quiz');
    }
  };

  // Handle navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  // Handle going back to home
  const handleGoHome = () => {
    setQuizResult(null);
    setSelectedQuizId(null);
    setCurrentPage('home');
  };

  // Get selected quiz
  const selectedQuiz = selectedQuizId ? quizzes.find(q => q.id === selectedQuizId) : null;

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'quiz':
        if (selectedQuiz) {
          return (
            <QuizPage 
              quiz={selectedQuiz}
              onComplete={handleQuizComplete}
              onExit={handleQuizExit}
            />
          );
        }
        return null;

      case 'result':
        if (quizResult) {
          return (
            <QuizResult 
              result={quizResult}
              onGoHome={handleGoHome}
              onRetakeQuiz={handleRetakeQuiz}
            />
          );
        }
        return null;

      case 'history':
        return <QuizHistory onBack={handleGoHome} />;

      case 'profile':
        return <Profile />;

      case 'home':
      default:
        return (
          <Home 
            onStartQuiz={handleStartQuiz}
            onViewHistory={() => setCurrentPage('history')}
          />
        );
    }
  };

  return (
    <>
      {currentPage !== 'quiz' && currentPage !== 'result' && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      {renderPage()}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
