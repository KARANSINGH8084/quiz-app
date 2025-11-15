# 🗺️ Challenge Mode - Code Locations Guide

## 📍 Quick Navigation

This document shows **exactly where** to find Challenge Mode code in your project.

---

## 📁 New Files Created

### 1. `/components/ChallengeMode.tsx` ✅

**Lines:** ~700+ lines  
**Purpose:** Main Challenge Mode interface  
**Contains:**
- Challenge menu (Create/Join)
- Create challenge screen with level/question selection
- Join challenge screen with code input
- Waiting room with participant list
- Challenge code generation
- LocalStorage management

**Key Functions:**
```typescript
- generateChallengeCode()        // Line ~40
- handleCreateChallenge()        // Line ~60
- handleJoinChallenge()          // Line ~90
- handleStartChallenge()         // Line ~140
- copyToClipboard()              // Line ~165
```

**Views:**
- `view === 'menu'` → Main menu (Line ~185)
- `view === 'create'` → Create challenge (Line ~235)
- `view === 'join'` → Join challenge (Line ~300)
- `view === 'waiting'` → Waiting room (Line ~350)

---

### 2. `/components/ChallengeLeaderboard.tsx` ✅

**Lines:** ~450+ lines  
**Purpose:** Display challenge results  
**Contains:**
- Leaderboard display
- Rank calculation
- Winner celebration
- Confetti animation
- Top 3 podium
- Challenge stats

**Key Functions:**
```typescript
- parseTimeToSeconds()           // Line ~50
- getRankIcon()                  // Line ~65
- getRankColor()                 // Line ~75
- getRankBadgeColor()            // Line ~85
```

**Features:**
- Winner announcement (Line ~120)
- Top 3 podium display (Line ~140)
- Full leaderboard (Line ~220)
- Challenge details card (Line ~320)
- Action buttons (Line ~350)

---

## 🔧 Modified Files

### 3. `/App.tsx` - Challenge Integration

**Lines Modified:**

#### Imports (Lines 1-22):
```typescript
import { ChallengeMode } from './components/ChallengeMode';
import { ChallengeLeaderboard } from './components/ChallengeLeaderboard';
import { generateLevelBasedQuiz } from './data/medicalQuizzes';
```

#### Type Definitions (Line 23):
```typescript
type Page = 'home' | 'quiz' | 'result' | 'history' | 'profile' | 'challenge' | 'challenge-result';
```

#### State Variables (Line 34):
```typescript
const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null);
```

#### Handler Functions:

**`handleStartChallenge()`** (Lines ~140-160):
```typescript
const handleStartChallenge = (challengeId: string) => {
  setCurrentChallengeId(challengeId);
  // Load challenge and generate quiz
  // Navigate to quiz page
};
```

**`handleQuizComplete()`** (Lines ~165-195):
```typescript
// Updated to handle challenge results
if (currentChallengeId) {
  // Update challenge in localStorage
  // Navigate to challenge-result page
}
```

**`handleQuizExit()`** (Lines ~195-200):
```typescript
// Updated to clear challenge ID
setCurrentChallengeId(null);
```

**`handleGoHome()`** (Lines ~215-220):
```typescript
// Updated to clear challenge state
setCurrentChallengeId(null);
```

**`handleGoToChallenge()`** (Lines ~223-225):
```typescript
const handleGoToChallenge = () => {
  setCurrentPage('challenge');
};
```

**`handleNewChallenge()`** (Lines ~228-233):
```typescript
const handleNewChallenge = () => {
  setCurrentChallengeId(null);
  setCurrentPage('challenge');
};
```

#### Quiz Selection (Lines ~236-250):
```typescript
// Added support for temp_challenge_quiz
if (selectedQuizId === 'temp_challenge_quiz') {
  const tempChallengeQuizData = localStorage.getItem('temp_challenge_quiz');
  // ...
}
```

#### Page Rendering (Lines ~275-305):
```typescript
// Added challenge pages
case 'challenge':
  return <ChallengeMode onBack={handleGoHome} onStartChallenge={handleStartChallenge} />;

case 'challenge-result':
  return <ChallengeLeaderboard 
    challengeId={currentChallengeId}
    onGoHome={handleGoHome}
    onNewChallenge={handleNewChallenge}
  />;
```

