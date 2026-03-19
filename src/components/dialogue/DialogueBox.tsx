import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDialogueStore, useGameStore } from '../../store'
import { TypewriterText } from './TypewriterText'
import { NameTag } from './NameTag'
import { ContinuePrompt } from './ContinuePrompt'
import { ChoiceButtons } from './ChoiceButtons'

/**
 * 对话框组件
 * 显示角色对话、名字标签和操作提示
 */
export const DialogueBox: React.FC = () => {
  const { currentLine, isVisible } = useDialogueStore()
  const { next } = useGameStore()

  if (!currentLine || !isVisible) return null

  const handleContinue = () => {
    const hasChoices = currentLine.choices && currentLine.choices.length > 0
    if (!hasChoices) {
      next()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="relative bg-bg-secondary border-4 border-border-color rounded-lg p-6 shadow-2xl cursor-pointer z-20"
        onClick={handleContinue}
      >
        {/* 名字标签 */}
        <NameTag characterId={currentLine.characterId} />

        {/* 对话文本 */}
        <div className="mt-4 min-h-[80px]">
          <TypewriterText text={currentLine.text} />
        </div>

        {/* 选择分支 */}
        {currentLine.choices && currentLine.choices.length > 0 && (
          <ChoiceButtons choices={currentLine.choices} />
        )}

        {/* 继续提示 */}
        {!currentLine.choices && <ContinuePrompt onContinue={handleContinue} />}
      </motion.div>
    </AnimatePresence>
  )
}
