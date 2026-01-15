const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
const API_TIMEOUT = 30000 // 30 seconds

function sanitizeError(error) {
    if (typeof error === "string") {
        if (error.includes("API_KEY") || error.includes("key")) {
            return "Authentication error. Please check your API configuration."
        }
        if (error.includes("quota") || error.includes("limit") || error.includes("429")) {
            return "API rate limit exceeded. Please wait a moment and try again."
        }
        if (error.includes("model") || error.includes("not found")) {
            return "Model unavailable. Please try again later."
        }
        return "An error occurred while generating suggestions. Please try again."
    }
    return "An unexpected error occurred. Please try again."
}

function parseExerciseResponse(text) {
    if (!text) return []

    const exercises = []
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    for (const line of lines) {
        let exerciseName = line
        let reps = null
        let sets = null
        let isTimeBased = false

        // Remove list markers at the start
        exerciseName = exerciseName.replace(/^[-*+]\s*/, '').replace(/^\d+[.)]\s*/, '').trim()

        // Extract sets first (usually comes after reps)
        const setsMatch = exerciseName.match(/(\d+)\s*sets?/i)
        if (setsMatch) {
            sets = parseInt(setsMatch[1])
            // Remove sets from the string
            exerciseName = exerciseName.replace(/\s*,\s*\d+\s*sets?/i, '')
            exerciseName = exerciseName.replace(/\s*\d+\s*sets?/i, '')
        }

        // Check for time-based exercises (seconds, minutes)
        const timeMatch = exerciseName.match(/(\d+)\s*-\s*(\d+)\s*(seconds?|minutes?|sec|min)/i)
        if (timeMatch) {
            isTimeBased = true
            // For time-based exercises, use the first number as "reps" (representing duration)
            reps = parseInt(timeMatch[1])
            // Remove time portion from name
            exerciseName = exerciseName.replace(/\s*-\s*\d+\s*-\s*\d+\s*(seconds?|minutes?|sec|min).*/i, '')
            exerciseName = exerciseName.replace(/\s*\d+\s*-\s*\d+\s*(seconds?|minutes?|sec|min).*/i, '')
        } else {
            // Extract reps - handle ranges like "12-15 reps" (use first number)
            const repsRangeMatch = exerciseName.match(/(\d+)\s*-\s*(\d+)\s*reps?/i)
            if (repsRangeMatch) {
                reps = parseInt(repsRangeMatch[1]) // Use first number of range
                // Remove range reps from name
                exerciseName = exerciseName.replace(/\s*-\s*\d+\s*-\s*\d+\s*reps?/i, '')
            } else {
                // Extract single number reps
                const repsMatch = exerciseName.match(/(\d+)\s*reps?/i)
                if (repsMatch) {
                    reps = parseInt(repsMatch[1])
                    // Remove reps from name
                    exerciseName = exerciseName.replace(/\s*-\s*\d+\s*reps?/i, '')
                    exerciseName = exerciseName.replace(/:\s*\d+\s*reps?.*/i, '')
                    exerciseName = exerciseName.replace(/\s*\d+\s*reps?/i, '')
                }
            }
        }

        // Extract from parentheses if present (after main extraction)
        const parenMatch = exerciseName.match(/\(([^)]+)\)/)
        if (parenMatch) {
            const parenContent = parenMatch[1]
            
            // Extract reps from parentheses if not already found
            if (!reps && !isTimeBased) {
                const parenRepsRangeMatch = parenContent.match(/(\d+)\s*-\s*(\d+)\s*reps?/i)
                if (parenRepsRangeMatch) {
                    reps = parseInt(parenRepsRangeMatch[1])
                } else {
                    const parenRepsMatch = parenContent.match(/(\d+)\s*reps?/i)
                    if (parenRepsMatch) {
                        reps = parseInt(parenRepsMatch[1])
                    }
                }
            }
            
            // Extract sets from parentheses if not already found
            if (!sets) {
                const parenSetsMatch = parenContent.match(/(\d+)\s*sets?/i)
                if (parenSetsMatch) {
                    sets = parseInt(parenSetsMatch[1])
                }
            }
            
            // Remove parentheses section
            exerciseName = exerciseName.replace(/\s*\([^)]+\)/, '')
        }

        // Remove "per leg", "per side", "per arm" qualifiers (keep the reps, just clean name)
        exerciseName = exerciseName.replace(/\s*per\s+(leg|side|arm|hand|foot)/gi, '')

        // Remove any trailing standalone numbers (likely list numbers)
        exerciseName = exerciseName.replace(/\s+\d+\s*$/, '')

        // Remove dashes, colons, multiplication signs (but keep spaces for compound names)
        exerciseName = exerciseName.replace(/[-:()×x]/g, '').trim()

        // Clean up extra spaces and numbers that got concatenated (like "wallsit 4560")
        // Remove sequences of 3+ digits that aren't part of normal words
        exerciseName = exerciseName.replace(/\s+\d{3,}/g, '')
        
        // Final cleanup - remove extra spaces
        exerciseName = exerciseName.replace(/\s+/g, ' ').trim()

        // Capitalize first letter only (preserve rest of capitalization)
        if (exerciseName.length > 0) {
            exerciseName = exerciseName.charAt(0).toUpperCase() + exerciseName.slice(1)
        }

        // Check if exercise is bodyweight (common bodyweight exercise keywords)
        const bodyweightKeywords = [
            'push-up', 'pushup', 'pull-up', 'pullup', 'chin-up', 'chinup',
            'squat', 'lunge', 'plank', 'burpee', 'jumping jack', 'jump jack',
            'mountain climber', 'sit-up', 'situp', 'crunch', 'leg raise',
            'dip', 'wall sit', 'wallsit', 'calf raise', 'glute bridge',
            'hip thrust', 'pistol squat', 'handstand', 'muscle-up',
            'diamond push-up', 'wide push-up', 'pike push-up', 'incline push-up',
            'decline push-up', 'hindu push-up', 'dive bomber', 'superman',
            'bird dog', 'dead bug', 'reverse lunge', 'walking lunge',
            'side lunge', 'curtsy lunge', 'jump squat', 'box jump',
            'step-up', 'single leg', 'one leg', 'bodyweight', 'body weight'
        ]
        
        const isBodyweight = bodyweightKeywords.some(keyword => 
            exerciseName.toLowerCase().includes(keyword.toLowerCase())
        )

        if (exerciseName.length > 0) {
            exercises.push({
                name: exerciseName,
                reps: reps,
                sets: sets,
                isBodyweight: isBodyweight
            })
        }
    }

    return exercises
}

