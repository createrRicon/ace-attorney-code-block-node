import { DialogueLine, SceneData } from '../../types'

/**
 * 第一幕：「委托」
 * Snow找力康设计代码块节点
 */

const dialogues: Record<string, DialogueLine> = {
  // 开场
  'act1_start': {
    id: 'act1_start',
    characterId: 'snow',
    text: '力康，有时间吗？有个需求想找你聊聊。',
    expression: 'normal',
    nextLineId: 'act1_01'
  },

  'act1_01': {
    id: 'act1_01',
    characterId: 'likang',
    text: 'Snow姐，什么需求？',
    expression: 'normal',
    nextLineId: 'act1_02'
  },

  'act1_02': {
    id: 'act1_02',
    characterId: 'snow',
    text: '是这样的——我们轻流的自动化流程，用户一直在反馈标准节点不够用。很多长尾需求，现有节点覆盖不了。',
    expression: 'serious',
    nextLineId: 'act1_03'
  },

  'act1_03': {
    id: 'act1_03',
    characterId: 'likang',
    text: '长尾需求……比如？',
    expression: 'thinking',
    nextLineId: 'act1_04'
  },

  'act1_04': {
    id: 'act1_04',
    characterId: 'snow',
    text: '比如复杂的数据计算、格式转换、调用第三方接口……这些东西用拖拽节点很难实现。所以——',
    expression: 'normal',
    nextLineId: 'act1_05'
  },

  'act1_05': {
    id: 'act1_05',
    characterId: 'snow',
    text: '我们决定加一个**代码块节点**。让用户直接在流程里写JavaScript代码。',
    expression: 'serious',
    nextLineId: 'act1_06'
  },

  'act1_06': {
    id: 'act1_06',
    characterId: 'likang',
    text: '等等。我们是**无代码**平台吧？',
    expression: 'surprised',
    nextLineId: 'act1_07'
  },

  'act1_07': {
    id: 'act1_07',
    characterId: 'snow',
    text: '对。所以这个设计很关键——我们要让**不太会写代码的人**，也能在这里写代码。',
    expression: 'smile',
    nextLineId: 'act1_08'
  },

  // 力康内心独白
  'act1_08': {
    id: 'act1_08',
    characterId: 'likang',
    text: '（让不会写代码的人写代码……这命题本身就是矛盾的。）',
    expression: 'thinking',
    nextLineId: 'act1_09'
  },

  'act1_09': {
    id: 'act1_09',
    characterId: 'likang',
    text: '（但这恰恰是设计的价值所在——把复杂的事情变简单。）',
    expression: 'confident',
    nextLineId: 'act1_10'
  },

  'act1_10': {
    id: 'act1_10',
    characterId: 'likang',
    text: '我接了。需求文档发我，我这周出方案。',
    expression: 'confident',
    nextLineId: 'act1_11'
  },

  'act1_11': {
    id: 'act1_11',
    characterId: 'snow',
    text: '好，辛苦你了。对了——',
    expression: 'normal',
    nextLineId: 'act1_12'
  },

  'act1_12': {
    id: 'act1_12',
    characterId: 'snow',
    text: '张老师那边也很关注这个功能。他之前是大学教计算机的，现在管创业园区，用我们的产品做物业管理。代码他自己会写，流程也是他自己搭的。',
    expression: 'normal',
    nextLineId: 'act1_13'
  },

  'act1_13': {
    id: 'act1_13',
    characterId: 'likang',
    text: '既懂技术又懂业务？这种用户很少见。',
    expression: 'surprised',
    nextLineId: 'act1_14'
  },

  'act1_14': {
    id: 'act1_14',
    characterId: 'snow',
    text: '是的，而且他是老板的老师，对我们产品非常上心。方案做好了可以找他确认一下。',
    expression: 'smile',
    nextLineId: 'act1_15'
  },

  'act1_15': {
    id: 'act1_15',
    characterId: 'likang',
    text: '明白了。我先把方案做出来。',
    expression: 'confident',
    nextLineId: 'act1_end'
  },

  // 过场
  'act1_end': {
    id: 'act1_end',
    characterId: 'narrator',
    text: '【三天后——】\n【力康完成了第一版设计方案】\n【信心满满地走进了研发评审会】\n【他不知道等待他的是……】',
    expression: 'normal',
    nextLineId: 'act2_start'
  }
}

export const act1Data: SceneData = {
  id: 'act1_commission',
  title: '第一幕：委托',
  startLineId: 'act1_start',
  dialogues,
  sceneType: 'meeting-room'
}
