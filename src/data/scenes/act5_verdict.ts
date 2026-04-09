import { DialogueLine, SceneData } from '../../types'

/**
 * 第五幕：「判决」— 结案陈词
 * 力康的复盘独白，自然流动的反思
 */

const dialogues: Record<string, DialogueLine> = {
  'act5_start': {
    id: 'act5_start',
    characterId: 'narrator',
    text: '【场景：法庭外的走廊——项目复盘】',
    expression: 'normal',
    nextLineId: 'act5_01'
  },

  'act5_01': {
    id: 'act5_01',
    characterId: 'likang',
    text: '这个案子结了。我复盘下来就三点。',
    expression: 'confident',
    nextLineId: 'act5_02'
  },

  'act5_02': {
    id: 'act5_02',
    characterId: 'likang',
    text: '**被驳回不可怕，可怕的是不知道为什么被驳回。**',
    expression: 'serious',
    nextLineId: 'act5_03'
  },

  'act5_03': {
    id: 'act5_03',
    characterId: 'likang',
    text: '上次被驳回，不是因为想法不够多，而是我跳过了调研，直接开始画方案。',
    expression: 'thinking',
    nextLineId: 'act5_04'
  },

  'act5_04': {
    id: 'act5_04',
    characterId: 'likang',
    text: '第一，同一个功能会服务不同角色。',
    expression: 'normal',
    nextLineId: 'act5_05'
  },

  'act5_05': {
    id: 'act5_05',
    characterId: 'likang',
    text: '搭建者要的是写和测，维护者要的是看结果和回填；同一个人也会在两种角色间切换。',
    expression: 'thinking',
    nextLineId: 'act5_06'
  },

  'act5_06': {
    id: 'act5_06',
    characterId: 'likang',
    text: '第二，流程不能绑死。',
    expression: 'normal',
    nextLineId: 'act5_07'
  },

  'act5_07': {
    id: 'act5_07',
    characterId: 'likang',
    text: '模块化不是炫技，而是把选择权还给用户。',
    expression: 'thinking',
    nextLineId: 'act5_08'
  },

  'act5_08': {
    id: 'act5_08',
    characterId: 'likang',
    text: '第三，别用想象替代现场。',
    expression: 'normal',
    nextLineId: 'act5_09'
  },

  'act5_09': {
    id: 'act5_09',
    characterId: 'likang',
    text: '有人真的会直接在网页端写代码，真实使用场景总会打脸纸面假设。',
    expression: 'thinking',
    nextLineId: 'act5_10'
  },

  'act5_10': {
    id: 'act5_10',
    characterId: 'likang',
    text: '设计师的工作不是假设用户的行为，而是去**看见**它。',
    expression: 'thinking',
    nextLineId: 'act5_19'
  },

  'act5_19': {
    id: 'act5_19',
    characterId: 'narrator',
    text: '【屏幕渐暗】',
    expression: 'normal',
    nextLineId: 'act5_end'
  },

  'act5_end': {
    id: 'act5_end',
    characterId: 'narrator',
    text: '*这是下一个案子了。*\n\n═══════════════════════════════════\n「CASE CLOSED」\n代码块节点事件 — 完结\n═══════════════════════════════════',
    expression: 'normal'
  }
}

export const act5Data: SceneData = {
  id: 'act5_verdict',
  title: '第五幕：判决',
  startLineId: 'act5_start',
  dialogues,
  sceneType: 'courtroom'
}
