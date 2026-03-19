import React from 'react'

export type FigmaCharacterExpression = 'normal' | 'thinking' | 'awkward' | 'confident' | 'angry'

interface FigmaCharacterSpriteProps {
  characterId: string
  expression: FigmaCharacterExpression
  className?: string
}

/**
 * Figma 角色立绘组件
 * 使用从 Figma 导出的图片素材
 */
export const FigmaCharacterSprite: React.FC<FigmaCharacterSpriteProps> = ({
  characterId,
  expression,
  className = '',
}) => {
  // Figma 图片素材 URL (从 get_design_context 获取)
  const figmaImages: Record<string, string> = {
    // 设计师力康 - 思考表情
    'likang-thinking': 'https://www.figma.com/api/mcp/asset/1eac2763-269a-4598-9752-51c314ae6c1c',
    // 其他表情可以后续添加
    'likang-normal': 'https://www.figma.com/api/mcp/asset/1eac2763-269a-4598-9752-51c314ae6c1c',
    'likang-awkward': 'https://www.figma.com/api/mcp/asset/1eac2763-269a-4598-9752-51c314ae6c1c',
    'likang-confident': 'https://www.figma.com/api/mcp/asset/1eac2763-269a-4598-9752-51c314ae6c1c',
    'likang-angry': 'https://www.figma.com/api/mcp/asset/1eac2763-269a-4598-9752-51c314ae6c1c',
  }

  const getImageKey = () => {
    return `${characterId}-${expression}` as keyof typeof figmaImages
  }

  const imageSrc = figmaImages[getImageKey()] || figmaImages['likang-thinking']

  // 如果有图片 URL，使用图片；否则使用占位符
  return (
    <div className={`relative ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${characterId}-${expression}`}
          className="w-full h-full object-contain"
        />
      ) : (
        // 占位符 emoji
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg">
          <span className="text-[200px]">
            {characterId === 'likang' ? '👨‍💻' : '🧑‍⚖️'}
          </span>
        </div>
      )}
    </div>
  )
}
