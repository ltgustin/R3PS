import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { usePreferencesStore } from "@/stores/preferences-store";
import Header from "@/components/header";
import HomePage from "@/pages/Home";
import WorkoutsPage from "@/pages/Workouts";
import WorkoutBuilderPage from "@/pages/WorkoutBuilder";
import WorkoutPage from "@/pages/Workout";
import HistoryPage from "@/pages/History";
import SettingsPage from "@/pages/Settings";

function App() {
  const { isDarkMode } = usePreferencesStore();

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen pb-10 bg-gray-50 dark:bg-secondary">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/workout-builder" element={<WorkoutBuilderPage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App;