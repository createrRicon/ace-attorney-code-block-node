/**
 * 场景和游戏流程类型定义
 */

import { DialogueLine } from './dialogue'

// 游戏状态
export type GameStatus = 'menu' | 'playing' | 'paused' | 'ended'

export interface GameState {
  currentSceneId: string
  currentLineId: string
  status: GameStatus
  // 已收集的证据ID列表
  collectedEvidenceIds: string[]
  // 已完成的场景ID列表
  completedScenes: string[]
  // 游戏标志位（用于分支判断）
  flags: Record<string, boolean>
}

// 场景数据（包含对话）
export interface SceneData {
  id: string
  title: string
  dialogues: Record<string, DialogueLine>
  startLineId: string
  // 场景完成后解锁的证据
  unlockEvidence?: string[]
  // 场景类型（用于背景切换）
  sceneType?: 'courtroom' | 'meeting-room' | 'office'
}
