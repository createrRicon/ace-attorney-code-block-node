import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpeedLinesProps {
  trigger: boolean
  duration?: number
}

/**
 * 速度线效果组件
 * 用于营造紧张感和冲击力
 */
export const SpeedLines: React.FC<SpeedLinesProps> = ({
  trigger,
  duration = 0.6,
}) => {
  const lines = Array.from({ length: 20 }, (_, i) => i)

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 2 }}
        >
          {lines.map((i) => (
            <motion.div
              key={i}
              className="absolute bg-white opacity-30"
              style={{
                width: '2px',
                height: '100%',
                left: `${(i / lines.length) * 100}%`,
                top: 0,
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration,
                delay: i * 0.02,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
