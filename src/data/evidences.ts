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
    unlocked: false,
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
    unlocked: false,
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
    unlocked: false,
  },
]

/**
 * 第三幕证词
 */
export const act3Evidences: Evidence[] = [
  {
    id: 'wang-testimony',
    name: '小王的证词',
    description: ['"我不写代码，主要是看结果、配回填，让数据进到表单里。真要改代码，我会找技术同事帮忙。"'],
    type: 'document',
    thumbnail: '/assets/figma/item.png',
    portraitCharacterId: 'wang',
    unlocked: false,
  },
  {
    id: 'chen-testimony',
    name: '老陈的证词',
    description: ['"需要一边写代码一边看测试结果，线性流程来回切换太折腾。"'],
    type: 'document',
    thumbnail: '/assets/figma/item.png',
    portraitCharacterId: 'chen',
    unlocked: false,
  },
]

/**
 * 所有证据合集
 */
export const allEvidences: Evidence[] = [
  ...scene1Evidences,
  ...act3Evidences,
]

/**
 * 获取证据 by ID
 */
export const getEvidenceById = (id: string): Evidence | undefined => {
  return allEvidences.find((e) => e.id === id)
}
