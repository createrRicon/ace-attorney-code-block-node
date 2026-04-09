import { DialogueLine, SceneData, InteractionType } from '../types'
import { useGameStore, useDialogueStore, useEvidenceStore } from '../store'

/**
 * 对话引擎类
 * 负责管理对话流程、处理互动、控制场景切换
 */
export class DialogueEngine {
  private currentScene: SceneData | null = null
  private registeredScenes: Map<string, SceneData> = new Map()

  /**
   * 注册场景（用于多场景切换）
   */
  registerScene(scene: SceneData) {
    this.registeredScenes.set(scene.id, scene)
  }

  /**
   * 加载场景
   */
  loadScene(scene: SceneData) {
    this.currentScene = scene
    this.registerScene(scene) // 同时注册
    useGameStore.getState().setCurrentScene(scene.id)
    useGameStore.getState().setCurrentLine(scene.startLineId)

    // 获取起始对话
    const startLine = scene.dialogues[scene.startLineId]
    if (startLine) {
      this.showDialogue(startLine)
    }

    // 解锁场景相关的证据
    if (scene.unlockEvidence) {
      scene.unlockEvidence.forEach((id) => {
        useGameStore.getState().collectEvidence(id)
      })
    }
  }

  /**
   * 显示对话
   */
  private showDialogue(line: DialogueLine) {
    useDialogueStore.getState().setCurrentLine(line)
    useDialogueStore.getState().addToHistory(line)
    useDialogueStore.getState().setShowFullText(false)
    useDialogueStore.getState().setVisible(true)

    // 解锁对话行级别的证据
    if (line.unlockEvidence) {
      line.unlockEvidence.forEach((id) => {
        useEvidenceStore.getState().unlockEvidence(id)
      })
    }
  }

  /**
   * 获取当前对话行
   */
  getCurrentLine(): DialogueLine | null {
    const { currentLineId } = useGameStore.getState()
    if (!this.currentScene || !currentLineId) return null
    return this.currentScene.dialogues[currentLineId] || null
  }

  /**
   * 前进到下一句对话（支持场景自动切换）
   */
  next(): boolean {
    console.log('[DialogueEngine.next()] === START ===')
    const currentLine = this.getCurrentLine()
    console.log('[DialogueEngine.next()] currentLine:', currentLine ? { id: currentLine.id, characterId: currentLine.characterId, nextLineId: currentLine.nextLineId } : null)

    if (!currentLine) {
      console.log('[DialogueEngine.next()] ERROR: currentLine is null!')
      return false
    }

    if (!currentLine.nextLineId) {
      console.log('[DialogueEngine.next()] No nextLineId, end of dialogue')
      return false // 没有下一句了
    }

    const nextLineId = currentLine.nextLineId
    console.log('[DialogueEngine.next()] Looking for nextLineId:', nextLineId)
    console.log('[DialogueEngine.next()] Current scene:', this.currentScene?.id)
    console.log('[DialogueEngine.next()] Registered scenes:', Array.from(this.registeredScenes.keys()))

    // 先在当前场景中查找
    let nextLine = this.currentScene!.dialogues[nextLineId]
    if (nextLine) {
      console.log('[DialogueEngine.next()] Found in current scene')
      useGameStore.getState().setCurrentLine(nextLineId)
      this.showDialogue(nextLine)
      console.log('[DialogueEngine.next()] === SUCCESS ===')
      return true
    }

    // 当前场景中找不到，在所有已注册的场景中查找
    for (const [sceneId, scene] of this.registeredScenes) {
      if (sceneId === this.currentScene!.id) continue // 跳过当前场景

      nextLine = scene.dialogues[nextLineId]
      if (nextLine) {
        console.log('[DialogueEngine.next()] Found in scene:', sceneId, 'Switching...')
        // 找到了！切换到新场景
        this.currentScene = scene
        useGameStore.getState().setCurrentScene(scene.id)
        useGameStore.getState().setCurrentLine(nextLineId)
        this.showDialogue(nextLine)

        // 解锁场景相关的证据
        if (scene.unlockEvidence) {
          scene.unlockEvidence.forEach((id) => {
            useGameStore.getState().collectEvidence(id)
          })
        }
        console.log('[DialogueEngine.next()] === SUCCESS (scene switched) ===')
        return true
      }
    }

    console.log('[DialogueEngine.next()] Next line NOT FOUND in any scene')
    // 所有地方都找不到
    return false
  }

  /**
   * 选择分支
   */
  makeChoice(choiceIndex: number): boolean {
    const currentLine = this.getCurrentLine()
    if (!currentLine || !currentLine.choices) {
      return false
    }

    const choice = currentLine.choices[choiceIndex]
    if (!choice) return false

    // 检查条件
    if (choice.condition && !choice.condition()) {
      return false
    }

    useGameStore.getState().setCurrentLine(choice.nextLineId)

    const nextLine = this.currentScene!.dialogues[choice.nextLineId]
    if (nextLine) {
      this.showDialogue(nextLine)
      return true
    }

    return false
  }

  /**
   * 处理互动（异议、出示证据）
   */
  handleInteraction(type: InteractionType, evidenceId?: string): InteractionResult {
    const currentLine = this.getCurrentLine()
    if (!currentLine || !currentLine.interactionTrigger) {
      return { success: false, message: '这里无法互动' }
    }

    const trigger = currentLine.interactionTrigger

    // 检查互动类型是否匹配
    if (trigger.type !== type) {
      return { success: false, message: '互动类型不正确' }
    }

    // 如果需要证据，检查是否提供了正确的证据
    if (trigger.requiredEvidenceId) {
      if (evidenceId !== trigger.requiredEvidenceId) {
        // 错误的证据
        const failLineId = trigger.failLineId
        if (failLineId) {
          useGameStore.getState().setCurrentLine(failLineId)
          const failLine = this.currentScene!.dialogues[failLineId]
          if (failLine) {
            this.showDialogue(failLine)
          }
          return { success: false, message: '证据不正确', nextLineId: failLineId }
        }
        return { success: false, message: '证据不正确，但没有失败流程' }
      }
    }

    // 成功！
    const successLineId = trigger.successLineId
    if (successLineId) {
      useGameStore.getState().setCurrentLine(successLineId)
      const successLine = this.currentScene!.dialogues[successLineId]
      if (successLine) {
        this.showDialogue(successLine)
      }
      return { success: true, message: '成功！', nextLineId: successLineId }
    }

    return { success: true, message: '成功！' }
  }

  /**
   * 检查当前对话是否可以互动
   */
  canInteract(): boolean {
    const currentLine = this.getCurrentLine()
    return currentLine?.interactionTrigger !== undefined
  }

  /**
   * 检查当前对话是否有选择
   */
  hasChoices(): boolean {
    const currentLine = this.getCurrentLine()
    return currentLine?.choices !== undefined && currentLine.choices.length > 0
  }

  /**
   * 获取当前场景
   */
  getCurrentScene(): SceneData | null {
    return this.currentScene
  }
}

export interface InteractionResult {
  success: boolean
  message: string
  nextLineId?: string
}

// 单例实例
export const dialogueEngine = new DialogueEngine()
