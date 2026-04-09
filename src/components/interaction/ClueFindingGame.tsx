import React, { useState, useCallback, useEffect } from 'react'
import { dialogueEngine } from '../../engine'
import { useDialogueStore, useGameStore } from '../../store'
import { DialogueLine } from '../../types'

interface StepOption {
  id: string
  text: string
  isCorrect: boolean
}

interface StepArea {
  id: number
  name: string
  message: string
  options?: StepOption[]
}

const stepAreas: StepArea[] = [
  {
    id: 1,
    name: '代码编写',
    message: '编写代码是很核心的功能，可不能改动啊',
  },
  {
    id: 2,
    name: '测试运行',
    message: '你觉得这个步骤怎么样？',
    options: [
      { id: 'correct', text: '测试是不是可以放在别的位置？', isCorrect: true },
      { id: 'wrong', text: '测试还是按顺序操作比较好', isCorrect: false },
    ],
  },
  {
    id: 3,
    name: '回调更新',
    message: '回调更新不能改动，数据最后还是要回到表单才行呢。',
  },
]

const codeLines = [
  { num: 1, text: `const { flattenDeep } = require('lodash');` },
  { num: 2, text: `const sumnum = 0;` },
  { num: 3, text: `flattenDeep(JSON.parse(qfInput.field1)).forEach(function(value) {` },
  { num: 4, text: `    sumnum += Number(value)` },
  { num: 5, text: `});` },
  { num: 6, text: `` },
  { num: 7, text: `qfOutput = {` },
  { num: 8, text: `    sum: sumnum.toFixed(1),` },
  { num: 9, text: `    sumOrigin: sumnum` },
  { num: 10, text: `};` },
]

interface ClueFindingGameProps {
  onComplete: () => void
  successLineId: string
  onCharacterHideChange?: (hidden: boolean) => void
}

/**
 * 游戏阶段：
 * - exploring: 初始状态，三个 tab 都可点击，卡片显示
 * - feedback:  点了错误 tab 或错误选项后，显示提示对话，点击任意位置回到 exploring
 * - choosing:  点了正确 tab（测试运行），卡片隐藏，显示二选一选项
 */
type GamePhase = 'exploring' | 'feedback' | 'choosing'

