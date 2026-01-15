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
                    isSessionActive: true
                })
            },

            endSession: () => {
                set({
                    isSessionActive: false,
                    currentWorkout: null
                })
            },

            // Add completed workout to history
            addWorkoutHistory: (workoutData) => {
                const historyEntry = {
                    id: Date.now().toString(),
                    workoutId: workoutData.workoutId,
                    workoutName: workoutData.workoutName,
                    completedAt: new Date().toISOString(),
                    exercises: workoutData.exercises, // Array of completed exercises with sets
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
