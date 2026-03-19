import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashEffectProps {
  trigger: boolean
  color?: string
  duration?: number
  onComplete?: () => void
}

/**
 * 闪光效果组件
 * 用于强调重要时刻（如成功出示证据）
 */
export const FlashEffect: React.FC<FlashEffectProps> = ({
  trigger,
  color = '#ffffff',
  duration = 0.4,
  onComplete,
}) => {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          style={{ backgroundColor: color }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          onAnimationComplete={() => onComplete?.()}
        />
      )}
    </AnimatePresence>
  )
}
