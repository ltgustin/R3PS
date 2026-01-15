import { BookmarkPlus, Home, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="w-full fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
            <nav className="flex justify-between items-center">
                <Link
                    to="/"
                    className={`w-full flex flex-col justify-center items-center px-3 py-2 gap-0.5 ${isActive('/')
                        ? 'bg-purple-100 text-purple-700 dark:bg-primary dark:text-white'
                        : 'bg-gray-100 text-gray-500 hover:text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-gray-200'
                        }`}
                >
                    <Home size={24} />
                    <span className="text-xs">Home</span>
                </Link>
                <Link
                    to="/workouts"
                    className={`w-full flex flex-col justify-center items-center px-3 py-2 gap-0.5 ${isActive('/workouts')
                        ? 'bg-purple-100 text-purple-700 dark:bg-primary dark:text-white'
                        : 'bg-gray-100 text-gray-500 hover:text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-gray-200'
                        }`}
                >
                    <BookmarkPlus size={24} />
                    <span className="text-xs">Workouts</span>
                </Link>
                <Link
                    to="/history"
                    className={`w-full flex flex-col justify-center items-center px-3 py-2 gap-0.5 ${isActive('/history')
                        ? 'bg-purple-100 text-purple-700 dark:bg-primary dark:text-white'
                        : 'bg-gray-100 text-gray-500 hover:text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-gray-200'
                        }`}
                >
                    <Calendar size={24} />
                    <span className="text-xs">History</span>
                </Link>
                <Link
                    to="/settings"
                    className={`w-full flex flex-col justify-center items-center px-3 py-2 gap-0.5 ${isActive('/settings')
                        ? 'bg-purple-100 text-purple-700 dark:bg-primary dark:text-white'
                        : 'bg-gray-100 text-gray-500 hover:text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-gray-200'
                        }`}
                >
                    <Settings size={24} />
                    <span className="text-xs">Settings</span>
                </Link>
            </nav>
        </header>
    )
}