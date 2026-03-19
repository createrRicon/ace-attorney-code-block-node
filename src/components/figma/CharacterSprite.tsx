import React from 'react'

export type CharacterExpression = 'normal' | 'thinking' | 'awkward' | 'confident' | 'angry' | 'smile' | 'serious' | 'glasses' | 'surprised'

interface CharacterSpriteProps {
  characterId: string  // 直接使用角色ID
  expression: CharacterExpression
  className?: string
}

/**
 * 角色立绘组件
 * 支持不同角色和表情
 * 优先使用本地图片素材，否则使用占位符
 */
export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  expression,
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false)

  // 每个角色可用的表情素材（和 public/assets/characters 目录一致）
  const AVAILABLE_EXPRESSIONS: Record<string, string[]> = {
    likang: ['normal', 'thinking', 'awkward', 'confident', 'angry'],
    snow: ['normal', 'serious', 'smile'],
    ll: ['normal', 'serious', 'angry', 'glasses'],
    poet: ['normal', 'serious', 'smile'],
    zhang: ['normal', 'serious', 'smile'],
    wang: ['normal', 'awkward'],
    chen: ['normal', 'serious', 'thinking'],
  }

  // 角色ID到文件名的映射，缺失的表情降级到 normal
  const getCharacterImagePath = () => {
    const available = AVAILABLE_EXPRESSIONS[characterId]
    const resolvedExpression = available && available.includes(expression) ? expression : 'normal'
    return `/assets/characters/${characterId}-${resolvedExpression}.png`
  }

  const imageSrc = getCharacterImagePath()

  // 获取占位符 emoji
  const getPlaceholderEmoji = () => {
    switch (characterId) {
      case 'likang':
        switch (expression) {
          case 'thinking':
            return '🤔'
          case 'awkward':
            return '😅'
          case 'confident':
            return '😎'
          case 'angry':
            return '😤'
          default:
            return '👨‍💻'
        }
      case 'snow':
        switch (expression) {
          case 'smile':
            return '😊'
          case 'serious':
            return '🤔'
          default:
            return '👩'
        }
      case 'll':
        switch (expression) {
          case 'glasses':
            return '🧐'
          case 'angry':
            return '😠'
          case 'serious':
            return '😐'
          default:
            return '🧑‍⚖️'
        }
      case 'poet':
        switch (expression) {
          case 'smile':
            return '😊'
          case 'serious':
            return '🤔'
          default:
            return '👩⚖️'
        }
      case 'zhang':
        switch (expression) {
          case 'smile':
            return '😊'
          case 'serious':
            return '🤔'
          default:
            return '👴'
        }
      case 'wang':
        switch (expression) {
          case 'awkward':
            return '😅'
          default:
            return '👨'
        }
      case 'chen':
        switch (expression) {
          default:
            return '👨‍💻'
        }
      default:
        return '❓'
    }
  }

  // 如果图片加载失败，显示占位符
  if (imageError) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        data-node-id="1:19804"
      >
        <div className="text-[200px] flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg">
          {getPlaceholderEmoji()}
        </div>
      </div>
    )
  }

  // 使用本地图片
  return (
    <div
      className={`relative ${className}`}
      data-node-id="1:19804"
    >
      <img
        src={imageSrc}
        alt={`${characterId}-${expression}`}
        className="w-full h-full object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
