import { useWorkoutStore } from '@/stores/workout-store'
import { Calendar } from 'lucide-react'
import PageWrapper from '@/components/layout/page-wrapper'

function HistoryPage() {
    const { workoutHistory } = useWorkoutStore()

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        })
    }

    const formatDuration = (seconds) => {
        if (!seconds || seconds === 0) return 'N/A'
        
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        
        if (hours > 0) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
        } else if (minutes > 0) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${secs > 0 ? `${secs} ${secs === 1 ? 'second' : 'seconds'}` : ''}`
        } else {
            return `${secs} ${secs === 1 ? 'second' : 'seconds'}`
        }
    }

    return (
        <PageWrapper
            title="Workout History"
            icon={Calendar}
            subtitle="View your completed workout sessions"
        >

                {workoutHistory.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 shadow-md p-4 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            No workout history yet. Complete a workout to see it here!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {workoutHistory.map((workout) => (
                            <div key={workout.id} className="bg-white dark:bg-gray-800 shadow-md p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {workout.workoutName}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(workout.completedAt)}
                                        </p>
                                        {workout.duration && (
                                            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                                                Duration: {formatDuration(workout.duration)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {workout.exercises.map((exercise, index) => (
                                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                                {exercise.exerciseName}
                                            </h4>
                                            <div className="space-y-2">
                                                {exercise.sets.map((set, setIndex) => (
                                                    <div key={setIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                                        Set {set.setNumber}: {set.completed ? (
                                                            set.weight === 'bodyweight' || set.weight === 'Bodyweight' 
                                                                ? `${set.reps} reps @ bodyweight`
                                                                : `${set.reps} reps @ ${set.weight}lbs`
                                                        ) : 'Not completed'}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </PageWrapper>
    )
}

export default HistoryPage

