# R3PS - Strength Workout Tracker

> A modern, full-featured strength training application built with React, featuring AI-powered workout generation, progress tracking, and a polished user experience.

## 🎯 Project Overview

**R3PS** is a comprehensive strength training application that empowers users to build, track, and optimize their workout routines. Built from the ground up with modern web technologies, this project demonstrates proficiency in React development, state management, API integration, and user experience design.

### Why This Project Stands Out

- **Production-Ready Architecture**: Clean, maintainable code structure with reusable components and custom hooks
- **AI Integration**: Seamless integration with Google's Gemini API for intelligent workout suggestions
- **State Management**: Efficient state handling using Zustand with localStorage persistence
- **Responsive Design**: Mobile-first approach with TailwindCSS and custom design system
- **User Experience**: Intuitive interface with smooth animations, dark mode support, and accessibility considerations

---

## ✨ Key Features

### 🏋️ Workout Management
- **Custom Workout Builder**: Create personalized workout routines with exercises, sets, and reps
- **Exercise Tracking**: Track weight, reps, and completion status for each set
- **Bodyweight Exercise Support**: Special handling for bodyweight exercises (no weight input needed)
- **Workout History**: Complete history of all completed workouts with detailed set-by-set data

### 🤖 AI-Powered Suggestions
- **Intelligent Exercise Generation**: Generate workout suggestions based on user prompts
- **Equipment Filtering**: Filter AI suggestions based on available equipment
- **Smart Parsing**: Advanced text parsing to extract exercise names, reps, and sets from AI responses
- **Automatic Bodyweight Detection**: AI automatically identifies and flags bodyweight exercises

### 📊 Progress Tracking
- **Personal Records (PRs)**: Track and display personal bests for exercises
- **Workout Analytics**: View completed workout history with date tracking
- **Visual Progress Display**: Clean, card-based UI for viewing PRs and workout history

### 🎨 User Experience
- **Dark Mode**: Full dark mode support with smooth theme transitions
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Splash Screen**: Professional loading experience with custom branding
- **Custom Color System**: Flexible theming with easy-to-update color variables

### ⚙️ Customization
- **User Preferences**: Customizable default reps, sets, and equipment
- **Equipment Management**: Add and manage available equipment for AI filtering
- **Edit Workouts**: Full CRUD operations for workout management

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Latest React with modern hooks and patterns
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing for SPA navigation

### State Management
- **Zustand** - Lightweight, performant state management
- **Persist Middleware** - Automatic localStorage persistence

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework
- **Custom Design System** - Primary/secondary color system for easy theming
- **Lucide React** - Modern icon library
- **Responsive Design** - Mobile-first approach

### AI Integration
- **Google Gemini API** - AI-powered workout generation
- **Custom Parsing Logic** - Intelligent extraction of exercise data from AI responses

### Code Quality
- **ESLint** - Code linting and quality enforcement
- **Vitest** - Testing framework setup
- **React Testing Library** - Component testing utilities

---

## 🏗️ Architecture Highlights

### Component Structure
```
src/
├── components/
│   ├── layout/          # Reusable layout components
│   ├── workout-builder/ # Workout creation & management
│   ├── workout-session/ # Active workout tracking
│   └── preferences/     # Settings & user preferences
├── pages/               # Route-level components
├── stores/              # Zustand state management
└── utils/               # Helper functions & API clients
```

### State Management Strategy
- **Centralized Stores**: Separate stores for workouts and preferences
- **Optimistic Updates**: Immediate UI feedback with localStorage sync
- **Computed Values**: Efficient getters for derived state

### Design Patterns
- **Component Composition**: Reusable, composable components
- **Custom Hooks**: Extracted logic for reusability
- **Error Boundaries**: Graceful error handling
- **Loading States**: User-friendly loading indicators

---

## 💡 Technical Challenges Solved

### 1. AI Response Parsing
**Challenge**: Gemini API returns unstructured text that needs to be parsed into structured exercise data.

**Solution**: Built a robust parsing system that:
- Handles various response formats (ranges, qualifiers, time-based exercises)
- Extracts reps, sets, and exercise names reliably
- Automatically detects bodyweight exercises
- Provides fallbacks for edge cases

### 2. State Persistence
**Challenge**: Maintain app state across sessions without a backend.

**Solution**: Implemented Zustand persist middleware with:
- Selective state persistence (only necessary data)
- Automatic serialization/deserialization
- Version management for future migrations

### 3. Responsive Design System
**Challenge**: Create a consistent, maintainable color system.

**Solution**: Built custom Tailwind color scales with:
- Primary and secondary color variables
- Full shade ranges (50-950) for flexibility
- Easy theme updates in a single configuration file

### 4. Complex State Updates
**Challenge**: Manage complex nested state updates (workouts, exercises, sets).

**Solution**: Used atomic state updates with Zustand:
- Immutable state updates
- Computed values for derived data
- Optimized re-renders with proper state structure

---

## 🎓 Skills Demonstrated

This project showcases proficiency in:

- **React Development**: Hooks, context, component composition, performance optimization
- **State Management**: Zustand, localStorage persistence, complex state patterns
- **API Integration**: RESTful API consumption, error handling, async operations
- **UI/UX Design**: Responsive design, accessibility, user feedback, animations
- **Modern Tooling**: Vite, ESLint, TailwindCSS, React Router
- **Problem Solving**: Complex parsing logic, state synchronization, edge case handling
- **Code Quality**: Clean code principles, component reusability, maintainable architecture

---

## 🔮 Future Enhancements

Potential improvements and features:
- Database setup
- Users / Auth

---

## 📄 License

This project is part of a personal portfolio and is available for review purposes.

---

## 👤 Author

Built as a portfolio project to demonstrate modern React development skills and best practices.

**Connect with me:**
- [LinkedIn](https://www.linkedin.com/in/leegustin)
- [Portfolio](https://linktr.ee/leegustin)

---

*Built with ❤️ using React, TypeScript, and modern web technologies*
