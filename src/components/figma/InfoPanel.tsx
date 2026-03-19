import React from 'react'

interface InfoPanelProps {
  children: React.ReactNode
  className?: string
}

/**
 * 说明信息面板组件
 * 半透明深色背景，用于显示提示和说明
 * Figma node-id: 1:19802
 */
export const InfoPanel: React.FC<InfoPanelProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-[rgba(2,12,36,0.8)] border-t border-b border-solid border-white relative ${className}`}
      data-node-id="1:19802"
    >
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
