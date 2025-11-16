// ✅ NEW: Challenge Mode - Multiplayer quiz battles
import React, { useState, useEffect } from 'react';
import { Users, Trophy, Zap, Clock, Target, ArrowLeft, Plus, Share2, Play, Crown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAuth } from '../context/AuthContext';
import { Challenge, ChallengeParticipant } from '../types';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';

interface ChallengeModeProps {
  onBack: () => void;
  onStartChallenge: (challengeId: string) => void;
}

export const ChallengeMode: React.FC<ChallengeModeProps> = ({ onBack, onStartChallenge }) => {
  const { user } = useAuth();
  const [view, setView] = useState<'menu' | 'create' | 'join' | 'waiting'>('menu');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [challengeCode, setChallengeCode] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(false);

  const levels = [
    { level: 1, name: 'Beginner', color: 'from-green-400 to-green-500' },
    { level: 2, name: 'Novice', color: 'from-blue-400 to-blue-500' },
    { level: 3, name: 'Intermediate', color: 'from-purple-400 to-purple-500' },
    { level: 4, name: 'Advanced', color: 'from-orange-400 to-orange-500' },
    { level: 5, name: 'Expert', color: 'from-red-400 to-red-500' },
    { level: 6, name: 'Master', color: 'from-pink-400 to-pink-500' },
  ];

  // Generate unique challenge code
  const generateChallengeCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Create a new challenge
  const handleCreateChallenge = () => {
    if (!user) return;
    
    setLoading(true);
    setTimeout(() => {
      const newChallenge: Challenge = {
        id: `challenge_${Date.now()}`,
        creatorId: user.id,
        creatorName: user.name,
        title: `${user.name}'s Challenge`,
        quizId: 'temp_challenge_quiz',
        level: selectedLevel as any,
        numberOfQuestions: questionCount,
        participants: [{
          userId: user.id,
          userName: user.name,
        }],
        status: 'waiting',
        createdAt: new Date().toISOString(),
      };

      const code = generateChallengeCode();
      
      // Save to localStorage (in real app, save to Supabase)
      const savedChallenges = JSON.parse(localStorage.getItem('challenges') || '[]');
      const challengeWithCode = { ...newChallenge, code };
      savedChallenges.push(challengeWithCode);
      localStorage.setItem('challenges', JSON.stringify(savedChallenges));

      setCurrentChallenge(challengeWithCode as any);
      setChallengeCode(code);
      setView('waiting');
      setLoading(false);
      
      toast.success(`Challenge created! Share code: ${code}`);
    }, 500);
  };

  // Join existing challenge
  const handleJoinChallenge = () => {
    if (!user || !challengeCode.trim()) {
      toast.error('Please enter a challenge code');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const savedChallenges = JSON.parse(localStorage.getItem('challenges') || '[]');
      const challenge = savedChallenges.find((c: any) => c.code === challengeCode.toUpperCase());

      if (!challenge) {
        toast.error('Challenge not found. Please check the code.');
        setLoading(false);
        return;
      }

      if (challenge.status !== 'waiting') {
        toast.error('This challenge has already started or ended.');
        setLoading(false);
        return;
      }

      // Add participant
      challenge.participants.push({
        userId: user.id,
        userName: user.name,
      });

      // Update in localStorage
      const updatedChallenges = savedChallenges.map((c: any) => 
        c.code === challengeCode.toUpperCase() ? challenge : c
      );
      localStorage.setItem('challenges', JSON.stringify(updatedChallenges));

      setCurrentChallenge(challenge);
      setView('waiting');
      setLoading(false);
      
      toast.success(`Joined ${challenge.creatorName}'s challenge!`);
    }, 500);
  };

  // Start the challenge
  const handleStartChallenge = () => {
    if (!currentChallenge) return;

    // Update challenge status
    const savedChallenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const updatedChallenges = savedChallenges.map((c: any) => 
      c.id === currentChallenge.id ? { ...c, status: 'in-progress', startTime: new Date().toISOString() } : c
    );
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));

    toast.success('Challenge starting! Good luck! 🎮');
    onStartChallenge(currentChallenge.id);
  };

  // Copy challenge code
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Challenge code copied to clipboard!');
  };

  // Render menu view
  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl mb-2">Challenge Mode 🎮</h1>
            <p className="text-muted-foreground">Compete with friends in real-time medical quizzes!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setView('create')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl mb-2">Create Challenge</h2>
                <p className="text-muted-foreground mb-4">
                  Start a new challenge and invite friends
                </p>
                <Badge className="bg-purple-100 text-purple-700">Host</Badge>
              </div>
            </Card>

            <Card className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setView('join')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl mb-2">Join Challenge</h2>
                <p className="text-muted-foreground mb-4">
                  Enter a code to join an existing challenge
                </p>
                <Badge className="bg-green-100 text-green-700">Participant</Badge>
              </div>
            </Card>
          </div>

          {/* How it works */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              How Challenge Mode Works
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
                <p><strong>Create or Join:</strong> Host creates a challenge and shares the code, or join using a friend's code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
                <p><strong>Wait for Players:</strong> All participants join the waiting room</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
                <p><strong>Start Together:</strong> Everyone takes the same quiz simultaneously</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0">4</div>
                <p><strong>See Results:</strong> Leaderboard shows rank, accuracy, speed, and winner! 🏆</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Render create challenge view
  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={() => setView('menu')}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="p-8 bg-white border-0 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2">Create Challenge</h2>
              <p className="text-muted-foreground">Set up your challenge parameters</p>
            </div>

            {/* Level Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3">Select Level</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {levels.map((level) => (
                  <button
                    key={level.level}
                    onClick={() => setSelectedLevel(level.level)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedLevel === level.level
                        ? `bg-gradient-to-br ${level.color} text-white border-transparent shadow-lg scale-105`
                        : 'bg-white hover:scale-105 border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{level.level}</div>
                    <p className="text-xs">{level.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3">Number of Questions: {questionCount}</label>
              <input
                type="range"
                min="5"
                max="20"
                step="5"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>

            <Button
              onClick={handleCreateChallenge}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Challenge...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Challenge
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Render join challenge view
  if (view === 'join') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 py-8">
        <div className="max-w-md mx-auto">
          <Button
            onClick={() => setView('menu')}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="p-8 bg-white border-0 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2">Join Challenge</h2>
              <p className="text-muted-foreground">Enter the challenge code from your friend</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Challenge Code</label>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center text-2xl tracking-widest uppercase"
              />
            </div>

            <Button
              onClick={handleJoinChallenge}
              disabled={loading || challengeCode.length !== 6}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Joining...
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 mr-2" />
                  Join Challenge
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Render waiting room
  if (view === 'waiting' && currentChallenge) {
    const isCreator = currentChallenge.creatorId === user?.id;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={() => {
              setView('menu');
              setCurrentChallenge(null);
            }}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Leave Challenge
          </Button>

          <Card className="p-8 bg-white border-0 shadow-lg mb-6">
            <div className="text-center mb-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl mb-4 animate-pulse">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2">Waiting Room</h2>
              <p className="text-muted-foreground">Waiting for participants to join...</p>
            </div>

            {/* Challenge Code */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-2 border-2 border-purple-200">
              <p className="text-sm text-muted-foreground text-center mb-2">Share this code:</p>
              <div className="flex items-center justify-center gap-3">
                <div className="text-4xl font-bold tracking-widest">{(currentChallenge as any).code || challengeCode}</div>
                <Button
                  onClick={() => copyToClipboard((currentChallenge as any).code || challengeCode)}
                  variant="outline"
                  size="sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Challenge Details */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-xl font-bold">{currentChallenge.level}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-xl font-bold">{currentChallenge.numberOfQuestions}</p>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-2">
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participants ({currentChallenge.participants.length})
              </h3>
              <div className="space-y-2">
                {currentChallenge.participants.map((participant, index) => (
                  <div key={participant.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white">
                        {participant.userName[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{participant.userName}</p>
                        {participant.userId === currentChallenge.creatorId && (
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">Host</Badge>
                        )}
                      </div>
                    </div>
                    {participant.userId === user?.id && (
                      <Badge className="bg-blue-100 text-blue-700">You</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Start Button (only for creator) */}
            {isCreator && (
              <Button
                onClick={handleStartChallenge}
                disabled={currentChallenge.participants.length < 2}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Challenge
              </Button>
            )}

            {!isCreator && (
              <div className="text-center text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p>Waiting for host to start the challenge...</p>
              </div>
            )}
          </Card>

          {currentChallenge.participants.length < 2 && isCreator && (
            <Card className="p-4 bg-yellow-50 border-2 border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                ⚠️ At least 2 participants needed to start the challenge
              </p>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return null;
};
