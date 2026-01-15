import { X, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useWorkoutStore } from '@/stores/workout-store'
import WorkoutForm from './workout-form'

/**
 * EditWorkoutModal - Modal dialog for editing an existing workout
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Object} props.workout - The workout to edit
 */
function EditWorkoutModal({ isOpen, onClose, workout }) {
    const { deleteWorkout } = useWorkoutStore()

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${workout.name}"? This action cannot be undone.`)) {
            deleteWorkout(workout.id)
            onClose()
        }
    }
    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen || !workout) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[98vh] overflow-y-auto mx-4 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Edit Workout
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 rounded-none"
                            aria-label="Delete workout"
                            title="Delete workout"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-none"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <WorkoutForm
                    workoutToEdit={workout}
                    onSave={onClose}
                />
            </div>
        </div>
    )
}

export default EditWorkoutModal

