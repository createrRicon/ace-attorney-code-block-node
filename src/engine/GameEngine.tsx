import React, { useEffect, useState, useRef } from 'react'
import { dialogueEngine } from './DialogueEngine'
import { CourtRecordButton, EvidenceSelector, ClueFindingGame, CodeBlockPrototype } from '../components/interaction'
import { CharacterPortrait, CourtDialogueBox } from '../components/figma'
import { ObjectionEffect } from '../components/figma'
import { CharacterExpression } from '../components/figma/CharacterSprite'
import { ScreenShake, FlashEffect, ConfettiEffect } from '../components/effects'
import { act1Data, act2Data, act3Data, act4Data, act5Data } from '../data/scenes'
import { allEvidences } from '../data/evidences'
import { useGameStore } from '../store'
import { useDialogueStore } from '../store'
import { useEvidenceStore } from '../store'

interface GameEngineProps {
  onReturnToStart: () => void
}

/**
 * 游戏引擎主组件
 * 负责初始化游戏、管理场景切换
 */
export const GameEngine: React.FC<GameEngineProps> = ({ onReturnToStart }) => {
  const { next, getFlag, setFlag } = useGameStore()
  const { currentLine } = useDialogueStore()
  const { setEvidences } = useEvidenceStore()
  const [showObjectionEffect, setShowObjectionEffect] = useState(false)
  const [showClueFinding, setShowClueFinding] = useState(false)
  const [showPrototype, setShowPrototype] = useState(false)
  const [hideCharacterForClueFinding, setHideCharacterForClueFinding] = useState(false)

  // 视觉效果状态
  const [showFlash, setShowFlash] = useState(false)
  const [flashDuration, setFlashDuration] = useState(0.4)
  const [showShake, setShowShake] = useState(false)
  const [shakeIntensity, setShakeIntensity] = useState(8)
  const [shakeDuration, setShakeDuration] = useState(0.45)
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiDuration, setConfettiDuration] = useState(4)
  const gameScreenRef = useRef<HTMLDivElement>(null)

  // 记住 clue-finding 触发时的 successLineId
  const clueFindingSuccessLineId = useRef<string | null>(null)
  // 记住 prototype-demo 触发时的 successLineId
  const prototypeSuccessLineId = useRef<string | null>(null)

  // 线索寻找游戏完成回调
  const handleClueFindingComplete = () => {
    setShowClueFinding(false)
    setHideCharacterForClueFinding(false)
    clueFindingSuccessLineId.current = null
  }

  // Prototype 演示完成回调
  const handlePrototypeComplete = () => {
    setShowPrototype(false)
    prototypeSuccessLineId.current = null
  }

  // 当前是否处于交互模式（禁用空格推进）
  const isInteractionActive = showClueFinding || showPrototype

  // 键盘监听 - 空格键继续对话（交互模式下禁用空格推进）
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        if (!isInteractionActive) {
          next()
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [next, isInteractionActive])

  // 自动触发异议效果
  useEffect(() => {
    if (currentLine?.interactionTrigger?.type === 'objection') {
      setShowObjectionEffect(true)
    }
  }, [currentLine?.id])

  // 自动触发线索寻找游戏
  useEffect(() => {
    if (currentLine?.interactionTrigger?.type === 'clue-finding') {
      setShowClueFinding(true)
      clueFindingSuccessLineId.current = currentLine.interactionTrigger.successLineId || null
    }
  }, [currentLine?.id])

  // 自动触发 Prototype 演示
  useEffect(() => {
    if (currentLine?.interactionTrigger?.type === 'prototype-demo') {
      setShowPrototype(true)
      prototypeSuccessLineId.current = currentLine.interactionTrigger.successLineId || null
    }
  }, [currentLine?.id])

  // 自动触发视觉效果（flash / screen-shake / confetti）
  useEffect(() => {
    if (!currentLine?.effects) return

    for (const effect of currentLine.effects) {
      switch (effect.type) {
        case 'flash':
          setFlashDuration(effect.duration ?? 0.4)
          setShowFlash(true)
          break
        case 'screen-shake':
          setShakeIntensity(effect.intensity ?? 8)
          setShakeDuration(effect.duration ?? 0.45)
          setShowShake(true)
          break
        case 'confetti':
          if (!getFlag('confettiPlayed')) {
            setConfettiDuration(effect.duration ?? 4)
            setShowConfetti(true)
            setFlag('confettiPlayed', true)
          }
          break
      }
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
    setEvidences(allEvidences)
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

  // 交互模式下，对话框点击不推进 next
  const handleDialogueContinue = () => {
    if (!isInteractionActive) {
      next()
    }
  }

  // 判断当前是否是交互触发的 narrator 行（不显示为全屏旁白）
  const isInteractionNarrator =
    (showClueFinding && currentLine?.interactionTrigger?.type === 'clue-finding') ||
    (showPrototype && currentLine?.interactionTrigger?.type === 'prototype-demo')

  return (
    <div className="relative w-[2560px] h-[1600px] flex items-center justify-center">
      {/* Switch 底图 - 放大 2 倍 */}
      <img
        src="/assets/backgrounds/Nintendo Switch - 3D Illustration.png"
        alt="Switch Console"
        className="absolute inset-0 h-full w-full object-contain"
        style={{ zIndex: 0 }}
      />

      {/* 游戏内容容器 - 匹配 Switch 屏幕区域，居中 */}
      <div ref={gameScreenRef} className="relative w-[1280px] h-[720px] overflow-hidden" style={{ zIndex: 10 }}>
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

        {/* 遮罩层 - 原型演示时加深，避免背景过于抢眼 */}
        <div className={`absolute inset-0 ${showPrototype ? 'bg-black/60' : 'bg-black/45'}`} style={{ zIndex: 1 }} />

        {/* 游戏内容层 */}
        <div className="relative h-full w-full" style={{ zIndex: 2 }}>
          {/* 角色立绘 - 仅在 prototype-demo 时隐藏，clue-finding 仍保留角色 */}
          {currentLine && currentLine.characterId !== 'narrator' && !showPrototype && !hideCharacterForClueFinding && (
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

          {/* 对话框 - 交互触发的 narrator 行不显示，其他情况都显示 */}
          {!isInteractionNarrator && (
            <div className={currentLine?.characterId === 'narrator' ? 'absolute inset-0' : 'absolute bottom-0 left-0 right-0'} style={{ zIndex: 10 }}>
              <CourtDialogueBox onContinue={handleDialogueContinue} onReturnToStart={onReturnToStart} />
            </div>
          )}

          {/* 证物按钮 - 右上角 */}
          <div className="absolute right-[3%] top-[35px]" style={{ zIndex: 15 }}>
            <CourtRecordButton />
          </div>

          {/* 线索寻找游戏 - 在 Switch 屏幕内 */}
          {showClueFinding && clueFindingSuccessLineId.current && (
            <ClueFindingGame
              onComplete={handleClueFindingComplete}
              successLineId={clueFindingSuccessLineId.current}
              onCharacterHideChange={setHideCharacterForClueFinding}
            />
          )}

          {/* 新版代码块 Prototype 演示 - 在 Switch 屏幕内 */}
          {showPrototype && prototypeSuccessLineId.current && (
            <CodeBlockPrototype
              onComplete={handlePrototypeComplete}
              successLineId={prototypeSuccessLineId.current}
            />
          )}

          {/* 异议特效（自动触发）- 居中于游戏屏幕 */}
          <ObjectionEffect
            trigger={showObjectionEffect}
            onComplete={() => setShowObjectionEffect(false)}
          />

          {/* 闪光效果 */}
          <FlashEffect
            trigger={showFlash}
            duration={flashDuration}
            onComplete={() => setShowFlash(false)}
          />

          {/* 屏幕震动 */}
          <ScreenShake
            trigger={showShake}
            intensity={shakeIntensity}
            duration={shakeDuration}
            targetRef={gameScreenRef}
            onComplete={() => setShowShake(false)}
          />

          {/* 礼花/纸屑庆祝效果 */}
          <ConfettiEffect
            trigger={showConfetti}
            duration={confettiDuration}
            onComplete={() => setShowConfetti(false)}
          />
        </div>
      </div>

      {/* 证据选择器 - 全屏模态 */}
      <EvidenceSelector />
    </div>
  )
}
