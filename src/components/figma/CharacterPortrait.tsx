import React from 'react'
import { CharacterSprite, CharacterExpression } from './CharacterSprite'

interface CharacterPortraitProps {
  characterId: string  // 角色ID
  expression?: CharacterExpression
  position?: 'left' | 'right' | 'center'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

/**
 * 角色立绘容器组件
 * 包含定位和尺寸控制
 */
export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterId,
  expression = 'normal',
  position = 'left',
  size = 'md',
  className = '',
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-8'
      case 'right':
        return 'right-8'
      case 'center':
        return 'left-1/2 -translate-x-1/2'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-full w-auto max-w-[150px]'
      case 'md':
        return 'h-2/3 w-auto max-w-md'
      case 'lg':
        return 'h-[70vh] w-auto max-w-2xl'
      case 'xl':
        return 'h-full w-full max-w-none'
    }
  }

  return (
    <div
      className={`absolute bottom-0 ${getPositionClasses()} ${getSizeClasses()} ${className} z-10`}
    >
      <CharacterSprite
        characterId={characterId}
        expression={expression}
        className="w-full h-full"
      />
    </div>
  )
}
