import React, { useState, useCallback, useEffect } from 'react'
import { dialogueEngine } from '../../engine'
import { useDialogueStore, useGameStore } from '../../store'

/**
 * 代码块节点新版方案 Prototype
 *
 * 交互流程：
 * 1. 初始显示：右侧测试栏收起，左侧占满全宽
 * 2. 「测试运行」按钮高亮脉冲引导
 * 3. 用户点击「测试运行」→ 右侧测试栏动画展开（左侧被压缩）
 * 4. 出现「继续」按钮
 * 5. 用户点击「继续」→ prototype 消失，对话推进
 *
 * 卡片总宽度固定不变。
 */

// ========== 静态数据 ==========

const codeLines = [
  { num: 15, text: `};` },
  { num: 16, text: `data.biz_content = '{"out_trade_no": qf_field.{商户订单号$$188876AB9$$}}';` },
  { num: 17, text: `// 第一步：删除sign字段`, isComment: true },
  { num: 18, text: `const { sign, ...dataWithoutSign } = data;` },
  { num: 19, text: `` },
  { num: 20, text: `// 第二步：删除值为空的参数`, isComment: true },
  { num: 21, text: `const filteredData = Object.fromEntries(Object.entries(dataWithoutSign).fil` },
  { num: 22, text: `` },
  { num: 23, text: `// 第三步：按键的ASCII码值递增排序`, isComment: true },
  { num: 24, text: `const sortedParams = Object.keys(filteredData).sort();` },
  { num: 25, text: `` },
  { num: 26, text: `// 第四步：将排序后的参数与其对应的值按照"参数=参数值"格式组合`, isComment: true },
  { num: 27, text: `const concatenatedParams = sortedParams.map(key => '\${key}=\${filteredData[k` },
  { num: 28, text: `` },
  { num: 29, text: `// 第五步：生成待签名字符串`, isComment: true },
  { num: 30, text: `const signString = concatenatedParams;` },
  { num: 31, text: `` },
  { num: 32, text: `` },
  { num: 33, text: `// 使用私钥对待签名字符串进行加密`, isComment: true },
  { num: 34, text: `const privateKey = '-----BEGIN PRIVATE KEY------`, isString: true },
  { num: 35, text: `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcvggSjAgEAAoIBAQCSD...`, isString: true },
  { num: 36, text: `------END PRIVATE KEY------';`, isString: true },
  { num: 37, text: `` },
  { num: 38, text: `const signer = crypto.createSign('RSA-SHA256');` },
  { num: 39, text: `signer.update(signString, 'utf8');` },
  { num: 40, text: `const signature = signer.sign(privateKey);` },
]

const testResultJSON = `{
    "a": "1",
    "b": 2
}`

const parseRules = [
  { field: '字段 1', type: 'Json Path', value: '$.a.1' },
  { field: '字段 2', type: 'Json Path', value: '$.a.2' },
  { field: '字段 3', type: 'Json Path', value: '' },
]

const tableSubFields = [
  { field: '子字段 1', type: '自定义', value: '' },
  { field: '当前表格子字段', type: '自定义', value: '' },
]

// ========== 子组件 ==========

/** 可折叠 Section */
const CollapsibleSection: React.FC<{
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}> = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{title}</span>
          <span
            style={{
              color: '#999',
              fontSize: 11,
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
              display: 'inline-block',
            }}
          >
            ∧
          </span>
        </div>
      </div>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? 600 : 0,
          transition: 'max-height 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/** 字段映射行 */
