import { DialogueLine, SceneData } from '../../types'

/**
 * 第三幕：「调查」
 * 线上访谈小王和老陈，发现两种角色需求
 * 然后进行证据整理交互
 */

const dialogues: Record<string, DialogueLine> = {
  // 场景一：线上访谈通话
  'act3_start': {
    id: 'act3_start',
    characterId: 'narrator',
    text: '【场景：调查现场——线上访谈】',
    expression: 'normal',
    nextLineId: 'act3_01'
  },

  'act3_01': {
    id: 'act3_01',
    characterId: 'likang',
    text: '小王，你平时怎么使用代码块节点？',
    expression: 'normal',
    nextLineId: 'act3_02'
  },

  'act3_02': {
    id: 'act3_02',
    characterId: 'wang',
    text: '我是业务端的，代码不是我写的。但是配置好的流程出了问题，得我来查。我需要看**运行日志**、**输出结果**，有时候改改输出配置。',
    expression: 'normal',
    nextLineId: 'act3_03'
  },

  'act3_03': {
    id: 'act3_03',
    characterId: 'wang',
    text: '但是每次进去，迎面而来一个代码编辑器——说实话，有点劝退。',
    expression: 'awkward',
    nextLineId: 'act3_04'
  },

  'act3_04': {
    id: 'act3_04',
    characterId: 'likang',
    text: '老陈你呢？',
    expression: 'normal',
    nextLineId: 'act3_05'
  },

  'act3_05': {
    id: 'act3_05',
    characterId: 'chen',
    text: '我负责写代码，但你那个编辑器——说实话不太行。我需要**一边写代码一边看测试结果**，现在这个线性流程做不到。每次改一点就要点下一步去测试，测完再回来改，来来回回太折腾了。',
    expression: 'serious',
    nextLineId: 'act3_06'
  },

  'act3_06': {
    id: 'act3_06',
    characterId: 'likang',
    text: '所以你理想中是什么样的？',
    expression: 'thinking',
    nextLineId: 'act3_07'
  },

  'act3_07': {
    id: 'act3_07',
    characterId: 'chen',
    text: '代码在左边，测试在右边，**并排着来**。改完直接跑，结果实时看到。',
    expression: 'normal',
    nextLineId: 'act3_08'
  },

  // 获得证词 - 小王
  'act3_08': {
    id: 'act3_08',
    characterId: 'narrator',
    text: '【获得证据：🔖 小王的证词】\n*"我不写代码，只需要看日志、看结果、改配置。代码编辑器让我很劝退。"*',
    expression: 'normal',
    nextLineId: 'act3_08b'
  },

  // 过渡对话
  'act3_08b': {
    id: 'act3_08b',
    characterId: 'likang',
    text: '两个人的反馈完全不一样……老陈那边怎么说的？',
    expression: 'thinking',
    nextLineId: 'act3_09'
  },

  // 获得证词 - 老陈
  'act3_09': {
    id: 'act3_09',
    characterId: 'narrator',
    text: '【获得证据：🔖 老陈的证词】\n*"需要一边写代码一边看测试结果，线性流程来回切换太折腾。"*',
    expression: 'normal',
    nextLineId: 'act3_10'
  },

  // 场景二：证据整理
  'act3_10': {
    id: 'act3_10',
    characterId: 'narrator',
    text: '【场景：证据整理】',
    expression: 'normal',
    nextLineId: 'act3_11'
  },

  'act3_11': {
    id: 'act3_11',
    characterId: 'snow',
    text: '力康，我们把调查结果整理一下吧。我发现一个有趣的规律……',
    expression: 'smile',
    nextLineId: 'act3_12'
  },

  'act3_12': {
    id: 'act3_12',
    characterId: 'likang',
    text: '我也注意到了。',
    expression: 'thinking',
    nextLineId: 'act3_13'
  },

  'act3_13': {
    id: 'act3_13',
    characterId: 'snow',
    text: '屏幕上出现两个区域：左边是🔨 **搭建者需求**，右边是🔧 **维护者需求**。来，把这些证词卡片拖到正确的分类中吧！',
    expression: 'smile',
    nextLineId: 'act3_interaction',
    interactionTrigger: {
      type: 'evidence-sorting',
      requiredEvidenceId: undefined
    }
  },

  // 证据整理完成后的对话
  'act3_interaction': {
    id: 'act3_interaction',
    characterId: 'likang',
    text: '原来如此——！',
    expression: 'surprised',
    nextLineId: 'act3_14'
  },

  'act3_14': {
    id: 'act3_14',
    characterId: 'snow',
    text: '嗯。同一个功能，两种完全不同的使用场景。',
    expression: 'smile',
    nextLineId: 'act3_15'
  },

  'act3_15': {
    id: 'act3_15',
    characterId: 'likang',
    text: '搭建者需要一个**完整的代码工作台**——大编辑区、实时测试、并排对照。',
    expression: 'normal',
    nextLineId: 'act3_16'
  },

  'act3_16': {
    id: 'act3_16',
    characterId: 'likang',
    text: '维护者需要一个**轻量的维护入口**——看日志、看结果、改配置，最好**连代码编辑器都不用看到**。',
    expression: 'normal',
    nextLineId: 'act3_17'
  },

  'act3_17': {
    id: 'act3_17',
    characterId: 'likang',
    text: '一个线性的1-2-3流程……**永远不可能同时满足这两种人。**',
    expression: 'serious',
    nextLineId: 'act3_18'
  },

  'act3_18': {
    id: 'act3_18',
    characterId: 'snow',
    text: '所以你的新方案打算怎么做？',
    expression: 'smile',
    nextLineId: 'act3_19'
  },

  'act3_19': {
    id: 'act3_19',
    characterId: 'likang',
    text: '**把线拆掉。**',
    expression: 'normal',
    nextLineId: 'act3_end'
  },

  'act3_end': {
    id: 'act3_end',
    characterId: 'narrator',
    text: '【关键洞察已锁定——】\n【不是一种用户，是两种角色】\n【不是一条路径，是自由组合】\n【该回到法庭了。】',
    expression: 'normal',
    nextLineId: 'act4_start'
  }
}

export const act3Data: SceneData = {
  id: 'act3_investigation',
  title: '第三幕：调查',
  startLineId: 'act3_start',
  dialogues,
  sceneType: 'office'
}
