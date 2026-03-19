import { dialogueEngine } from './DialogueEngine'

/**
 * 互动管理器
 * 负责处理异议、出示证据等互动操作
 */
export class InteractionManager {
  /**
   * 异议！
   */
  object(): ReturnType<typeof dialogueEngine.handleInteraction> {
    return dialogueEngine.handleInteraction('objection')
  }

  /**
   * 出示证据
   */
  presentEvidence(evidenceId: string): ReturnType<typeof dialogueEngine.handleInteraction> {
    return dialogueEngine.handleInteraction('present-evidence', evidenceId)
  }

  /**
   * 追问（交叉询问）
   */
  crossExamine(): ReturnType<typeof dialogueEngine.handleInteraction> {
    return dialogueEngine.handleInteraction('cross-examination')
  }

  /**
   * 检查是否可以互动
   */
  canInteract(): boolean {
    return dialogueEngine.canInteract()
  }

  /**
   * 获取需要的证据ID
   */
  getRequiredEvidenceId(): string | undefined {
    const currentLine = dialogueEngine.getCurrentLine()
    return currentLine?.interactionTrigger?.requiredEvidenceId
  }
}

export const interactionManager = new InteractionManager()
