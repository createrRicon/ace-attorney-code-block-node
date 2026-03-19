import React from 'react'
import { motion } from 'framer-motion'
import { useEvidenceStore } from '../../store'

/**
 * 法庭记录按钮
 * 点击打开证据选择器
 */
export const CourtRecordButton: React.FC = () => {
  const { toggleSelector, evidences } = useEvidenceStore()

  const unlockedCount = evidences.filter((e) => e.unlocked).length

  return (
    <motion.button
      onClick={toggleSelector}
      className="absolute bottom-4 right-4 px-6 py-3 bg-gradient-to-r from-bg-secondary to-bg-primary border-2 border-accent-gold rounded-lg shadow-lg hover:shadow-accent-gold/50 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-accent-gold font-bold">法庭记录</span>
        <span className="text-white text-sm bg-accent-red px-2 py-1 rounded">
          {unlockedCount}
        </span>
      </div>
    </motion.button>
  )
}
