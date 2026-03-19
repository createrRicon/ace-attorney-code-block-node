import { DialogueLine, SceneData } from '../../types'

/**
 * 第二幕：「初审败诉」
 * 研发评审会，LL提出异议，方案被驳回
 */

const dialogues: Record<string, DialogueLine> = {
  // 开场 - 法庭场景
  'act2_start': {
    id: 'act2_start',
    characterId: 'poet',
    text: '本次审判——呃，评审，现在开始。辩护方力康，请陈述你的设计方案。',
    expression: 'serious',
    nextLineId: 'act2_01'
  },

  'act2_01': {
    id: 'act2_01',
    characterId: 'likang',
    text: '好的。代码块节点的核心流程分为三步：第一步，编写代码并绑定输入字段；第二步，测试代码并查看运行结果；第三步，配置代码输出映射到下游节点。',
    expression: 'serious',
    nextLineId: 'act2_01b'
  },

  'act2_01b': {
    id: 'act2_01b',
    characterId: 'likang',
    text: '整体是一个**1-2-3的线性流程**，用户按步骤往下走就可以了。',
    expression: 'confident',
    nextLineId: 'act2_02'
  },

  'act2_02': {
    id: 'act2_02',
    characterId: 'likang',
    text: '这个模式和我们线上现有的其他节点配置交互是一致的，用户不需要学习新的操作习惯。',
    expression: 'serious',
    nextLineId: 'act2_03'
  },

  'act2_03': {
    id: 'act2_03',
    characterId: 'poet',
    text: '嗯，听起来思路清晰。检察方，有什么意见吗？',
    expression: 'normal',
    nextLineId: 'act2_04'
  },

  // LL沉默
  'act2_04': {
    id: 'act2_04',
    characterId: 'll',
    text: '……',
    expression: 'normal',
    nextLineId: 'act2_05'
  },

  // 异议！
  'act2_05': {
    id: 'act2_05',
    characterId: 'll',
    text: '（推了推黑框眼镜）',
    expression: 'glasses',
    nextLineId: 'act2_06',
    interactionTrigger: {
      type: 'objection',
      requiredEvidenceId: undefined
    }
  },

  'act2_06': {
    id: 'act2_06',
    characterId: 'll',
    text: '这个东西——**根本就不是给写代码的人用的。**',
    expression: 'serious',
    nextLineId: 'act2_07'
  },

  'act2_07': {
    id: 'act2_07',
    characterId: 'likang',
    text: '！',
    expression: 'awkward',
    nextLineId: 'act2_08'
  },

  'act2_08': {
    id: 'act2_08',
    characterId: 'll',
    text: '你看你这个代码编辑框，**这么小**，怎么写？怎么看？',
    expression: 'angry',
    nextLineId: 'act2_09'
  },

  'act2_09': {
    id: 'act2_09',
    characterId: 'll',
    text: '我们平时写代码还要**测试**——要把测试框拖进来、对照着看，你这个流程**一点都做不到**。',
    expression: 'serious',
    nextLineId: 'act2_10'
  },

  'act2_10': {
    id: 'act2_10',
    characterId: 'll',
    text: '你让人怎么在这里面写代码？**不可能有人在这里写代码的**——大家只会自己在IDE里面写好，再复制粘贴进来。',
    expression: 'angry',
    nextLineId: 'act2_11'
  },

  'act2_11': {
    id: 'act2_11',
    characterId: 'll',
    text: '你这个东西体验太差了，**完全没有考虑过程序员的使用体验。**',
    expression: 'serious',
    nextLineId: 'act2_12'
  },

  'act2_12': {
    id: 'act2_12',
    characterId: 'likang',
    text: '可、可是这是无代码平台的用户，他们不一定都是程序员——',
    expression: 'awkward',
    nextLineId: 'act2_13'
  },

  'act2_13': {
    id: 'act2_13',
    characterId: 'll',
    text: '那就更糟了。程序员至少还能忍，不会写代码的人看到你这个**小框框**直接就放弃了。',
    expression: 'angry',
    nextLineId: 'act2_14'
  },

  'act2_14': {
    id: 'act2_14',
    characterId: 'll',
    text: '你看看VS Code——',
    expression: 'normal',
    nextLineId: 'act2_15'
  },

  'act2_15': {
    id: 'act2_15',
    characterId: 'll',
    text: '窗口可以**切分**，上下、左右随便拖。代码在左边写，运行结果在右边看，**实时对照**。',
    expression: 'serious',
    nextLineId: 'act2_16'
  },

  'act2_16': {
    id: 'act2_16',
    characterId: 'll',
    text: '用户可以按照自己的习惯去**自由配置**工作区域。这才叫给写代码的人用的东西。',
    expression: 'serious',
    nextLineId: 'act2_17'
  },

  'act2_17': {
    id: 'act2_17',
    characterId: 'll',
    text: '你那个1-2-3线性流程，每改一行代码就要从头走到尾，**来来回回**——',
    expression: 'angry',
    nextLineId: 'act2_18'
  },

  'act2_18': {
    id: 'act2_18',
    characterId: 'll',
    text: '这不是设计，这是**折磨**。',
    expression: 'serious',
    nextLineId: 'act2_19'
  },

  'act2_19': {
    id: 'act2_19',
    characterId: 'poet',
    text: '……辩护方，你有什么要说的吗？',
    expression: 'serious',
    nextLineId: 'act2_choice'
  },

  // 选择分支
  'act2_choice': {
    id: 'act2_choice',
    characterId: 'likang',
    text: '…………（应该如何反驳他呢？）',
    expression: 'awkward',
    choices: [
      {
        id: 'choice_a',
        text: '反对，无代码用户不需要VS Code',
        nextLineId: 'act2_choice_a'
      },
      {
        id: 'choice_b',
        text: '承认他说的对',
        nextLineId: 'act2_choice_b'
      }
    ]
  },

  // 选项A的结果
  'act2_choice_a': {
    id: 'act2_choice_a',
    characterId: 'll',
    text: '那你倒是说说，他们需要什么体验？你做过调研吗？你问过用户了吗？',
    expression: 'angry',
    nextLineId: 'act2_choice_a2'
  },

  'act2_choice_a2': {
    id: 'act2_choice_a2',
    characterId: 'likang',
    text: '……',
    expression: 'awkward',
    nextLineId: 'act2_choice_a3'
  },

  'act2_choice_a3': {
    id: 'act2_choice_a3',
    characterId: 'll',
    text: '你没有。你**假设**他们的需求，然后用最省事的线性流程套上去了。',
    expression: 'serious',
    nextLineId: 'act2_verdict'
  },

  // 选项B的结果
  'act2_choice_b': {
    id: 'act2_choice_b',
    characterId: 'll',
    text: '……哦？',
    expression: 'normal',
    nextLineId: 'act2_choice_b2'
  },

  'act2_choice_b2': {
    id: 'act2_choice_b2',
    characterId: 'likang',
    text: '代码编辑框确实太小了。而且你说得对——线性流程没有考虑到反复修改和测试的场景。',
    expression: 'awkward',
    nextLineId: 'act2_choice_b3'
  },

  'act2_choice_b3': {
    id: 'act2_choice_b3',
    characterId: 'll',
    text: '（推眼镜）……至少你还知道认。',
    expression: 'glasses',
    nextLineId: 'act2_verdict'
  },

  // 无论选A还是B，都会到这里
  'act2_verdict': {
    id: 'act2_verdict',
    characterId: 'poet',
    text: '本次评审的结论——',
    expression: 'serious',
    nextLineId: 'act2_verdict2'
  },

  'act2_verdict2': {
    id: 'act2_verdict2',
    characterId: 'poet',
    text: '**设计方案，驳回。**',
    expression: 'serious',
    nextLineId: 'act2_verdict3'
  },

  'act2_verdict3': {
    id: 'act2_verdict3',
    characterId: 'poet',
    text: '辩护方力康，请重新进行用户调研，限期提交修改后的方案。',
    expression: 'serious',
    nextLineId: 'act2_snow'
  },

  'act2_snow': {
    id: 'act2_snow',
    characterId: 'snow',
    text: '（在旁听席小声说）没关系，力康。我们去做调研，这次做扎实了再来。',
    expression: 'smile',
    nextLineId: 'act2_monologue'
  },

  // 力康内心独白
  'act2_monologue': {
    id: 'act2_monologue',
    characterId: 'likang',
    text: '（他说得对。我犯了最基本的错误——）',
    expression: 'thinking',
    nextLineId: 'act2_monologue2'
  },

  'act2_monologue2': {
    id: 'act2_monologue2',
    characterId: 'likang',
    text: '（我在设计一个"流程"，但用户需要的是一个"工作台"。）',
    expression: 'thinking',
    nextLineId: 'act2_monologue3'
  },

  'act2_monologue3': {
    id: 'act2_monologue3',
    characterId: 'likang',
    text: '（我从来没有认真问过：用代码块的人，到底是怎么工作的？）',
    expression: 'thinking',
    nextLineId: 'act2_end'
  },

  'act2_end': {
    id: 'act2_end',
    characterId: 'narrator',
    text: '【败诉了。】\n【但败诉不是终点——是调查的起点。】',
    expression: 'normal',
    nextLineId: 'act3_start'
  }
}

export const act2Data: SceneData = {
  id: 'act2_rejection',
  title: '第二幕：初审败诉',
  startLineId: 'act2_start',
  dialogues,
  sceneType: 'courtroom'
}
