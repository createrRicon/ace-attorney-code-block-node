import { create } from 'zustand'
import { GameState, GameStatus } from '../types'
import { dialogueEngine } from '../engine'
import { useDialogueStore } from './dialogueStore'

interface GameStore extends GameState {
  // Actions
  setCurrentScene: (sceneId: string) => void
  setCurrentLine: (lineId: string) => void
  setStatus: (status: GameStatus) => void
  collectEvidence: (evidenceId: string) => void
  completeScene: (sceneId: string) => void
  setFlag: (flag: string, value: boolean) => void
  getFlag: (flag: string) => boolean
  next: () => boolean
  makeChoice: (choiceIndex: number) => boolean
  reset: () => void
}

const initialState: GameState = {
  currentSceneId: 'scene1',
  currentLineId: 'start',
  status: 'playing',
  collectedEvidenceIds: [],
  completedScenes: [],
  flags: {},
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setCurrentScene: (sceneId) => set({ currentSceneId: sceneId }),

  setCurrentLine: (lineId) => set({ currentLineId: lineId }),

  setStatus: (status) => set({ status }),

  collectEvidence: (evidenceId) =>
    set((state) => ({
      collectedEvidenceIds: [...new Set([...state.collectedEvidenceIds, evidenceId])],
    })),

  completeScene: (sceneId) =>
    set((state) => ({
      completedScenes: [...new Set([...state.completedScenes, sceneId])],
    })),

  setFlag: (flag, value) =>
    set((state) => ({
      flags: { ...state.flags, [flag]: value },
    })),

  getFlag: (flag) => {
    return get().flags[flag] ?? false
  },

  next: () => {
    const currentState = get()
    console.log('[gameStore.next()] === START ===')
    console.log('[gameStore.next()] currentLineId:', currentState.currentLineId)
    console.log('[gameStore.next()] currentSceneId:', currentState.currentSceneId)
    console.log('[gameStore.next()] dialogueEngine object:', dialogueEngine)
    console.log('[gameStore.next()] dialogueEngine.next typeof:', typeof dialogueEngine.next)

    try {
      // 直接调用 dialogueEngine 的 next 方法，它会处理场景切换
      console.log('[gameStore.next()] About to call dialogueEngine.next()...')
      const result = dialogueEngine.next()
      console.log('[gameStore.next()] dialogueEngine.next() returned:', result)

      const newState = get()
      console.log('[gameStore.next()] === END ===')
      console.log('[gameStore.next()] result:', result)
      console.log('[gameStore.next()] newLineId:', newState.currentLineId)
      console.log('[gameStore.next()] newSceneId:', newState.currentSceneId)
      return result
    } catch (error) {
      console.error('[gameStore.next()] ERROR:', error)
      console.error('[gameStore.next()] ERROR stack:', (error as Error).stack)
      return false
    }
  },

  makeChoice: (choiceIndex: number) => {
    const currentLine = dialogueEngine.getCurrentLine()
    if (!currentLine || !currentLine.choices) {
      return false
    }

    const choice = currentLine.choices[choiceIndex]
    if (!choice) return false

    // 检查条件
    if (choice.condition && !choice.condition()) {
      return false
    }

    set({ currentLineId: choice.nextLineId })

    const scene = dialogueEngine.getCurrentScene()
    if (!scene) return false

    const nextLine = scene.dialogues[choice.nextLineId]
    if (nextLine) {
      useDialogueStore.getState().setCurrentLine(nextLine)
      useDialogueStore.getState().setShowFullText(false)
      return true
    }

    return false
  },

  reset: () => set(initialState),
}))
