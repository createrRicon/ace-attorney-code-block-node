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
      className="relative px-[25.714px] py-[13.714px] bg-gradient-to-r from-[#16213e] to-[#1a1a2e] border-[1.714px] border-solid border-[#ffd700] rounded-[8px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] transition-all duration-300 z-40"
      style={{ width: '147.205px', height: '55.429px' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-[8px] h-[28px]">
        {/* 证物文字 */}
        <span className="text-[#ffd700] font-['Noto_Sans_SC:Bold',sans-serif] font-bold text-[24px] leading-[24px] flex-1">
          证物
        </span>

        {/* 数字徽章 */}
        <span
          className="text-white text-[14px] font-['Barlow:Bold',sans-serif] leading-[20px] px-[8px] py-[4px] rounded-[4px] flex-shrink-0"
          style={{ backgroundColor: '#e94560' }}
        >
          {unlockedCount}
        </span>
      </div>
    </motion.button>
  )
}