export const ClueFindingGame: React.FC<ClueFindingGameProps> = ({
  onComplete,
  successLineId,
  onCharacterHideChange,
}) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [phase, setPhase] = useState<GamePhase>('exploring')
  const { setCurrentLine, addToHistory, setShowFullText } = useDialogueStore()
  const { setCurrentLine: setGameLine } = useGameStore()

  // 注入临时对话到底部对话框
  const injectDialogue = useCallback((text: string) => {
    const tempLine: DialogueLine = {
      id: `clue_feedback_${Date.now()}`,
      characterId: 'likang',
      text,
      expression: 'thinking',
    }
    setCurrentLine(tempLine)
    setShowFullText(false)
  }, [setCurrentLine, setShowFullText])

  // 恢复到 narrator 行，让 GameEngine 的 isClueNarrator 生效，隐藏对话框
  const restoreNarratorLine = useCallback(() => {
    const scene = dialogueEngine.getCurrentScene()
    if (scene) {
      // 找到触发 clue-finding 的 narrator 行
      const narratorLine = Object.values(scene.dialogues).find(
        (line: any) => line.interactionTrigger?.type === 'clue-finding'
      ) as DialogueLine | undefined
      if (narratorLine) {
        setCurrentLine(narratorLine)
      }
    }
  }, [setCurrentLine])

  // 点击 tab
  const handleStepClick = (step: StepArea) => {
    // 非探索阶段不响应 tab 点击
    if (phase !== 'exploring') return

    if (step.options) {
      // 正确路径的 tab → 隐藏卡片，弹出二选一
      setPhase('choosing')
      injectDialogue(step.message)
      return
    }

    // 错误 tab → 隐藏卡片，显示提示对话，进入 feedback 模式
    setPhase('feedback')
    injectDialogue(step.message)
  }

  // feedback 模式下，用户点击任意位置回到探索状态
  const handleFeedbackDismiss = () => {
    if (phase !== 'feedback') return
    setPhase('exploring')
    // 恢复到 narrator 行，隐藏底部对话框
    restoreNarratorLine()
  }

  // 二选一选项点击
  const handleOptionClick = (option: StepOption) => {
    if (option.isCorrect) {
      // 选对了 → 游戏结束，推进对话
      setGameLine(successLineId)

      const scene = dialogueEngine.getCurrentScene()
      if (scene && scene.dialogues[successLineId]) {
        const nextLine = scene.dialogues[successLineId]
        setCurrentLine(nextLine)
        addToHistory(nextLine)
        setShowFullText(false)
      }
      onComplete()
    } else {
      // 选错了 → 隐藏卡片，显示提示，点击后恢复到 exploring
      setPhase('feedback')
      injectDialogue('再想想别的办法吧。')
    }
  }

  // feedback 阶段监听空格键，点击继续
  useEffect(() => {
    if (phase !== 'feedback') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        handleFeedbackDismiss()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [phase])

  // 卡片可见逻辑：只在 exploring 阶段显示，其他阶段（feedback / choosing）都隐藏
  const showCard = phase === 'exploring'
  const showOptions = phase === 'choosing'

  // 仅探索卡片阶段隐藏人物，进入选项/反馈阶段恢复人物
  useEffect(() => {
    onCharacterHideChange?.(phase === 'exploring')
  }, [phase, onCharacterHideChange])

  // 组件卸载时确保恢复人物显示
  useEffect(() => {
    return () => {
      onCharacterHideChange?.(false)
    }
  }, [onCharacterHideChange])

  return (
    <>
      {/* feedback 模式的全屏点击层 - 点击任意位置回到探索 */}
      {phase === 'feedback' && (
        <div
          onClick={handleFeedbackDismiss}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            cursor: 'pointer',
          }}
        />
      )}

      {/* 代码块节点弹窗 - 仅在探索阶段显示 */}
      {showCard && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '38%',
            transform: 'translate(-50%, -50%)',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* 场景标题 */}
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                color: '#ffffff',
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                margin: 0,
              }}
            >
              【场景：探索新方案】
            </h2>
            <p
              style={{
                color: '#e0e0e0',
                fontSize: 14,
                marginTop: 4,
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              点击你觉得可以调整的部分吧！
            </p>
          </div>

          {/* 代码块节点卡片 */}
          <div
            style={{
              width: 480,
              background: '#ffffff',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.15)',
              overflow: 'hidden',
            }}
          >
            {/* 紫色标题栏 */}
            <div
              style={{
                background: 'linear-gradient(135deg, #9b6dff 0%, #7c4dff 50%, #b388ff 100%)',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>代码块节点</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>✎</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>🗑</span>
            </div>

            {/* 三步骤 Tab 栏 - 带闪烁描边提示 */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #e8e8e8',
                background: '#fafafa',
              }}
            >
              {stepAreas.map((step, idx) => {
                const isHovered = hoveredStep === step.id

                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(step)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="clue-tab-pulse"
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      cursor: 'pointer',
                      background: isHovered ? 'rgba(33, 132, 193, 0.1)' : 'transparent',
                      borderBottom: idx === 0 ? '2px solid #2184c1' : '2px solid transparent',
                      transition: 'background 0.2s ease',
                      position: 'relative',
                      animationDelay: `${idx * 0.3}s`,
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: idx === 0 ? '#f5a623' : '#ccc',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {step.id}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: idx === 0 ? '#333' : '#888',
                        fontWeight: idx === 0 ? 600 : 400,
                      }}
                    >
                      {step.name}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* 提示文字 */}
            <div
              style={{
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <span style={{ fontSize: 11, color: '#f5a623' }}>
                * 可以在插入表单内字段作为代码中的变量{' '}
                <span style={{ color: '#2184c1' }}>了解更多</span>
              </span>
              <span style={{ fontSize: 11, color: '#888' }}>▾ 插入字段</span>
            </div>

            {/* 代码编辑器 - 无滚动条，固定高度 */}
            <div
              style={{
                margin: '0 14px',
                marginTop: 6,
                border: '1px solid #e0e8ef',
                borderRadius: 4,
                background: '#f8f9fb',
                fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                fontSize: 12,
                lineHeight: 1.7,
                overflow: 'hidden',
              }}
            >
              {codeLines.map((line) => (
                <div
                  key={line.num}
                  style={{
                    display: 'flex',
                    padding: '0 10px',
                    background: line.num <= 4 ? 'rgba(33, 132, 193, 0.06)' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      textAlign: 'right',
                      color: '#999',
                      userSelect: 'none',
                      paddingRight: 10,
                      flexShrink: 0,
                    }}
                  >
                    {line.num}
                  </span>
                  <span style={{ color: '#333' }}>{line.text}</span>
                </div>
              ))}
            </div>

            {/* 底部按钮 */}
            <div style={{ padding: '12px 16px', display: 'flex', gap: 10 }}>
              <button
                style={{
                  background: '#f5a623',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '6px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'default',
                }}
              >
                保存并下一步
              </button>
              <button
                style={{
                  background: '#fff',
                  color: '#666',
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                  padding: '6px 16px',
                  fontSize: 13,
                  cursor: 'default',
                }}
              >
                保存节点配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 选项按钮 - 仅在 choosing 阶段显示 */}
      {showOptions && stepAreas[1].options && (
        <div
          style={{
            position: 'absolute',
            right: '8%',
            bottom: 258,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            zIndex: 40,
          }}
        >
          {stepAreas[1].options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLElement
                const defaultImg = btn.querySelector('[data-state="default"]') as HTMLElement
                const hoverImg = btn.querySelector('[data-state="hover"]') as HTMLElement
                if (defaultImg) defaultImg.style.opacity = '0'
                if (hoverImg) hoverImg.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLElement
                const defaultImg = btn.querySelector('[data-state="default"]') as HTMLElement
                const hoverImg = btn.querySelector('[data-state="hover"]') as HTMLElement
                if (defaultImg) defaultImg.style.opacity = '1'
                if (hoverImg) hoverImg.style.opacity = '0'
              }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                padding: 0,
                width: 510,
                height: 84,
                cursor: 'pointer',
              }}
            >
              <img
                data-state="default"
                src="/assets/figma/select_item-default.png"
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'opacity 0.15s ease',
                }}
              />
              <img
                data-state="hover"
                src="/assets/figma/select_item-hover.png"
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: 0,
                  transition: 'opacity 0.15s ease',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  zIndex: 10,
                  color: '#fff',
                  fontSize: 19,
                  fontWeight: 300,
                  whiteSpace: 'nowrap',
                }}
              >
                {option.text}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 闪烁描边动画 CSS */}
      <style>{`
        @keyframes cluePulse {
          0%, 100% {
            box-shadow: inset 0 0 0 2px rgba(33, 132, 193, 0.15);
          }
          50% {
            box-shadow: inset 0 0 0 2px rgba(33, 132, 193, 0.8);
          }
        }
        .clue-tab-pulse {
          animation: cluePulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