const FieldRow: React.FC<{
  field: string
  type: string
  value: string
  indent?: boolean
}> = ({ field, type, value, indent }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 9.5,
      paddingLeft: indent ? 14 : 0,
    }}
  >
    <span
      style={{
        width: indent ? 70 : 56,
        padding: '1px 4px',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        color: '#555',
        background: '#fafafa',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        flexShrink: 0,
      }}
    >
      {field}
    </span>
    <span style={{ color: '#aaa', fontSize: 9, flexShrink: 0 }}>等于</span>
    <span
      style={{
        width: 54,
        padding: '1px 4px',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        color: '#555',
        background: '#fafafa',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {type}
    </span>
    <span
      style={{
        flex: 1,
        padding: '1px 4px',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        color: value ? '#555' : '#ccc',
        background: '#fafafa',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        minWidth: 0,
      }}
    >
      {value || '请输入'}
    </span>
    <span style={{ color: '#ddd', fontSize: 10, flexShrink: 0 }}>🗑</span>
  </div>
)

// ========== 常量 ==========
const CARD_WIDTH = 740
const TEST_PANEL_WIDTH = 220
const CARD_HEIGHT = 520

const ExCollapseIcon: React.FC<{ mirrored?: boolean }> = ({ mirrored }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      display: 'block',
      transform: mirrored ? 'scaleX(-1)' : undefined,
      transformOrigin: '50% 50%',
    }}
  >
    <path
      d="M14.9062 3.75C15.3205 3.75 15.6562 4.08578 15.6562 4.5C15.6562 4.91421 15.3205 5.25 14.9062 5.25L10.4062 5.25C9.99204 5.25 9.65625 4.91421 9.65625 4.5C9.65625 4.08578 9.99204 3.75 10.4062 3.75H14.9062Z"
      fill="#494F57"
    />
    <path
      d="M6.31342 4.53217C6.60631 4.23927 7.08119 4.23927 7.37408 4.53217C7.66697 4.82506 7.66697 5.29994 7.37408 5.59283L4.06066 8.90625L7.37408 12.2197C7.66697 12.5126 7.66697 12.9874 7.37408 13.2803C7.08119 13.5732 6.60631 13.5732 6.31342 13.2803L2.46967 9.43658C2.17678 9.14369 2.17678 8.66881 2.46967 8.37592L6.31342 4.53217Z"
      fill="#494F57"
    />
    <path
      d="M15.6562 9C15.6562 8.58578 15.3205 8.25 14.9062 8.25L10.4062 8.25C9.99204 8.25 9.65625 8.58578 9.65625 9C9.65625 9.41421 9.99204 9.75 10.4062 9.75L14.9062 9.75C15.3205 9.75 15.6562 9.41421 15.6562 9Z"
      fill="#494F57"
    />
    <path
      d="M14.9062 12.75C15.3205 12.75 15.6562 13.0858 15.6562 13.5C15.6562 13.9142 15.3205 14.25 14.9062 14.25L10.4062 14.25C9.99204 14.25 9.65625 13.9142 9.65625 13.5C9.65625 13.0858 9.99204 12.75 10.4062 12.75L14.9062 12.75Z"
      fill="#494F57"
    />
  </svg>
)

// ========== 主组件 ==========

interface CodeBlockPrototypeProps {
  onComplete: () => void
  successLineId: string
}

type DemoPhase = 'waiting-click' | 'panel-open' | 'done'

