import React, { useEffect, useState } from 'react'
import { dialogueEngine } from './DialogueEngine'
import { CourtRecordButton, EvidenceSelector } from '../components/interaction'
import { CharacterPortrait, CourtDialogueBox } from '../components/figma'
import { SceneBackground, ObjectionEffect } from '../components/figma'
import { CharacterExpression } from '../components/figma/CharacterSprite'
import { act1Data, act2Data, act3Data, act4Data, act5Data } from '../data/scenes'
import { scene1Evidences } from '../data/evidences'
import { useGameStore } from '../store'
import { useDialogueStore } from '../store'
import { useEvidenceStore } from '../store'

/**
 * 游戏引擎主组件
 * 负责初始化游戏、管理场景切换
 */
export const GameEngine: React.FC = () => {
  const { currentLineId, currentSceneId } = useGameStore()
  const { next } = useGameStore()
  const { currentLine } = useDialogueStore()
  const { setEvidences } = useEvidenceStore()
  const [showObjectionEffect, setShowObjectionEffect] = useState(false)

  // 键盘监听 - 空格键继续对话
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        next()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [next])

  // 自动触发异议效果
  useEffect(() => {
    if (currentLine?.interactionTrigger?.type === 'objection') {
      setShowObjectionEffect(true)
    }
  }, [currentLine?.id])

  // 所有场景数据
  const allScenes = [act1Data, act2Data, act3Data, act4Data, act5Data]

  // 初始化游戏
  useEffect(() => {
    // 加载第一幕
    dialogueEngine.loadScene(act1Data)

    // 将所有场景注册到引擎中，以便自动切换
    allScenes.forEach(scene => {
      dialogueEngine.registerScene(scene)
    })

    // 初始化证据（使用真实的证据数据）
    setEvidences(scene1Evidences)
  }, [setEvidences])

  // 获取当前说话的角色ID
  const getCurrentCharacterId = (): string | null => {
    if (!currentLine || currentLine.characterId === 'narrator') {
      return null
    }
    return currentLine.characterId
  }

  // 转换表情类型
  const getExpression = (): CharacterExpression => {
    if (!currentLine || !currentLine.expression) return 'normal'

    const expr = currentLine.expression
    const expressionMap: Record<string, CharacterExpression> = {
      'normal': 'normal',
      'thinking': 'thinking',
      'awkward': 'awkward',
      'confident': 'confident',
      'angry': 'angry',
      'smile': 'smile',
      'serious': 'serious',
      'glasses': 'glasses'
    }
    return expressionMap[expr] || 'normal'
  }

  // 获取当前场景（用于动态背景切换）
  const currentScene = dialogueEngine.getCurrentScene()

  return (
    <div className="relative w-[2560px] h-[1600px] flex items-center justify-center">
      {/* Switch 底图 - 放大 2 倍 */}
      <img
        src="/assets/backgrounds/Nintendo Switch - 3D Illustration.png"
        alt="Switch Console"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ zIndex: 0 }}
      />

      {/* 游戏内容容器 - 匹配 Switch 屏幕区域，居中 */}
      <div className="relative w-[1280px] h-[720px] overflow-hidden" style={{ zIndex: 10 }}>
        {/* 背景场景 - 动态切换 */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <img
            src={`/assets/backgrounds/${currentScene?.sceneType || 'courtroom'}.png`}
            alt={currentScene?.sceneType || 'courtroom'}
            className="w-full h-full object-cover"
            onLoad={() => console.log('[Background] LOADED:', currentScene?.sceneType)}
            onError={(e) => console.error('[Background] ERROR:', currentScene?.sceneType, e)}
          />
        </div>

        {/* 遮罩层 - 让背景不那么突出 */}
        <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

        {/* 游戏内容层 */}
        <div className="relative w-full h-full" style={{ zIndex: 2 }}>
          {/* 角色立绘 - 左侧独立区域 (z-index 低于对话框) */}
          {currentLine && currentLine.characterId !== 'narrator' && (
            <div className="absolute left-[3.5%] top-[65px] h-[717px] w-[623px]" style={{ zIndex: 5 }}>
              <CharacterPortrait
                key={`${currentLine.characterId}-${currentLine.expression}`}
                characterId={getCurrentCharacterId()!}
                expression={getExpression()}
                position="left"
                size="xl"
                className="w-full h-full"
              />
            </div>
          )}

          {/* 对话框 - 底部区域 (z-index 高于角色) */}
          {/* 旁白对话需要全屏，普通对话在底部 */}
          <div className={currentLine?.characterId === 'narrator' ? 'absolute inset-0' : 'absolute bottom-0 left-0 right-0'} style={{ zIndex: 10 }}>
            <CourtDialogueBox onContinue={next} />
          </div>

          {/* 证物按钮 - 右上角 */}
          <div className="absolute right-[3%] top-[35px]" style={{ zIndex: 15 }}>
            <CourtRecordButton />
          </div>
        </div>
      </div>

      {/* 证据选择器 - 全屏模态 */}
      <EvidenceSelector />

      {/* 异议特效（自动触发） */}
      <ObjectionEffect
        trigger={showObjectionEffect}
        onComplete={() => setShowObjectionEffect(false)}
      />
    </div>
  )
}
