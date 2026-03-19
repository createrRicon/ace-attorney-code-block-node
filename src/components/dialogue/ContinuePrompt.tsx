import React from 'react'
import { motion } from 'framer-motion'
import { useDialogueStore } from '../../store'

interface ContinuePromptProps {
  onContinue: () => void
}

/**
 * 继续提示组件
 * 显示在对话框右下角，提示用户点击继续
 */
export const ContinuePrompt: React.FC<ContinuePromptProps> = ({ onContinue }) => {
  const { isTyping } = useDialogueStore()

  return (
    <motion.button
      onClick={onContinue}
      className="absolute bottom-4 right-4 text-accent-gold font-bold"
      animate={{
        opacity: isTyping ? 0 : 1,
        scale: isTyping ? 0.8 : 1,
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      ▼ 点击继续
    </motion.button>
  )
}