#### Navigation Visibility (Line ~323):
```typescript
// Hide navigation for challenge pages
{currentPage !== 'quiz' && currentPage !== 'result' && 
 currentPage !== 'challenge' && currentPage !== 'challenge-result' && (
  <Navigation />
)}
```

---

### 4. `/components/Home.tsx` - Challenge Button

**Lines Modified:**

#### Props Interface (Line 18):
```typescript
interface HomeProps {
  onStartQuiz: (quizId: string) => void;
  onViewHistory: () => void;
  onStartChallenge?: () => void;  // ✅ Already existed
}
```

#### Challenge Mode Section (Lines 267-287):

**BEFORE:**
```typescript
<Button onClick={() => toast.info('Challenge mode coming soon! 🎮')} disabled={!onStartChallenge}>
  Coming Soon
</Button>
```

**AFTER:**
```typescript
<Button onClick={() => {
  if (onStartChallenge) {
    toast.success('Starting Challenge Mode! 🎮');
    onStartChallenge();
  }
}}>
  Enter Arena 🏆
</Button>
```

**Visual Changes:**
- Added `animate-pulse` to icon
- Added "NEW!" badge
- Changed button text to "Enter Arena 🏆"
- Changed onClick from showing toast to actually launching challenge mode

---

## 💾 Data Storage Locations

### LocalStorage Keys:

1. **`challenges`** - Array of all challenges
   - Created in: `ChallengeMode.tsx` (Line ~75, ~115)
   - Updated in: `ChallengeMode.tsx` (Line ~125), `App.tsx` (Line ~170)
   - Read in: `ChallengeLeaderboard.tsx` (Line ~25)

2. **`temp_challenge_quiz`** - Current challenge quiz
   - Created in: `App.tsx` (Line ~155)
   - Read in: `App.tsx` (Line ~240)

---

## 🎨 UI Components Used

### From `/components/ui/`:

| Component | Used In | Purpose |
|-----------|---------|---------|
| Card | Both files | Container boxes |
| Button | Both files | All interactive buttons |
| Badge | Both files | Status labels, rank badges |
| Input | ChallengeMode | Challenge code input |
| Skeleton | ChallengeLeaderboard | Loading state |

### Icons from `lucide-react`:

| Icon | Used In | Purpose |
|------|---------|---------|
| Users | ChallengeMode, Home | Multiplayer symbol |
| Trophy | ChallengeLeaderboard | Winner display |
| Crown | ChallengeLeaderboard | 1st place |
| Medal | ChallengeLeaderboard | 2nd & 3rd place |
| Plus | ChallengeMode | Create challenge |
| Share2 | ChallengeMode | Join/Share challenge |
| Play | ChallengeMode | Start button |
| Clock | Both files | Time display |
| Target | Both files | Accuracy |
| Zap | Both files | Performance |
| ArrowLeft | ChallengeMode | Back button |
| Home | ChallengeLeaderboard | Home button |
| RotateCcw | ChallengeLeaderboard | New challenge |
| Star | ChallengeLeaderboard | Featured winner |

---

## 🔍 Finding Specific Features

### Challenge Creation:

**File:** `/components/ChallengeMode.tsx`  
**Function:** `handleCreateChallenge()`  
**Lines:** ~60-90  
**What it does:**
1. Creates new Challenge object
2. Generates 6-digit code
3. Saves to localStorage
4. Shows waiting room

### Challenge Joining:

**File:** `/components/ChallengeMode.tsx`  
**Function:** `handleJoinChallenge()`  
**Lines:** ~90-125  
**What it does:**
1. Validates code
2. Finds challenge in localStorage
3. Adds participant
4. Updates localStorage
5. Shows waiting room

### Quiz Generation:

**File:** `/App.tsx`  
**Function:** `handleStartChallenge()`  
**Lines:** ~140-160  
**What it does:**
1. Loads challenge from localStorage
2. Calls `generateLevelBasedQuiz()`
3. Saves as `temp_challenge_quiz`
4. Starts quiz

### Result Tracking:

**File:** `/App.tsx`  
**Function:** `handleQuizComplete()`  
**Lines:** ~165-195  
**What it does:**
1. Checks if challenge quiz
2. Updates participant scores
3. Changes status to 'completed'
4. Saves to localStorage
5. Shows leaderboard

### Leaderboard Display:

