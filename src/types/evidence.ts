/**
 * 证据系统类型定义
 */

// 证据类型
export type EvidenceType = 'document' | 'image' | 'screenshot' | 'prototype' | 'data'

// 证据接口
export interface Evidence {
  id: string
  name: string
  description: string | string[]
  type: EvidenceType
  thumbnail?: string // 缩略图URL
  imageUrl?: string // 完整图片URL
  // 证据可以指出哪个矛盾点
  contradictionId?: string
  // 是否已解锁
  unlocked?: boolean
}

// 法庭记录（证据库）
export interface CourtRecord {
  evidences: Evidence[]
  // 当前选中的证据
  selectedEvidenceId: string | null
}
