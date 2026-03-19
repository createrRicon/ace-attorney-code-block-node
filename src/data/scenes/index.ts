/**
 * 场景索引
 * 导出所有五幕剧本
 */

export { act1Data } from './act1_commission'
export { act2Data } from './act2_rejection'
export { act3Data } from './act3_investigation'
export { act4Data } from './act4_turnaround'
export { act5Data } from './act5_verdict'

// 所有场景的数组，方便顺序播放
export const allActs = [
  { id: 'act1', data: 'act1Data' },
  { id: 'act2', data: 'act2Data' },
  { id: 'act3', data: 'act3Data' },
  { id: 'act4', data: 'act4Data' },
  { id: 'act5', data: 'act5Data' }
]