**File:** `/components/ChallengeLeaderboard.tsx`  
**useEffect Hook:**  
**Lines:** ~30-60  
**What it does:**
1. Loads challenge from localStorage
2. Sorts participants by score/time
3. Assigns ranks
4. Fires confetti for winner

---

## 🎯 Key Code Snippets

### 1. Challenge Code Generation
**Location:** `/components/ChallengeMode.tsx` Line ~40
```typescript
const generateChallengeCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
```

### 2. Rank Calculation
**Location:** `/components/ChallengeLeaderboard.tsx` Lines ~35-50
```typescript
const sorted = [...foundChallenge.participants]
  .filter(p => p.score !== undefined)
  .sort((a, b) => {
    if (b.score! !== a.score!) return b.score! - a.score!;
    const timeA = parseTimeToSeconds(a.timeTaken || '00:00');
    const timeB = parseTimeToSeconds(b.timeTaken || '00:00');
    return timeA - timeB;
  })
  .map((p, index) => ({ ...p, rank: index + 1 }));
```

### 3. Confetti Animation
**Location:** `/components/ChallengeLeaderboard.tsx` Lines ~55-62
```typescript
if (sorted.length > 0 && sorted[0].userId === user?.id) {
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 500);
}
```

### 4. Challenge Status Update
**Location:** `/App.tsx` Lines ~165-190
```typescript
if (currentChallengeId) {
  const savedChallenges = JSON.parse(localStorage.getItem('challenges') || '[]');
  const updatedChallenges = savedChallenges.map((c: any) => {
    if (c.id === currentChallengeId) {
      const updatedParticipants = c.participants.map((p: any) => {
        if (p.userId === user?.id) {
          return {
            ...p,
            score: result.score,
            accuracy: result.percentage,
            timeTaken: result.timeTaken,
          };
        }
        return p;
      });
      return { ...c, participants: updatedParticipants, status: 'completed' };
    }
    return c;
  });
  localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
}
```

---

## 📊 Component Tree

```
App.tsx
├── Home.tsx
│   └── Challenge Mode Button
│       └── onClick → handleGoToChallenge()
│
├── ChallengeMode.tsx
│   ├── Menu View
│   │   ├── Create Button → setView('create')
│   │   └── Join Button → setView('join')
│   │
│   ├── Create View
│   │   ├── Level Selection
│   │   ├── Question Count Slider
│   │   └── Create Button → handleCreateChallenge()
│   │
│   ├── Join View
│   │   ├── Code Input
│   │   └── Join Button → handleJoinChallenge()
│   │
│   └── Waiting View
│       ├── Challenge Code Display
│       ├── Participants List
│       └── Start Button → handleStartChallenge()
│
├── QuizPage.tsx (existing)
│   └── onComplete → handleQuizComplete()
│
└── ChallengeLeaderboard.tsx
    ├── Winner Announcement
    ├── Top 3 Podium
    ├── Full Leaderboard
    ├── Challenge Details
    └── Action Buttons
```

---

## 🔗 Function Call Flow

```
1. User clicks "Enter Arena" in Home
   ↓
2. App.handleGoToChallenge() called
   ↓
3. setCurrentPage('challenge')
   ↓
4. ChallengeMode component renders
   ↓
5. User creates/joins challenge
   ↓
6. handleCreateChallenge() or handleJoinChallenge()
   ↓
7. Challenge saved to localStorage
   ↓
8. Waiting room shown
   ↓
9. Host clicks "Start Challenge"
   ↓
10. handleStartChallenge() in ChallengeMode
    ↓
11. onStartChallenge prop called (App.handleStartChallenge)
    ↓
12. Quiz generated and saved
    ↓
13. QuizPage renders
    ↓
14. User completes quiz
    ↓
15. onComplete called (App.handleQuizComplete)
    ↓
16. Challenge updated in localStorage
    ↓
17. setCurrentPage('challenge-result')
    ↓
18. ChallengeLeaderboard renders
    ↓
19. Ranks calculated and displayed
    ↓
20. Winner gets confetti! 🎉
```

---

## 🎨 Styling Locations

### Gradient Classes:
- **Challenge button:** `from-orange-500 to-red-500`
- **1st place:** `from-yellow-400 to-orange-400`
- **2nd place:** `from-gray-300 to-gray-400`
- **3rd place:** `from-orange-400 to-orange-500`
- **Other ranks:** `from-blue-400 to-blue-500`

