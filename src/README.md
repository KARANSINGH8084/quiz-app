# Quiz Application

A fully functional quiz application built entirely with **React** and **localStorage** - no backend required!

![Quiz App](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔐 Authentication
- User signup and login with validation
- **Admin panel** with separate login (username: `admin`, password: `admin123`)
- Session persistence using localStorage
- Profile management
- Role-based access control (admin/user)

### 📝 Quiz System
- 4 quiz categories: General Knowledge, Science, History, Technology
- 10 multiple-choice questions per quiz
- Timed quizzes with countdown timer
- Question navigation (next, previous, jump to any)
- Visual progress tracking

### 📊 Results & Statistics
- Instant results with grade (A+ to D)
- Detailed statistics dashboard
- Complete quiz history
- Track total attempts, average score, best score

### 🎨 User Interface
- Fully responsive (desktop, tablet, mobile)
- Clean, minimal design with light colors
- Smooth animations
- Mobile-friendly navigation

### 🛡️ Admin Panel
- Separate admin dashboard with statistics
- User management (view all users, individual details, quiz history)
- Question management (add, edit, delete quiz questions)
- System-wide statistics and analytics
- Role-protected routes

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 🎯 How It Works

All data is stored locally in your browser using **localStorage**:
- User accounts (email, password, profile)
- Quiz results and history
- Personal statistics

No server, no database, no backend required!

## 📱 Usage

### For Users
1. **Sign Up** - Create an account with name, email, and password
2. **Take Quizzes** - Choose from 4 different quiz categories
3. **View Results** - See your score and grade immediately
4. **Track Progress** - Monitor your improvement over time

### For Administrators
1. **Login** - Use admin credentials (`admin` / `admin123`)
2. **Monitor** - View system statistics and user activity
3. **Manage Users** - View user details and quiz history
4. **Manage Content** - Add, edit, or delete quiz questions

## 🏗️ Project Structure

```
├── App.tsx                 # Main application router
├── components/             # React components
│   ├── Login.tsx          # Login page
│   ├── Signup.tsx         # Signup page
│   ├── Home.tsx           # Dashboard/home page
│   ├── QuizPage.tsx       # Quiz taking interface
│   ├── QuizResult.tsx     # Results display
│   ├── QuizHistory.tsx    # Quiz history
│   ├── Profile.tsx        # User profile
│   ├── Navigation.tsx     # Navigation bar
│   └── ui/                # UI components (shadcn/ui)
├── context/
│   └── AuthContext.tsx    # Authentication context
├── data/
│   └── quizzes.ts        # Quiz questions data
├── types/
│   └── index.ts          # TypeScript types
└── styles/
    └── globals.css        # Global styles
```

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **localStorage** - Data persistence

## 📦 Deployment

Deploy to any static hosting service:

### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

### Vercel
- Import repository
- Framework preset: Vite
- Deploy!

### GitHub Pages
```bash
npm install gh-pages --save-dev
npm run build
npx gh-pages -d dist
```

## 🎮 Quiz Categories

1. **General Knowledge** (Easy) - 10 min
2. **Science Basics** (Medium) - 12 min
3. **History Quiz** (Medium) - 15 min
4. **Technology Trivia** (Hard) - 12 min

## 📊 Statistics Tracked

- **Total Attempts** - Number of quizzes taken
- **Average Score** - Overall performance
- **Best Score** - Highest percentage achieved
- **Not Attempted** - Quizzes yet to try

## 🔒 Privacy

- All data stored locally in browser
- No data sent to servers
- No tracking or analytics
- No cookies required

## ⚠️ Limitations

- Data is per browser/device only
- No data sync across devices
- No password recovery feature
- Data lost if browser storage cleared

## 📖 Documentation

- [USER_GUIDE.md](./USER_GUIDE.md) - Detailed user guide
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Complete admin panel documentation

## 🤝 Contributing

Feel free to fork and customize this project!

## 📄 License

MIT License - Free to use for personal or commercial purposes.

---

**Built with ❤️ using React and Tailwind CSS**
