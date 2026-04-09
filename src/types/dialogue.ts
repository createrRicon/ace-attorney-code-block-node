/**
 * 对话系统类型定义
 */

// 角色类型
export type CharacterId =
  | 'likang'      // 力康（主角）
  | 'snow'        // Snow（辩护助手）
  | 'll'          // LL（检察官）
  | 'poet'        // Poet（法官）
  | 'zhang'       // 张老师（突击证人）
  | 'wang'        // 小王（业务经理）
  | 'chen'        // 老陈（研发经理）
  | 'narrator'    // 旁白
  | 'player'      // 保留旧角色ID以兼容
  | 'interviewer'
  | 'witness'

export interface Character {
  id: CharacterId
  name: string
  color: string
  position: 'left' | 'right' | 'center'
}

// 表情类型
export type ExpressionType =
  | 'normal'     // 默认
  | 'happy'      // 开心
  | 'angry'      // 愤怒
  | 'surprised'  // 惊讶
  | 'confident'  // 自信
  | 'thinking'   // 思考
  | 'awkward'    // 尴尬
  | 'smile'      // 微笑
  | 'serious'    // 严肃
  | 'glasses'    // 推眼镜（LL专属）

// 视觉效果类型
export type VisualEffectType =
  | 'screen-shake'   // 屏幕震动
  | 'flash'          // 白色闪光
  | 'confetti'       // 礼花/纸屑

export interface VisualEffect {
  type: VisualEffectType
  intensity?: number   // 强度（震动幅度、闪光亮度等）
  duration?: number    // 持续时间（秒）
}

// 对话行类型
export interface DialogueLine {
  id: string
  characterId: CharacterId
  text: string
  expression?: ExpressionType
  // 可选的互动触发
  interactionTrigger?: InteractionTrigger
  // 可选的分支选择
  choices?: Choice[]
  // 下一对话行的 ID
  nextLineId?: string
  // 是否为证言（可以被质疑）
  isTestimony?: boolean
  // 证言的矛盾点（如果有的话）
  contradictionId?: string
  // 该对话显示时解锁的证词ID列表
  unlockEvidence?: string[]
  // 该对话显示时触发的视觉效果
  effects?: VisualEffect[]
}

// 互动触发类型
export type InteractionType =
  | 'objection'           // 异议！
  | 'present-evidence'    // 出示证据
  | 'cross-examination'   // 追问
  | 'clue-finding'        // 线索寻找交互
  | 'prototype-demo'      // 新版方案原型演示

export interface InteractionTrigger {
  type: InteractionType
  requiredEvidenceId?: string // 需要出示的证据ID
  successLineId?: string // 成功后的对话行ID
  failLineId?: string // 失败后的对话行ID
}

// 选择分支
export interface Choice {
  id: string
  text: string
  nextLineId: string
  condition?: () => boolean // 可选的条件判断
}

// 场景类型
export interface Scene {
  id: string
  title: string
  background: string
  startLineId: string
  characters: Character[]
  // 场景开始时解锁的证据
  unlockEvidence?: string[]
}
