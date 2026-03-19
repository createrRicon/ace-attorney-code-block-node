import { DialogueLine, SceneData } from '../../types'

/**
 * 第五幕：「判决」— 结案陈词
 * 力康的四条总结和反思
 */

const dialogues: Record<string, DialogueLine> = {
  // 场景转换
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
    text: '这个案子结了。但它教会了我几件事——',
    expression: 'confident',
    nextLineId: 'act5_02'
  },

  // 第一条总结
  'act5_02': {
    id: 'act5_02',
    characterId: 'likang',
    text: '**第一，被驳回不可怕，可怕的是不知道为什么被驳回。**',
    expression: 'serious',
    nextLineId: 'act5_03'
  },

  'act5_03': {
    id: 'act5_03',
    characterId: 'likang',
    text: 'LL指出的每一个问题，其实都是我应该在用户调研阶段就发现的。我跳过了"了解用户"这一步，直接去画方案——这不是设计，这是猜测。',
    expression: 'thinking',
    nextLineId: 'act5_04'
  },

  'act5_04': {
    id: 'act5_04',
    characterId: 'likang',
    text: '……',
    expression: 'normal',
    nextLineId: 'act5_05'
  },

  // 第二条总结
  'act5_05': {
    id: 'act5_05',
    characterId: 'likang',
    text: '**第二，"用户"从来不是一个群体。**',
    expression: 'serious',
    nextLineId: 'act5_06'
  },

  'act5_06': {
    id: 'act5_06',
    characterId: 'likang',
    text: '同一个功能，搭建者和维护者的需求天差地别。如果我只画一条用户流程，我永远看不到这个分叉。甚至像张老师这样——同一个人在不同时刻，也在这两种角色之间切换。',
    expression: 'thinking',
    nextLineId: 'act5_07'
  },

  'act5_07': {
    id: 'act5_07',
    characterId: 'likang',
    text: '……',
    expression: 'normal',
    nextLineId: 'act5_08'
  },

  // 第三条总结
  'act5_08': {
    id: 'act5_08',
    characterId: 'likang',
    text: '**第三，模块化不只是一种技术架构，它也是一种设计哲学。**',
    expression: 'serious',
    nextLineId: 'act5_09'
  },

  'act5_09': {
    id: 'act5_09',
    characterId: 'likang',
    text: '给用户自由，而不是给用户路径。让他们按需组合，而不是按步骤前进。',
    expression: 'thinking',
    nextLineId: 'act5_10'
  },

  'act5_10': {
    id: 'act5_10',
    characterId: 'likang',
    text: '……',
    expression: 'normal',
    nextLineId: 'act5_11'
  },

  // 第四条总结
  'act5_11': {
    id: 'act5_11',
    characterId: 'likang',
    text: '**第四，不要替用户做假设。**',
    expression: 'serious',
    nextLineId: 'act5_12'
  },

  'act5_12': {
    id: 'act5_12',
    characterId: 'likang',
    text: 'LL说"没人会在网页端写代码"，这听起来很合理。但张老师告诉我们——真实世界里，就是有人直接在网页上写。',
    expression: 'thinking',
    nextLineId: 'act5_13'
  },

  'act5_13': {
    id: 'act5_13',
    characterId: 'likang',
    text: '设计师的工作不是假设用户的行为，而是去看见它。',
    expression: 'thinking',
    nextLineId: 'act5_14'
  },

  'act5_14': {
    id: 'act5_14',
    characterId: 'likang',
    text: '……',
    expression: 'normal',
    nextLineId: 'act5_15'
  },

  // 伏笔
  'act5_15': {
    id: 'act5_15',
    characterId: 'likang',
    text: '不过……故事还没完全结束。',
    expression: 'thinking',
    nextLineId: 'act5_16'
  },

  'act5_16': {
    id: 'act5_16',
    characterId: 'likang',
    text: '如果代码块可以接入AI的能力——',
    expression: 'thinking',
    nextLineId: 'act5_17'
  },

  'act5_17': {
    id: 'act5_17',
    characterId: 'likang',
    text: '那些不太熟悉代码的维护者，是不是也可以用**自然语言**来实现复杂的业务逻辑？',
    expression: 'thinking',
    nextLineId: 'act5_18'
  },

  'act5_18': {
    id: 'act5_18',
    characterId: 'likang',
    text: '搭建和维护的界限……也许可以被重新定义。',
    expression: 'confident',
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
    // 剧本结束，没有下一行
  }
}

export const act5Data: SceneData = {
  id: 'act5_verdict',
  title: '第五幕：判决',
  startLineId: 'act5_start',
  dialogues,
  sceneType: 'courtroom'
}
