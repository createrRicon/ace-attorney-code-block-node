import { useGameStore, useDialogueStore, useEvidenceStore } from '../store'

/**
 * 游戏状态 Hook
 * 提供游戏状态的便捷访问
 */
export const useGameState = () => {
  const gameState = useGameStore()
  const dialogueState = useDialogueStore()
  const evidenceState = useEvidenceStore()

  return {
    ...gameState,
    ...dialogueState,
    ...evidenceState,
  }
}
