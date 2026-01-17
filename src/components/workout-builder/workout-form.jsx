import { useState, useEffect } from "react"
import { Sparkles, X } from "lucide-react"
import { useWorkoutStore } from "@/stores/workout-store"
import { usePreferencesStore } from "@/stores/preferences-store"
import AISidebar from "./ai-sidebar"

function WorkoutForm({ workoutToEdit, onSave }) {
    // Get default values from preferences
    const {
        defaultReps,
        defaultSets
    } = usePreferencesStore()

    // Form State - initialize with workoutToEdit if editing, otherwise empty
    const [workoutName, setWorkoutName] = useState(workoutToEdit?.name || '')
    const [exercises, setExercises] = useState(workoutToEdit?.exercises || [])
    const [isAISidebarOpen, setIsAISidebarOpen] = useState(false)

    // Exercise form state
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseReps, setExerciseReps] = useState(defaultReps || 8)
    const [exerciseSets, setExerciseSets] = useState(defaultSets || 3)
    const [isBodyweight, setIsBodyweight] = useState(false)

    // Get store functions
    const { addWorkout, updateWorkout } = useWorkoutStore()

    // Initialize form when workoutToEdit changes
    useEffect(() => {
        if (workoutToEdit) {
            setWorkoutName(workoutToEdit.name || '')
            setExercises(workoutToEdit.exercises || [])
        }
    }, [workoutToEdit])

    // Update form when preferences change (only if not editing)
    useEffect(() => {
        if (!workoutToEdit) {
            setExerciseReps(defaultReps || 8)
            setExerciseSets(defaultSets || 3)
        }
    }, [defaultReps, defaultSets, workoutToEdit])

    // Add exercise to the list
    const addExercise = () => {
        if (exerciseName.trim() && exerciseReps > 0 && exerciseSets > 0) {
            const newExercise = {
                id: `exercise-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: exerciseName.trim(),
                reps: exerciseReps,
                sets: exerciseSets,
                isBodyweight: isBodyweight
            }
            setExercises([...exercises, newExercise])
            setExerciseName('')
            setExerciseReps(defaultReps || 8)
            setExerciseSets(defaultSets || 3)
            setIsBodyweight(false)
        }
    }

    // Add exercise from AI suggestion
    const addExerciseFromAI = (exercise) => {
        const newExercise = {
            id: `exercise-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: exercise.name,
            reps: exercise.reps,
            sets: exercise.sets,
            isBodyweight: exercise.isBodyweight || false
        }
        setExercises([...exercises, newExercise])
    }

    // Add all exercises from AI suggestions
    const addAllExercisesFromAI = (aiExercises) => {
        const newExercises = aiExercises.map((exercise, index) => ({
            id: `exercise-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
            name: exercise.name,
            reps: exercise.reps,
            sets: exercise.sets,
            isBodyweight: exercise.isBodyweight || false
        }))
        setExercises([...exercises, ...newExercises])
    }

    // Remove exercise from list
    const removeExercise = (exerciseId) => {
        setExercises(exercises.filter(ex => ex.id !== exerciseId))
    }

    // Save the workout
    const saveWorkout = () => {
        if (workoutName.trim() && exercises.length > 0) {
            if (workoutToEdit) {
                // Update existing workout
                updateWorkout(workoutToEdit.id, workoutName, exercises)
            } else {
                // Create new workout
                addWorkout(workoutName, exercises)
                // Reset form only when creating
                setWorkoutName('')
                setExercises([])
            }
            // Call onSave callback if provided (e.g., to close modal)
            if (onSave) {
                onSave()
            }
        }
    }

    return (
        <>
        <div className="bg-white dark:bg-gray-800 p-4 space-y-6">
            {/* Workout Details */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Workout Name
                    </label>
                    <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter workout name"
                    />
                </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium">
                    Exercises ({exercises.length})
                </h4>

                {exercises.length > 0 && (
                    <div className="space-y-2">
                        {exercises.map((exercise, index) => (
                            <div key={exercise.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3">
                                <div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {index + 1}. {exercise.name}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                        ({exercise.reps} reps × {exercise.sets} sets)
                                        {exercise.isBodyweight && (
                                            <span className="ml-2 text-primary font-medium">
                                                • Bodyweight
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeExercise(exercise.id)}
                                    className="text-white bg-red-500 rounded-none"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Exercise Form */}
            <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">
                        Add Exercise
                    </h4>
                    <button
                        onClick={() => setIsAISidebarOpen(true)}
                        className="flex rounded-none items-center gap-2 px-4 py-2 border border-primary bg-white text-primary font-medium transition-colors"
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Generate
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Exercise Name
                    </label>
                    <input
                        type="text"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Bench Press"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Reps
                        </label>
                        <input
                            type="number"
                            value={exerciseReps}
                            onChange={(e) => setExerciseReps(parseInt(e.target.value) || 8)}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sets
                        </label>
                        <input
                            type="number"
                            value={exerciseSets}
                            onChange={(e) => setExerciseSets(parseInt(e.target.value) || 3)}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isBodyweight"
                        checked={isBodyweight}
                        onChange={(e) => setIsBodyweight(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="isBodyweight" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bodyweight exercise
                    </label>
                </div>

                <button
                    onClick={addExercise}
                    className="w-full px-4 py-2 rounded-none border border-primary bg-white text-primary font-medium transition-colors"
                >
                    Add Exercise
                </button>
            </div>

            {/* Save Workout Button */}
            <div className="border-t pt-4">
                <button
                    onClick={saveWorkout}
                    disabled={!workoutName.trim() || exercises.length === 0}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-none text-white font-medium transition-colors"
                >
                    {workoutToEdit ? 'Update Workout' : 'Save Workout'}
                </button>
            </div>

        </div>
        {/* AI Sidebar */}
        <AISidebar
            isOpen={isAISidebarOpen}
            onClose={() => setIsAISidebarOpen(false)}
            onAddExercise={addExerciseFromAI}
            onAddAllExercises={addAllExercisesFromAI}
        />
        </>
    )
}

export default WorkoutForm
