import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ObjectionPopupProps {
  trigger: boolean
  text?: string
  onComplete?: () => void
}

/**
 * 异议弹窗组件
 * 显示巨大的"異議あり！"文字
 */
export const ObjectionPopup: React.FC<ObjectionPopupProps> = ({
  trigger,
  text = '異議あり！',
  onComplete,
}) => {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete?.(), 500)
          }}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black opacity-50" />

          {/* 文字 */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <div className="text-accent-red font-bold text-8xl whitespace-nowrap text-shadow-glow">
              {text}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
