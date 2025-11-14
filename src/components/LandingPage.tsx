import React, { use } from 'react';
import {
  Stethoscope,
  Brain,
  BookOpen,
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Microscope,
  HeartPulse,
  GraduationCap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useModalContext } from '../context/model/modalContext';
import { Signup } from './Signup';
import { Login } from './Login';
import { DrawOutlineButton, EncryptButton } from './ui/animatedBtn';
import { FiShield } from 'react-icons/fi';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onSwitchToLogin: () => void;
  onSignupSuccess?: () => void;
  onBackToHome?: () => void;
  onLoginSuccess?: () => void;
  onSwitchToSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToLogin,
  onNavigateToSignup,
  onSwitchToLogin,
  onSignupSuccess,
  onBackToHome,
  onLoginSuccess,
  onSwitchToSignup

}) => {
  const modelcontext = useModalContext();
  const features = [
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered question bank designed specifically for medical students',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Coverage',
      description: 'Topics from Anatomy to Pharmacology, all medical specialties covered',
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Detailed analytics to monitor your improvement and identify weak areas',
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Clock,
      title: 'Exam Simulation',
      description: 'Timed quizzes that mimic real medical exam conditions',
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  const benefits = [
    'Prepare for USMLE, NEET, PLAB, and other medical exams',
    'Access 1000+ high-yield medical questions',
    'Detailed explanations for every answer',
    'Mobile-friendly study anytime, anywhere',
    'Performance analytics and score tracking',
    'Subject-wise and system-wise categorization',
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Medical Students' },
    { icon: BookOpen, value: '1,000+', label: 'Questions' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: Target, value: '24/7', label: 'Access' },
  ];

  const categories = [
    { name: 'Anatomy', icon: '🦴', color: 'bg-red-50 text-red-600 border-red-200' },
    { name: 'Physiology', icon: '💓', color: 'bg-pink-50 text-pink-600 border-pink-200' },
    { name: 'Pharmacology', icon: '💊', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { name: 'Pathology', icon: '🔬', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { name: 'Microbiology', icon: '🦠', color: 'bg-green-50 text-green-600 border-green-200' },
    { name: 'Biochemistry', icon: '🧬', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
    { name: 'Surgery', icon: '⚕️', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { name: 'Medicine', icon: '🩺', color: 'bg-teal-50 text-teal-600 border-teal-200' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MedQuiz Pro
                </h1>
                <p className="text-xs text-muted-foreground">For Medical Excellence</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {/* <Button 
                variant="outline" 
                onClick={onNavigateToLogin}
                className="hidden md:inline-flex"
              >
                Login
              </Button> */}
              <div onClick={() => {
                modelcontext.addModal(
                  '',
                  <Login
                    onSwitchToSignup={onSwitchToSignup}
                    onLoginSuccess={onLoginSuccess}
                    onBackToHome={onBackToHome}
                  />,
                  true,
                  false,
                  'login-modal'
                );
              }}
              >
                <EncryptButton label="Get Started" Icon={FiShield} className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white' />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative my-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
                <GraduationCap className="w-4 h-4 mr-2" />
                Trusted by Medical Students Worldwide
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Master Medical Exams with Confidence
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                The most comprehensive quiz platform designed exclusively for medical students.
                Practice, learn, and excel in your medical journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  // onClick={onNavigateToSignup}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg"
                >
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  // onClick={onNavigateToLogin}
                  className="text-lg"
                >
                  Login to Continue
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Free to start</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative">
                {/* Floating Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white transform hover:scale-105 transition-transform">
                    <CardContent className="p-6">
                      <Microscope className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl mb-2">1000+</h3>
                      <p className="text-sm opacity-90">Questions</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white transform hover:scale-105 transition-transform mt-8">
                    <CardContent className="p-6">
                      <HeartPulse className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl mb-2">8+</h3>
                      <p className="text-sm opacity-90">Specialties</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-500 to-red-500 text-white transform hover:scale-105 transition-transform">
                    <CardContent className="p-6">
                      <Award className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl mb-2">95%</h3>
                      <p className="text-sm opacity-90">Success Rate</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-teal-500 text-white transform hover:scale-105 transition-transform mt-8">
                    <CardContent className="p-6">
                      <Brain className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl mb-2">AI</h3>
                      <p className="text-sm opacity-90">Powered</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -z-10 opacity-20">
          <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/50 backdrop-blur-sm py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
              Why Choose MedQuiz Pro
            </Badge>
            <h2 className="text-4xl mb-4">Built for Medical Students</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to ace your medical exams, all in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 text-${feature.color.split('-')[1]}-600`} />
                    </div>
                    <h3 className="text-xl mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Medical Specialties Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Medical Specialties Covered</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive question banks across all major medical subjects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${category.color} text-center hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
                Student Success
              </Badge>
              <h2 className="text-4xl mb-6">
                Why Medical Students Love MedQuiz Pro
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Sarah Johnson</h3>
                    <p className="text-sm opacity-90">4th Year Medical Student</p>
                  </div>
                </div>
                <p className="text-lg mb-6 opacity-95">
                  "MedQuiz Pro helped me improve my USMLE Step 1 score by 25 points! The question
                  bank is incredibly comprehensive and the explanations are detailed. I can't
                  recommend it enough for medical students."
                </p>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-300 text-2xl">⭐</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl mb-6">
            Ready to Excel in Your Medical Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of medical students who are already mastering their exams with MedQuiz Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              // onClick={onNavigateToLogin}
              className="btn liquid border-2 border-white bg-white text-white text-lg"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              size="lg"
              // onClick={onNavigateToLogin}
              variant="outline"
              className=" border-white border-2 text-purple-600 hover:bg-white/10 text-lg"
            >
              Already have an account? Login
            </Button>
          </div>

          <p className="mt-6 text-sm opacity-75">
            Start your free trial today • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="w-6 h-6" />
                <span className="text-xl">MedQuiz Pro</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering medical students to achieve excellence through smart, focused learning.
              </p>
            </div>

            <div>
              <h3 className="mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Question Bank</li>
                <li>Progress Tracking</li>
                <li>Study Analytics</li>
                <li>Mobile App</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Study Tips</li>
                <li>Exam Guides</li>
                <li>Medical News</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 MedQuiz Pro. All rights reserved. Built for medical students, by medical educators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
