import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDialogueStore } from '../../store'
import { useGameStore } from '../../store'
import { CHARACTERS } from '../../data/characters/characterConfig'

interface CourtDialogueBoxProps {
  onContinue: () => void
}

/**
 * 法庭风格对话框组件
 * 完全按照 Figma 设计实现
 *
 * Figma 设计：游戏画面 (14:5895)
 * - 对话框：rgba(2,12,36,0.8) 背景，上下白色边框
 * - 人物名称标签：使用图片素材
 * - 文本：白色，24px，Source Han Sans SC 字体
 */
export const CourtDialogueBox: React.FC<CourtDialogueBoxProps> = ({
  onContinue,
}) => {
  const { currentLine } = useDialogueStore()
  const { makeChoice } = useGameStore()

  // 判断当前行是否有选项
  const hasChoices = currentLine?.choices && currentLine.choices.length > 0

  // 调试：追踪 currentLine 变化
  React.useEffect(() => {
    console.log('[CourtDialogueBox] currentLine changed:', currentLine?.id, currentLine?.characterId, 'hasChoices:', hasChoices)
  }, [currentLine, hasChoices])

  // 调试：追踪点击事件（仅在无选项时可点击继续）
  const handleClick = React.useCallback(() => {
    // 有选项时，点击对话框背景不做任何事，必须点选项
    if (hasChoices) {
      console.log('[CourtDialogueBox] onClick blocked - has choices, waiting for selection')
      return
    }
    console.log('[CourtDialogueBox] onClick fired, current line:', currentLine?.id)
    onContinue()
  }, [onContinue, currentLine, hasChoices])

  // 处理选项点击
  const handleChoiceClick = React.useCallback((choiceIndex: number, e: React.MouseEvent) => {
    e.stopPropagation() // 阻止冒泡到对话框的 onClick
    console.log('[CourtDialogueBox] Choice clicked:', choiceIndex)
    makeChoice(choiceIndex)
  }, [makeChoice])

  if (!currentLine) return null

  // 旁白不显示对话框
  const isNarrator = currentLine.characterId === 'narrator'

  // 获取角色信息
  const getCharacterInfo = () => {
    const characterConfig = CHARACTERS[currentLine.characterId]

    if (characterConfig) {
      return {
        name: characterConfig.name,
        roleName: characterConfig.role,
        color: characterConfig.color
      }
    }

    // 兼容旧角色ID
    switch (currentLine.characterId) {
      case 'player':
        return { name: '力康', roleName: '设计师', color: '#e94560' }
      case 'interviewer':
        return { name: '前端主管', roleName: '前端主管', color: '#3A5A7A' }
      case 'witness':
        return { name: '证人', roleName: '证人', color: '#7B68EE' }
      default:
        return { name: '未知', roleName: '未知', color: '#666666' }
    }
  }

  const characterInfo = getCharacterInfo()

  // 旁白使用全屏文字效果
  if (isNarrator) {
    // 处理带星号的文字 - 将 *文字* 渲染为红色，完全删除星号
    const renderTextWithHighlights = (text: string) => {
      // 匹配 **文字** 或 *文字* 格式
      const parts = text.split(/(\*{1,2}[^*]+\*{1,2})/g)
      return parts.map((part, index) => {
        if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
          const highlightedText = part.replace(/^\*{1,2}|\*{1,2}$/g, '')
          return <span key={index} className="text-accent-red font-bold">{highlightedText}</span>
        }
        return part
      })
    }

    const handleNarratorClick = (e: React.MouseEvent) => {
      console.log('[NARRATOR CLICK] Clicked!', {
        lineId: currentLine.id,
        nextLineId: currentLine.nextLineId,
        target: e.target
      })
      onContinue()
    }

    // 检测是否是“获得证据”类型的旁白
    const isEvidenceNarrator = currentLine.text.includes('获得证据')

    // 解析证据旁白的标题和描述
    const parseEvidenceText = (text: string) => {
      // 格式：【获得证据：📖 小王的证词】\n*"描述文字"*
      const titleMatch = text.match(/【获得证据：(.+?)】/)
      const title = titleMatch ? titleMatch[1].replace(/[\ud83d\udcd6\ud83d\udd16]/gu, '').trim() : '证据'
      // 提取描述（在 * 或 ** 之间的内容）
      const descMatch = text.match(/[*"]+([^*"]+)[*"]+/)
      const description = descMatch ? descMatch[1].trim() : ''
      return { title, description }
    }

    if (isEvidenceNarrator) {
      const { title, description } = parseEvidenceText(currentLine.text)

      return (
        <div
          data-narrator-overlay="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            cursor: 'pointer',
            zIndex: 50,
            pointerEvents: 'auto'
          }}
          onClick={handleNarratorClick}
        >
          {/* “获得证物”提示文字 */}
          <p style={{
            color: '#FFD700',
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '24px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}>
            获得证物
          </p>

          {/* 证据卡片 */}
          <div style={{ pointerEvents: 'none', position: 'relative', width: '640px', height: '300px' }}>
            {/* item.png 作为卡片背景 */}
            <img
              src="/assets/figma/item.png"
              alt="证据卡片"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'fill'
              }}
            />
            {/* 标题文字 - 黄色标题区域 */}
            <div style={{
              position: 'absolute',
              top: '13%',
              left: '52%',
              right: '6%',
            }}>
              <p style={{
                color: '#333',
                fontSize: '22px',
                fontWeight: 'bold',
                lineHeight: 1.3,
              }}>
                {title}
              </p>
            </div>
            {/* 描述文字 - 虚线区域 */}
            <div style={{
              position: 'absolute',
              top: '35%',
              left: '52%',
              right: '6%',
              bottom: '12%',
            }}>
              <p style={{
                color: '#555',
                fontSize: '15px',
                lineHeight: 2.0,
              }}>
                {description}
              </p>
            </div>
          </div>

          {/* 点击继续 */}
          <p className="text-accent-gold text-sm animate-pulse" style={{ marginTop: '20px', pointerEvents: 'none' }}>
            ▼ 点击继续
          </p>
        </div>
      )
    }

    return (
      <div
        data-narrator-overlay="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          cursor: 'pointer',
          zIndex: 50,
          pointerEvents: 'auto'
        }}
        onClick={handleNarratorClick}
        onMouseDown={(e) => {
          console.log('[NARRATOR] onMouseDown', {
            lineId: currentLine.id,
            target: (e.target as HTMLElement).tagName
          })
        }}
      >
        <div style={{ pointerEvents: 'none', textAlign: 'center', maxWidth: '800px', padding: '20px' }}>
          <p
            className="text-white text-2xl leading-relaxed whitespace-pre-line court-dialogue-text"
            style={{ marginBottom: '20px' }}
          >
            {renderTextWithHighlights(currentLine.text)}
          </p>
          <p className="text-accent-gold text-sm animate-pulse">
            ▼ 点击继续
          </p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.1 }}
        className={`absolute inset-0 ${hasChoices ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={handleClick}
      >
        {/* 人物名称标签 - 在对话框上方，紧贴对话框上沿 */}
        <div className="absolute left-[26px]" style={{ bottom: 'calc(218px - 24px)', zIndex: 100 }}>
          <div className="relative w-[312px] h-[48px]">
            <img
              src="/assets/figma/character-name.png"
              alt="名称框"
              className="absolute inset-0 w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                const parent = (e.target as HTMLImageElement).parentElement
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, rgba(233, 69, 96, 0.9) 0%, rgba(185, 28, 28, 0.9) 100%)'
                  parent.style.borderRadius = '8px'
                }
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-[19px] whitespace-nowrap">
                {characterInfo.roleName} {characterInfo.name}
              </p>
            </div>
          </div>
        </div>

        {/* 对话框主体 - 适配 1280x720 尺寸 (原尺寸 1440x900，缩放 0.8) */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[218px] border-t border-b border-white overflow-hidden"
          style={{ backgroundColor: 'rgba(2, 12, 36, 0.8)' }}
        >
          {/* 使用 Figma 提供的对话框底图 */}
          <img
            src="/assets/figma/dialog-content.png"
            alt="对话框背景"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            style={{ pointerEvents: 'none' }}
          />

          {/* 对话文本区域 */}
          <div className="absolute left-[78px] top-[64px] right-[80px] bottom-[24px]">
            <motion.p
              key={currentLine.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className="text-white text-[19px] leading-relaxed court-dialogue-text whitespace-pre-wrap"
            >
              {(() => {
                // 句号后插入换行（括号内的独白不换行）
                const isInParens = currentLine.text.startsWith('（') || currentLine.text.startsWith('(')
                const textWithBreaks = isInParens ? currentLine.text : currentLine.text.replace(/。(?!\n)/g, '。\n')
                const parts = textWithBreaks.split(/(\*{1,2}[^*]+\*{1,2})/g)
                return parts.map((part, index) => {
                  if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
                    const highlightedText = part.replace(/^\*{1,2}|\*{1,2}$/g, '')
                    return (
                      <span key={index} className="text-accent-red font-bold">
                        {highlightedText}
                      </span>
                    )
                  }
                  return part
                })
              })()}
            </motion.p>
          </div>

          {/* 继续提示 - 有选项时不显示 */}
          {!hasChoices && (
            <motion.div
              className="absolute bottom-[12px] right-[24px] text-accent-gold text-4xl font-bold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ▼
            </motion.div>
          )}
        </div>

        {/* === 选项按钮 === Figma 设计：右侧竖排，金色边框 */}
        {hasChoices && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute right-[8%] flex flex-col gap-4"
            style={{
              bottom: 'calc(218px + 40px)',
              zIndex: 20
            }}
          >
            {currentLine.choices!.map((choice, index) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
                onClick={(e) => handleChoiceClick(index, e)}
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
                className="relative flex items-center justify-center"
                style={{
                  pointerEvents: 'auto',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  width: '340px',
                  height: '56px',
                }}
              >
                {/* 默认状态背景 */}
                <img
                  data-state="default"
                  src="/assets/figma/select_item-default.png"
                  alt=""
                  className="absolute inset-0 w-full h-full"
                  style={{ transition: 'opacity 0.15s ease', objectFit: 'contain' }}
                />
                {/* Hover 状态背景 */}
                <img
                  data-state="hover"
                  src="/assets/figma/select_item-hover.png"
                  alt=""
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0, transition: 'opacity 0.15s ease', objectFit: 'contain' }}
                />
                {/* 文字 */}
                <span className="relative z-10 text-white text-[19px] font-light whitespace-nowrap">
                  {choice.text}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
