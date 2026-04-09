import React from 'react'
import { motion } from 'framer-motion'
import { Choice } from '../../types'
import { useGameStore } from '../../store'

interface ChoiceButtonsProps {
  choices: Choice[]
}

/**
 * 选择按钮组件
 * 显示分支选项
 */
export const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices }) => {
  const { makeChoice } = useGameStore() as { makeChoice: (index: number) => boolean }

  return (
    <div className="mt-6 space-y-3">
      {choices.map((choice, index) => (
        <motion.button
          key={index}
          onClick={() => makeChoice(index)}
          className="w-full px-9 py-[18px] bg-bg-primary border-[3px] border-accent-gold rounded-xl text-left hover:bg-accent-gold hover:text-bg-primary transition-all duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-bold">{choice.text}</span>
        </motion.button>
      ))}
    </div>
  )
}
