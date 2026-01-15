import { useState, useEffect } from 'react'
import { Sparkles, X, Plus, Loader2 } from 'lucide-react'
import { generateExercises } from '@/utils/gemini-api'
import { usePreferencesStore } from '@/stores/preferences-store'

function AISidebar({ isOpen, onClose, onAddExercise, onAddAllExercises }) {
    const [aiPrompt, setAiPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [aiError, setAiError] = useState('')
    const [aiSuggestions, setAiSuggestions] = useState([])
    const [selectedEquipment, setSelectedEquipment] = useState([])
    const { defaultReps, defaultSets, equipment } = usePreferencesStore()

    // Reset selected equipment when sidebar opens
    useEffect(() => {
        if (isOpen) {
            setSelectedEquipment([])
            setAiPrompt('')
            setAiError('')
            setAiSuggestions([])
        }
    }, [isOpen])

    const handleGenerateAI = async (e) => {
        e.preventDefault()
        
        if (!aiPrompt.trim()) return

        setIsGenerating(true)
        setAiError('')
        setAiSuggestions([])

        try {
            const exercises = await generateExercises(aiPrompt, defaultReps, defaultSets, selectedEquipment)
            
            if (exercises.length === 0) {
                setAiError('No exercises could be generated. Try a more specific prompt.')
            } else {
                setAiSuggestions(exercises)
            }
        } catch (error) {
            setAiError(error.message || 'Failed to generate exercises. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    const toggleEquipment = (equipmentName) => {
        setSelectedEquipment(prev => 
            prev.includes(equipmentName)
                ? prev.filter(eq => eq !== equipmentName)
                : [...prev, equipmentName]
        )
    }

    const selectAllEquipment = () => {
        if (selectedEquipment.length === equipment.length) {
            setSelectedEquipment([])
        } else {
            setSelectedEquipment([...equipment])
        }
    }

    const handleAddSuggestion = (exercise) => {
        onAddExercise(exercise)
    }

    const handleAddAll = () => {
        onAddAllExercises(aiSuggestions)
        setAiSuggestions([])
        setAiPrompt('')
    }

    if (!isOpen) return null

    return (
        <>
            {/* Sidebar Overlay */}
            <div
                className="fixed inset-0 bg-black/75 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed mt-0 right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-purple-500" />
                            AI Workout Generator
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <form onSubmit={handleGenerateAI} className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Describe your workout:
                            </label>
                            <textarea
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                placeholder="e.g., upper body strength workout for beginners, chest and triceps focused workout, full body strength training"
                                rows={4}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                disabled={isGenerating}
                            />

                            {/* Equipment Selection */}
                            {equipment.length > 0 && (
                                <div className="mt-4 mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Filter by Equipment (optional):
                                        </label>
                                        <button
                                            type="button"
                                            onClick={selectAllEquipment}
                                            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                                        >
                                            {selectedEquipment.length === equipment.length ? 'Deselect All' : 'Select All'}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {equipment.map((item) => (
                                            <label
                                                key={item}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors ${
                                                    selectedEquipment.includes(item)
                                                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 dark:border-purple-400'
                                                        : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedEquipment.includes(item)}
                                                    onChange={() => toggleEquipment(item)}
                                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                    disabled={isGenerating}
                                                />
                                                <span className="text-sm text-gray-900 dark:text-white">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {selectedEquipment.length > 0 && (
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            {selectedEquipment.length} equipment selected
                                        </p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!aiPrompt.trim() || isGenerating}
                                className="mt-3 w-full bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate Exercises
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Error Message */}
                        {aiError && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-800 dark:text-red-300 text-sm whitespace-pre-line">{aiError}</p>
                            </div>
                        )}

                        {/* AI Suggestions */}
                        {aiSuggestions.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        Suggested Exercises ({aiSuggestions.length})
                                    </h3>
                                    <button
                                        onClick={handleAddAll}
                                        className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add All
                                    </button>
                                </div>
                                <ul className="space-y-2">
                                    {aiSuggestions.map((exercise, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                                        >
                                            <div className="flex-1">
                                                <span className="text-gray-800 dark:text-white font-medium">{exercise.name}</span>
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                    ({exercise.reps} reps × {exercise.sets} sets)
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleAddSuggestion(exercise)}
                                                className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-md transition-colors"
                                                title="Add to workout"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isGenerating && !aiError && aiSuggestions.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                                <p className="text-lg">Enter a prompt above to generate exercise suggestions</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default AISidebar