export async function generateExercises(prompt, defaultReps = 8, defaultSets = 3, selectedEquipment = []) {
    if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.")
    }

    // Log API key status (first few chars only for security)
    console.log("API Key configured:", GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 10)}...` : "NOT FOUND")

    let equipmentConstraint = ''
    if (selectedEquipment.length > 0) {
        const equipmentList = selectedEquipment.join(', ')
        equipmentConstraint = `\n\nIMPORTANT: Only suggest exercises that can be performed using the following equipment: ${equipmentList}. Do not suggest exercises that require equipment not in this list.`
    }

    const formattedPrompt = `Generate a strength training workout based on this request:

"${prompt.trim()}"${equipmentConstraint}

Return a list of exercises. For each exercise, include:
- Exercise name (just the name, no numbers or qualifiers)
- Recommended reps as a single number (if applicable)
- Recommended sets (if applicable)

IMPORTANT FORMATTING RULES:
- Use format: "Exercise Name - X reps, Y sets"
- For rep ranges (e.g., 12-15), use the first number only: "12 reps"
- For "per leg" or "per side" exercises, include total reps (e.g., "10 reps per leg" should be "10 reps")
- For time-based exercises (e.g., 45-60 seconds), use the first number as reps: "45 reps"
- Do NOT include "per leg", "per side", or time units in the exercise name
- Keep exercise names simple and clean
- Bodyweight exercises (push-ups, squats, planks, etc.) should be clearly named - the system will automatically detect them

Only return the exercise list. One exercise per line. No commentary or extra text.`

    // Create AbortController for timeout handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

    try {
        const requestBody = {
            contents: [
                {
                    parts: [{ text: formattedPrompt }],
                },
            ],
        }

        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            let errorMessage = "API error occurred"
            try {
                const errorData = await response.json()
                console.error("API Error Response:", errorData)
                
                // Handle different error formats
                if (errorData.error) {
                    errorMessage = errorData.error.message || errorData.error
                } else if (errorData.message) {
                    errorMessage = errorData.message
                }
                
                errorMessage = sanitizeError(errorMessage)
            } catch (e) {
                // If JSON parsing fails, use sanitized status text
                console.error("Failed to parse error response:", e)
                errorMessage = sanitizeError(response.statusText)
            }
            throw new Error(errorMessage)
        }

        const data = await response.json()

        // Validate response structure
        if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Invalid response format from AI service")
        }

        const generatedText = data.candidates[0].content.parts[0].text.trim()
        console.log("Raw AI Response:", generatedText)
        const exercises = parseExerciseResponse(generatedText)
        console.log("Parsed Exercises:", exercises)

        // Apply defaults for exercises without reps/sets
        return exercises.map(ex => ({
            name: ex.name,
            reps: ex.reps || defaultReps,
            sets: ex.sets || defaultSets,
            isBodyweight: ex.isBodyweight || false
        }))
    } catch (fetchError) {
        clearTimeout(timeoutId)

        if (fetchError.name === "AbortError") {
            throw new Error("Request timeout - the API took too long to respond")
        }

        // If it's already our formatted error, re-throw it
        if (fetchError.message && fetchError.message.includes("API")) {
            throw fetchError
        }

        console.error("AI generation error:", fetchError)
        throw new Error(fetchError.message || "An unexpected error occurred. Please try again.")
    }
}

