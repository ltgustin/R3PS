import { useState } from 'react'
import { usePreferencesStore } from '@/stores/preferences-store'
import { Trophy, Plus, Edit, Trash2, X } from 'lucide-react'

function PersonalRecords() {
    const {
        personalRecords,
        addPersonalRecord,
        updatePersonalRecord,
        deletePersonalRecord
    } = usePreferencesStore()

    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        exerciseName: '',
        weight: '',
        reps: ''
    })

    const handleAdd = () => {
        if (formData.exerciseName.trim() && formData.weight && formData.reps) {
            addPersonalRecord(formData.exerciseName, formData.weight, formData.reps)
            setFormData({ exerciseName: '', weight: '', reps: '' })
            setIsAdding(false)
        }
    }

    const handleEdit = (pr) => {
        setEditingId(pr.id)
        setFormData({
            exerciseName: pr.exerciseName,
            weight: pr.weight.toString(),
            reps: pr.reps.toString()
        })
    }

    const handleUpdate = () => {
        if (formData.exerciseName.trim() && formData.weight && formData.reps) {
            updatePersonalRecord(editingId, formData.exerciseName, formData.weight, formData.reps)
            setFormData({ exerciseName: '', weight: '', reps: '' })
            setEditingId(null)
        }
    }

    const handleCancel = () => {
        setFormData({ exerciseName: '', weight: '', reps: '' })
        setIsAdding(false)
        setEditingId(null)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this personal record?')) {
            deletePersonalRecord(id)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Personal Records
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Track your personal bests
                    </p>
                </div>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-none transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Exercise Name
                        </label>
                        <input
                            type="text"
                            value={formData.exerciseName}
                            onChange={(e) => setFormData({ ...formData, exerciseName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="e.g., Bench Press"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Weight (lbs)
                            </label>
                            <input
                                type="number"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                min="0"
                                step="0.5"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="150"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Reps
                            </label>
                            <input
                                type="number"
                                value={formData.reps}
                                onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="2"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={editingId ? handleUpdate : handleAdd}
                            disabled={!formData.exerciseName.trim() || !formData.weight || !formData.reps}
                            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-none transition-colors"
                        >
                            {editingId ? 'Update' : 'Add'} PR
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-none transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* PR List */}
            {personalRecords.length === 0 && !isAdding ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-none">
                    <Trophy className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No personal records yet. Add your first PR!
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {personalRecords.map((pr) => (
                        <div
                            key={pr.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
                        >
                            {editingId === pr.id ? (
                                <div className="flex-1">
                                    {/* Edit form is shown above */}
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {pr.exerciseName}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {pr.weight} lbs × {pr.reps} {pr.reps === 1 ? 'rep' : 'reps'}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(pr)}
                                            className="p-2 rounded-none bg-secondary text-white transition-colors"
                                            title="Edit PR"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pr.id)}
                                            className="p-2 rounded-none bg-red-500 text-white transition-colors"
                                            title="Delete PR"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PersonalRecords

