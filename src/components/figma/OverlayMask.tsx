import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OverlayMaskProps {
  show: boolean
  opacity?: number
  onClick?: () => void
  className?: string
}

/**
 * 遮罩层组件
 * 半透明黑色遮罩，用于模态框和特效
 * Figma node-id: 1:19865
 */
export const OverlayMask: React.FC<OverlayMaskProps> = ({
  show,
  opacity = 0.75,
  onClick,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 bg-black ${onClick ? 'cursor-pointer' : ''} ${className}`}
          style={{ backgroundColor: `rgba(18, 19, 21, ${opacity})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClick}
          data-node-id="1:19865"
        />
      )}
    </AnimatePresence>
  )
}
