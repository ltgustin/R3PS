import { useCallback } from 'react'
import { usePreferencesStore } from '@/stores/preferences-store'
import { audioManager } from '@/utils/audio'

export function useAudio() {
  const { isSoundEnabled } = usePreferencesStore()

  // Wrapper functions that check if sound is enabled
  const playExerciseStart = useCallback(() => {
    if (isSoundEnabled) {
      audioManager.playExerciseStart()
    }
  }, [isSoundEnabled])

  const playExerciseEnd = useCallback(() => {
    if (isSoundEnabled) {
      audioManager.playExerciseEnd()
    }
  }, [isSoundEnabled])

  const playRestStart = useCallback(() => {
    if (isSoundEnabled) {
      audioManager.playRestStart()
    }
  }, [isSoundEnabled])

  const playWorkoutComplete = useCallback(() => {
    if (isSoundEnabled) {
      audioManager.playWorkoutComplete()
    }
  }, [isSoundEnabled])

  const playCountdownBeep = useCallback(() => {
    if (isSoundEnabled) {
      audioManager.playCountdownBeep()
    }
  }, [isSoundEnabled])

  const playCountdownStart = useCallback(() => {
    if (isSoundEnabled) {
      audioManager.playCountdownStart()
    }
  }, [isSoundEnabled])

  return {
    playExerciseStart,
    playExerciseEnd,
    playRestStart,
    playWorkoutComplete,
    playCountdownBeep,
    playCountdownStart,
    isSoundEnabled
  }
} 