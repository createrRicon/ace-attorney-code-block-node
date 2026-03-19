import React from 'react'

interface SelectedTextProps {
  children: React.ReactNode
  className?: string
}

/**
 * 选中文字组件
 * 用于高亮显示重要文本
 * Figma node-id: 1:19795
 */
export const SelectedText: React.FC<SelectedTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`relative inline-block bg-[#1f7cb7] text-white px-1 py-0.5 ${className}`}
      data-node-id="1:19795"
    >
      {children}
    </span>
  )
}
