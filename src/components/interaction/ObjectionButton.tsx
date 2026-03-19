import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDialogueStore } from '../../store'
import { ObjectionPopup, ScreenShake, SpeedLines, FlashEffect } from '../effects'
import { interactionManager } from '../../engine'

/**
 * 异议按钮组件
 * 点击触发"异议！"动画序列
 */
export const ObjectionButton: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showShake, setShowShake] = useState(false)
  const [showLines, setShowLines] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  const { currentLine } = useDialogueStore()

  const canInteract = currentLine?.interactionTrigger?.type === 'objection'

  const handleClick = () => {
    if (!canInteract || isAnimating) return

    setIsAnimating(true)

    // 动画序列
    // 1. 速度线 (0.3s)
    setShowLines(true)
    setTimeout(() => setShowLines(false), 300)

    // 2. 异议弹窗 (0.4s)
    setTimeout(() => {
      setShowPopup(true)
    }, 200)

    // 3. 震屏 (0.5s)
    setTimeout(() => {
      setShowShake(true)
      setShowLines(false)
    }, 400)

    // 4. 闪光 (0.4s)
    setTimeout(() => {
      setShowFlash(true)
      setShowPopup(false)
      setShowShake(false)
    }, 600)

    // 5. 处理互动结果
    setTimeout(() => {
      setShowFlash(false)
      setIsAnimating(false)

      // 调用互动管理器
      void interactionManager.object()
      // 这里可以根据结果显示不同的反馈
    }, 1000)
  }

  return (
    <>
      {/* 视觉效果 */}
      <SpeedLines trigger={showLines} />
      <ObjectionPopup trigger={showPopup} />
      <ScreenShake trigger={showShake} />
      <FlashEffect trigger={showFlash} />

      {/* 异议按钮 */}
      <AnimatePresence>
        {canInteract && !isAnimating && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={handleClick}
            className="absolute bottom-8 left-8 px-8 py-4 bg-gradient-to-r from-accent-red to-red-800 rounded-full shadow-2xl hover:shadow-accent-red/75 transition-all duration-300 z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-bold text-2xl">异议！</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
