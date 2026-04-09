import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { GameEngine } from './engine/GameEngine'
import { useDialogueStore, useEvidenceStore, useGameStore } from './store'

function App() {
  const [started, setStarted] = useState(false)
  const startScreenRef = useRef<HTMLButtonElement | null>(null)

  const handleReturnToStart = () => {
    useGameStore.getState().reset()
    useDialogueStore.getState().clearHistory()
    useDialogueStore.getState().setCurrentLine(null)
    useDialogueStore.getState().setTyping(false)
    useDialogueStore.getState().setShowFullText(false)
    useDialogueStore.getState().setVisible(true)
    useEvidenceStore.getState().closeSelector()
    useEvidenceStore.getState().closeDetail()
    useEvidenceStore.getState().setSelectedEvidence(null)
    setStarted(false)
  }

  const isSpaceKey = (e: KeyboardEvent | ReactKeyboardEvent): boolean =>
    e.code === 'Space' ||
    e.key === ' ' ||
    e.key === 'Space' ||
    e.key === 'Spacebar' ||
    // 兼容旧浏览器键值
    ('keyCode' in e && e.keyCode === 32)

  useEffect(() => {
    if (started) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (isSpaceKey(e)) {
        e.preventDefault()
        setStarted(true)
      }
    }

    window.addEventListener('keydown', onKeyDown, { capture: true })
    document.addEventListener('keydown', onKeyDown, { capture: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      document.removeEventListener('keydown', onKeyDown, { capture: true })
    }
  }, [started])

  useEffect(() => {
    if (started) return
    startScreenRef.current?.focus()
  }, [started])

  return (
    <div className="relative h-full w-full">
      {started ? (
        <GameEngine onReturnToStart={handleReturnToStart} />
      ) : (
        <button
          ref={startScreenRef}
          type="button"
          onClick={() => setStarted(true)}
          onKeyDown={(e) => {
            if (isSpaceKey(e)) {
              e.preventDefault()
              setStarted(true)
            }
          }}
          className="absolute inset-0 z-[120] h-full w-full cursor-pointer border-0 bg-transparent p-0"
          aria-label="开始游戏"
        >
          <div className="relative h-[1600px] w-[2560px] flex items-center justify-center">
            <img
              src="/assets/backgrounds/Nintendo Switch - 3D Illustration.png"
              alt="Switch Console"
              className="absolute inset-0 h-full w-full object-contain"
            />

            <div className="relative h-[720px] w-[1280px] overflow-hidden" style={{ zIndex: 10 }}>
              <img
                src="/assets/figma/startpage.png"
                alt="开始画面"
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="mt-[34%] text-center">
                  <p className="court-dialogue-text animate-pulse text-[26px] font-bold tracking-[0.08em] text-[#FFB800]">
                    点击开始
                  </p>
                  <p className="court-dialogue-text mt-1 animate-pulse text-[28px] font-bold leading-none text-[#FFB800]">
                    ▼
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-4 right-5">
                <p className="court-dialogue-text text-[11px] font-medium tracking-[0.04em] text-black">
                  2026 By Ricon
                </p>
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

export default App
