import React from 'react'
import { CornerButton } from './CornerButton'

export interface Evidence {
  id: string
  title: string
  description: string[]
  thumbnail?: string
}

interface EvidenceCardProps {
  evidence: Evidence
  onClick?: () => void
  className?: string
}

/**
 * 证物卡片组件
 * 用于展示证据，包含缩略图、标题和描述
 * Figma node-id: 1:19820
 */
export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`relative flex flex-col gap-2.5 p-5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      data-node-id="1:19820"
    >
      {/* 主卡片内容 */}
      <div className="bg-white border-4 border-[#2184c1] border-solid flex gap-5 items-center justify-center p-10 shadow-[0px_0px_0px_3px_white] relative overflow-hidden">
        {/* 左侧：缩略图区域 */}
        <div className="shrink-0 w-[300px] h-[300px] bg-[#767676] flex items-center justify-center">
          {evidence.thumbnail ? (
            <img src={evidence.thumbnail} alt={evidence.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-4xl">📄</span>
          )}
        </div>

        {/* 右侧：证据信息 */}
        <div className="flex flex-col gap-11 h-[300px] justify-center w-[475px]">
          {/* 标题 */}
          <div className="bg-[#ffbe16] h-10 w-[200px] flex items-center justify-center">
            <span className="font-bold text-black">{evidence.title}</span>
          </div>

          {/* 描述列表 */}
          <div className="flex flex-col gap-2.5">
            {evidence.description.map((line, index) => (
              <div
                key={index}
                className="border-b border-black border-dashed h-12 flex items-center px-2"
              >
                <span className="text-sm">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 装饰性角标 */}
      <CornerButton position="top-left" />
      <CornerButton position="top-right" />
      <CornerButton position="bottom-left" />
      <CornerButton position="bottom-right" />
    </div>
  )
}
