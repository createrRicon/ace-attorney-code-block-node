import { useCallback } from 'react'
import { dialogueEngine } from '../engine'
import { useGameStore, useDialogueStore } from '../store'

/**
 * 对话引擎 Hook
 * 提供对话控制的接口
 */
export const useDialogueEngine = () => {
  const { setCurrentLine } = useGameStore()
  const { setCurrentLine: setDialogueLine, setShowFullText } = useDialogueStore()

  // 前进到下一句
  const next = useCallback(() => {
    const currentLine = dialogueEngine.getCurrentLine()
    if (!currentLine || !currentLine.nextLineId) {
      return false
    }

    const nextLineId = currentLine.nextLineId
    setCurrentLine(nextLineId)

    const scene = dialogueEngine.getCurrentScene()
    if (!scene) return false

    const nextLine = scene.dialogues[nextLineId]
    if (nextLine) {
      setDialogueLine(nextLine)
      setShowFullText(false)
      return true
    }

    return false
  }, [setCurrentLine, setDialogueLine, setShowFullText])

  // 选择分支
  const makeChoice = useCallback(
    (choiceIndex: number) => {
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

      setCurrentLine(choice.nextLineId)

      const scene = dialogueEngine.getCurrentScene()
      if (!scene) return false

      const nextLine = scene.dialogues[choice.nextLineId]
      if (nextLine) {
        setDialogueLine(nextLine)
        setShowFullText(false)
        return true
      }

      return false
    },
    [setCurrentLine, setDialogueLine, setShowFullText]
  )

  // 检查是否有选择
  const hasChoices = useCallback(() => {
    const currentLine = dialogueEngine.getCurrentLine()
    return currentLine?.choices !== undefined && currentLine.choices.length > 0
  }, [])

  return {
    next,
    makeChoice,
    hasChoices,
  }
}
