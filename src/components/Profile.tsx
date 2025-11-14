// ✅ UPDATED: Enhanced with gamification features
import React, { useState } from 'react';
import { User, Mail, Calendar, Trophy, BookOpen, Target, Edit2, Save, X, Star, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useAuth } from '../context/AuthContext';
import { XP_THRESHOLDS, AVATAR_EMOJIS, Rank } from '../types';

export const Profile: React.FC = () => {
  const { user, updateProfile, updateAvatar } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateProfile({ name, email });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setIsEditing(false);
  };

  const handleAvatarSelect = (avatar: string) => {
    updateAvatar(avatar);
    setShowAvatarPicker(false);
  };

  if (!user) return null;

  const currentXP = user.xp || 0;
  const currentRank = user.rank || 'Snake';
  const currentLevel = user.level || 1;

  // Calculate progress to next rank
  const ranks: Rank[] = ['Snake', 'Lion', 'Prince', 'King'];
  const currentRankIndex = ranks.indexOf(currentRank);
  const nextRank = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null;
  const currentThreshold = XP_THRESHOLDS[currentRank];
  const nextThreshold = nextRank ? XP_THRESHOLDS[nextRank] : currentThreshold;
  const progressToNext = nextRank ? ((currentXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;

  // Available avatars based on rank
  const availableAvatars = [
    { emoji: '🐍', rank: 'Snake', unlocked: currentRankIndex >= 0 },
    { emoji: '🦁', rank: 'Lion', unlocked: currentRankIndex >= 1 },
    { emoji: '👑', rank: 'Prince', unlocked: currentRankIndex >= 2 },
    { emoji: '🏆', rank: 'King', unlocked: currentRankIndex >= 3 },
    // Additional unlocked avatars
    { emoji: '⚕️', rank: 'Snake', unlocked: currentRankIndex >= 0 },
    { emoji: '🩺', rank: 'Lion', unlocked: currentRankIndex >= 1 },
    { emoji: '💊', rank: 'Prince', unlocked: currentRankIndex >= 2 },
    { emoji: '🔬', rank: 'King', unlocked: currentRankIndex >= 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-white border-0 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* ✅ NEW: Avatar with rank badge */}
                  <div className="relative">
                    <button
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                      className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-5xl hover:scale-105 transition-transform cursor-pointer"
                    >
                      {user.selectedAvatar || '🐍'}
                    </button>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                      {currentRank}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-2xl mb-1">{user.name}</h2>
                    <p className="text-muted-foreground">Medical Student • Level {currentLevel}</p>
                    {/* ✅ NEW: XP Display */}
                    <div className="flex items-center gap-2 mt-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{currentXP} XP</span>
                    </div>
                  </div>
                </div>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>

              {/* ✅ NEW: Avatar Picker */}
              {showAvatarPicker && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-sm mb-3">Select Avatar</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {availableAvatars.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => avatar.unlocked && handleAvatarSelect(avatar.emoji)}
                        disabled={!avatar.unlocked}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-all ${
                          avatar.unlocked
                            ? 'bg-white hover:scale-110 cursor-pointer shadow-sm'
                            : 'bg-gray-200 opacity-50 cursor-not-allowed'
                        } ${user.selectedAvatar === avatar.emoji ? 'ring-2 ring-purple-500' : ''}`}
                        title={avatar.unlocked ? `Unlocked at ${avatar.rank}` : `Unlock at ${avatar.rank}`}
                      >
                        {avatar.unlocked ? avatar.emoji : '🔒'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Information */}
              <div className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input-background border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input-background border-0"
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        disabled={saving}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Joined</p>
                          <p>{new Date(user.joined_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* ✅ NEW: Rank Progress Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-blue-500 text-white border-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg mb-1">Current Rank: {currentRank}</h3>
                  <p className="text-sm opacity-90">
                    {nextRank ? `${nextThreshold - currentXP} XP to ${nextRank}` : 'Max Rank Achieved!'}
                  </p>
                </div>
                <div className="text-5xl">{AVATAR_EMOJIS[currentRank]}</div>
              </div>
              {nextRank && (
                <>
                  <Progress value={progressToNext} className="h-3 bg-white/20" />
                  <div className="flex justify-between mt-2 text-sm opacity-90">
                    <span>{currentXP} XP</span>
                    <span>{nextThreshold} XP</span>
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* ✅ UPDATED: Enhanced Stats */}
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-xl mb-6">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Quizzes</p>
                      <p className="text-xl">{user.total_quizzes}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-xl">{user.average_score}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Attempts</p>
                      <p className="text-xl">{user.total_attempts || 0}</p>
                    </div>
                  </div>
                </div>

                {/* ✅ NEW: XP and Level Stats */}
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total XP</p>
                      <p className="text-xl">{currentXP}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Level</p>
                      <p className="text-xl">Level {currentLevel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* ✅ NEW: Rank Milestones */}
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-xl mb-4">Rank Journey</h3>
              <div className="space-y-3">
                {ranks.map((rank, index) => {
                  const unlocked = currentRankIndex >= index;
                  return (
                    <div
                      key={rank}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        unlocked ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`text-3xl ${!unlocked && 'opacity-30'}`}>
                        {AVATAR_EMOJIS[rank]}
                      </div>
                      <div className="flex-1">
                        <p className={unlocked ? '' : 'text-muted-foreground'}>{rank}</p>
                        <p className="text-sm text-muted-foreground">
                          {XP_THRESHOLDS[rank]} XP required
                        </p>
                      </div>
                      {unlocked && (
                        <Award className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
