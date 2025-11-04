# Getting Started with Quiz Application

Welcome! This guide will help you get the Quiz Application up and running in minutes.

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Installation Steps

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React 18
- TypeScript
- Tailwind CSS
- Vite
- UI components

### 2. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

Your browser should automatically open. If not, manually navigate to the URL shown in your terminal.

## 🎮 First Steps

### Create Your First Account

1. When the app loads, you'll see the **Login** page
2. Click on **"Sign up"** at the bottom
3. Fill in the form:
   - Full Name: `Your Name`
   - Email: `your@email.com`
   - Password: At least 6 characters
   - Confirm Password: Same as password
4. Click **"Create Account"**

You'll be automatically logged in and taken to the dashboard!

### Take Your First Quiz

1. On the **Home** page, you'll see 4 available quizzes
2. Choose a quiz (we recommend starting with "General Knowledge")
3. Click **"Start Quiz"**
4. Answer all 10 questions
5. Watch the timer in the top right
6. Click **"Submit Quiz"** when done
7. See your results immediately!

### Explore the App

- **Home** - View your statistics and available quizzes
- **History** - See all your past quiz attempts
- **Profile** - Update your account information

## 🎯 What's Included

### Quiz Categories

1. **🎯 General Knowledge** (Easy)
   - Topics: Geography, History, Art, Math, Literature
   - Time: 10 minutes
   - Perfect for beginners

2. **🔬 Science Basics** (Medium)
   - Topics: Physics, Biology, Chemistry, Astronomy
   - Time: 12 minutes
   - Basic science knowledge

3. **📚 History Quiz** (Medium)
   - Topics: World History, Famous Figures, Events
   - Time: 15 minutes
   - Test your history knowledge

4. **💻 Technology Trivia** (Hard)
   - Topics: Computer Science, Programming, Tech History
   - Time: 12 minutes
   - For tech enthusiasts

### Your Dashboard Shows

- **Total Attempts** - How many quizzes you've taken
- **Average Score** - Your overall performance
- **Best Score** - Your highest achievement
- **Not Attempted** - Quizzes you haven't tried yet
- **Recent Activity** - Your last 3 quiz attempts

## 💾 Data Storage

All your data is stored **locally** in your browser:
- No internet connection required (after initial load)
- Your data stays private on your device
- No registration with external services

### Important Notes

⚠️ **Data Persistence:**
- Data is stored per browser/device
- Clearing browser data will delete your account and history
- Use the same browser to access your data
- No sync across different browsers/devices

💡 **Tips:**
- Don't clear browser cache/cookies if you want to keep your data
- Consider exporting your quiz history (feature coming soon)
- Use a regular (non-incognito) browser window

## 🔧 Development Commands

### Run Development Server
```bash
npm run dev
```
Starts the app in development mode with hot reload.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build.

### Type Check
```bash
npm run type-check
```
Run TypeScript type checking (if configured).

## 📱 Mobile Usage

The app is fully responsive and works great on mobile devices:

1. Open the app URL on your mobile browser
2. For the best experience, add to your home screen:
   - **iOS**: Tap Share → Add to Home Screen
   - **Android**: Tap Menu → Add to Home Screen

## 🎨 Customization

Want to customize the app? Here are key files to modify:

### Change Quiz Questions
Edit `/data/quizzes.ts` to:
- Add new quizzes
- Modify existing questions
- Change difficulty levels
- Adjust time limits

### Modify Colors/Theme
Edit `/styles/globals.css` to:
- Change color scheme
- Modify fonts
- Adjust spacing
- Update design tokens

### Add New Features
Main files to explore:
- `/App.tsx` - Main app logic and routing
- `/context/AuthContext.tsx` - Authentication logic
- `/components/` - All UI components

## 🐛 Troubleshooting

### App Won't Start

**Problem:** `npm run dev` fails
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Can't Login

**Problem:** Login doesn't work
**Solution:**
- Check browser console for errors
- Ensure you're using the correct email/password
- Try creating a new account
- Clear browser cache and try again

### Lost All Data

**Problem:** All quiz history is gone
**Solution:**
- Data is stored in localStorage
- Check if browser data was cleared
- Unfortunately, data cannot be recovered once deleted
- Create a new account and start fresh

### Layout Looks Broken

**Problem:** UI doesn't look right
**Solution:**
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Try a different browser
- Ensure JavaScript is enabled

## 📚 Additional Resources

### Documentation
- [README.md](./README.md) - Project overview
- [USER_GUIDE.md](./USER_GUIDE.md) - Complete user guide
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Technical documentation
- [CHANGELOG.md](./CHANGELOG.md) - Version history

### Support
- Check the documentation first
- Look for similar issues in the repository
- Open an issue on GitHub for bugs or questions

## 🎓 Learning Resources

If you want to understand how the app works:

### React Concepts Used
- Functional components
- React Hooks (useState, useEffect, useContext)
- Context API for state management
- Component composition

### Technologies
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **localStorage** - Data persistence

### Recommended Learning Path
1. React fundamentals
2. React Hooks
3. TypeScript basics
4. Tailwind CSS utilities
5. Browser storage APIs

## 🚢 Deployment

Ready to deploy? See deployment options:

### Netlify (Easiest)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Vercel
1. Import your repository
2. Select Vite as framework
3. Deploy automatically

### GitHub Pages
```bash
npm install gh-pages --save-dev
npm run build
npx gh-pages -d dist
```

## ✅ Quick Checklist

Before you start:
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Browser opened to localhost:5173
- [ ] Account created
- [ ] First quiz taken

## 🎉 You're Ready!

That's it! You're now ready to use the Quiz Application.

**Happy Quizzing! 🧠✨**

---

**Need Help?** Check the [USER_GUIDE.md](./USER_GUIDE.md) for detailed instructions or open an issue on GitHub.
