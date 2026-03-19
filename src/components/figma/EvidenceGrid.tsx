import React from 'react'
import { EvidenceCard, Evidence } from './EvidenceCard'

interface EvidenceGridProps {
  evidences: Evidence[]
  onSelectEvidence?: (evidence: Evidence) => void
  className?: string
}

/**
 * 证据网格组件
 * 用于展示多个证据卡片
 */
export const EvidenceGrid: React.FC<EvidenceGridProps> = ({
  evidences,
  onSelectEvidence,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 gap-8 ${className}`}>
      {evidences.map((evidence) => (
        <EvidenceCard
          key={evidence.id}
          evidence={evidence}
          onClick={() => onSelectEvidence?.(evidence)}
        />
      ))}
    </div>
  )
}