export const CodeBlockPrototype: React.FC<CodeBlockPrototypeProps> = ({
  onComplete,
  successLineId,
}) => {
  const [phase, setPhase] = useState<DemoPhase>('waiting-click')
  const [testPanelOpen, setTestPanelOpen] = useState(false) // 初始收起
  const { setCurrentLine, addToHistory, setShowFullText } = useDialogueStore()
  const { setCurrentLine: setGameLine } = useGameStore()

  // 完成演示，推进剧情
  const finishDemo = useCallback(() => {
    setPhase('done')
    // 先隐藏 prototype，再切换到下一段剧情，避免视觉残留
    onComplete()
    setGameLine(successLineId)

    const scene = dialogueEngine.getCurrentScene()
    if (scene && scene.dialogues[successLineId]) {
      const nextLine = scene.dialogues[successLineId]
      setCurrentLine(nextLine)
      addToHistory(nextLine)
      setShowFullText(false)
    }
  }, [successLineId, setGameLine, setCurrentLine, addToHistory, setShowFullText, onComplete])

  // 支持在可继续阶段按 Space 推进
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.key === ' ') && phase === 'panel-open') {
        e.preventDefault()
        finishDemo()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, finishDemo])

  // 点击「测试运行」按钮
  const handleTestRunClick = () => {
    if (phase === 'waiting-click') {
      setTestPanelOpen(true)
      setPhase('panel-open')
      return
    }
  }

  if (phase === 'done') return null

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          transform: 'translate(-50%, -50%)',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: 1,
        }}
      >
        {/* 场景标题 */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              margin: 0,
            }}
          >
            【新方案：代码块节点 v2】
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: 13,
              marginTop: 4,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {phase === 'waiting-click'
              ? '点击「测试运行」按钮，看看新方案的效果'
              : phase === 'panel-open'
                ? '点击「继续」推进剧情'
                : ''}
          </p>
        </div>

        {/* ====== 代码块节点卡片 ====== */}
        {/* ====== 卡片 + 手柄 Wrapper（按钮放外层避免被裁切） ====== */}
        <div style={{ position: 'relative' }}>
          {/* 侧栏手柄：常驻 + 位移动画，保证与侧栏 width 同步 */}
          {(phase === 'waiting-click' || phase === 'panel-open') && (
            <button
              onClick={() => {
                if (testPanelOpen) {
                  setTestPanelOpen(false)
                  return
                }
                setTestPanelOpen(true)
                if (phase === 'waiting-click') setPhase('panel-open')
              }}
              aria-label={testPanelOpen ? '收起测试侧栏' : '展开测试侧栏'}
              style={{
                position: 'absolute',
                top: 'calc(50% + 28px)',
                left: testPanelOpen ? CARD_WIDTH - TEST_PANEL_WIDTH - 27 : CARD_WIDTH - 28,
                transform: 'translateY(-50%)',
                width: 28,
                height: 28,
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                zIndex: 41,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: '#FFFFFF',
                  border: '1px solid #D8DDE3',
                  borderRadius: '14px 0 0 14px',
                  boxShadow: '0px 4px 6px rgba(12,31,80,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: testPanelOpen ? 'translateX(2px)' : undefined,
                  }}
                >
                  <ExCollapseIcon mirrored={testPanelOpen} />
                </div>
              </div>
            </button>
          )}

        <div
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            background: '#ffffff',
            borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 紫色标题栏 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #9b6dff 0%, #7c4dff 50%, #b388ff 100%)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>代码块节点</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>✎</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>🗑</span>
          </div>

          {/* 主体区域 */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0, position: 'relative' }}>
            {/* ====== 左侧主内容 ====== */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                borderRight: testPanelOpen ? '1px solid #e8e8e8' : 'none',
                transition: 'border-right 0.3s ease',
              }}
            >
              <div className="proto-scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
                {/* --- 代码编写 Section（可折叠） --- */}
                <CollapsibleSection title="代码编写" defaultOpen={true}>
                  {/* 代码编辑器 */}
                  <div
                    style={{
                      margin: '4px 10px 0',
                      border: '1px solid #e0e8ef',
                      borderRadius: 3,
                      background: '#f8f9fb',
                      fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                      fontSize: 9.5,
                      lineHeight: 1.55,
                      overflow: 'hidden',
                      maxHeight: 170,
                    }}
                  >
                    {codeLines.map((line) => (
                      <div
                        key={line.num}
                        style={{
                          display: 'flex',
                          padding: '0 8px',
                          background:
                            line.num >= 17 && line.num <= 18
                              ? 'rgba(33, 132, 193, 0.06)'
                              : 'transparent',
                        }}
                      >
                        <span
                          style={{
                            width: 22,
                            textAlign: 'right',
                            color: '#bbb',
                            userSelect: 'none',
                            paddingRight: 8,
                            flexShrink: 0,
                            fontSize: 9,
                          }}
                        >
                          {line.num}
                        </span>
                        <span
                          style={{
                            color: line.isComment
                              ? '#b07d48'
                              : line.isString
                                ? '#c41a16'
                                : '#333',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {line.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 测试操作区 */}
                  <div
                    style={{
                      padding: '6px 14px 6px',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                    }}
                  >
                    {/* ★ 测试运行按钮 — 核心交互 */}
                    <button
                      onClick={handleTestRunClick}
                      className={phase === 'waiting-click' ? 'proto-test-btn-pulse' : ''}
                      style={{
                        background: phase === 'waiting-click' ? '#7c4dff' : '#fff',
                        color: phase === 'waiting-click' ? '#fff' : '#555',
                        border:
                          phase === 'waiting-click'
                            ? '1px solid #7c4dff'
                            : '1px solid #d9d9d9',
                        borderRadius: 3,
                        padding: '3px 12px',
                        fontSize: 10.5,
                        fontWeight: phase === 'waiting-click' ? 600 : 400,
                        cursor: phase === 'waiting-click' ? 'pointer' : 'default',
                        transition:
                          'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 180ms cubic-bezier(0.23, 1, 0.32, 1), background-color 180ms ease, color 180ms ease, border-color 180ms ease',
                        position: 'relative',
                        boxShadow:
                          phase === 'waiting-click'
                            ? '0 10px 24px rgba(124, 77, 255, 0.26)'
                            : 'none',
                      }}
                    >
                      测试运行
                    </button>
                  </div>
                </CollapsibleSection>

                {/* --- 回调更新 Section（可折叠） --- */}
                <CollapsibleSection title="回调更新" defaultOpen={true}>
                  {/* 输出回填 + 开关 */}
                  <div
                    style={{
                      padding: '5px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: 10.5, color: '#333', fontWeight: 500 }}>
                      输出回填至当前数据
                    </span>
                    <div
                      style={{
                        width: 30,
                        height: 16,
                        borderRadius: 8,
                        background: '#f5a623',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#fff',
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  </div>

                  {/* 解析测试结果按钮 */}
                  <div style={{ padding: '2px 14px 4px' }}>
                    <button
                      style={{
                        background: '#fff',
                        border: '1px solid #d9d9d9',
                        borderRadius: 3,
                        padding: '2px 10px',
                        fontSize: 10,
                        color: '#555',
                        cursor: 'default',
                      }}
                    >
                      解析测试结果
                    </button>
                  </div>

                  {/* 解析规则标题 */}
                  <div style={{ padding: '3px 14px 2px' }}>
                    <span style={{ fontSize: 10.5, color: '#333', fontWeight: 600 }}>解析规则</span>
                  </div>

                  {/* 普通字段 */}
                  <div
                    style={{
                      padding: '0 14px 3px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    {parseRules.map((rule, i) => (
                      <FieldRow key={i} field={rule.field} type={rule.type} value={rule.value} />
                    ))}
                  </div>

                  {/* 表格字段 1 */}
                  <div
                    style={{
                      padding: '2px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 9.5,
                    }}
                  >
                    <span
                      style={{
                        width: 64,
                        padding: '1px 4px',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        color: '#555',
                        background: '#fafafa',
                      }}
                    >
                      表格字段 1
                    </span>
                    <span style={{ color: '#aaa', fontSize: 9 }}>等于</span>
                    <span
                      style={{
                        width: 40,
                        padding: '1px 4px',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        color: '#555',
                        background: '#fafafa',
                      }}
                    >
                      自定义
                    </span>
                    <span
                      style={{
                        flex: 1,
                        padding: '1px 4px',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        color: '#ccc',
                        background: '#fafafa',
                      }}
                    >
                      请输入
                    </span>
                    <span style={{ color: '#ddd', fontSize: 10 }}>🗑</span>
                  </div>

                  {/* 子字段（缩进） */}
                  <div
                    style={{
                      padding: '0 14px 2px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      borderLeft: '2px dashed #e0e0e0',
                      marginLeft: 24,
                    }}
                  >
                    {tableSubFields.map((sf, i) => (
                      <FieldRow key={i} field={sf.field} type={sf.type} value={sf.value} indent />
                    ))}
                    <div style={{ padding: '1px 0 1px 14px' }}>
                      <span style={{ fontSize: 9, color: '#999' }}>⊕ 添加子字段</span>
                    </div>
                  </div>

                  {/* 当前应用字段 */}
                  <div style={{ padding: '3px 14px' }}>
                    <FieldRow field="当前应用字段" type="Json Path" value="" />
                  </div>

                  <div style={{ padding: '2px 14px 6px' }}>
                    <span style={{ fontSize: 9, color: '#999' }}>⊕ 添加字段</span>
                  </div>
                </CollapsibleSection>

                {/* 流转规则（独立于回调更新，不可折叠） */}
                <div
                  style={{
                    padding: '4px 14px',
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 12, color: '#7c4dff' }}>⟲</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#333' }}>流转规则</span>
                </div>
                <div style={{ padding: '2px 14px 6px' }}>
                  <div
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 3,
                      padding: '3px 8px',
                      fontSize: 10,
                      color: '#555',
                      background: '#fafafa',
                    }}
                  >
                    执行完成后进入下一节点
                  </div>
                </div>
              </div>

              {/* 底部按钮 */}
              <div
                style={{
                  padding: '7px 14px',
                  display: 'flex',
                  gap: 8,
                  borderTop: '1px solid #f0f0f0',
                  marginTop: 'auto',
                }}
              >
                <button
                  style={{
                    background: '#e8443a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 14px',
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: 'default',
                  }}
                >
                  保存配置
                </button>
                <button
                  style={{
                    background: '#fff',
                    color: '#666',
                    border: '1px solid #d9d9d9',
                    borderRadius: 4,
                    padding: '4px 14px',
                    fontSize: 11,
                    cursor: 'default',
                  }}
                >
                  取消
                </button>
              </div>
            </div>

            {/* ====== 右侧测试结果面板 ====== */}
            <div
              style={{
                width: testPanelOpen ? TEST_PANEL_WIDTH : 0,
                overflow: testPanelOpen ? 'visible' : 'hidden',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                background: '#fafafa',
                minHeight: 0,
                position: 'relative',
              }}
            >
              {/* 测试结果标题 */}
              <div
                style={{
                  padding: '7px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #f0f0f0',
                  minWidth: TEST_PANEL_WIDTH,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>测试结果</span>
                <span style={{ color: '#999', fontSize: 12 }}>·</span>
              </div>

              {/* qf_output */}
              <div style={{ padding: '5px 12px 2px', minWidth: TEST_PANEL_WIDTH }}>
                <span style={{ fontSize: 10.5, color: '#666' }}>qf_output</span>
              </div>

              {/* JSON 结果 */}
              <div
                style={{
                  margin: '3px 12px',
                  border: '1px solid #e0e8ef',
                  borderRadius: 3,
                  background: '#fff',
                  fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                  fontSize: 10.5,
                  lineHeight: 1.55,
                  padding: '5px 8px',
                  minWidth: TEST_PANEL_WIDTH - 24,
                  minHeight: 70,
                  whiteSpace: 'pre',
                  color: '#333',
                }}
              >
                {testResultJSON}
              </div>

              {/* 运行按钮 */}
              <div style={{ padding: '5px 12px', minWidth: TEST_PANEL_WIDTH }}>
                <span style={{ fontSize: 15, color: '#999', cursor: 'default' }}>▷</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* ====== 继续提示（预留固定高度，避免画面位移） ====== */}
        <div
          style={{
            height: 30,
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {phase === 'panel-open' && (
            <button
              onClick={finishDemo}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fbbf24',
                fontSize: 18,
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                textShadow: '0 1px 2px rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: 0,
              }}
            >
              <span>点击或按空格继续</span>
              <span style={{ fontSize: 16, lineHeight: 1 }}>▼</span>
            </button>
          )}
        </div>
      </div>

      {/* 脉冲动画：测试运行按钮引导 */}
      <style>{`
        @keyframes protoTestBtnPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow:
              0 10px 24px rgba(124, 77, 255, 0.24),
              0 0 0 0 rgba(124, 77, 255, 0.42);
          }
          45% {
            transform: translateY(-1px) scale(1.045);
            box-shadow:
              0 14px 30px rgba(124, 77, 255, 0.34),
              0 0 0 8px rgba(124, 77, 255, 0);
          }
        }
        .proto-test-btn-pulse {
          animation: protoTestBtnPulse 1.15s cubic-bezier(0.23, 1, 0.32, 1) infinite;
        }
        .proto-test-btn-pulse:hover {
          animation: none;
          box-shadow:
            0 14px 30px rgba(124, 77, 255, 0.34),
            0 0 0 4px rgba(124, 77, 255, 0.22) !important;
          transform: translateY(-1px) scale(1.04);
        }
        .proto-test-btn-pulse:active {
          transform: scale(0.98);
        }
        .proto-scroll-area {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .proto-scroll-area::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </>
  )
}