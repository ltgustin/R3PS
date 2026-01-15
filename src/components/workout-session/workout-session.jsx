import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, SkipForward, ArrowRight, Dumbbell } from 'lucide-react'
import { useWorkoutStore } from '@/stores/workout-store'
import { Link, useNavigate } from 'react-router-dom'

function WorkoutSession() {
    const { currentWorkout, endSession, addWorkoutHistory } = useWorkoutStore()
    const navigate = useNavigate()

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [completedExercises, setCompletedExercises] = useState([])
    const [completedSets, setCompletedSets] = useState([])

    if (!currentWorkout) {
        return (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Dumbbell className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No Workout Selected
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Select a workout from the list to start your session
                </p>
                <Link
                    to="/workouts"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Choose a Workout
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        )
    }

    const currentExercise = currentWorkout.exercises[currentExerciseIndex]
    const isLastExercise = currentExerciseIndex === currentWorkout.exercises.length - 1

    // Initialize completed sets when exercise changes
    useEffect(() => {
        if (currentWorkout && currentExerciseIndex < currentWorkout.exercises.length) {
            const exercise = currentWorkout.exercises[currentExerciseIndex]
            const sets = Array.from({ length: exercise.sets }, (_, i) => ({
                setNumber: i + 1,
                reps: exercise.reps,
                weight: exercise.isBodyweight ? 'bodyweight' : '',
                completed: false
            }))
            setCompletedSets(sets)
        }
    }, [currentWorkout, currentExerciseIndex])

    // Update set data
    const updateSet = (setIndex, field, value) => {
        setCompletedSets(prev => prev.map((set, idx) => 
            idx === setIndex 
                ? { ...set, [field]: value }
                : set
        ))
    }

    // Toggle set completion
    const toggleSetCompleted = (setIndex) => {
        setCompletedSets(prev => prev.map((set, idx) => {
            if (idx === setIndex) {
                const newCompleted = !set.completed
                // If bodyweight exercise, set weight to "bodyweight" when completed
                return {
                    ...set,
                    completed: newCompleted,
                    weight: newCompleted && currentExercise.isBodyweight ? 'bodyweight' : set.weight
                }
            }
            return set
        }))
    }

    // Finish current exercise and move to next
    const finishExercise = () => {
        const exerciseData = {
            exerciseId: currentExercise.id,
            exerciseName: currentExercise.name,
            targetReps: currentExercise.reps,
            targetSets: currentExercise.sets,
            sets: completedSets.map(set => ({
                setNumber: set.setNumber,
                reps: set.completed ? set.reps : 0,
                weight: currentExercise.isBodyweight && set.completed ? 'bodyweight' : (set.completed ? (parseFloat(set.weight) || 0) : 0),
                completed: set.completed
            }))
        }

        const updatedCompletedExercises = [...completedExercises, exerciseData]
        setCompletedExercises(updatedCompletedExercises)

        if (isLastExercise) {
            // Workout complete - save to history
            const workoutData = {
                workoutId: currentWorkout.id,
                workoutName: currentWorkout.name,
                exercises: updatedCompletedExercises
            }
            addWorkoutHistory(workoutData)
            endSession()
            navigate('/workouts')
        } else {
            // Move to next exercise (sets will be initialized by useEffect)
            setCurrentExerciseIndex(currentExerciseIndex + 1)
        }
    }

    // Skip exercise
    const skipExercise = () => {
        const exerciseData = {
            exerciseId: currentExercise.id,
            exerciseName: currentExercise.name,
            targetReps: currentExercise.reps,
            targetSets: currentExercise.sets,
            sets: [] // No sets completed for skipped exercise
        }
        const updatedCompletedExercises = [...completedExercises, exerciseData]
        setCompletedExercises(updatedCompletedExercises)

        if (isLastExercise) {
            // Save workout with skipped exercise
            const workoutData = {
                workoutId: currentWorkout.id,
                workoutName: currentWorkout.name,
                exercises: updatedCompletedExercises
            }
            addWorkoutHistory(workoutData)
            endSession()
            navigate('/workouts')
        } else {
            setCurrentExerciseIndex(currentExerciseIndex + 1)
        }
    }

    // Calculate progress
    const progress = ((currentExerciseIndex + 1) / currentWorkout.exercises.length) * 100

    return (
        <div className="bg-white dark:bg-gray-800 p-4 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        Exercise {currentExerciseIndex + 1} of {currentWorkout.exercises.length}
                    </span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5">
                    <div 
                        className="bg-gradient-to-r from-primary-600 to-primary-700 h-2.5 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="text-center space-y-3 pb-4 bg-white dark:bg-gray-800 p-4">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                    {currentWorkout.name}
                </h3>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentExercise.name}
                </h4>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <Dumbbell className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-lg font-semibold text-primary-700 dark:text-primary-50">
                        {currentExercise.reps} reps × {currentExercise.sets} sets
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    Track Your Sets
                </h4>
                
                <div className="space-y-3">
                    {completedSets.map((set, index) => (
                        <div 
                            key={index} 
                            className={`p-4 border-2 transition-all duration-200 ${
                                set.completed
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {set.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-400" />
                                    )}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        Set {set.setNumber}
                                    </span>
                                </div>
                                <button
                                    onClick={() => toggleSetCompleted(index)}
                                    className={`px-4 py-2 rounded-none text-sm font-semibold transition-all duration-200 ${
                                        set.completed
                                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {set.completed ? 'Completed' : 'Mark Complete'}
                                </button>
                            </div>
                            
                            {set.completed && (
                                <div className={`grid gap-4 pt-3 border-t border-green-200 dark:border-green-800 ${currentExercise.isBodyweight ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                            Reps Completed
                                        </label>
                                        <input
                                            type="number"
                                            value={set.reps}
                                            onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                                            min="0"
                                            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                                        />
                                    </div>
                                    {!currentExercise.isBodyweight && (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                                Weight (lbs)
                                            </label>
                                            <input
                                                type="number"
                                                value={set.weight}
                                                onChange={(e) => updateSet(index, 'weight', e.target.value)}
                                                min="0"
                                                step="0.5"
                                                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                                                placeholder="0"
                                            />
                                        </div>
                                    )}
                                    {currentExercise.isBodyweight && (
                                        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                                            Bodyweight
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={skipExercise}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-2 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-none transition-all duration-200 border border-gray-300 dark:border-gray-600"
                >
                    <SkipForward className="w-4 h-4" />
                    Skip
                </button>
                <button
                    onClick={finishExercise}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-2 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-none transition-all duration-200 transform"
                >
                    {isLastExercise ? 'Finish Workout' : 'Next Exercise'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default WorkoutSession

