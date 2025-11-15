// ✅ NEW: Challenge Leaderboard - Shows results after multiplayer quiz
import React, { useEffect, useState } from 'react';
import { Trophy, Target, Clock, Zap, Crown, Medal, Home, RotateCcw, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Challenge, ChallengeParticipant } from '../types';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

interface ChallengeLeaderboardProps {
  challengeId: string;
  onGoHome: () => void;
  onNewChallenge: () => void;
}

export const ChallengeLeaderboard: React.FC<ChallengeLeaderboardProps> = ({
  challengeId,
  onGoHome,
  onNewChallenge,
}) => {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [sortedParticipants, setSortedParticipants] = useState<ChallengeParticipant[]>([]);

  useEffect(() => {
    // Load challenge from localStorage
    const savedChallenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const foundChallenge = savedChallenges.find((c: any) => c.id === challengeId);
    
    if (foundChallenge) {
      setChallenge(foundChallenge);
      
      // Sort participants by score, then by time
      const sorted = [...foundChallenge.participants]
        .filter(p => p.score !== undefined)
        .sort((a, b) => {
          if (b.score! !== a.score!) return b.score! - a.score!;
          // If scores are equal, sort by time (lower is better)
          const timeA = parseTimeToSeconds(a.timeTaken || '00:00');
          const timeB = parseTimeToSeconds(b.timeTaken || '00:00');
          return timeA - timeB;
        })
        .map((p, index) => ({ ...p, rank: index + 1 }));
      
      setSortedParticipants(sorted);

      // Fire confetti for the winner
      if (sorted.length > 0 && sorted[0].userId === user?.id) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);
      }
    }
  }, [challengeId, user]);

  const parseTimeToSeconds = (time: string): number => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-400';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-400 to-orange-500';
      default:
        return 'from-blue-400 to-blue-500';
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 2:
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 3:
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const winner = sortedParticipants[0];
  const isWinner = winner?.userId === user?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Winner Announcement */}
        <Card className="p-8 bg-white border-0 shadow-lg mb-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${getRankColor(1)} rounded-full mb-4 animate-bounce`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl mb-2">Challenge Complete!</h1>
            <p className="text-muted-foreground text-xl">
              {isWinner ? (
                <>Congratulations! You won! 🏆</>
              ) : (
                <>Winner: {winner?.userName}!</>
              )}
            </p>
          </div>

          {/* Top 3 Podium */}
          {sortedParticipants.length >= 3 && (
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Badge className={`mb-2 border-2 ${getRankBadgeColor(2)}`}>
                  <Medal className="w-3 h-3 mr-1" />
                  2nd
                </Badge>
                <div className={`w-20 h-20 bg-gradient-to-br ${getRankColor(2)} rounded-2xl flex items-center justify-center text-white text-2xl mb-2`}>
                  {sortedParticipants[1].userName[0].toUpperCase()}
                </div>
                <p className="text-sm font-medium text-center">{sortedParticipants[1].userName}</p>
                <p className="text-xs text-muted-foreground">{sortedParticipants[1].accuracy}%</p>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center -mt-8">
                <Badge className={`mb-2 border-2 ${getRankBadgeColor(1)}`}>
                  <Crown className="w-3 h-3 mr-1" />
                  Winner
                </Badge>
                <div className={`w-24 h-24 bg-gradient-to-br ${getRankColor(1)} rounded-2xl flex items-center justify-center text-white text-3xl mb-2 shadow-lg`}>
                  {sortedParticipants[0].userName[0].toUpperCase()}
                </div>
                <p className="text-sm font-medium text-center">{sortedParticipants[0].userName}</p>
                <p className="text-xs text-muted-foreground">{sortedParticipants[0].accuracy}%</p>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Badge className={`mb-2 border-2 ${getRankBadgeColor(3)}`}>
                  <Medal className="w-3 h-3 mr-1" />
                  3rd
                </Badge>
                <div className={`w-20 h-20 bg-gradient-to-br ${getRankColor(3)} rounded-2xl flex items-center justify-center text-white text-2xl mb-2`}>
                  {sortedParticipants[2].userName[0].toUpperCase()}
                </div>
                <p className="text-sm font-medium text-center">{sortedParticipants[2].userName}</p>
                <p className="text-xs text-muted-foreground">{sortedParticipants[2].accuracy}%</p>
              </div>
            </div>
          )}
        </Card>

        {/* Leaderboard */}
        <Card className="p-6 bg-white border-0 shadow-lg mb-6">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Final Leaderboard
          </h2>

          <div className="space-y-3">
            {sortedParticipants.map((participant) => {
              const isCurrentUser = participant.userId === user?.id;
              
              return (
                <div
                  key={participant.userId}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300'
                      : participant.rank === 1
                      ? 'bg-yellow-50 border-2 border-yellow-300'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    {getRankIcon(participant.rank!)}
                  </div>

                  {/* Avatar */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${getRankColor(participant.rank!)} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                    {participant.userName[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{participant.userName}</p>
                      {isCurrentUser && (
                        <Badge className="bg-purple-500 text-white">You</Badge>
                      )}
                      {participant.rank === 1 && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Target className="w-3 h-3" />
                        <span className="text-xs">Score</span>
                      </div>
                      <p className="font-bold text-lg">{participant.score}/{challenge.numberOfQuestions}</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Zap className="w-3 h-3" />
                        <span className="text-xs">Accuracy</span>
                      </div>
                      <p className="font-bold text-lg">{participant.accuracy}%</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">Time</span>
                      </div>
                      <p className="font-bold text-lg">{participant.timeTaken}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Challenge Info */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 mb-6">
          <h3 className="text-lg mb-3">Challenge Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Level</p>
              <p className="text-2xl font-bold">{challenge.level}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Questions</p>
              <p className="text-2xl font-bold">{challenge.numberOfQuestions}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Participants</p>
              <p className="text-2xl font-bold">{sortedParticipants.length}</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onGoHome}
            className="flex-1"
            variant="outline"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={onNewChallenge}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};
