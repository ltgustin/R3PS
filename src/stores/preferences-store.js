import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePreferencesStore = create(
    persist(
        (set, get) => ({
            // State
            isDarkMode: false,
            defaultReps: 8,
            defaultSets: 3,
            equipment: [], // Array of equipment items
            personalRecords: [], // Array of PR objects: { id, exerciseName, weight, reps, date }
            lastSplashShown: null, // ISO timestamp of when splash was last shown

            //Actions
            toggleDarkMode: () => {
                set((state) => ({
                    isDarkMode: !state.isDarkMode
                }))
            },

            setDefaultReps: (reps) => {
                set({
                    defaultReps: reps
                })
            },

            setDefaultSets: (sets) => {
                set({
                    defaultSets: sets
                })
            },

            addEquipment: (equipmentName) => {
                set((state) => {
                    const trimmed = equipmentName.trim()
                    if (trimmed && !state.equipment.includes(trimmed)) {
                        return {
                            equipment: [...state.equipment, trimmed]
                        }
                    }
                    return state
                })
            },

            removeEquipment: (equipmentName) => {
                set((state) => ({
                    equipment: state.equipment.filter(eq => eq !== equipmentName)
                }))
            },

            // Personal Records actions
            addPersonalRecord: (exerciseName, weight, reps) => {
                const newPR = {
                    id: Date.now().toString(),
                    exerciseName: exerciseName.trim(),
                    weight: parseFloat(weight) || 0,
                    reps: parseInt(reps) || 0,
                    date: new Date().toISOString()
                }
                set((state) => ({
                    personalRecords: [...state.personalRecords, newPR]
                }))
                return newPR
            },

            updatePersonalRecord: (id, exerciseName, weight, reps) => {
                set((state) => ({
                    personalRecords: state.personalRecords.map(pr =>
                        pr.id === id
                            ? {
                                ...pr,
                                exerciseName: exerciseName.trim(),
                                weight: parseFloat(weight) || 0,
                                reps: parseInt(reps) || 0
                            }
                            : pr
                    )
                }))
            },

            deletePersonalRecord: (id) => {
                set((state) => ({
                    personalRecords: state.personalRecords.filter(pr => pr.id !== id)
                }))
            },

            // Splash screen tracking
            setLastSplashShown: () => {
                set({
                    lastSplashShown: new Date().toISOString()
                })
            },

            shouldShowSplash: () => {
                const state = get()
                if (!state.lastSplashShown) {
                    return true // Never shown before
                }
                
                const lastShown = new Date(state.lastSplashShown)
                const now = new Date()
                const daysSinceLastShown = (now - lastShown) / (1000 * 60 * 60 * 24)
                
                return daysSinceLastShown >= 30 // Show if 30+ days have passed
            },
        }),
        {
            name: 'strength-preferences',
        }
    )
)
