import React from 'react'

interface CornerButtonProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: number
  className?: string
}

/**
 * 装饰性角标组件
 * 用于证物卡片的四个角落
 * Figma node-id: 1:19833, 1:19834, 1:19835, 1:19836
 */
export const CornerButton: React.FC<CornerButtonProps> = ({
  position,
  size = 50,
  className = '',
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0'
      case 'top-right':
        return 'top-0 right-0'
      case 'bottom-left':
        return 'bottom-0 left-0'
      case 'bottom-right':
        return 'bottom-0 right-0'
    }
  }

  const getRotation = () => {
    switch (position) {
      case 'top-left':
        return 'rotate-0'
      case 'top-right':
        return 'rotate-90'
      case 'bottom-right':
        return 'rotate-180'
      case 'bottom-left':
        return 'rotate-270'
    }
  }

  return (
    <div
      className={`absolute ${getPositionClasses()} ${className}`}
      style={{ width: size, height: size }}
      data-node-id={`1:19833`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        className={`${getRotation()}`}
      >
        <path
          d="M0 0 L50 0 L50 50 L0 0 Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