### Badge Colors:
- **1st place:** `bg-yellow-100 text-yellow-700 border-yellow-300`
- **2nd place:** `bg-gray-100 text-gray-700 border-gray-300`
- **3rd place:** `bg-orange-100 text-orange-700 border-orange-300`
- **"You" badge:** `bg-purple-500 text-white`
- **"NEW!" badge:** `bg-green-500 text-white animate-pulse`

### Animations:
- **Pulse:** `animate-pulse` on Users icon, NEW badge
- **Bounce:** `animate-bounce` on trophy icons
- **Scale:** `hover:scale-105` on clickable cards
- **Shadow:** `hover:shadow-xl` on card hover

---

## 📝 To Modify Challenge Mode

### Change Challenge Code Length:
**File:** `/components/ChallengeMode.tsx`  
**Line:** ~40  
**Current:** `.substring(2, 8)` (6 characters)  
**Change to:** `.substring(2, 10)` (8 characters)

### Change Minimum Participants:
**File:** `/components/ChallengeMode.tsx`  
**Line:** ~435  
**Current:** `currentChallenge.participants.length < 2`  
**Change to:** `currentChallenge.participants.length < 4` (for 4 players)

### Change Winner Celebration:
**File:** `/components/ChallengeLeaderboard.tsx`  
**Lines:** ~55-62  
**Modify:** `particleCount`, `spread`, `origin`

### Change Rank Colors:
**File:** `/components/ChallengeLeaderboard.tsx`  
**Function:** `getRankColor()` (Line ~75)

---

## 🎯 Testing Checklist

### Test Locations:

1. **Challenge Creation:**
   - File: `/components/ChallengeMode.tsx`
   - Test: Create challenge with each level
   - Expected: Code generated, waiting room shown

2. **Challenge Joining:**
   - File: `/components/ChallengeMode.tsx`
   - Test: Join with valid/invalid codes
   - Expected: Join successful or error toast

3. **Waiting Room:**
   - File: `/components/ChallengeMode.tsx`
   - Test: Multiple participants join
   - Expected: All shown in list, host can start

4. **Quiz Generation:**
   - File: `/App.tsx`
   - Test: Start challenge
   - Expected: Quiz loads, questions match level

5. **Result Tracking:**
   - File: `/App.tsx`
   - Test: Complete quiz
   - Expected: Score saved to challenge

6. **Leaderboard:**
   - File: `/components/ChallengeLeaderboard.tsx`
   - Test: View results
   - Expected: Correct ranking, winner confetti

---

## 🚀 Quick Start Development

### To Add New Feature:

1. **New Challenge Type:**
   - Modify: `/types/index.ts` - Add type
   - Update: `/components/ChallengeMode.tsx` - Add UI
   - Update: `/App.tsx` - Add logic

2. **New Stat Tracking:**
   - Modify: `/types/index.ts` - Add to ChallengeParticipant
   - Update: `/App.tsx` - Track in handleQuizComplete
   - Update: `/components/ChallengeLeaderboard.tsx` - Display

3. **New Animation:**
   - Add to: `/components/ChallengeLeaderboard.tsx`
   - Use: `confetti` or Tailwind animation classes

---

## 📖 Summary

### Files to Check:

| File | Purpose | Key Lines |
|------|---------|-----------|
| `/components/ChallengeMode.tsx` | Challenge interface | 1-700 |
| `/components/ChallengeLeaderboard.tsx` | Results display | 1-450 |
| `/App.tsx` | Integration logic | 1-22 (imports), 140-233 (handlers), 236-250 (quiz), 275-305 (render) |
| `/components/Home.tsx` | Entry button | 267-287 |
| `/types/index.ts` | Type definitions | 78-100 |

### Quick Access:

- **Start here:** `/components/Home.tsx` Line 267 ("Enter Arena" button)
- **Challenge creation:** `/components/ChallengeMode.tsx` Line 60
- **Challenge joining:** `/components/ChallengeMode.tsx` Line 90
- **Quiz start:** `/App.tsx` Line 140
- **Results:** `/components/ChallengeLeaderboard.tsx` Line 30

---

**All code is documented and ready to use! 🚀**

*Last Updated: Current Session*
