import React from 'react'

export interface Evidence {
  id: string
  title: string
  description: string[]
  thumbnail?: string
  /** 左侧人物形象（完整 URL）；与右侧文案区同一行拉伸，立绘高度与右侧区域一致 */
  portraitUrl?: string
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
      className={`relative w-[min(540px,calc(100vw-40px))] p-0.5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      data-node-id="1:19820"
    >
      {/* 底图宽度即证物卡宽度，与弹窗贴合 */}
      <div className="relative w-full">
        <img
          src="/assets/figma/item.png"
          alt=""
          aria-hidden="true"
          className="block w-full h-auto select-none pointer-events-none"
        />

        {/* 左侧 45% 人物立绘 + 右侧文案；同行等高（网格拉伸），正文区过高时在右侧滚动 */}
        <div className="absolute inset-0">
          <div className="absolute left-0 right-[6.5%] top-[22%] bottom-[12%] grid min-h-0 grid-cols-[45fr_55fr] gap-x-2 items-stretch">
            <div className="relative min-h-0 min-w-0 flex items-end justify-center">
              {evidence.portraitUrl ? (
                <img
                  src={evidence.portraitUrl}
                  alt=""
                  className="h-full max-h-full w-full max-w-full object-contain object-bottom select-none pointer-events-none -translate-y-[8px] translate-x-[8px]"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : null}
            </div>

            <div className="flex min-h-0 min-w-0 flex-col gap-2">
              <h3 className="inline-block max-w-full self-start bg-[#FFBE16] px-2 py-0.5 text-[23px] leading-relaxed court-dialogue-text font-bold text-black break-words shrink-0">
                {evidence.title}
              </h3>

              <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
                {evidence.description.map((line, index) => (
                  <p
                    key={index}
                    className="court-dialogue-text text-lg leading-[1.35] text-black/80 break-words whitespace-pre-wrap underline decoration-dashed decoration-black/50 decoration-from-font underline-offset-[3px] mb-2 last:mb-0 [text-decoration-skip-ink:none]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
