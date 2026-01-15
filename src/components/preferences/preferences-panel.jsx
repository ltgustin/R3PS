import { useState } from 'react'
import { X, Plus, Settings } from 'lucide-react'
import { usePreferencesStore } from '@/stores/preferences-store'
import PersonalRecords from './personal-records'

function PreferencesPanel() {
    const [newEquipment, setNewEquipment] = useState('')
    
    // Get preferences from store
    const {
        isDarkMode,
        defaultReps,
        defaultSets,
        equipment,
        // Actions
        toggleDarkMode,
        setDefaultReps,
        setDefaultSets,
        addEquipment,
        removeEquipment
    } = usePreferencesStore()

    const handleAddEquipment = () => {
        if (newEquipment.trim()) {
            addEquipment(newEquipment)
            setNewEquipment('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddEquipment()
        }
    }

    return (
        <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="space-y-4 bg-white dark:bg-gray-800 p-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Appearance
                </h3>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Switch between light and dark themes
                        </p>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`relative p-0 inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Default Values */}
            <div className="space-y-4 bg-white dark:bg-gray-800 p-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Default Workout Settings
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    These values will be used when creating new exercises
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Default Reps
                        </label>
                        <input
                            type="number"
                            value={defaultReps}
                            onChange={(e) => setDefaultReps(parseInt(e.target.value) || 8)}
                            min="1"
                            max="50"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Default Sets
                        </label>
                        <input
                            type="number"
                            value={defaultSets}
                            onChange={(e) => setDefaultSets(parseInt(e.target.value) || 3)}
                            min="1"
                            max="10"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Equipment Management */}
            <div className="space-y-4 bg-white dark:bg-gray-800 p-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Equipment
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add equipment you have available. This will help filter AI-generated workouts.
                </p>

                {/* Add Equipment */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newEquipment}
                        onChange={(e) => setNewEquipment(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="e.g., bodyweight, dumbbells, barbell"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleAddEquipment}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-none transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>

                {/* Equipment List */}
                {equipment.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your Equipment ({equipment.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {equipment.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2"
                                >
                                    <span className="text-gray-900 dark:text-white">{item}</span>
                                    <button
                                        onClick={() => removeEquipment(item)}
                                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors rounded-none"
                                        title="Remove"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {equipment.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        No equipment added yet. Add equipment above to filter AI workouts.
                    </p>
                )}
            </div>

            {/* Personal Records */}
            <div className="bg-white dark:bg-gray-800 p-4">
                <PersonalRecords />
            </div>
        </div>
    )
}

export default PreferencesPanel
