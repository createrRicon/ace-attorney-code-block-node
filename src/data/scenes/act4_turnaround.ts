import { DialogueLine, SceneData } from '../../types'

/**
 * 第四幕：「逆转」
 * 力康提出新方案，张老师作为突击证人登场，方案最终通过
 */

const dialogues: Record<string, DialogueLine> = {
  // 方案复审开场
  'act4_start': {
    id: 'act4_start',
    characterId: 'poet',
    text: '代码块节点设计方案复审，现在开庭。辩护方力康，请陈述你的新方案。',
    expression: 'serious',
    nextLineId: 'act4_01'
  },

  'act4_01': {
    id: 'act4_01',
    characterId: 'likang',
    text: '法官大人，在陈述新方案之前，我想先**承认**一件事。',
    expression: 'serious',
    nextLineId: 'act4_02'
  },

  'act4_02': {
    id: 'act4_02',
    characterId: 'poet',
    text: '哦？',
    expression: 'normal',
    nextLineId: 'act4_03'
  },

  'act4_03': {
    id: 'act4_03',
    characterId: 'likang',
    text: '上一次的方案确实很糟糕。LL检察官的每一条批评都是对的——编辑框太小、线性流程无法支持反复修改、完全没有考虑实际编码体验。',
    expression: 'normal',
    nextLineId: 'act4_04'
  },

  'act4_04': {
    id: 'act4_04',
    characterId: 'll',
    text: '（推眼镜）……你承认就好。所以这次你带来了什么？',
    expression: 'glasses',
    nextLineId: 'act4_05'
  },

  'act4_05': {
    id: 'act4_05',
    characterId: 'likang',
    text: '这次，我和Snow做了完整的用户调研。我们发现了一个**之前从未注意到的事实**——',
    expression: 'normal',
    nextLineId: 'act4_06'
  },

  'act4_06': {
    id: 'act4_06',
    characterId: 'likang',
    text: '使用代码块节点的，不是**一种用户**，而是**两种完全不同的角色**。',
    expression: 'normal',
    nextLineId: 'act4_07'
  },

  'act4_07': {
    id: 'act4_07',
    characterId: 'll',
    text: '两种角色？',
    expression: 'normal',
    nextLineId: 'act4_08'
  },

  'act4_08': {
    id: 'act4_08',
    characterId: 'likang',
    text: '第一种是**搭建者**——像研发经理老陈这样，负责从零开始编写代码。他需要大编辑区、实时测试、并排对照。',
    expression: 'normal',
    nextLineId: 'act4_09'
  },

  'act4_09': {
    id: 'act4_09',
    characterId: 'likang',
    text: '第二种是**维护者**——像业务经理小王这样，不写代码，主要是确认处理结果、配置回填字段，让数据准确进到表单里。真要改逻辑，他会找技术同事帮忙。**他甚至不应该看到代码编辑器**。',
    expression: 'normal',
    nextLineId: 'act4_10'
  },

  'act4_10': {
    id: 'act4_10',
    characterId: 'likang',
    text: '所以我的新方案是：**把那条线，打碎。**',
    expression: 'normal',
    nextLineId: 'act4_11'
  },

  'act4_11': {
    id: 'act4_11',
    characterId: 'narrator',
    text: '【展示设计方案——线性流程图碎裂，重组为模块化布局的动画】',
    expression: 'normal',
    nextLineId: 'act4_12'
  },

  'act4_12': {
    id: 'act4_12',
    characterId: 'likang',
    text: '之前的方案把写代码、测试、看结果、配置输出锁死在一个1-2-3的线性流程里。新方案把它们拆成**独立的模块**——',
    expression: 'normal',
    nextLineId: 'act4_13'
  },

  'act4_13': {
    id: 'act4_13',
    characterId: 'likang',
    text: '**代码编辑器**，独立的。',
    expression: 'normal',
    nextLineId: 'act4_14'
  },

  'act4_14': {
    id: 'act4_14',
    characterId: 'likang',
    text: '**测试面板**，独立的——作为右侧边栏存在，可以上下滑动。',
    expression: 'normal',
    nextLineId: 'act4_15'
  },

  'act4_15': {
    id: 'act4_15',
    characterId: 'likang',
    text: '**运行结果**，独立的。',
    expression: 'normal',
    nextLineId: 'act4_16'
  },

  'act4_16': {
    id: 'act4_16',
    characterId: 'likang',
    text: '**输出配置**，独立的。',
    expression: 'normal',
    nextLineId: 'act4_17'
  },

  'act4_17': {
    id: 'act4_17',
    characterId: 'likang',
    text: '搭建者可以**一边写代码，一边在右侧看测试结果**，改完直接运行，结果实时刷新。维护者只需要打开**结果面板和输出配置**，代码编辑器根本不会出现在他们面前。',
    expression: 'normal',
    nextLineId: 'act4_18'
  },

  // LL再次质疑
  'act4_18': {
    id: 'act4_18',
    characterId: 'll',
    text: '思路倒是不错……但我有一个问题。',
    expression: 'serious',
    nextLineId: 'act4_19'
  },

  'act4_19': {
    id: 'act4_19',
    characterId: 'll',
    text: '你这个方案的前提是——有人会**真的在网页端写代码**。但我上次说了，**没人会在你这个小框框里写代码**，大家都会在IDE里写好再粘贴过来。如果根本没人在网页端写代码，你优化编辑体验有什么意义？',
    expression: 'serious',
    nextLineId: 'act4_20'
  },

  'act4_20': {
    id: 'act4_20',
    characterId: 'likang',
    text: '关于这一点——',
    expression: 'serious',
    nextLineId: 'act4_21'
  },

  'act4_21': {
    id: 'act4_21',
    characterId: 'likang',
    text: '我请求传唤一位**证人**。',
    expression: 'normal',
    nextLineId: 'act4_22'
  },

  'act4_22': {
    id: 'act4_22',
    characterId: 'poet',
    text: '准许。',
    expression: 'normal',
    nextLineId: 'act4_23'
  },

  // 张老师登场
  'act4_23': {
    id: 'act4_23',
    characterId: 'narrator',
    text: '【法庭大门打开，张老师走进来】',
    expression: 'normal',
    nextLineId: 'act4_24'
  },

  'act4_24': {
    id: 'act4_24',
    characterId: 'poet',
    text: '请证人自我介绍。',
    expression: 'normal',
    nextLineId: 'act4_25'
  },

  'act4_25': {
    id: 'act4_25',
    characterId: 'zhang',
    text: '大家好，我姓张，大家叫我张老师就好。之前在大学教计算机，现在在做创业园区的管理工作。我用轻流做园区的物业管理系统。',
    expression: 'normal',
    nextLineId: 'act4_26'
  },

  'act4_26': {
    id: 'act4_26',
    characterId: 'll',
    text: '（推眼镜）教计算机的……那你应该懂代码？',
    expression: 'glasses',
    nextLineId: 'act4_27'
  },

  'act4_27': {
    id: 'act4_27',
    characterId: 'zhang',
    text: '代码我当然会写。园区的流程都是我一个人搭的，代码块也是我自己写自己维护。',
    expression: 'smile',
    nextLineId: 'act4_28'
  },

  'act4_28': {
    id: 'act4_28',
    characterId: 'll',
    text: '那你写代码的时候，是在本地IDE里写好再粘贴过来的吧？',
    expression: 'serious',
    nextLineId: 'act4_29'
  },

  'act4_29': {
    id: 'act4_29',
    characterId: 'zhang',
    text: '不是。',
    expression: 'smile',
    nextLineId: 'act4_30'
  },

  'act4_30': {
    id: 'act4_30',
    characterId: 'll',
    text: '？',
    expression: 'normal',
    nextLineId: 'act4_31'
  },

  'act4_31': {
    id: 'act4_31',
    characterId: 'zhang',
    text: '我就直接在你们网页上写。',
    expression: 'smile',
    nextLineId: 'act4_32'
  },

  'act4_32': {
    id: 'act4_32',
    characterId: 'll',
    text: '……**直接在网页上写？**',
    expression: 'normal',
    nextLineId: 'act4_33'
  },

  'act4_33': {
    id: 'act4_33',
    characterId: 'zhang',
    text: '对啊。我用轻流管物业，有时候在办公室电脑上改改，有时候在外面用平板也要临时调一下。哪有功夫每次都开IDE？直接在网页上打开，改完保存，方便。',
    expression: 'smile',
    nextLineId: 'act4_34'
  },

  'act4_34': {
    id: 'act4_34',
    characterId: 'zhang',
    text: '但是你们现在这个编辑器——说实话**很难用**。框太小了，横向的代码都看不全。我写个稍微长一点的逻辑，得左右滚来滚去。',
    expression: 'serious',
    nextLineId: 'act4_35'
  },

  'act4_35': {
    id: 'act4_35',
    characterId: 'zhang',
    text: '而且我搭建完之后，日常维护也是我自己做。有时候只是想看看运行结果对不对、改个参数。但每次一进来就是代码编辑器摆在最前面，我还得翻半天才看到结果——我明明只想看个数而已。',
    expression: 'serious',
    nextLineId: 'act4_36'
  },

  'act4_36': {
    id: 'act4_36',
    characterId: 'likang',
    text: '张老师，所以您是**搭建和维护都自己做**——而且直接在网页端写代码，不开IDE。',
    expression: 'normal',
    nextLineId: 'act4_37'
  },

  'act4_37': {
    id: 'act4_37',
    characterId: 'zhang',
    text: '没错。而且你别以为只有我这样——我们园区好几个管理员都是直接在网页上改的。大家又不是专业程序员，不会为了改几行代码专门开一个VS Code。',
    expression: 'smile',
    nextLineId: 'act4_38'
  },

  'act4_38': {
    id: 'act4_38',
    characterId: 'narrator',
    text: '【全场沉默】',
    expression: 'normal',
    nextLineId: 'act4_39'
  },

  'act4_39': {
    id: 'act4_39',
    characterId: 'll',
    text: '…………',
    expression: 'normal',
    nextLineId: 'act4_40'
  },

  'act4_40': {
    id: 'act4_40',
    characterId: 'll',
    text: '（推了推眼镜，沉默了很久）',
    expression: 'glasses',
    nextLineId: 'act4_41'
  },

  'act4_41': {
    id: 'act4_41',
    characterId: 'll',
    text: '……我收回之前的话。确实有人在网页端写代码。那这个编辑体验——',
    expression: 'normal',
    nextLineId: 'act4_42'
  },

  'act4_42': {
    id: 'act4_42',
    characterId: 'likang',
    text: '**必须优化。**不是"可以凑合"，是**必须做好**。',
    expression: 'serious',
    nextLineId: 'act4_43'
  },

  'act4_43': {
    id: 'act4_43',
    characterId: 'likang',
    text: '因为用户不只是在这里看代码——他们在这里**写**代码、**改**代码、**调试**代码。这个编辑区不是一个展示框，它是一个**工作台**。',
    expression: 'normal',
    nextLineId: 'act4_44'
  },

  'act4_44': {
    id: 'act4_44',
    characterId: 'll',
    text: '…………',
    expression: 'normal',
    nextLineId: 'act4_45'
  },

  'act4_45': {
    id: 'act4_45',
    characterId: 'll',
    text: '你做了AB测试吗？',
    expression: 'serious',
    nextLineId: 'act4_46'
  },

  'act4_46': {
    id: 'act4_46',
    characterId: 'likang',
    text: '做了。A方案是之前的1-2-3线性流程，B方案是模块化方案——代码编辑器独立，测试面板作为右侧边栏可以上下滑动，用户可以一边写代码一边看测试，也可以一边回填数据一边看结果。',
    expression: 'normal',
    nextLineId: 'act4_47'
  },

  'act4_47': {
    id: 'act4_47',
    characterId: 'snow',
    text: '（站起来补充）B方案下，搭建者不用再来回切换就能测试；维护者进来直接就能看到结果，不用翻过代码编辑器。两种角色的反馈都是正面的。',
    expression: 'smile',
    nextLineId: 'act4_48'
  },

  'act4_48': {
    id: 'act4_48',
    characterId: 'll',
    text: '…………',
    expression: 'normal',
    nextLineId: 'act4_49'
  },

  'act4_49': {
    id: 'act4_49',
    characterId: 'll',
    text: '我没有异议了。',
    expression: 'serious',
    nextLineId: 'act4_50'
  },

  'act4_50': {
    id: 'act4_50',
    characterId: 'narrator',
    text: '【！】',
    expression: 'normal',
    nextLineId: 'act4_51'
  },

  'act4_51': {
    id: 'act4_51',
    characterId: 'snow',
    text: '（小声）力康，他居然没有异议了。',
    expression: 'smile',
    nextLineId: 'act4_52'
  },

  'act4_52': {
    id: 'act4_52',
    characterId: 'poet',
    text: '（微笑）那么——',
    expression: 'smile',
    nextLineId: 'act4_53'
  },

  'act4_53': {
    id: 'act4_53',
    characterId: 'poet',
    text: '本次复审的结论——',
    expression: 'serious',
    nextLineId: 'act4_54'
  },

  'act4_54': {
    id: 'act4_54',
    characterId: 'narrator',
    text: '【法槌高高举起】',
    expression: 'normal',
    nextLineId: 'act4_55'
  },

  'act4_55': {
    id: 'act4_55',
    characterId: 'poet',
    text: '**设计方案，通过！**',
    expression: 'smile',
    nextLineId: 'act4_56',
    effects: [
      { type: 'flash', duration: 0.35 },
      { type: 'screen-shake', intensity: 10, duration: 0.5 },
    ]
  },

  'act4_56': {
    id: 'act4_56',
    characterId: 'narrator',
    text: '【法槌落下 —— 砰！】',
    expression: 'normal',
    nextLineId: 'act4_57',
    effects: [
      { type: 'confetti', duration: 2 },
    ]
  },

  'act4_57': {
    id: 'act4_57',
    characterId: 'zhang',
    text: '（在证人席上点了点头，笑着说）不错，年轻人。方案做好了记得发给我看看，我还有几个建议想提。',
    expression: 'smile',
    nextLineId: 'act4_58'
  },

  'act4_58': {
    id: 'act4_58',
    characterId: 'likang',
    text: '一定！谢谢张老师！',
    expression: 'normal',
    nextLineId: 'act4_59'
  },

  'act4_59': {
    id: 'act4_59',
    characterId: 'll',
    text: '（背对着力康，走向门口时停了一下）',
    expression: 'normal',
    nextLineId: 'act4_60'
  },

  'act4_60': {
    id: 'act4_60',
    characterId: 'll',
    text: '下次评审之前先做调研，别等我骂完了再去。',
    expression: 'serious',
    nextLineId: 'act4_61'
  },

  'act4_61': {
    id: 'act4_61',
    characterId: 'likang',
    text: '（笑了）收到。',
    expression: 'smile',
    nextLineId: 'act4_end'
  },

  'act4_end': {
    id: 'act4_end',
    characterId: 'narrator',
    text: '【案件逆转成功！】',
    expression: 'normal',
    nextLineId: 'act5_start',
    effects: [
      { type: 'confetti', duration: 1.75 },
    ]
  }
}

export const act4Data: SceneData = {
  id: 'act4_turnaround',
  title: '第四幕：逆转',
  startLineId: 'act4_start',
  dialogues,
  sceneType: 'courtroom'
}
