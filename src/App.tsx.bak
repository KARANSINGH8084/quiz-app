import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage';
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
import { medicalQuizzes } from './data/medicalQuizzes'; // ✅ NEW: Import medical quizzes
import { QuizResult as QuizResultType, Quiz } from './types';
import { ModalContext, ModalProvider, useModalContext } from './context/model/modalContext';
import { Toaster } from './components/ui/sonner'; // ✅ NEW: Toast notifications
import './styles/customStyle.css';
import FunPage from './fun/FunPage';


type Page = 'home' | 'quiz' | 'result' | 'history' | 'profile' | 'fun';
type AdminPage = 'dashboard' | 'users' | 'user-details' | 'questions' | 'profile';
type AuthPage = 'landing' | 'login' | 'signup'; // ✅ MODIFIED: Added 'landing' to AuthPage type

function AppContent() {
  const modelContext = useModalContext();
  const { user, loading, isAdmin } = useAuth();
  const [authPage, setAuthPage] = useState<AuthPage>('landing'); // ✅ MODIFIED: Start with 'landing' instead of 'login'
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const onSwitchToSignup = () => {
    modelContext.addModal(
      'Sign Up',
      <Signup
        onSwitchToLogin={onSwitchToLogin}
        onSignupSuccess={() => {
          setCurrentPage('home');
          modelContext.clearModal();
        }}
        onBackToHome={() => modelContext.clearModal()}
      />,
      true,
      false,
      'login-modal'
    );
  }
  const onSwitchToLogin = () => {
    modelContext.addModal(
      'Log In',
      <Login
        onSwitchToSignup={onSwitchToSignup}
        onLoginSuccess={() => {
          setCurrentPage('home');
          modelContext.clearModal();
        }}
        onBackToHome={() => modelContext.clearModal()}
      />,
      true,
      false,
      'login-modal'
    );
  }
  // ✅ UPDATED: Enhanced loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl">🩺</span>
            </div>
          </div>
          <h2 className="text-2xl mb-2">MedQuiz</h2>
          <p className="text-muted-foreground mb-4">Loading your medical journey...</p>
          <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
          </div>
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
          onSwitchToSignup={() => onSwitchToLogin()}
          onSwitchToLogin={() => onSwitchToSignup()}
          onSignupSuccess={() => {
            setCurrentPage('home');
            modelContext.clearModal();
          }}
          onLoginSuccess={() => {
            setCurrentPage('home');
            modelContext.clearModal();
          }}
          onBackToHome={() => modelContext.clearModal()} // Just to illustrate closing modal if needed
        />
      );
    } else if (authPage === 'login') {
      return (
        <ModalProvider>
          <Login
            onSwitchToSignup={() => setAuthPage('signup')}
            onLoginSuccess={() => {
              // Will be handled by useEffect below
            }}
            onBackToHome={() => modelContext.clearModal()} // ✅ NEW: Back to landing page
          />
        </ModalProvider>
      );
    } else {
      return (
        <Signup
          onSwitchToLogin={() => setAuthPage('login')}
          onSignupSuccess={() => setCurrentPage('home')}
          onBackToHome={() => modelContext.clearModal()} // ✅ NEW: Back to landing page
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
      setSelectedQuizId(selectedQuizId);
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

  // ✅ UPDATED: Get selected quiz from both sources and temp_quiz
  const selectedQuiz = selectedQuizId ? (() => {
    // Check temp_quiz in localStorage
    if (selectedQuizId === 'temp_quiz') {
      const tempQuizData = localStorage.getItem('temp_quiz');
      if (tempQuizData) {
        return JSON.parse(tempQuizData) as Quiz;
      }
    }
    // Check medical quizzes first, then practice quizzes
    return medicalQuizzes.find(q => q.id === selectedQuizId) ||
      quizzes.find(q => q.id === selectedQuizId);
  })() : null;

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
      case 'fun':
        return <FunPage />;

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
      <ModalProvider>
        <Toaster position="top-right" richColors />
        <AppContent />
      </ModalProvider>
    </AuthProvider>
  );
}
