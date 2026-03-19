import React from 'react'
import { motion } from 'framer-motion'
import { CharacterId, ExpressionType } from '../../types'

interface CharacterPortraitProps {
  characterId: CharacterId
  expression?: ExpressionType
  position: 'left' | 'right' | 'center'
}

/**
 * 角色立绘组件
 * 显示角色图片和表情
 * 注意：目前使用占位符，实际使用时需要替换为真实的立绘图片
 */
export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterId,
  expression = 'neutral',
  position,
}) => {
  // 占位符颜色
  const getPlaceholderColor = () => {
    switch (characterId) {
      case 'player':
        return 'from-accent-red to-red-800'
      case 'interviewer':
        return 'from-blue-600 to-blue-900'
      case 'witness':
        return 'from-purple-600 to-purple-900'
      default:
        return 'from-gray-600 to-gray-900'
    }
  }

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

  return (
    <motion.div
      className={`absolute bottom-0 ${getPositionClasses()} h-3/4 w-64`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 占位符立绘 */}
      <div className={`w-full h-full bg-gradient-to-t ${getPlaceholderColor()} rounded-lg flex items-center justify-center shadow-2xl`}>
        <div className="text-center text-white">
          <div className="text-6xl mb-2">
            {characterId === 'player' ? '👨‍💻' : characterId === 'interviewer' ? '🧑‍⚖️' : '👤'}
          </div>
          <div className="text-sm font-bold opacity-75">{expression}</div>
        </div>
      </div>

      {/* 角色名字 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-4 text-center">
        <div className="text-white font-bold text-lg shadow-black drop-shadow-lg">
          {characterId === 'player' ? '力康' : characterId === 'interviewer' ? '面试官' : '证人'}
        </div>
      </div>
    </motion.div>
  )
}
