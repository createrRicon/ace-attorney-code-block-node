import React from 'react'

interface NormalTextProps {
  children: React.ReactNode
  className?: string
}

/**
 * 普通文字组件
 * 基础文本框样式
 * Figma node-id: 1:19801
 */
export const NormalText: React.FC<NormalTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-[#1f7cb7] border-2 border-solid border-white ${className}`}
      data-node-id="1:19801"
    >
      {children}
    </div>
  )
}
