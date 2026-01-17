import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trophy, Dumbbell } from 'lucide-react';
import { usePreferencesStore } from '@/stores/preferences-store';
import SplashScreen from '@/components/splash-screen';

function HomePage() {
    const { personalRecords, shouldShowSplash, setLastSplashShown } = usePreferencesStore();
    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {
        // Check if splash should be shown (30-day cooldown)
        if (shouldShowSplash()) {
            setShowSplash(true);
            // Mark splash as shown
            setLastSplashShown();
        }
    }, [shouldShowSplash, setLastSplashShown]);

    useEffect(() => {
        if (!showSplash) return;

        //Start fade out after 3 seconds
        const fadeTimer = setTimeout(() => {
            const splashElement = document.querySelector('.splash-screen');
            if (splashElement) {
                splashElement.classList.add('animate-fadeOut');
            }
        }, 3000);

        //Hide completely after animation
        const hideTimer = setTimeout(() => {
            setShowSplash(false);
        }, 4000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, [showSplash]);

    return (
        <>
            {showSplash && (
                <SplashScreen />
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-8 pb-24">
            {/* Hero/Splash Section */}
            <div className="mb-16">
                <div className="grid grid-cols-1 gap-8 items-center p-8 md:p-12">
                    {/* Logo and Text */}
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <svg 
                                viewBox="0 0 409.7 86.9"
                                className="w-full max-w-[200px] mx-auto"
                                >
                                <path d="M197.4 35.9c1.5-3.6 2.3-7.5 2.3-11.6 0-7.6-2.4-13.6-7.2-17.9-4.7-4.2-11.4-6.4-19.8-6.4h-68.2v2c0 9.3 7.6 16.9 16.9 16.9h47.9c4.8 0 6.8 2.1 6.8 7.2s-2 7.3-6.8 7.3h-54v18.8h54.2c2.3 0 3.9.6 5 1.8 1.1 1.3 1.7 3.2 1.7 5.7s-.6 4.2-1.7 5.5c-1.1 1.2-2.7 1.8-5 1.8h-48c-9.3 0-16.9 7.6-16.9 16.9v2h68.2c8.4 0 15.1-2.3 19.9-6.8 4.8-4.6 7.2-10.7 7.2-18.1s-.8-8-2.3-11.5c-1.2-2.6-2.9-4.8-5.2-6.5 2.3-1.7 4-4 5.2-6.7Z" fill="#2b8a4b" />
                                <path 
                                    className="fill-[#0E1942] dark:fill-white" 
                                    d="M93.7 46.5c3.7-4.5 5.6-10.8 5.6-18.7s-2.6-16.3-7.7-20.9C86.6 2.3 79.5 0 70.5 0H0v85.8h22.3V55.7h34.6l17.5 30.1h25.5L80.6 54.5c5.4-1.4 9.8-4.1 13-8ZM22.3 18.9h46c2.8 0 5 .7 6.4 1.9 1.4 1.2 2 3.6 2 7s-.7 5.7-2.1 7c-1.4 1.3-3.5 2-6.3 2h-46v-18ZM298.8 6.9c-5-4.6-12.1-6.9-21.1-6.9h-70.5v85.8h22.3V55.7h48.2c8.9 0 16-2.3 21.1-6.9 5.1-4.6 7.7-11.7 7.7-20.9s-2.6-16.3-7.7-20.9Zm-69.3 12h46c2.8 0 5 .7 6.4 1.9 1.4 1.2 2 3.6 2 7s-.7 5.7-2.1 7c-1.4 1.3-3.5 2-6.3 2h-46v-18ZM402 40.3c-5-4.5-12.1-6.7-21.1-6.7h-41c-2.8 0-4.9-.6-6.4-1.8-1.4-1.1-2-2.9-2-5.6s.7-4.5 2-5.6c1.5-1.2 3.6-1.8 6.4-1.8h47.5c4.5 0 8.7-1.7 11.9-4.9 3.2-3.2 4.9-7.4 4.9-11.9V0h-66.3c-8.9 0-16 2.2-21 6.6-5.1 4.5-7.7 11-7.7 19.5s2.6 15.1 7.7 19.5c5 4.4 12.1 6.6 21 6.6h41c2.8 0 5 .6 6.4 1.9 1.3 1.2 2 3.2 2 6.1s-.7 4.9-2 6.1c-1.4 1.2-3.6 1.9-6.4 1.9H328c-4.5 0-8.7 1.7-11.9 4.9-3.2 3.2-4.9 7.4-4.9 11.9v2h69.7c8.9 0 16-2.3 21.1-6.8 5.1-4.6 7.7-11.3 7.7-19.9s-2.6-15.4-7.7-20Z" 
                                />
                            </svg>
                        </div>
                        <p className="text-lg text-secondary dark:text-white md:text-xl">
                            Build custom strength workouts and track your progress with AI-powered exercise suggestions.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                to="/workout-builder"
                                className="inline-flex items-center gap-2 bg-primary dark:bg-white text-white dark:text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 hover:bg-primary-600 hover:text-white transition-all duration-200"
                            >
                                <Plus className="w-5 h-5" />
                                Create New Workout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Records Section */}
            {personalRecords.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Personal Bests
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {personalRecords.map((pr) => (
                            <div
                                key={pr.id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {pr.exerciseName}
                                        </h3>
                                        <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                                            {pr.weight} lbs x {pr.reps} {pr.reps === 1 ? 'rep' : 'reps'}
                                        </p>
                                    </div>
                                    <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Link
                            to="/settings"
                            className="text-sm text-primary-600 dark:text-primary-200 hover:text-primary-700 dark:hover:text-primary-100"
                        >
                            Manage Personal Records →
                        </Link>
                    </div>
                </div>
            )}
            </main>
        </>
    )
}

export default HomePage;