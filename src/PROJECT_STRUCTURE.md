# Project Structure

This document describes the structure of the Quiz Application frontend.

## 📁 Root Directory

```
quiz-app/
├── App.tsx                 # Main application entry point and router
├── README.md              # Project overview and quick start guide
├── USER_GUIDE.md          # Comprehensive user documentation
├── CHANGELOG.md           # Version history and changes
├── PROJECT_STRUCTURE.md   # This file
├── components/            # React components
├── context/               # React context providers
├── data/                  # Static data (quiz questions)
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

## 🧩 Components Directory

### Main Pages
```
components/
├── Login.tsx              # User login page
├── Signup.tsx             # User registration page
├── Home.tsx               # Dashboard with quizzes and stats
├── QuizPage.tsx           # Quiz taking interface
├── QuizResult.tsx         # Results display after quiz
├── QuizHistory.tsx        # Complete quiz history
├── Profile.tsx            # User profile management
├── Navigation.tsx         # Top navigation bar
└── ui/                    # UI component library
```

### UI Components (shadcn/ui)
```
components/ui/
├── button.tsx             # Button component
├── card.tsx               # Card container
├── input.tsx              # Input field
├── label.tsx              # Form label
├── badge.tsx              # Badge/tag component
├── progress.tsx           # Progress bar
├── [36 other components]  # Full shadcn/ui library
└── utils.ts               # Utility functions
```

### Protected Components
```
components/figma/
└── ImageWithFallback.tsx  # Image component with fallback (protected)
```

## 🎯 Context

```
context/
└── AuthContext.tsx        # Authentication and user state management
```

**Functions:**
- User authentication (login, signup, logout)
- Session management
- Quiz result tracking
- User profile updates
- localStorage integration

## 📊 Data

```
data/
└── quizzes.ts            # Quiz questions and categories
```

**Contains:**
- 4 quiz categories
- 10 questions per quiz
- Question options and correct answers
- Quiz metadata (difficulty, time limit)

## 🎨 Styles

```
styles/
└── globals.css           # Global Tailwind CSS and custom styles
```

**Includes:**
- Tailwind CSS imports
- CSS custom properties (colors, fonts)
- Global typography
- Component-specific styles

## 📝 Types

```
types/
└── index.ts              # TypeScript type definitions
```

**Defines:**
- `User` - User account interface
- `Quiz` - Quiz structure
- `Question` - Question structure
- `QuizResult` - Result data structure

## 🔑 Key Files Explained

### App.tsx
- Main application component
- Client-side routing logic
- Page state management
- AuthProvider wrapper
- Conditional rendering based on auth state

### AuthContext.tsx
- React Context for authentication
- localStorage operations
- User state management
- Quiz result storage
- Statistics calculation

### Login.tsx & Signup.tsx
- Authentication forms
- Input validation
- Error handling
- Password visibility toggle

### Home.tsx
- Dashboard view
- Statistics display
- Available quizzes grid
- Recent activity
- Navigation to other pages

### QuizPage.tsx
- Quiz taking interface
- Timer countdown
- Question navigation
- Answer selection
- Progress tracking
- Auto-submit on timeout

### QuizResult.tsx
- Score display
- Grade calculation
- Statistics breakdown
- Retake option

### QuizHistory.tsx
- Complete quiz history list
- Summary statistics
- Filterable/searchable (future)

### Profile.tsx
- User information display
- Profile editing
- Statistics overview
- Achievement badges

### Navigation.tsx
- Top navigation bar
- Mobile hamburger menu
- User info display
- Logout button

## 📦 localStorage Structure

### Keys Used
```javascript
// User accounts
quiz_app_users: {
  "user@email.com": {
    password: "hashed_password",
    userData: { User object }
  }
}

// Current session
quiz_app_current_user: "user@email.com"

// Quiz results
quiz_app_results: {
  "userId": [
    { QuizResult object },
    { QuizResult object },
    ...
  ]
}
```

## 🔄 Data Flow

### Authentication Flow
```
1. User enters credentials
   ↓
2. AuthContext validates against localStorage
   ↓
3. Set current user session
   ↓
4. Load user's quiz history
   ↓
5. Calculate statistics
   ↓
6. Render authenticated app
```

### Quiz Taking Flow
```
1. User selects quiz
   ↓
2. QuizPage component loads
   ↓
3. Timer starts
   ↓
4. User answers questions
   ↓
5. User submits or timer expires
   ↓
6. Calculate score and grade
   ↓
7. Save result to localStorage
   ↓
8. Update user statistics
   ↓
9. Display QuizResult component
```

## 🚀 Build Process

### Development
```bash
npm run dev
# Starts Vite dev server at localhost:5173
```

### Production
```bash
npm run build
# Creates optimized build in /dist directory
```

### Preview Production Build
```bash
npm run preview
# Preview production build locally
```

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **sm**: 640px - Small devices
- **md**: 768px - Medium devices (tablets)
- **lg**: 1024px - Large devices (desktops)
- **xl**: 1280px - Extra large screens

### Mobile-First Approach
- Default styles for mobile
- Progressive enhancement for larger screens
- Hamburger menu on mobile
- Responsive grid layouts

## 🎨 Styling Approach

### Tailwind CSS
- Utility-first CSS framework
- Custom color scheme in globals.css
- Component-specific utilities

### Design Tokens
```css
--background: White
--foreground: Dark gray
--primary: Purple/Blue gradient
--secondary: Light purple
--muted: Light gray
--accent: Blue
```

## 🔐 Security Considerations

### Client-Side Only
- No server-side validation
- Data visible in browser DevTools
- Suitable for demo/learning purposes
- Not recommended for sensitive data

### Best Practices
- Input validation on forms
- Password confirmation
- Email format validation
- Protected routes (logged in only)

## 🧪 Testing (Future)

Suggested test structure:
```
tests/
├── unit/
│   ├── AuthContext.test.tsx
│   ├── quizzes.test.ts
│   └── utils.test.ts
├── integration/
│   ├── auth-flow.test.tsx
│   └── quiz-flow.test.tsx
└── e2e/
    ├── login.spec.ts
    └── quiz-taking.spec.ts
```

## 📚 Dependencies

### Production
- react
- react-dom
- lucide-react (icons)
- tailwindcss
- @radix-ui/* (UI primitives for shadcn/ui)

### Development
- vite
- typescript
- @vitejs/plugin-react
- tailwindcss
- postcss
- autoprefixer

## 🔮 Future Enhancements

### Planned Features
- Dark mode support
- More quiz categories
- Quiz creation interface
- Social sharing
- Achievements system
- Leaderboard (would need backend)
- Export results to PDF
- Print certificates

### Suggested Improvements
- Add unit tests
- Add e2e tests
- Implement error boundaries
- Add loading skeletons
- Optimize bundle size
- Add PWA support
- Implement offline mode

## 📖 Documentation

- **README.md** - Quick start and overview
- **USER_GUIDE.md** - Complete user documentation
- **CHANGELOG.md** - Version history
- **PROJECT_STRUCTURE.md** - This file

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

---

**Last Updated:** November 3, 2025
