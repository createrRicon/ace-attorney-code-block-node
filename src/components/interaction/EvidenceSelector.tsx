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
    setSelectedEvidence,
  } = useEvidenceStore()

  const unlockedEvidences = evidences.filter((e) => e.unlocked)

  // 转换证据数据格式以匹配 FigmaEvidence 类型
  const convertToFigmaEvidence = (evidence: Evidence): FigmaEvidence => {
    const normalizeLine = (line: string) =>
      line.replace(/^[“"']+|[”"']+$/g, '').trim()

    const portraitUrl = evidence.portraitCharacterId
      ? `/assets/characters/${evidence.portraitCharacterId}-normal.png`
      : evidence.imageUrl

    return {
      id: evidence.id,
      title: evidence.name,
      description: typeof evidence.description === 'string'
        ? [normalizeLine(evidence.description)]
        : evidence.description.map(normalizeLine),
      thumbnail: evidence.thumbnail,
      portraitUrl,
    }
  }

  return (
    <AnimatePresence>
      {isSelectorOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-2 sm:p-3">
          {/* 遮罩 */}
          <motion.button
            type="button"
            aria-label="关闭证物面板"
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSelector}
          />

          {/* 证据面板 */}
          <motion.div
            className="relative z-[110] flex h-auto w-max min-w-[260px] max-w-[calc(100vw-16px)] max-h-[min(92vh,calc(100vh-16px))] flex-col overflow-hidden bg-gray-100 border-4 border-gray-800 rounded-lg shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* 标题栏 */}
            <div className="bg-accent-gold px-3 py-2 sm:px-4 sm:py-2.5 flex justify-between items-center shrink-0">
              <h2 className="text-base sm:text-lg font-bold text-bg-primary">证物</h2>
              <button
                onClick={closeSelector}
                className="text-bg-primary"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* 证据列表 - 可滚动；宽度贴近证物卡（item 底图） */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-2.5">
              {unlockedEvidences.length > 0 ? (
                <div className="space-y-2">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
