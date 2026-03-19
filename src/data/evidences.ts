import { Evidence } from '../types'

/**
 * 证据数据
 * 场景1中使用的三个关键证据
 */
export const scene1Evidences: Evidence[] = [
  {
    id: 'competitor-analysis',
    name: '竞品分析报告',
    description: [
      '分析了 ChatGPT、Claude 等产品',
      '发现：渐进式引导是最佳实践',
      '用户需要明确的场景选项',
      '开放式对话容易让用户迷失',
    ],
    type: 'document',
    thumbnail: '/assets/figma/item.png',
    contradictionId: 'contradiction_1',
    unlocked: true,
  },
  {
    id: 'user-research',
    name: '用户调研数据',
    description: [
      '调研了 50+ 位潜在用户',
      '78% 希望有明确的指引',
      '65% 之前使用过类似产品失败',
      '用户最关心：配置的可见性',
    ],
    type: 'data',
    thumbnail: '/assets/figma/item.png',
    contradictionId: 'contradiction_2',
    unlocked: true,
  },
  {
    id: 'prototype-design',
    name: '原型设计方案',
    description: [
      '左侧：引导式对话流',
      '右侧：实时配置预览',
      '结构化选项 + 自然语言',
      '进度清晰可见',
    ],
    type: 'prototype',
    thumbnail: '/assets/figma/item.png',
    contradictionId: 'contradiction_3',
    unlocked: true,
  },
]

/**
 * 获取证据 by ID
 */
export const getEvidenceById = (id: string): Evidence | undefined => {
  return scene1Evidences.find((e) => e.id === id)
}
