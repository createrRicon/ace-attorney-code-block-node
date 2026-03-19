# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于《逆转裁判》(Ace Attorney) 风格的视觉小说游戏引擎。项目采用 React + TypeScript + Vite 构建，使用 Zustand 进行状态管理，Framer Motion 实现动画效果，Tailwind CSS 处理样式。

## 开发命令

```bash
# 启动开发服务器（运行在 http://localhost:3000）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 架构概览

### 核心引擎层 (`src/engine/`)

- **DialogueEngine** - 对话引擎核心类
  - 管理对话流程推进（`next()` 方法）
  - 处理分支选择（`makeChoice()`）
  - 处理互动（异议、出示证据）
  - 自动场景切换（跨场景查找 nextLineId）
  - 单例模式：通过 `dialogueEngine` 导出使用

- **InteractionManager** - 互动管理器
  - 封装异议、出示证据、追问等互动操作
  - 单例模式：通过 `interactionManager` 导出使用

- **GameEngine (React 组件)** - 游戏主引擎组件
  - 初始化游戏和场景
  - 协调所有 UI 组件渲染
  - 处理全局键盘事件（空格键继续对话）

### 状态管理 (`src/store/`)

使用 Zustand，三个主要 store：

- **gameStore** - 游戏全局状态
  - 当前场景 ID、当前对话行 ID
  - 已收集证据、已完成场景
  - 游戏标志位（用于分支判断）

- **dialogueStore** - 对话状态
  - 当前对话行内容
  - 对话历史记录
  - 打字机效果状态（showFullText、visible）

- **evidenceStore** - 证据系统状态
  - 证据列表、选中状态、法庭记录开关状态

### 类型系统 (`src/types/`)

- **dialogue.ts** - 角色定义、表情类型、对话行结构、互动触发器
- **scene.ts** - 场景数据结构、游戏状态
- **evidence.ts** - 证据类型、法庭记录结构

### 组件结构 (`src/components/`)

组件按功能分类：

- **dialogue/** - 对话相关（打字机文本、继续提示、选择按钮、角色立绘）
- **effects/** - 视觉特效（屏幕震动、闪光、速度线、异议弹窗）
- **interaction/** - 交互组件（异议按钮、证言高亮、证据选择器）
- **figma/** - Figma 设计还原组件（对话框、场景背景、角色精灵、信息面板）
- **ui/** - 通用 UI 组件（法庭记录按钮、游戏布局）

### 游戏内容 (`src/data/`)

- **scenes/** - 五幕剧本（act1_commission, act2_rejection, act3_investigation, act4_turnaround, act5_verdict）
- **evidences.ts** - 证物定义
- **characters/** - 角色配置

## 开发注意事项

### 对话数据结构

每个场景包含 `dialogues` 对象，以对话行 ID 为 key。对话行通过 `nextLineId` 连接形成流程。引擎会自动在所有已注册场景中查找下一句，实现跨场景切换。

```typescript
interface DialogueLine {
  id: string
  characterId: CharacterId
  text: string
  expression?: ExpressionType
  interactionTrigger?: InteractionTrigger  // 可互动时触发
  choices?: Choice[]                       // 分支选择
  nextLineId?: string                      // 下一句 ID
}
```

### 调试面板

开发环境下右上角会显示调试面板，展示当前场景、对话行 ID、角色等信息，并包含测试按钮。

### 组件导入约定

使用各目录下的 `index.ts` 统一导出，避免深层路径导入：
```typescript
import { GameEngine } from './engine'
import { useGameStore, useDialogueStore } from './store'
import { DialogueLine, SceneData } from './types'
```

### 样式约定

- 使用 Tailwind CSS 进行样式
- 对话文本使用 `.court-dialogue-text` 类（等宽字体）
- 角色名标签使用 `.court-name-tag` 类
- Figma 设计组件使用精确的像素值定位（如 `left-[3.5%]`、`h-[896px]`）

### 角色与表情

角色 ID 在 `src/types/dialogue.ts` 中定义：
- `likang` - 主角力康
- `snow` - 辩护助手 Snow
- `ll` - 检察官 LL
- `poet` - 法官 Poet
- `zhang` - 证人张老师
- `narrator` - 旁白（无立绘，全屏文字）

表情类型包括：normal, happy, angry, surprised, confident, thinking, awkward, smile, serious, glasses
