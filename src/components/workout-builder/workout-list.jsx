import { useState } from 'react'
import { Play, Edit, Dumbbell } from 'lucide-react'
import { useWorkoutStore } from '@/stores/workout-store'
import EditWorkoutModal from './edit-workout-modal'

function WorkoutList({ onStartWorkout }) {
    // Get workouts and functions from store
    const { workouts, setCurrentWorkout } = useWorkoutStore()
    
    // Modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedWorkout, setSelectedWorkout] = useState(null)

    // Function to start a workout
    const startWorkout = (workout) => {
        setCurrentWorkout(workout)
        // Navigate to workout session view if callback is provided
        if (onStartWorkout) {
            onStartWorkout()
        }
    }

    // Function to open edit modal
    const openEditModal = (workout) => {
        setSelectedWorkout(workout)
        setIsEditModalOpen(true)
    }

    // Function to close edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false)
        setSelectedWorkout(null)
    }

    return (
        <>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Saved Workouts
                </h3>
                {workouts.length > 0 && (
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary/30 text-primary-700 dark:text-white rounded-full text-sm font-medium">
                        {workouts.length} {workouts.length === 1 ? 'workout' : 'workouts'}
                    </span>
                )}
            </div>

            {workouts.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <Dumbbell className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">
                        No workouts saved yet
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        Create your first workout to get started!
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {workouts.map((workout) => {
                        const totalExercises = workout.exercises.length
                        return (
                            <div 
                                key={workout.id} 
                                className="bg-white dark:bg-gray-800 transition-all duration-200 p-4"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white pr-2">
                                        {workout.name}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Dumbbell className="w-4 h-4 text-purple-600 dark:text-secondary-100" />
                                    <span className="text-sm text-gray-600 dark:text-secondary-100">
                                        {totalExercises} {totalExercises === 1 ? 'exercise' : 'exercises'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startWorkout(workout)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-700 text-white font-semibold rounded-none transition-all duration-200"
                                    >
                                        <Play className="w-4 h-4" />
                                        Start
                                    </button>
                                    <button
                                        onClick={() => openEditModal(workout)}
                                        className="px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-none transition-colors"
                                        title="Edit workout"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
        {/* Edit Workout Modal */}
        <EditWorkoutModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            workout={selectedWorkout}
        />
        </>
    )
}

export default WorkoutList
