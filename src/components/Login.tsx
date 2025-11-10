import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess?: () => void;
  onBackToHome?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToSignup, onLoginSuccess , onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="w-full max-w-md">
         {onBackToHome && (
          <button 
            onClick={onBackToHome}
            className="mb-4 text-muted-foreground hover:text-foreground flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        )}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl mb-4">
              <span className="text-white text-2xl">🧠</span>
            </div>
            <h1 className="text-3xl mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your quiz journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input-background border-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-input-background border-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToSignup}
              className="text-muted-foreground hover:text-foreground"
            >
              Don't have an account? <span className="text-purple-500">Sign up</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border space-y-3">
            {/* <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
              <p className="text-sm text-center mb-2">
                <span className="font-medium text-purple-700">Admin Login</span>
              </p>
              <div className="text-xs text-center text-muted-foreground space-y-1">
                <div>Username: <span className="font-mono font-medium">admin</span></div>
                <div>Password: <span className="font-mono font-medium">admin123</span></div>
              </div>
            </div> */}
            <p className="text-xs text-center text-muted-foreground">
              Regular users: Sign up to create an account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};