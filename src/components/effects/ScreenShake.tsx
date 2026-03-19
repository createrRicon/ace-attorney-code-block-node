import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScreenShakeProps {
  trigger: boolean
  intensity?: number
  duration?: number
  onComplete?: () => void
}

/**
 * 震屏效果组件
 * 用于强烈的视觉冲击（如异议时）
 */
export const ScreenShake: React.FC<ScreenShakeProps> = ({
  trigger,
  intensity = 10,
  duration = 0.5,
  onComplete,
}) => {
  useEffect(() => {
    if (trigger && onComplete) {
      const timer = setTimeout(onComplete, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [trigger, duration, onComplete])

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{
            x: [0, -intensity, intensity, -intensity, intensity, 0],
            y: [0, intensity, -intensity, intensity, -intensity, 0],
          }}
          transition={{
            duration,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  )
}
