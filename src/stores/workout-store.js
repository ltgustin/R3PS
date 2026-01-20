import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the structure of an exercise
const createExercise = (name, reps, sets) => ({
    id: Date.now().toString(),
    name,
    reps,
    sets,
})

// Define the structure of a workout
const createWorkout = (name, exercises) => ({
  id: Date.now().toString(),
  name,
  exercises,
  createdAt: new Date().toISOString(),
})

// Define completed set structure (for tracking)
const createCompletedSet = (setNumber, reps, weight, completed) => ({
    setNumber,
    reps,
    weight,
    completed,
})

// Create the store
export const useWorkoutStore = create(
    persist(
        (set, get) => ({
            // State
            workouts: [],
            currentWorkout: null,
            isSessionActive: false,
            startedAt: null, // Timestamp when workout session started
            workoutHistory: [], // Track completed workouts

            // Actions
            addWorkout: (name, exercises) => {
                const newWorkout = createWorkout(name, exercises)
                set((state) => ({
                    workouts: [...state.workouts, newWorkout]
                }))
                return newWorkout
            },

            updateWorkout: (workoutId, name, exercises) => {
                set((state) => ({
                    workouts: state.workouts.map(workout =>
                        workout.id === workoutId
                            ? { ...workout, name, exercises }
                            : workout
                    )
                }))
            },

            deleteWorkout: (workoutId) => {
                set((state) => ({
                    workouts: state.workouts.filter(workout => workout.id !== workoutId)
                }))
            },

            setCurrentWorkout: (workout) => {
                set({
                    currentWorkout: workout
                })
            },

            startSession: () => {
                set({
                    isSessionActive: true,
                    startedAt: new Date().toISOString()
                })
            },

            endSession: () => {
                const state = get()
                let duration = 0
                
                // Calculate duration if session was started
                if (state.startedAt) {
                    const startTime = new Date(state.startedAt)
                    const endTime = new Date()
                    duration = Math.floor((endTime - startTime) / 1000) // Duration in seconds
                }
                
                set({
                    isSessionActive: false,
                    currentWorkout: null,
                    startedAt: null // Reset startedAt
                })
                
                return duration // Return duration for use in addWorkoutHistory
            },

            // Add completed workout to history
            addWorkoutHistory: (workoutData) => {
                const state = get()
                const completedAt = new Date().toISOString()
                let duration = 0
                
                // Calculate duration if startedAt is provided
                if (workoutData.startedAt) {
                    const startTime = new Date(workoutData.startedAt)
                    const endTime = new Date(completedAt)
                    duration = Math.floor((endTime - startTime) / 1000) // Duration in seconds
                }
                
                const historyEntry = {
                    id: Date.now().toString(),
                    workoutId: workoutData.workoutId,
                    workoutName: workoutData.workoutName,
                    startedAt: workoutData.startedAt || state.startedAt || completedAt,
                    completedAt: completedAt,
                    exercises: workoutData.exercises,
                    duration: duration, // Duration in seconds
                }
                set((state) => ({
                    workoutHistory: [historyEntry, ...state.workoutHistory]
                }))
                return historyEntry
            },

            // Computed values (getters)
            getWorkoutById: (workoutId) => {
                return get().workouts.find(workout => workout.id === workoutId)
            },

            getWorkoutHistory: () => {
                return get().workoutHistory
            },
        }),
        {
            name: 'strength-workouts', // localStorage key
            partialize: (state) => ({
                workouts: state.workouts,
                workoutHistory: state.workoutHistory
            })
        }
    )
)
