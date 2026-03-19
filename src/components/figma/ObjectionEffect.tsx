import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ObjectionEffectProps {
  trigger: boolean
  text?: string
  onComplete?: () => void
  className?: string
}

/**
 * 异议特效组件
 * 显示巨大的"异议！"文字动画 + 异议图片
 * 为异议素材预留位置
 */
export const ObjectionEffect: React.FC<ObjectionEffectProps> = ({
  trigger,
  text = '异议！',
  onComplete,
  className = '',
}) => {
  const [phase, setPhase] = useState<'idle' | 'popup' | 'shaking' | 'fading'>('idle')

  React.useEffect(() => {
    if (trigger) {
      setPhase('popup')

      // 动画序列
      const popupTimer = setTimeout(() => {
        setPhase('shaking')
      }, 200)

      const shakeTimer = setTimeout(() => {
        setPhase('fading')
      }, 450)

      const completeTimer = setTimeout(() => {
        setPhase('idle')
        onComplete?.()
      }, 600)

      return () => {
        clearTimeout(popupTimer)
        clearTimeout(shakeTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [trigger, onComplete])

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          className={`fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'fading' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black opacity-50" />

          {/* 异议图片区域 - 放大 2 倍 */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, y: -50 }}
            animate={{
              scale: phase === 'popup' ? 1 : phase === 'shaking' ? 1.1 : 1,
              y: phase === 'popup' ? 0 : phase === 'shaking' ? -10 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            {/* 异议图片 - 预留位置，用户上传后可以替换 */}
            <div
              className="w-[800px] h-[600px] bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/assets/effects/objection.png)', // 用户上传后的路径
                backgroundSize: 'contain',
                backgroundPosition: 'center'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
