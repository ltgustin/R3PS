// Audio utility for generating beep sounds
class AudioManager {
  constructor() {
    this.audioContext = null
    this.isInitialized = false
  }

  // Initialize audio context (required for Web Audio API)
  init() {
    if (this.isInitialized) return

    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize audio context:', error)
    }
  }

  // Generate a beep sound
  playBeep(frequency = 800, duration = 200, type = 'sine') {
    if (!this.isInitialized || !this.audioContext) {
      this.init()
      if (!this.audioContext) return
    }

    try {
      // Create oscillator for the beep
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      // Connect oscillator to gain node, then to speakers
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      // Set oscillator properties
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      oscillator.type = type

      // Set gain (volume) - start at 0.3, fade out
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)

      // Start and stop the beep
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration / 1000)
    } catch (error) {
      console.error('Failed to play beep:', error)
    }
  }

  // Play different types of beeps
  playExerciseStart() {
    this.playBeep(800, 300, 'sine') // Higher pitch, longer duration
  }

  playExerciseEnd() {
    this.playBeep(600, 200, 'sine') // Lower pitch, shorter duration
  }

  playRestStart() {
    this.playBeep(400, 150, 'triangle') // Different waveform
  }

  playWorkoutComplete() {
    // Play a sequence of beeps
    this.playBeep(800, 200, 'sine')
    setTimeout(() => this.playBeep(1000, 200, 'sine'), 250)
    setTimeout(() => this.playBeep(1200, 400, 'sine'), 500)
  }

  // Countdown beeps
  playCountdownBeep() {
    this.playBeep(600, 150, 'sine') // Medium pitch for countdown
  }

  playCountdownStart() {
    this.playBeep(1000, 400, 'sine') // Higher pitch, longer for "GO!"
  }

  // Clean up audio context
  dispose() {
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
      this.isInitialized = false
    }
  }
}

// Create and export a singleton instance
export const audioManager = new AudioManager() 