import React from 'react'

interface GameLayoutProps {
  children: React.ReactNode
}

/**
 * 游戏主布局组件
 * 提供法庭风格的全屏布局
 */
export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-bg-primary overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary opacity-50" />

      {/* 游戏内容层 */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* 上部：角色立绘区域 */}
        <div className="flex-1 relative flex items-end justify-center px-8 pb-4">
          {/* 角色立绘将在这里渲染 */}
        </div>

        {/* 中部：互动提示区 */}
        <div className="relative z-20 h-8 flex items-center justify-center">
          {/* 可以显示当前的互动提示 */}
        </div>

        {/* 下部：对话框和操作区 */}
        <div className="relative z-30 px-8 pb-8">
          {children}
        </div>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute inset-0 pointer-events-none border-8 border-border-color opacity-20" />
    </div>
  )
}
