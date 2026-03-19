import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEvidenceStore } from '../../store'
import { EvidenceCard, Evidence as FigmaEvidence } from '../figma'
import { Evidence } from '../../types'

/**
 * 证据选择器组件
 * 显示已收集的证据列表
 */
export const EvidenceSelector: React.FC = () => {
  const {
    evidences,
    isSelectorOpen,
    closeSelector,
    selectedEvidenceId,
    setSelectedEvidence,
  } = useEvidenceStore()

  const unlockedEvidences = evidences.filter((e) => e.unlocked)

  // 转换证据数据格式以匹配 FigmaEvidence 类型
  const convertToFigmaEvidence = (evidence: Evidence): FigmaEvidence => {
    return {
      id: evidence.id,
      title: evidence.name,
      description: typeof evidence.description === 'string'
        ? [evidence.description]
        : evidence.description,
      thumbnail: evidence.thumbnail,
    }
  }

  return (
    <AnimatePresence>
      {isSelectorOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSelector}
          />

          {/* 证据面板 - 使用全屏展示以适应大卡片 */}
          <motion.div
            className="fixed inset-4 bg-bg-secondary border-4 border-border-color rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* 标题栏 */}
            <div className="bg-accent-gold px-6 py-4 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-bold text-bg-primary">法庭记录</h2>
              <button
                onClick={closeSelector}
                className="text-bg-primary hover:text-accent-red transition-colors"
              >
                <span className="text-3xl">×</span>
              </button>
            </div>

            {/* 证据列表 - 可滚动 */}
            <div className="flex-1 overflow-y-auto p-8">
              {unlockedEvidences.length > 0 ? (
                <div className="space-y-8">
                  {unlockedEvidences.map((evidence) => (
                    <EvidenceCard
                      key={evidence.id}
                      evidence={convertToFigmaEvidence(evidence)}
                      onClick={() => setSelectedEvidence(evidence.id)}
                    />
                  ))}
                </div>
              ) : (
                /* 空状态 */
                <div className="text-center text-gray-400 py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p>还没有收集到任何证据</p>
                </div>
              )}
            </div>

            {/* 底部按钮 */}
            {selectedEvidenceId && (
              <div className="px-6 py-4 border-t border-border-color shrink-0">
                <button
                  onClick={() => {
                    // TODO: 添加出示证据的逻辑
                    console.log('出示证据:', selectedEvidenceId)
                    closeSelector()
                  }}
                  className="w-full py-3 bg-accent-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  出示证据
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
