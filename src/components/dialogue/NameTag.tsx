import React from 'react'
import { CharacterId } from '../../types'

const CHARACTER_CONFIG: Record<CharacterId, { name: string; color: string }> = {
  likang: { name: '力康', color: 'bg-[#e94560]' },
  snow: { name: 'Snow', color: 'bg-[#4a90e2]' },
  ll: { name: 'LL', color: 'bg-[#ff6b6b]' },
  poet: { name: 'Poet', color: 'bg-[#9b59b6]' },
  zhang: { name: '张老师', color: 'bg-[#f39c12]' },
  wang: { name: '小王', color: 'bg-[#1abc9c]' },
  chen: { name: '老陈', color: 'bg-[#34495e]' },
  narrator: { name: '', color: 'bg-transparent' },
  // 兼容旧角色ID
  player: { name: '力康', color: 'bg-accent-red' },
  interviewer: { name: '面试官', color: 'bg-blue-600' },
  witness: { name: '证人', color: 'bg-purple-600' },
}

interface NameTagProps {
  characterId: CharacterId
}

/**
 * 角色名字标签组件
 * 显示在对话框左上角
 */
export const NameTag: React.FC<NameTagProps> = ({ characterId }) => {
  const config = CHARACTER_CONFIG[characterId]

  return (
    <div className="flex items-center gap-2">
      <div className={`${config.color} px-4 py-2 rounded-t-lg shadow-lg`}>
        <span className="text-white font-bold text-lg">{config.name}</span>
      </div>
    </div>
  )
}
