import React from 'react'

export type SceneType = 'courtroom' | 'meeting-room' | 'office'

interface SceneBackgroundProps {
  sceneType: SceneType
  className?: string
}

/**
 * 场景背景组件
 * 提供不同的场景背景
 * 使用本地图片素材
 */
export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  sceneType,
}) => {
  const imagePath = `/assets/backgrounds/${sceneType}.png`

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <img
        src={imagePath}
        alt={sceneType}
        className="w-full h-full object-cover"
        onLoad={() => console.log('[SceneBackground] LOADED:', imagePath)}
        onError={(e) => {
          console.error('[SceneBackground] ERROR:', imagePath, e)
        }}
      />
    </div>
  )
}
