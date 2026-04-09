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
    text: '业务侧基本都是我在跟这套流程。',
    expression: 'normal',
    nextLineId: 'act3_02b'
  },

  'act3_02b': {
    id: 'act3_02b',
    characterId: 'wang',
    text: '研发把节点搭好后，我这边主要就是接着用它处理数据，再把结果回填到表单里。',
    expression: 'normal',
    nextLineId: 'act3_02c'
  },

  'act3_02c': {
    id: 'act3_02c',
    characterId: 'wang',
    text: '如果业务同事说字段不对，最后还是会落到我这儿，我得先判断是**没跑出来**，还是**回填错了地方**。',
    expression: 'normal',
    nextLineId: 'act3_iw_lk1'
  },

  'act3_iw_lk1': {
    id: 'act3_iw_lk1',
    characterId: 'likang',
    text: '举个最近的例子吧。别人说「这里不对」时，你第一眼会看什么？',
    expression: 'thinking',
    nextLineId: 'act3_iw_w1'
  },

  'act3_iw_w1': {
    id: 'act3_iw_w1',
    characterId: 'wang',
    text: '上周就有一回，审批表里有个该回填的字段一直是空的。',
    expression: 'normal',
    nextLineId: 'act3_iw_w1b'
  },

  'act3_iw_w1b': {
    id: 'act3_iw_w1b',
    characterId: 'wang',
    text: '我先看**输出结果**里这个值到底有没有跑出来，再看它是不是跟我要回填的字段对得上。',
    expression: 'normal',
    nextLineId: 'act3_iw_w1c'
  },

  'act3_iw_w1c': {
    id: 'act3_iw_w1c',
    characterId: 'wang',
    text: '有时候是映射没配对，我就去改**输出配置**，把它重新指到对的表单字段上。',
    expression: 'normal',
    nextLineId: 'act3_iw_lk2'
  },

  'act3_iw_lk2': {
    id: 'act3_iw_lk2',
    characterId: 'likang',
    text: '所以你主要在看结果和回填配置。那代码本身你会动吗？',
    expression: 'normal',
    nextLineId: 'act3_iw_w2'
  },

  'act3_iw_w2': {
    id: 'act3_iw_w2',
    characterId: 'wang',
    text: '很少动，也基本不敢动，怕一改牵连别的环节。',
    expression: 'normal',
    nextLineId: 'act3_iw_w2b'
  },

  'act3_iw_w2b': {
    id: 'act3_iw_w2b',
    characterId: 'wang',
    text: '真要改逻辑，我会找技术同事帮忙看，不会自己去改。',
    expression: 'normal',
    nextLineId: 'act3_iw_w2c'
  },

  'act3_iw_w2c': {
    id: 'act3_iw_w2c',
    characterId: 'wang',
    text: '对我来说，先把数据准确回填进表单，比盯着代码更重要。',
    expression: 'normal',
    nextLineId: 'act3_iw_lk3'
  },

  'act3_iw_lk3': {
    id: 'act3_iw_lk3',
    characterId: 'likang',
    text: '明白。那你现在一进去，最先看到的是什么？',
    expression: 'thinking',
    nextLineId: 'act3_03'
  },

  'act3_03': {
    id: 'act3_03',
    characterId: 'wang',
    text: '一个**代码编辑器**，占一大片……',
    expression: 'awkward',
    nextLineId: 'act3_03b'
  },

  'act3_03b': {
    id: 'act3_03b',
    characterId: 'wang',
    text: '我每次都要先在心里跟自己说一句『别慌』，再去找结果和回填配置在哪。',
    expression: 'awkward',
    nextLineId: 'act3_03c'
  },

  'act3_03c': {
    id: 'act3_03c',
    characterId: 'wang',
    text: '说实话，**挺劝退的**。',
    expression: 'awkward',
    nextLineId: 'act3_evidence_wang'
  },

  // 小王说完后获得证词，再切到下一次访谈
  'act3_evidence_wang': {
    id: 'act3_evidence_wang',
    characterId: 'narrator',
    text: '【获得证据：🔖 小王的证词】\n*"我不写代码，主要是看结果、配回填，让数据进到表单里。真要改代码，我会找技术同事帮忙。"*',
    expression: 'normal',
    nextLineId: 'act3_transition_01',
    unlockEvidence: ['wang-testimony']
  },

  'act3_transition_01': {
    id: 'act3_transition_01',
    characterId: 'narrator',
    text: '【当天下午——另一通线上访谈】',
    expression: 'normal',
    nextLineId: 'act3_transition_02'
  },

  'act3_transition_02': {
    id: 'act3_transition_02',
    characterId: 'likang',
    text: '刚才是业务侧的使用过程。接下来，我想听听真正写和维护代码的人会怎么说。',
    expression: 'thinking',
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
    text: '节点里的脚本基本是我写、我维护。',
    expression: 'serious',
    nextLineId: 'act3_05b'
  },

  'act3_05b': {
    id: 'act3_05b',
    characterId: 'chen',
    text: '我写的时候最在意两件事：**语法别手滑**、**逻辑对不对**。',
    expression: 'serious',
    nextLineId: 'act3_05c'
  },

  'act3_05c': {
    id: 'act3_05c',
    characterId: 'chen',
    text: '后面这个得靠跑测试立刻验，光靠眼睛看不出来。',
    expression: 'serious',
    nextLineId: 'act3_ic_lk1'
  },

  'act3_ic_lk1': {
    id: 'act3_ic_lk1',
    characterId: 'likang',
    text: '那你从「改完两行」到「看到测试结果」，大概要点几步？',
    expression: 'thinking',
    nextLineId: 'act3_ic_w1'
  },

  'act3_ic_w1': {
    id: 'act3_ic_w1',
    characterId: 'chen',
    text: '现在要看测试结果，得不止一次确认，还要点「下一步」。',
    expression: 'serious',
    nextLineId: 'act3_ic_w1b'
  },

  'act3_ic_w1b': {
    id: 'act3_ic_w1b',
    characterId: 'chen',
    text: '测出来不对，我还得退回前面改入参、对测试数据。',
    expression: 'serious',
    nextLineId: 'act3_ic_w1c'
  },

  'act3_ic_w1c': {
    id: 'act3_ic_w1c',
    characterId: 'chen',
    text: '一来一回，控制台报了什么我都想对照着看。',
    expression: 'serious',
    nextLineId: 'act3_ic_w1d'
  },

  'act3_ic_w1d': {
    id: 'act3_ic_w1d',
    characterId: 'chen',
    text: '可你们这流程不让我**同时**待在「改」和「看结果」两种状态里。',
    expression: 'serious',
    nextLineId: 'act3_ic_lk2'
  },

  'act3_ic_lk2': {
    id: 'act3_ic_lk2',
    characterId: 'likang',
    text: '你在本地 IDE 里一般怎么干活？',
    expression: 'normal',
    nextLineId: 'act3_ic_w2'
  },

  'act3_ic_w2': {
    id: 'act3_ic_w2',
    characterId: 'chen',
    text: '分屏呗。左边编辑器，右边跑测试、看输出。',
    expression: 'normal',
    nextLineId: 'act3_ic_w2b'
  },

  'act3_ic_w2b': {
    id: 'act3_ic_w2b',
    characterId: 'chen',
    text: '报错栈堆在边上，抬眼就能看到。',
    expression: 'normal',
    nextLineId: 'act3_ic_w2c'
  },

  'act3_ic_w2c': {
    id: 'act3_ic_w2c',
    characterId: 'chen',
    text: '谁会把「写」和「验」拆成两段流水线啊。',
    expression: 'normal',
    nextLineId: 'act3_06'
  },

  'act3_06': {
    id: 'act3_06',
    characterId: 'likang',
    text: '如果让你来设计这个节点，你最想要什么体验？',
    expression: 'thinking',
    nextLineId: 'act3_07'
  },

  'act3_07': {
    id: 'act3_07',
    characterId: 'chen',
    text: '**左边写代码，右边看测试结果**。',
    expression: 'normal',
    nextLineId: 'act3_07b'
  },

  'act3_07b': {
    id: 'act3_07b',
    characterId: 'chen',
    text: '并排，别让我来回切。',
    expression: 'normal',
    nextLineId: 'act3_07c'
  },

  'act3_07c': {
    id: 'act3_07c',
    characterId: 'chen',
    text: '改完能马上跑一趟，结果**实时刷出来**，我才敢继续往下写。',
    expression: 'normal',
    nextLineId: 'act3_evidence_chen'
  },

  // 老陈说完后获得证词，再进入力康收束与下一场景
  'act3_evidence_chen': {
    id: 'act3_evidence_chen',
    characterId: 'narrator',
    text: '【获得证据：🔖 老陈的证词】\n*"需要一边写代码一边看测试结果，线性流程来回切换太折腾。"*',
    expression: 'normal',
    nextLineId: 'act3_08b',
    unlockEvidence: ['chen-testimony']
  },

  // 访谈收束（双方观点已听完）
  'act3_08b': {
    id: 'act3_08b',
    characterId: 'likang',
    text: '两个人要的完全不一样。一个只想把结果回填好，一个要边写边测。',
    expression: 'thinking',
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
    text: '力康，我们把结果捋一下吧。',
    expression: 'smile',
    nextLineId: 'act3_12'
  },

  'act3_12': {
    id: 'act3_12',
    characterId: 'likang',
    text: '嗯，规律已经出来了。',
    expression: 'thinking',
    nextLineId: 'act3_13'
  },

  'act3_13': {
    id: 'act3_13',
    characterId: 'snow',
    text: '先回到旧版界面看看吧。最该改的地方，应该就在里面。',
    expression: 'smile',
    nextLineId: 'act3_15',
    interactionTrigger: {
      type: 'clue-finding',
      successLineId: 'act3_15'
    }
  },

  'act3_15': {
    id: 'act3_15',
    characterId: 'likang',
    text: '对！**测试环节**可以独立出来！',
    expression: 'confident',
    nextLineId: 'act3_16'
  },

  'act3_16': {
    id: 'act3_16',
    characterId: 'snow',
    text: '嗯。同一个功能，两种完全不同的使用场景。',
    expression: 'smile',
    nextLineId: 'act3_17'
  },

  'act3_17': {
    id: 'act3_17',
    characterId: 'likang',
    text: '搭建者要的是**代码工作台**：大编辑区、实时测试、并排对照。',
    expression: 'normal',
    nextLineId: 'act3_18'
  },

  'act3_18': {
    id: 'act3_18',
    characterId: 'likang',
    text: '维护者要的是**轻量入口**：看处理结果、配回填字段、确认表单落点，最好别先看到代码。',
    expression: 'normal',
    nextLineId: 'act3_19'
  },

  'act3_19': {
    id: 'act3_19',
    characterId: 'likang',
    text: '线性的 1-2-3 流程……**不可能同时满足这两种人。**',
    expression: 'serious',
    nextLineId: 'act3_20'
  },

  'act3_20': {
    id: 'act3_20',
    characterId: 'snow',
    text: '所以你的新方案打算怎么做？',
    expression: 'smile',
    nextLineId: 'act3_21'
  },

  'act3_21': {
    id: 'act3_21',
    characterId: 'likang',
    text: '不做线性了。**改成模块化。**',
    expression: 'normal',
    nextLineId: 'act3_22'
  },

  // ========== 新版方案 Prototype 演示 ==========

  'act3_22': {
    id: 'act3_22',
    characterId: 'snow',
    text: '拆掉？具体怎么拆？',
    expression: 'smile',
    nextLineId: 'act3_23'
  },

  'act3_23': {
    id: 'act3_23',
    characterId: 'likang',
    text: '不做 1→2→3 了。代码编辑、测试、回调配置都放进一个面板里，按需展开。',
    expression: 'confident',
    nextLineId: 'act3_24'
  },

  'act3_24': {
    id: 'act3_24',
    characterId: 'likang',
    text: '来，我给你看看新方案——',
    expression: 'normal',
    nextLineId: 'act3_prototype'
  },

  // 触发 Prototype 演示交互
  'act3_prototype': {
    id: 'act3_prototype',
    characterId: 'narrator',
    text: '【新方案展示：代码块节点 v2 原型】',
    expression: 'normal',
    interactionTrigger: {
      type: 'prototype-demo',
      successLineId: 'act3_proto_done'
    }
  },

  // Prototype 演示完成后的对话
  'act3_proto_done': {
    id: 'act3_proto_done',
    characterId: 'snow',
    text: '一个面板，两种模式。搭建者展开全量功能，维护者只看需要的部分。',
    expression: 'smile',
    nextLineId: 'act3_proto_done2'
  },

  'act3_proto_done2': {
    id: 'act3_proto_done2',
    characterId: 'likang',
    text: '**同一个入口，不同的视角。**这就是答案。',
    expression: 'confident',
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
