import React from 'react'
import { motion } from 'framer-motion'

interface TestimonyHighlightProps {
  isActive: boolean
  text: string
}

/**
 * 证言高亮组件
 * 用于标记可以被质疑的证词
 */
export const TestimonyHighlight: React.FC<TestimonyHighlightProps> = ({
  isActive,
  text,
}) => {
  if (!isActive) {
    return <span>{text}</span>
  }

  return (
    <motion.span
      className="inline-block border-b-2 border-accent-gold text-accent-gold cursor-pointer"
      whileHover={{
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        scale: 1.05,
      }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
  )
}
